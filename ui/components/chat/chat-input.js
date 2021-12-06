import { CircularProgress, Fab, Grid } from '@mui/material'
import {Formik} from 'formik'
import { TextInput } from '../forms/text-input'
import SendIcon from "@mui/icons-material/Send"
import { SEND_CHAT_MESSAGE_MUTATION } from '@graphql-documents/messages';
import { useMutation } from '@apollo/client'
import { Form } from '../forms/form'

export const ChatInput = ({chatRoomId, ...props }) => {
    const [sendMessage] = useMutation(SEND_CHAT_MESSAGE_MUTATION)

    return (
        <Formik
            initialValues={{ chatRoom: chatRoomId, message: '' }}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true)
                await sendMessage({ variables: values })
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
    )
}