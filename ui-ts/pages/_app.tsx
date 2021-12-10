import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../styles/createEmotionCache';

import "/styles/globals.css";
import theme from '../styles/theme';
import { Header } from '../components/layout/header';
import { Container } from '@mui/material';

import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo-client";
import { UserProvider } from '../contexts/user';
import { ChatDrawer } from '../components/chat/chat-drawer';
// import { UserProvider } from '../contexts/user';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
type Props = AppProps & { emotionCache: EmotionCache }


function MyApp(props: Props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>Chat app</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ApolloProvider client={client}>
                <ThemeProvider theme={theme}>
                    <UserProvider>
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        <Header />
                        <ChatDrawer>
                            <Container maxWidth='lg' style={{ marginTop: '20px' }}>
                                <Component {...pageProps} />
                            </Container>
                        </ChatDrawer>
                    </UserProvider>
                </ThemeProvider>
            </ApolloProvider>
        </CacheProvider>
    )
}
export default MyApp
