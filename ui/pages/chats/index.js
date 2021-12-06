import { CHATS_QUERY } from "@/graphql-documents/chats"
import { useQuery } from "@apollo/client"
import Link from 'next/link'
const ChatList = ({ props }) => {
    const { data, loading, error } = useQuery(CHATS_QUERY)

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