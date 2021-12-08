import { CircularProgress, Grid, ListItem, ListItemText } from "@mui/material"
import { useRouter } from "next/router"
import { FC, useEffect, useState } from "react"
import { useUser } from "../../contexts/user"
import { MessageFragment, useHistoryQuery } from "../../generated/graphql"

interface Props {
    messagesState: [MessageFragment[], (messages: MessageFragment[]) => void]
}

export const InitialMessageList: FC<Props> = ({ messagesState }) => {
    const { user } = useUser()
    const router = useRouter()
    const id = router.query.id as string
    const { data, loading, error } = useHistoryQuery({ variables: { chatRoom: id, filters: { page: 1, pageSize: 10 } } })
    const [messages, setMessages] = messagesState

    useEffect(() => {
        if (!data) return
        if (!data.history) return
        if (data.history === null) return
        if (data.history.items.length === 0) return
        setMessages(data.history.items)
    }, [data])

    if (!user) return null
    if (loading) return <CircularProgress />

    return (
        <>
            {messages.map(message => {
                const align = user.id === message.createdBy?.id ? 'left' : 'right'
                return (
                    <ListItem key={message.id}>
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText
                                    primaryTypographyProps={{ align }}
                                    primary={`${message.createdBy?.username}: ${message.message}`}>
                                </ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText primaryTypographyProps={{ align }} secondary={message.createdAt}></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                )
            })}
        </>
    )
}