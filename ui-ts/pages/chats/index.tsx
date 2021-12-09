import { useQuery } from "@apollo/client"
import { Avatar, CircularProgress, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { NextPage } from "next"
import Link from 'next/link'
import { ChatCard } from "../../components/chat/chat-card"
import { Page } from "../../components/layout/page"
import { useChatsQuery } from "../../generated/graphql"


const ChatList: NextPage = () => {
    const { data: { chats } = {}, loading, error, refetch } = useChatsQuery()

    return (
        <Page loading={loading} error={error} refetch={refetch}>
            <List>
                {!!chats?.length && chats?.map((chat, index) => {
                    const isLast = chats.length - 1 === index
                    return (
                        <>
                            <ChatCard chat={chat} />
                            {!isLast && <Divider variant='inset' component='li' />}
                        </>
                    )
                })}
            </List>
        </Page>
    )
}

export default ChatList