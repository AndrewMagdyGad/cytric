import { noop } from "lodash";
import React from "react";

const ThemeModeContext = React.createContext({
    setThemeMode: noop,
});

export default ThemeModeContext;
