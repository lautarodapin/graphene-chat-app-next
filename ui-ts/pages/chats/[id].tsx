import { useCallback, useEffect, useRef, useState } from "react"
import { useQuery, useMutation, useSubscription, NetworkStatus } from "@apollo/client"
import { useRouter } from "next/dist/client/router"
import { CircularProgress, Grid, List, ListItem, ListItemText, Paper } from "@mui/material"
import { ChatInput } from "../../components/chat/chat-input"
import { MessageList } from "../../components/chat/message-list"
import { ScrollTo } from "../../components/scroll-to"
import { MessageFragment, OnNewChatMessageDocument, useHistoryLazyQuery, useHistoryQuery, useJoinChatMutation, useOnNewChatMessageSubscription } from "../../generated/graphql"
import { NextPage } from "next"
import { useOnScreen } from "../../hooks/use-on-screen"
import { useIsMounted } from "../../hooks/use-is-mounted"
import { InitialMessageList } from "../../components/chat/initial-message-list"

const ChatDetail: NextPage = () => {
    const router = useRouter()
    const id = router.query.id as string
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const { data, fetchMore, loading, error, refetch, networkStatus } = useHistoryQuery({
        variables: { chatRoom: id, filters: { page, pageSize } },
    })
    const { data: newMessage } = useOnNewChatMessageSubscription({ variables: { chatRoom: id } })
    const [joinChat] = useJoinChatMutation()
    const [hasMore, setHasMore] = useState(false)
    const chatBottomRef = useRef<HTMLLIElement | null>(null)
    const chatTopRef = useRef<HTMLLIElement | null>(null)
    const topIsVisible = useOnScreen(chatTopRef)
    const bottomIsVisible = useOnScreen(chatBottomRef)
    const shouldLoadMore = !bottomIsVisible && topIsVisible
    const firstMount = useRef(true)

    // const isMounted = useIsMounted()
    const [messages, setMessages] = useState<MessageFragment[]>([])

    const setFilterMessages = (items: MessageFragment[]) => {
        const newMessages = [
            ...messages,
            ...items,
        ].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
            .reduce((acc: MessageFragment[], curr) => {
                return acc.find(m => m.id === curr.id) ? acc : [...acc, curr]
            }, [])
        setMessages(newMessages)
    }

    useEffect(() => {
        if (newMessage?.onNewChatMessage) {
            console.log("new message", newMessage.onNewChatMessage)
            setFilterMessages([newMessage.onNewChatMessage.message])
            if (!shouldLoadMore) process.nextTick(() => chatBottomRef.current?.scrollIntoView({ behavior: "smooth" }))
        }
    }, [newMessage])


    /* TODO: initial scroll to bpotoom not working*/
    useEffect(() => {
        if (shouldLoadMore && !loading && hasMore && firstMount.current === false) {
            refetch({ chatRoom: id, filters: { page: page + 1, pageSize } })
            setPage(page + 1)
        }
    }, [shouldLoadMore])

    useEffect(() => {
        if (data?.history) {
            setHasMore(data.history.hasMore)
            if (data?.history?.items.length !== 0) {
                if (firstMount.current) firstMount.current = false
                setFilterMessages(data.history.items)
                if (firstMount.current) {
                    process.nextTick(() => chatBottomRef.current?.scrollIntoView({ behavior: "smooth" }))
                }
            }
        }
        if (!shouldLoadMore) chatBottomRef.current?.scrollIntoView({ behavior: "smooth" })
        if (shouldLoadMore) chatTopRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [data, shouldLoadMore])



    if (loading) return <CircularProgress />

    return (
        <Grid container xs={12} spacing={2}>
            <Grid item xs={12}>
                <List style={{ maxHeight: '80vh', height: '80vh', overflowY: 'auto' }}>
                    <ListItem style={{ float: "left", clear: "both" }} ref={chatTopRef}></ListItem>
                    <MessageList messages={messages} />
                    <ListItem style={{ float: "left", clear: "both" }} ref={chatBottomRef}></ListItem>
                </List>
            </Grid>
            <Grid item xs={12}>
                <ChatInput />
            </Grid>
        </Grid>
    )
}


export default ChatDetail