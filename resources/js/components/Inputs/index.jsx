import clsx from "clsx";
import React from "react";

import "./style.css";

const Inputs = ({  size, children, className, variant, ...props  }) => {
    className  = clsx({
        [className]: Boolean(className),
        "input": true,
        "input-primary": variant === "primary",
        "input-error": variant === "error",
        "input-error2": variant === "error2",
        "input-green": variant === "green"

    });
    
    return (

        <input type="text" className = {className} {...props} />
    );

}

export default Inputs;
