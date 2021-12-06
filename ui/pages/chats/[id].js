import { useCallback, useEffect, useRef, useState } from "react"
import { useQuery, useMutation, useSubscription } from "@apollo/client"
import { useRouter } from "next/dist/client/router"
import { ON_NEW_CHAT_MESSAGE_SUBSCRIPTION } from "../../graphql-documents/messages"
import { CircularProgress, Grid, List, ListItem, ListItemText, Paper } from "@mui/material"
import { useOnScreen } from "../../hooks/use-on-screen"
import { useIsMounted } from "../../hooks/use-is-mounted"
import { ChatInput } from "../../components/chat/chat-input"
import { MessageList } from "../../components/chat/message-list"
import { ScrollTo } from "../../components/scroll-to"
import { JOIN_CHAT_MUTATION } from "@/graphql-documents/chats"
import { HISTORY_QUERY, SEND_CHAT_MESSAGE_MUTATION } from "@/graphql-documents/messages"

const ChatDetail = ({ props }) => {
    const router = useRouter()
    const { id } = router.query
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const { data, loading, error, refetch, client, subscribeToMore } = useQuery(HISTORY_QUERY, { variables: { chatRoom: id, filters: { page, pageSize } } })
    const [joinChat] = useMutation(JOIN_CHAT_MUTATION)
    const [messages, setMessages] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const chatRef = useRef()
    const chatTopRef = useRef()
    const chatTopIsVisible = useOnScreen(chatTopRef)
    const isMounted = useIsMounted()
    
    const filterMessages = useCallback((list) => {
        return list.filter(message => !messages.some(innerMessage => innerMessage.id === message.id)) || []
    }, [messages])

    useEffect(() => {
        const join = async (value) => await joinChat({variables: {chatRoom: id, join: value}})
        if (id) join(true)
        return () => id && join(false)
    }, [joinChat, id])
    
    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: ON_NEW_CHAT_MESSAGE_SUBSCRIPTION,
            variables: {chatRoom: id},
            updateQuery: (prev, {subscriptionData}) => {
                console.log(subscriptionData, prev)
                if (!subscriptionData.data) return
                setMessages(curr => [...curr, subscriptionData.data.onNewChatMessage.message])
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
            if (client && HISTORY) {
                const { data } = await client.query({
                    query: HISTORY, variables: {
                        chatRoom: id, filters: { page, pageSize },
                    }
                })
                console.log('load more', data)
                if (data) {
                    setMessages(curr => [...curr, ...filterMessages(data?.history.items)])
                    setHasMore(data?.history.hasMore)
                    chatRef.current.scrollIntoView()
                }
            }
        }
        firstLoad()
    }, [client, filterMessages, id, page, pageSize])

    useEffect(() => {
        const loadMore = async () => {
            if (client && HISTORY) {
                const { data } = await client.query({
                    query: HISTORY, variables: {
                        chatRoom: id, filters: { page: page + 1, pageSize },
                    }
                })
                console.log('load more', data)
                if (data) {
                    setMessages(curr => [...filterMessages(data?.history.items), ...curr])
                    setHasMore(data?.history.hasMore)
                    chatTopRef.current.scrollIntoView()
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
                <ChatInput chatRoomId={id} />
            </Grid>
        </Grid>
    )
}


export default ChatDetail