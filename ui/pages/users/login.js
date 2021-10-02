import { Container, Button, Grid } from "@mui/material";
import { Formik } from "formik";
import { Form } from "../../components/forms/form";
import { TextInput } from "../../components/forms/text-input";


import { gql, useMutation } from "@apollo/client";
import { client } from "../../apollo-client";
import { useEffect, useState } from "react";
import { SubmitButton } from "../../components/forms/submit-button";
import { FormErrors } from "../../components/forms/form-errors";

export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
        ok
        user {
            id
            username
        }
    }
}`

const Login = () => {
    const [login, { data, error, loading }] = useMutation(LOGIN)
    const [action, setAction] = useState()

    useEffect(() => {
        if (action) {
            if (loading) action.setSubmitting(true)
            else action.setSubmitting(false)
        }
    }, [loading])

    useEffect(() => {
        if (error) {}
    }, [error])

    return (
        <Formik initialValues={{}} onSubmit={(values, actions) => {
            setAction(actions)
            actions.setFieldError
            login({ variables: { username: values.username, password: values.password } })
        }}>
            <Form>
                <FormErrors />
                <TextInput label='Username' name='username' gridProps={{ xs: 12, md: 6 }} />
                <TextInput label='Password' name='password' gridProps={{ xs: 12, md: 6 }} />
                <Grid item={true} xs={12}>
                    <SubmitButton />
                </Grid>
            </Form>
        </Formik>
    );
};

export default Login;