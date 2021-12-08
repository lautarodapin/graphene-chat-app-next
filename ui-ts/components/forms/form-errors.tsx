import { FormControl, FormHelperText, Grid } from '@mui/material'
import { useFormikContext } from 'formik'
export const FormErrors = ({ ...props }) => {

    const { errors } = useFormikContext()
    console.log(errors)
    if (!errors) return null
    return (
        <Grid item xs={12}>
            <FormControl>
                {/* {errors.__all__ && <FormHelperText error={true}>{errors.__all__}</FormHelperText>} */}
                {/* {errors && errors.__all__ && errors.__all__.map(error => (
                    <FormHelperText>
                        {error}
                    </FormHelperText>
                ))} */}
            </FormControl>
        </Grid>
    )
}