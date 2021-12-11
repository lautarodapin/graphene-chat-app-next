import { Grid, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { FC } from "react"
import { useUser } from "../../contexts/user"
import { MessageFragment } from "../../generated/graphql"
import { humanizeDatetime } from '../../utils/index';

interface Props {
    messages: MessageFragment[]
}

export const MessageList: FC<Props> = ({ messages, ...props }) => {
    const { user } = useUser()

    if (!user) return null

    return (
        <>
            {messages.map(({ id, message, createdAt, createdBy }) => {
                const isYou = createdBy?.id === user.id
                return (
                    <ListItem key={id}>
                        <ListItemAvatar><Avatar /></ListItemAvatar>
                        <ListItemText
                            primary={`${isYou ? 'You' : createdBy?.username || 'Unknown'}: ${message}`}
                            secondary={humanizeDatetime(createdAt)}
                        >
                        </ListItemText>
                    </ListItem>
                );
            })}
        </>
    )
}