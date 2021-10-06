import { Grid, ListItem, ListItemText } from "@mui/material"
import { useUser } from "../../contexts/user"

export const MessageList = ({ messages, ...props }) => {
    const {user} = useUser()

    return (
        <>
            {messages && messages.map(message => {
                const align = user.id === message.user.id ? 'left' : 'right'
                return (
                    <ListItem key={message.id}>
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText
                                    align={align}
                                    primary={`${message.user.username}: ${message.message}`}>
                                </ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align={align} secondary={message.createdAt}></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                )
            })}
        </>
    )
}