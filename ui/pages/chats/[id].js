import { Formik } from "formik"
import { Form } from "../../components/forms/form"
import { SubmitButton } from "../../components/forms/submit-button"
import { TextInput } from "../../components/forms/text-input"
import { HISTORY, SEND_CHAT_MESSAGE } from "../../graphql-documents/messages"
import { useEffect, useRef, useState } from "react"
import { useQuery, useMutation, useSubscription } from "@apollo/client"
import { useRouter } from "next/dist/client/router"
import { ON_NEW_CHAT_MESSAGE } from "../../graphql-documents/messages"
import { CircularProgress, Grid, List, ListItem, ListItemText, Paper } from "@mui/material"
import { useUser } from "../../contexts/user"
import { Fab } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { useOnScreen } from "../../hooks/use-on-screen"
import { useIsMounted } from "../../hooks/use-is-mounted"

const ChatDetail = ({ props }) => {
    const router = useRouter()
    const { id } = router.query
    const { user } = useUser()
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const { data, loading, error, refetch, client} = useQuery(HISTORY, { variables: { chatRoom: id, filters: {page, pageSize} } })
    const [sendMessage] = useMutation(SEND_CHAT_MESSAGE)
    const [messages, setMessages] = useState([])
    const [count, setCount] = useState(0)
    const [hasMore, setHasMore] = useState(false)
    const chatRef = useRef()
    const chatTopRef = useRef()
    const chatTopIsVisible = useOnScreen(chatTopRef)
    const isMounted = useIsMounted()

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollIntoView({behavior: "smooth"})
        }
    }, [messages])

    const { data: newData } = useSubscription(ON_NEW_CHAT_MESSAGE, {
        variables: { chatRoom: id },
    })

    useEffect(() => {
        if (data?.history) {
            setMessages(curr => [...curr, ...data?.history.items])
            setHasMore(data?.history.hasMore)
            setCount(data?.history.count)
        }
    }, [data, setMessages])

    useEffect(() => {
        if (newData?.onNewChatMessage) {
            setMessages(curr => [...curr, newData.onNewChatMessage.message])
        }
    }, [newData, setMessages])

    useEffect(() => {
        const loadMore = async () => {
            if (client && HISTORY) {
                const {data} = await client.query({query: HISTORY, variables: {
                    chatRoom: id, filters: {page: page + 1, pageSize},
                }})
                console.log('load more', data)
                if (data) {
                    setMessages(curr => [...data?.history.items, ...curr])
            chatRef.current.scrollIntoView()

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
    }, [chatTopIsVisible])

    return (
        <Grid container xs={12} spacing={2}>
            {hasMore}
            {count}
            <Grid item xs={12}>
                <List style={{ maxHeight: '80vh', height: '80vh', overflowY: 'auto' }}>
                    <ListItem style={{ float: "left", clear: "both" }} ref={chatTopRef}></ListItem>
                    {loading && <CircularProgress />}
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
                    <ListItem style={{ float: "left", clear: "both" }} ref={chatRef}></ListItem>
                </List>
            </Grid>
            <Grid item xs={12}>
                <Formik
                    initialValues={{ chatRoom: id, message: '' }}
                    onSubmit={async (values, actions) => {
                        actions.setSubmitting(true)
                        const { data } = await sendMessage({ variables: values })
                        console.log('enviado')
                        actions.resetForm()
                        actions.setSubmitting(false)
                    }}
                    validate={values => {
                        let errors = {}
                        if (values.message.split('').length < 4) errors.message = 'Mayor a 3 caracteres'
                        return errors
                    }}
                >
                    {props => {
                        return (
                            <Form alignItems='flex-end'>
                                <TextInput name='message' gridProps={{ xs: 11 }} fullWidth />
                                <Grid xs={1} align='right'>
                                    {props.isSubmitting
                                        ? <CircularProgress />
                                        : <Fab color="primary" aria-label="add" onClick={props.submitForm}><SendIcon /></Fab>
                                    }
                                </Grid>
                            </Form>
                        )
                    }}
                </Formik>
            </Grid>
        </Grid>
    )
}


export default ChatDetail