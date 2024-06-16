import clsx from "clsx";
import React from "react";

import "./style.css";

const nodes = {
    h1: (props) => <h1 {...props} />,
    h2: (props) => <h2 {...props} />,
    h3: (props) => <h3 {...props} />,
    h4: (props) => <h4 {...props} />,
    h5: (props) => <h5 {...props} />,
    p: (props) => <p {...props} />,
    span: (props) => <span {...props} />,
};

const variantComponent = {
    title1: "h1",
    title2: "h2",
    title3: "h3",
    title4: "h4",
    title5: "h5",
    subtitle: "p",
    body1: "p",
    body2: "span",
};

const Typography = ({ variant, component, children, className, ...props }) => {
    const Component =
        (component && nodes[component]) ||
        nodes[variantComponent[variant]] ||
        nodes.p;

    className = clsx({
        [className]: Boolean(className),
        "typography": true,
        "typography-title1": variant === "title1",
        "typography-title2": variant === "title2",
        "typography-title3": variant === "title3",
        "typography-title4": variant === "title4",
        "typography-title5": variant === "title5",
        "typography-subtitle": variant === "subtitle",
        "typography-body1": variant === "body1",
        "typography-body2": variant === "body2",
    })


    

    return <Component className = {className} {...props}>{children}</Component>;
};



export default Typography;