import { List } from "@mui/material"
import { ChatCard } from "./chat-card"
import { useChatsQuery } from '../../generated/graphql';

export const ChatList = () => {
    const { data: { chats } = {} } = useChatsQuery()

    return (
        <List>
            {!!chats?.length && chats?.map((chat) => (
                <ChatCard key={chat.id} chat={chat} />
            ))}
        </List>
    )
}