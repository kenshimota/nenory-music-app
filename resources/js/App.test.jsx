import React from "react";
import renderer from "react-test-renderer";

import App from "./App";

test("checking that app can render without problems", () => {
    renderer.create(<App />);
});
