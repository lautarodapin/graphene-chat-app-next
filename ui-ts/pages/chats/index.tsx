import { useQuery } from "@apollo/client"
import { CircularProgress, Grid } from "@mui/material"
import { NextPage } from "next"
import Link from 'next/link'
import { useChatsQuery } from "../../generated/graphql"


const ChatList: NextPage = () => {
    const { data, loading, error } = useChatsQuery()
    console.log(data)

    if (loading) return <CircularProgress />

    return (
        <Grid container={true} spacing={2}>
            {data?.chats?.map(chat => (
                <Grid item={true} xs={12}>
                    <Link href={`/chats/${chat.id}`}>
                        {chat.chatName}
                    </Link>
                </Grid>
            ))}
        </Grid>
    )
}

export default ChatList