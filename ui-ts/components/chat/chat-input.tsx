import { CircularProgress, Fab, Grid } from '@mui/material'
import { Formik, FormikErrors } from 'formik'
import { TextInput } from '../forms/text-input'
import SendIcon from '@mui/icons-material/Send';
import { Form } from '../forms/form'
import { useSendChatMessageMutation, SendChatMessageInput } from '../../generated/graphql'
import { useRouter } from 'next/router';

type FormValues = SendChatMessageInput

export const ChatInput = () => {
    const router = useRouter()
    const chatRoomId = router.query.id as string
    const [sendMessage] = useSendChatMessageMutation()
    const defaultInitial: FormValues = {
        chat: chatRoomId,
        message: '',
    }

    return (
        <Formik
            initialValues={{ ...defaultInitial }}
            validateOnChange={false}
            validateOnMount={false}
            validateOnBlur={false}
            onSubmit={async (values, actions) => {
                actions.setSubmitting(true)
                await sendMessage({ variables: { input: values } })
                console.log('enviado')
                actions.resetForm()
                actions.setSubmitting(false)
            }}
            validate={values => {
                let errors: FormikErrors<FormValues> = {}
                if (values.message.split('').length < 4) errors.message = 'Mayor a 3 caracteres'
                return errors
            }}
        >
            {({ submitForm, isSubmitting }) => {
                return (
                    <Form>
                        <Grid item={true} xs={12}>
                            <Grid container={true} spacing={2} alignItems='flex-end'>
                                <TextInput name='message' gridProps={{ xs: 11 }} fullWidth={true} />
                                <Grid item={true} xs={1}>
                                    {isSubmitting
                                        ? <CircularProgress />
                                        : <Fab color="primary" aria-label="add" onClick={submitForm}><SendIcon /></Fab>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                )
            }}
        </Formik>
    )
}