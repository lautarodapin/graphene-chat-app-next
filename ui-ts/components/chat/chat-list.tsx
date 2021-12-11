import { List, Divider } from "@mui/material"
import { ChatCard } from "./chat-card"
import { useChatsQuery } from '../../generated/graphql';

export const ChatList = () => {
    const { data: { chats } = {}, loading, error, refetch } = useChatsQuery()

    return (
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
    )
}