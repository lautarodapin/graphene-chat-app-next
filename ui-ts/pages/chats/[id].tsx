import { useCallback, useEffect, useRef, useState } from "react"
import { useQuery, useMutation, useSubscription } from "@apollo/client"
import { useRouter } from "next/dist/client/router"
import { CircularProgress, Grid, List, ListItem, ListItemText, Paper } from "@mui/material"
import { ChatInput } from "../../components/chat/chat-input"
import { MessageList } from "../../components/chat/message-list"
import { ScrollTo } from "../../components/scroll-to"
import { MessageFragment, OnNewChatMessageDocument, useHistoryQuery, useJoinChatMutation, useOnNewChatMessageSubscription } from "../../generated/graphql"
import { NextPage } from "next"
import { useOnScreen } from "../../hooks/use-on-screen"
import { useIsMounted } from "../../hooks/use-is-mounted"

const ChatDetail: NextPage = () => {
    const router = useRouter()
    const id = router.query.id as string
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const { data, loading, error, refetch, fetchMore, client, subscribeToMore } = useHistoryQuery({ variables: { chatRoom: id, filters: { page, pageSize } } })
    const [joinChat] = useJoinChatMutation()
    const [messages, setMessages] = useState<MessageFragment[]>([])
    const [hasMore, setHasMore] = useState(false)
    const chatRef = useRef<HTMLLIElement | null>(null)
    const chatTopRef = useRef<HTMLLIElement | null>(null)
    const chatTopIsVisible = useOnScreen(chatTopRef)
    const isMounted = useIsMounted()

    const filterMessages = useCallback((list: MessageFragment[]) => {
        return list.filter(message => !messages.some(innerMessage => innerMessage.id === message.id)) || []
    }, [messages])

    useEffect(() => {
        if (id) joinChat({ variables: { input: { chatRoom: id, join: true } } })
        return () => {
            joinChat({ variables: { input: { chatRoom: id, join: false } } })
        }
    }, [joinChat, id])

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: OnNewChatMessageDocument,
            variables: { chatRoom: id },
            updateQuery: (prev, { subscriptionData }) => {
                console.log(subscriptionData, prev)
                if (!subscriptionData.data) return subscriptionData.data
                // setMessages(curr => [...curr, subscriptionData.data.onNewChatMessage.message])
                return subscriptionData.data
            }
        })
        if (unsubscribe) return () => unsubscribe() // TODO!
    }, [subscribeToMore, id])

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    useEffect(() => {
        const firstLoad = async () => {
            if (fetchMore) {
                const { data } = await fetchMore({ variables: { chatRoom: id, filters: { page, pageSize } } })
                // const { data } = await client.query({
                //     query: HISTORY_QUERY, variables: {
                //         chatRoom: id, filters: { page, pageSize },
                //     }
                // })
                console.log('load more', data)
                if (data && data.history !== null && data.history && data.history.items.length > 0) {
                    const items = data.history.items
                    setMessages(curr => [...curr, ...filterMessages(items)])
                    setHasMore(data?.history.hasMore)
                    chatRef.current?.scrollIntoView()
                }
            }
        }
        firstLoad()
    }, [client, filterMessages, id, page, pageSize])

    useEffect(() => {
        const loadMore = async () => {
            if (fetchMore && hasMore) {
                const { data } = await fetchMore({ variables: { chatRoom: id, filters: { page: page + 1, pageSize } } })
                console.log('load more', data)
                if (data && data.history !== null && data.history && data.history.items.length > 0) {
                    const items = data.history.items
                    setMessages(curr => [...filterMessages(items), ...curr])
                    setHasMore(data?.history.hasMore)
                    chatTopRef.current?.scrollIntoView()
                }
            }
        }
        if (chatTopIsVisible && isMounted() && !loading) {
            console.info('Is visible top')
            if (client && hasMore && id) {
                loadMore()
                setPage(page + 1)
            }
        }
    }, [chatTopIsVisible, client, filterMessages, hasMore, id, isMounted, loading, page, pageSize])

    if (loading) return <CircularProgress />

    return (
        <Grid container xs={12} spacing={2}>
            <Grid item xs={12}>
                <List style={{ maxHeight: '80vh', height: '80vh', overflowY: 'auto' }}>
                    <ListItem style={{ float: "left", clear: "both" }} ref={chatTopRef}></ListItem>
                    <MessageList messages={messages} />
                    <ListItem style={{ float: "left", clear: "both" }} ref={chatRef}></ListItem>
                </List>
            </Grid>
            <Grid item xs={12}>
                <ChatInput />
            </Grid>
        </Grid>
    )
}


export default ChatDetail