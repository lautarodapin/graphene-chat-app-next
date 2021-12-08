import { Grid, TextField, TextFieldProps, GridProps } from '@mui/material';
import { FastField, FastFieldProps } from 'formik';
import React, { FC } from 'react';

import { defaultGridProps } from './form';

type Props = {
    gridProps?: GridProps;
} & Pick<TextFieldProps, 'name' | 'disabled' | 'inputMode' | 'fullWidth' | 'label' | 'type'>

export const TextInput: FC<Props> = ({
    name,
    disabled,
    inputMode,
    gridProps,
    ...otherProps
}) => {

    const component = (
        <FastField name={name}>
            {({ field, form, meta }: FastFieldProps) => (
                <TextField
                    variant='outlined'
                    fullWidth={true}
                    disabled={form.isSubmitting || disabled}
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                    inputProps={{ inputMode }}
                    {...field}
                    {...otherProps}
                />
            )}
        </FastField>
    );

    if (!gridProps) return component;

    return (
        <Grid item={true} {...gridProps}>
            {component}
        </Grid>
    );
};

TextInput.defaultProps = {
    gridProps: defaultGridProps,
};