import React from "react";

import InputNumber from "../InputNumber";

const InputIdentityDocument = (props) => (
    <InputNumber prefix="V - " decimalScale={0} {...props} />
);

export default InputIdentityDocument;
