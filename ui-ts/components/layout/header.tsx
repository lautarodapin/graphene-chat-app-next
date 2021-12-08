import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/system";
import Link from 'next/link'
import { FC } from "react";
import { useUser } from "../../contexts/user";
import theme from "../../styles/theme";

export const Header: FC = () => {
    const { user } = useUser()

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Container
                        maxWidth="lg"
                        sx={{ display: `flex`, justifyContent: `space-between` }}
                    >
                        Chat app
                        {user && (
                            <Link href="/chats">
                                <Button color='inherit'>
                                    Chats
                                </Button>
                            </Link>
                        )}
                    </Container>
                    {user && (
                        <>
                            <Link href="/users/logout">
                                <Button color='inherit' disabled>
                                    {user.username}
                                </Button>
                            </Link>
                            <Link href="/users/logout">
                                <Button color='inherit'>
                                    Logout
                                </Button>
                            </Link>
                        </>
                    )}
                    {!user && (
                        <Link href="/users/login">
                            <Button color='inherit'>
                                Login
                            </Button>
                        </Link>

                    )}
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
};

