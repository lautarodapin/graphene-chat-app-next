import { ApolloError } from "@apollo/client";
import { Alert, AlertTitle, Button, CircularProgress, Container, Grid, GridProps } from "@mui/material";
import { FC } from "react";

interface Props {
    loading?: boolean;
    error?: ApolloError
    refetch?: () => any;
    gridProps?: GridProps

}

export const Page: FC<Props> = ({ loading, error, refetch, children, ...props }) => {
    console.log(error)
    if (loading) return <CircularProgress />;
    if (error) return (
        <Container maxWidth="xl" fixed={true}>
            <Alert
                action={<Button variant="contained" size='small' color="primary" onClick={() => refetch ? refetch() : null}>Retry</Button>}
                severity="error"
            >
                {error.message}
            </Alert>
        </Container>
    )

    return (
        <Grid container={true} spacing={1} {...props}>
            {children}
        </Grid>
    )
}