import React from 'react';
import { getIn } from 'formik';
import TextField from '@material-ui/core/TextField';
import {DateFormatInput, TimeFormatInput} from 'material-ui-next-pickers'

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

const wrapPickersToFormik = (args, AntComponent) => {
    const { field, form, ...props } = args;
    return (
        <AntComponent
            {...field}
            {...props}
            error={getMessage(form, field)}
        />
    );
};

const ComponentInput = args => wrapComponentToFormik(args, TextField);
const ComponentDatePicker = args => wrapPickersToFormik(args, DateFormatInput);
const ComponentTimePicker = args => wrapPickersToFormik(args, TimeFormatInput);

export { ComponentInput, ComponentDatePicker, ComponentTimePicker };