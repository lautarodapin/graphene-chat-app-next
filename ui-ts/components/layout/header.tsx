import { Button, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Link from 'next/link'
import { FC } from "react";
import { useUser } from "../../contexts/user";

export const Header: FC = () => {
    const { user } = useUser()

    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Container
                        maxWidth="lg"
                        sx={{ display: `flex`, justifyContent: `space-between` }}
                    >
                        Chat app
                        {user && (
                            <Link href="/chats" passHref={true}>
                                <Button color='inherit'>
                                    Chats
                                </Button>
                            </Link>
                        )}
                    </Container>
                    {user && (
                        <>
                            <Typography color='whitesmoke'>
                                {user.username.toUpperCase()}
                            </Typography>
                            <Link href="/users/logout" passHref={true}>
                                <Button color='inherit'>
                                    Logout
                                </Button>
                            </Link>
                        </>
                    )}
                    {!user && (
                        <Link href="/users/login" passHref={true}>
                            <Button color='inherit'>
                                Login
                            </Button>
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

