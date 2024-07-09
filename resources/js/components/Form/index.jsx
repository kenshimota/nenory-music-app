import PropTypes from "prop-types";
import React, { useContext, createContext } from "react";

import { useFormik } from "formik";

const FormContext = createContext(null);

export const useForm = () => useContext(FormContext);

const FormProvider = ({
    children,
    values,
    schema,
    disabled,
    onSubmit,
    ...props
}) => {
    const formi = useFormik({
        validationSchema: schema,
        initialValues: values || {},
        onSubmit,
    });

    return (
        <FormContext.Provider value={{ ...formi, disabled }}>
            <form onSubmit={formi.handleSubmit} {...props}>
                {children}
            </form>
        </FormContext.Provider>
    );
};

FormProvider.propTypes = {
    initialValues: PropTypes.object,
    schema: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
};

const Form = (props) => <FormProvider {...props} />;

export default Form;
