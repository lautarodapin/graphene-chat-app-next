import {Grid, InputBaseProps, TextField, TextFieldProps} from '@mui/material';
import {FastField, FieldProps} from 'formik';
import React, {FC, useMemo} from 'react';

import {defaultGridProps, FormChild} from './form';


export const TextInput = ({
    name,
    disabled,
    inputMode,
    startAdornment,
    endAdornment,
    gridProps,
    ...otherProps
}) => {
    const InputProps = 'input'
    if (startAdornment) InputProps.startAdornment = startAdornment;
    if (endAdornment) InputProps.endAdornment = endAdornment;

    const component = (
        <FastField name={name}>
            {({field, form, meta}) => (
                <TextField
                    variant='outlined'
                    fullWidth={true}
                    disabled={form.isSubmitting || disabled}
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                    inputProps={{inputMode}}
                    InputProps={InputProps}
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