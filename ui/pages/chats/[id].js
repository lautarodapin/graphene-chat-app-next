import { Formik } from "formik"
import { Form } from "../../components/forms/form"
import { SubmitButton } from "../../components/forms/submit-button"
import { TextInput } from "../../components/forms/text-input"
import { HISTORY, SEND_CHAT_MESSAGE } from "../../graphql-documents/messages"

const { useQuery, useMutation } = require("@apollo/client")
const { useRouter } = require("next/dist/client/router")
const { CHAT } = require("../../graphql-documents/chats")

const ChatDetail = ({props}) => {
    const router = useRouter()
    const {id} = router.query
    const {data, loading, error} = useQuery(HISTORY, {variables: {chatRoom: id}})
    const [sendMessage] = useMutation(SEND_CHAT_MESSAGE)


    return (
        <>
            {data?.history.map(message => (
                <p>
                    {message.user.username}
                    <small>{message.createdAt}</small>: 
                    {message.message}
                </p>
            ))}
            <Formik
            initialValues={{chatRoom: id, message: ''}}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true)
                console.log(values)
                const {response} = await sendMessage({variables: values})
                if (data.ok) {
                    console.log('enviado')
                }
                actions.setSubmitting(false)
            }}
            validate={values => {
                let errors = {}
                if (values.message.split('').length < 4) errors.message = 'Mayor a 3 caracteres'
                return errors
            }}
            >
                {props => {
                    console.log(props.values)
                    return (

                <Form>
                    <TextInput name='message' />
                    <SubmitButton />
                </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default ChatDetail