import clsx from "clsx";
import React from "react";

import "./style.css";

const Button = ({  size, children, className, variant, ...props  }) =>  {
    className  = clsx({
        [className]: Boolean(className),
        "btn": true,
        "btn-large": size ===  "large",
        "btn-small": size === "small",
        "btn-medium": !size || size === "medium",
        "btn-primary": !variant || variant === "primary",
        "btn-outlined": variant === "outlined",
        "btn-dark": variant === "dark",
    });
    
    return (
        <button type="button" className = {className} {...props}>
           <span>{children}</span>
        </button>
    );

}

export default Button;
