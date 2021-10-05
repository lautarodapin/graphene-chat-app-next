import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/system";
import Link from 'next/link'
import { useUser } from "../../contexts/user";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Header = () => {
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
                    </Container>
                    {user && (
                        <Link href="/users/logout">
                            <Button color='inherit'>
                                Logout
                            </Button>
                        </Link>
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
            <Offset />
        </>
    );
};

export default Header;
