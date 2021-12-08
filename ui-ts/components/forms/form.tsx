import { Grid, GridProps, GridSpacing } from '@mui/material';
import { Form as FormikForm, FormikFormProps } from 'formik';
import { FC } from 'react';

interface Props {
    autoComplete?: 'off'
    spacing?: number
}

export const Form: FC<Props> = ({ children, autoComplete = 'off', spacing = 4 }) => {
    return (
        <FormikForm autoComplete={autoComplete}>
            <Grid container={true} spacing={spacing}>
                {children}
            </Grid>
        </FormikForm>
    );
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