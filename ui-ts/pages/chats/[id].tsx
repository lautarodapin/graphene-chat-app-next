import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/dist/client/router"
import { Grid, List, ListItem, Skeleton } from "@mui/material"
import { ChatInput } from "../../components/chat/chat-input"
import { MessageList } from "../../components/chat/message-list"
import { MessageFragment, useHistoryLazyQuery, useJoinChatMutation, useOnNewMessageSubscription } from "../../generated/graphql"
import { NextPage } from "next"
import { useOnScreen } from "../../hooks/use-on-screen"


const ChatDetail: NextPage = () => {
    const router = useRouter()
    const id = router.query.id as string
    const page = useRef(1)
    const pageSize = useRef(10)
    const initState = useRef(true)
    const hasMore = useRef(false)
    const [getHistory, { data, fetchMore, loading, error, refetch, networkStatus }] = useHistoryLazyQuery({
        variables: { chat: id, filters: { page: page.current, pageSize: pageSize.current } },
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            if (!!data.history?.items.length) {
                setFilterMessages(data.history?.items)
                hasMore.current = data.history?.hasMore
                initState.current = false
                page.current++
                if (chatTopRef.current) observer.observe(chatTopRef.current)
            }
        }
    })
    useOnNewMessageSubscription({
        variables: { chat: id },
        fetchPolicy: 'network-only',
        onSubscriptionData: ({ subscriptionData }) => {
            if (subscriptionData.data?.onNewMessage) {
                console.log('new message entering', subscriptionData.data?.onNewMessage)
                setFilterMessages([subscriptionData.data?.onNewMessage.message])
                if (!shouldLoadMore) process.nextTick(() => chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' }))
            }
        }
    })
    const [joinChat] = useJoinChatMutation()
    const chatBottomRef = useRef<HTMLLIElement | null>(null)
    const chatTopRef = useRef<HTMLLIElement | null>(null)
    const topIsVisible = useOnScreen(chatTopRef)
    const bottomIsVisible = useOnScreen(chatBottomRef)
    const shouldLoadMore = !bottomIsVisible && topIsVisible
    const firstMount = useRef(true)

    // const isMounted = useIsMounted()
    const [messages, setMessages] = useState<MessageFragment[]>([])

    const observer = useMemo(() => new IntersectionObserver(
        async ([entry]) => {
            if (entry.isIntersecting && hasMore.current && shouldLoadMore && !loading && !initState.current) {
                observer.disconnect()
                await refetch({ chat: id, filters: { page: page.current, pageSize: pageSize.current } })
            }
        },
    ), [refetch, id, loading, shouldLoadMore])

    const setFilterMessages = useCallback((items: MessageFragment[]) => {
        const newMessages = [
            ...messages,
            ...items,
        ].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
            .reduce((acc: MessageFragment[], curr) => {
                return acc.find(m => m.id === curr.id) ? acc : [...acc, curr]
            }, [])
        setMessages(newMessages)
        process.nextTick(() => {
            if (!shouldLoadMore) chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
        })
    }, [messages, shouldLoadMore])

    useEffect(() => {
        getHistory({ variables: { chat: id, filters: { page: 1, pageSize: pageSize.current } } })
    }, [getHistory, id, pageSize])



    useEffect(() => {
        if (chatTopRef.current) {
            observer.observe(chatTopRef.current)
        }
        return () => { observer.disconnect() }
    }, [chatTopRef, observer])

    return (
        <Grid container xs={12} spacing={2}>
            <Grid item xs={12}>
                <List style={{ maxHeight: '80vh', height: '80vh', minHeight: '80vh', overflowY: 'auto' }}>
                    {loading && Array.from(Array(50), (_, i) => i + 1).map(i => (
                        <ListItem key={i}>
                            <Grid container={true} justifyContent={i % 2 === 0 ? 'flex-start' : 'flex-end'}>
                                <Grid item={true}>
                                    <Skeleton animation='wave' variant='rectangular' width={350} height={75} />
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))}
                    <ListItem style={{ float: "left", clear: "both" }} ref={chatTopRef}></ListItem>
                    <MessageList messages={messages} />
                    <ListItem style={{ float: "left", clear: "both" }} ref={chatBottomRef}></ListItem>
                </List>
            </Grid>
            <Grid item xs={12}>
                <ChatInput />
            </Grid>
        </Grid >
    )
}


export default ChatDetail