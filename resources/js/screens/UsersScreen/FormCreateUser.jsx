import React from "react";
import * as yup from "yup";

import FormUser from "./FormUser";
import usePostAPI from "../../hooks/usePostAPI";

const schema = yup.object().shape({
    username: yup
        .string()
        .min(6, "El usuario debe tener al menos 6 caracteres")
        .required("El nombre de usuario es obligatorio"),
    password: yup
        .string()
        .min(8, "la contraseña debe tener al menos 8 caracteres")
        .required("La contraseña es obligatoria"),
});
function FormCreateUser({ onSave, onClose, ...props }) {
    const { request, loading, status, error } = usePostAPI({
        url: "/users",
    });

    const onSubmit = async function (values) {
        const res = await request(values);
        if (!res) {
            return;
        }

        onClose();

        if (onSave) {
            onSave(res);
        }
    };
    return (
        <FormUser
            schema={schema}
            onClose={onClose}
            onSubmit={onSubmit}
            disabled={loading}
            errors={status === 422 && error && error.errors}
        />
    );
}

export default FormCreateUser;
