import React from "react";

import InputNumber from "../InputNumber";

const InputSupplierIdentity = (props) => (
    <InputNumber
        prefix="J - "
        decimalScale={0}
        thousandSeparator=""
        {...props}
    />
);

export default InputSupplierIdentity;
