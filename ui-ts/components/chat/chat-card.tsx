import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { FC } from 'react';
import { MinimalChatFragment } from '../../generated/graphql';
import Link from 'next/link';

type Props = {
    chat: MinimalChatFragment
}


export const ChatCard: FC<Props> = ({ chat }) => {
    const classes = useStyles();
    const { id, chatName, lastMessage } = chat;

    return (
        <Link key={id} href="/chats/[id]" as={`/chats/${chat.id}`} passHref={true}>
            <ListItem className={classes.root}>
                <ListItemAvatar><Avatar alt='A' /></ListItemAvatar>
                <ListItemText
                    primary={chatName}
                    secondary={
                        <>
                            <Typography>{lastMessage?.createdBy?.username || '-'}</Typography>
                            {' - ' + lastMessage?.message}
                        </>
                    }
                />
            </ListItem>
        </Link>
    )
}

const useStyles = makeStyles({
    root: {
        cursor: 'pointer',
    }
})
