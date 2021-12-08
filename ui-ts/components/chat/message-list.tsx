import { Grid, ListItem, ListItemText } from "@mui/material"
import { FC } from "react"
import { useUser } from "../../contexts/user"
import { MessageFragment } from "../../generated/graphql"

interface Props {
    messages: MessageFragment[]
}

export const MessageList: FC<Props> = ({ messages, ...props }) => {
    const { user } = useUser()

    if (!user) return null

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