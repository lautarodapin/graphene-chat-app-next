import { useQuery } from "@apollo/client"
import { CHATS } from "../../graphql-documents/chats"
import Link from 'next/link'
const ChatList = ({props}) => {
    const {data, loading, error} = useQuery(CHATS)

    return (
        <>
            {data?.chats.map(chat => (
                <>
                    <Link href={`/chats/${chat.id}`}>
                        {chat.chatName}
                    </Link>
                </>
            ))}
        </>
    )
}

export default ChatList