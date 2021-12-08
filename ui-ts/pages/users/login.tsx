import { Container, Button, Grid } from "@mui/material";
import { Formik } from "formik";
import { Form } from "../../components/forms/form";
import { TextInput } from "../../components/forms/text-input";


import { SubmitButton } from "../../components/forms/submit-button";
import { FormErrors } from "../../components/forms/form-errors";
import { useRouter } from "next/dist/client/router";
;
import { useEffect } from "react";
import { NextPage } from "next";
import { useTokenAuthMutation } from "../../generated/graphql";
import { useUser } from "../../contexts/user";



const Login: NextPage = () => {
    const defaultInitial = {
        username: '',
        password: '',
    }
    const router = useRouter()
    const { user, refetch } = useUser()
    const [tokenAuth] = useTokenAuthMutation()

    useEffect(() => {
        if (user) router.push('/')
    }, [user])

    return (
        <Formik initialValues={{ ...defaultInitial }} onSubmit={async (values, actions) => {
            actions.setSubmitting(true)
            const { data } = await tokenAuth({ variables: { username: values.username, password: values.password } })
            if (data?.tokenAuth?.token) {
                localStorage.setItem("token", data.tokenAuth.token)
                refetch()
                router.push({ pathname: '/' })
            }
            actions.setSubmitting(false)
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