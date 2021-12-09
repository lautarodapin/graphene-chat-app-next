import { ApolloError } from "@apollo/client";
import { Alert, AlertTitle, Button, CircularProgress, Container, Grid } from "@mui/material";
import { FC } from "react";

interface Props {
    loading?: boolean;
    error?: ApolloError
    refetch?: () => any;

}

export const Page: FC<Props> = ({ loading, error, refetch, children }) => {
    console.log(error)
    if (loading) return <CircularProgress />;
    if (error) return (
        <Container maxWidth="xl" fixed={true}>
            <Alert
                action={<Button variant="contained" size='small' color="primary" onClick={refetch}>Retry</Button>}
                severity="error"
            >
                {error.message}
            </Alert>
        </Container>
    )

    return (
        <Grid container={true} spacing={1} justifyContent='center'>
            {children}
        </Grid>
    )
}