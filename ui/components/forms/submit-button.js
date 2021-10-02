import { Button } from "@mui/material"
import { useFormikContext } from "formik"

export const SubmitButton = ({...props}) => {
    const {isSubmitting} = useFormikContext()

    return <Button variant='outlined' color='primary' type='submit' {...props}>{isSubmitting ? 'Submitting...' : 'Submit'}</Button> 
}

