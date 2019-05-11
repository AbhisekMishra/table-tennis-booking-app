import React from 'react';
import { getIn } from 'formik';
import TextField from '@material-ui/core/TextField';

const hasError = (form, field) =>
    form.touched[field.name] || getIn(form.touched, field.name)
        ? form.errors[field.name] || getIn(form.errors, field.name)
            ? true
            : false
        : false;

const getMessage = (form, field) =>
    (form.touched[field.name] || getIn(form.touched, field.name)) &&
    (form.errors[field.name] || getIn(form.errors, field.name));

const wrapComponentToFormik = (args, AntComponent) => {
    const { field, form, ...props } = args;
    return (
        <AntComponent
            {...field}
            {...props}
            error={hasError(form, field)}
            helperText={getMessage(form, field)}
        />
    );
};

const ComponentInput = args => wrapComponentToFormik(args, TextField);

export { ComponentInput };