import { useQuery } from "@apollo/client"
import { CircularProgress, Grid } from "@mui/material"
import { NextPage } from "next"
import Link from 'next/link'
import { Page } from "../../components/layout/page"
import { useChatsQuery } from "../../generated/graphql"


const ChatList: NextPage = () => {
    const { data, loading, error, refetch } = useChatsQuery()
    console.log(data)


    return (
        <Page loading={loading} error={error} refetch={refetch}>
            {data?.chats?.map(chat => (
                <Grid item={true} xs={12}>
                    <Link href={`/chats/${chat.id}`}>
                        {chat.chatName}
                    </Link>
                </Grid>
            ))}
        </Page>
    )
}

export default ChatList