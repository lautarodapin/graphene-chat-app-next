import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { FC } from 'react';
import { MinimalChatFragment } from '../../generated/graphql';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChatDetailQueryString } from '../../pages/chats/[id]';

type Props = {
    chat: MinimalChatFragment
}


export const ChatCard: FC<Props> = ({ chat }) => {
    const classes = useStyles();
    const router = useRouter();
    const { id, chatName, lastMessage } = chat;
    const pathname = '/chats/[id]'
    const path = `/chats/${id}`;
    const query: ChatDetailQueryString = { page: 1, pageSize: 10, initState: true }

    const isCurrentPath = router.asPath.includes(path);

    return (
        <Link key={id} href={pathname} as={{ pathname: path, query }} passHref={true}>
            <ListItem className={`${classes.root} ${isCurrentPath && classes.selected}`}>
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

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        cursor: 'pointer',
    },
    selected: {
        backgroundColor: theme.palette.grey[300],
    },
}))
