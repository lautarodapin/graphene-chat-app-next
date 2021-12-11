import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { FC, useState } from 'react';
import { MinimalChatFragment, useOnNewMessageSubscription, MessageFragment } from '../../generated/graphql';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
    chat: MinimalChatFragment
}

export const ChatCard: FC<Props> = ({ chat }) => {
    const classes = useStyles();
    const router = useRouter();
    const [lastMessage, setLastMessage] = useState<Pick<MessageFragment, 'createdBy' | 'id' | 'message' | 'createdAt'> | undefined | null>(chat.lastMessage);
    const { id, chatName } = chat;
    const pathname = '/chats/[id]'
    const path = `/chats/${id}`;
    const query = { name: chatName };
    useOnNewMessageSubscription({
        variables: { chat: id },
        fetchPolicy: 'network-only',
        onSubscriptionData: ({ subscriptionData }) => {
            if (subscriptionData.data?.onNewMessage) {
                setLastMessage(subscriptionData.data.onNewMessage.message);
                console.log('new message entering', subscriptionData.data?.onNewMessage)
            }
        }
    })

    const isCurrentPath = router.asPath.includes(path);
    console.log(chatName, lastMessage?.message)
    return (
        <Link key={id} href={pathname} as={{ pathname: path, query }} passHref={true}>
            <ListItem className={`${classes.root} ${isCurrentPath && classes.selected}`}>
                <ListItemAvatar><Avatar alt='A' /></ListItemAvatar>
                <ListItemText
                    primary={chatName}
                    secondary={
                        <>
                            {lastMessage && lastMessage.createdBy && (
                                <>
                                    <Typography component='span' variant='body2'>{lastMessage?.createdBy?.username}</Typography>
                                    {' - ' + lastMessage?.message}
                                </>
                            )}
                        </>
                    }
                />
            </ListItem>
        </Link>
    )
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        cursor: 'pointer',
    },
    selected: {
        backgroundColor: theme.palette.grey[300],
    },
}))
