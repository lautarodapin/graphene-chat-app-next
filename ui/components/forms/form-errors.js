import { FormControl, FormHelperText } from '@mui/material'
import { useFormikContext } from 'formik'
export const FormErrors = ({ ...props }) => {

    const { errors } = useFormikContext()

    return (
        <FormControl>
            {errors && errors.__all__ && errors.__all__.map(error => (
                <FormHelperText>
                    {error}
                </FormHelperText>
            ))}
        </FormControl>
    )
}