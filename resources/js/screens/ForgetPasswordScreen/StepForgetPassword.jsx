import React, { useState } from "react";
import { Link as NodeLink } from "react-router-dom";

import Step from "@mui/material/Step";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import styled from "@mui/material/styles/styled";

import { EmailOutlined, LockOpen, Password } from "@mui/icons-material";

import FormIntoCode from "./FormIntoCode";
import FormIntoEmail from "./FormIntoEmail";
import { useAuth } from "../../components/Auth";
import FormResetPassword from "./FormResetPassword";

const steps = [
    { icon: EmailOutlined, text: "Obtener Correo Electronico" },
    { icon: LockOpen, text: "Ingresar Codigo de Verificación" },
    { icon: Password, text: "Cambiar Contraseña" },
];

const GridContent = styled(Grid)(({}) => ({
    height: "calc(100% - 120px)",
    width: "100%",
    position: "relative",
}));

const StepForgetPassword = () => {
    const { setToken } = useAuth();
    const [email, setEmail] = useState("");
    const [value, setValue] = useState(0);

    const onSave = ({ access_token, expires_at, token_type }) =>
        setToken({
            type: token_type,
            token: access_token,
            expirateAt: new Date(expires_at),
        });

    return (
        <React.Fragment>
            <Stepper activeStep={value} alternativeLabel>
                {steps.map(({ text: label }, key) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <GridContent container>
                <Collapse in={value === 0} unmountOnExit>
                    <FormIntoEmail
                        onSave={({ email }) => {
                            setEmail(email);
                            setValue(1);
                        }}
                    />
                </Collapse>
                <Collapse in={value === 1} unmountOnExit>
                    <FormIntoCode
                        email={email}
                        onClose={() => setValue(0)}
                        onSave={() => setValue(2)}
                    />
                </Collapse>
                <Collapse in={value === 2} unmountOnExit>
                    <FormResetPassword
                        email={email}
                        onClose={() => setValue(0)}
                        onSave={onSave}
                    />
                </Collapse>
            </GridContent>

            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="body2" align="right">
                        ¿No tienes una cuenta?{" "}
                        <Link component={NodeLink} to="/signup">
                            Regístrate ahora
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default StepForgetPassword;
