import { Container, Button, Grid } from "@mui/material";
import { Formik } from "formik";
import { Form } from "../../components/forms/form";
import { TextInput } from "../../components/forms/text-input";


import { useMutation } from "@apollo/client";
import { SubmitButton } from "../../components/forms/submit-button";
import { FormErrors } from "../../components/forms/form-errors";
import { useRouter } from "next/dist/client/router";
import { TOKEN_AUTH } from "graphql-documents/documents";
import { USER } from "../../graphql-documents/documents";



const Login = () => {
    const router = useRouter()
    const [tokenAuth] = useMutation(TOKEN_AUTH, {refetchQueries: [
        USER,
    ]})
    
    return (
        <Formik initialValues={{}} onSubmit={async (values, actions) => {
            actions.setSubmitting(true)
            try {
                const {data: {tokenAuth: {token}}, errors} = await tokenAuth({ variables: { username: values.username, password: values.password } })
                console.log('asda',errors, data)
                if (errors.length === 0) {
                    if (token) {
                        localStorage.setItem("token", token)
                        router.push({pathname: '/'})
                    }
                } else {
                    actions.setStatus({formErrors: errors.map(error => error.message).join(', ')})
                }
            } catch (error) {
                actions.setErrors({__all__: error.message})
            } finally{
                actions.setSubmitting(false)
            }
        }}>
            {props => {
                return (
                    <Form>
                        
                        <FormErrors />
                        <TextInput label='Username' name='username' gridProps={{ xs: 12, md: 6 }} />
                        <TextInput label='Password' name='password' type='password' gridProps={{ xs: 12, md: 6 }} />
                        <Grid item={true} xs={12}>
                            <SubmitButton />
                        </Grid>
                    </Form>
                )
            }}
        </Formik>
    );
};

export default Login;