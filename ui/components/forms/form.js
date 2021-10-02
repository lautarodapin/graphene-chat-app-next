import {Grid, GridProps, GridSpacing} from '@mui/material';
import {Form as FormikForm, FormikFormProps} from 'formik';
import {FC} from 'react';

export const Form = ({children, autoComplete, spacing = 4}) => {
    return (
        <FormikForm autoComplete={autoComplete}>
            <Grid container={true} spacing={spacing}>
                {children}
            </Grid>
        </FormikForm>
    );
};

Form.defaultProps = {
    autoComplete: 'off',
};

// Form components must wrap themselves inside a grid item
// with these default props, and allow the user to override
// them with the optional gridProps prop.
// If gridProps is null then the component should not wrap
// itself with a grid item.

export const defaultGridProps = {
    xs: 12,
    sm: 6,
};