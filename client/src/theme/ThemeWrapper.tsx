import React from "react";
import { MuiThemeProvider, Theme } from "./ThemeProvider";
import { getThemeFromStorage } from "./helpers";

const ThemeWrapper = ({
    activeTheme,
    children,
}: {
    activeTheme?: Theme;
    children: React.ReactNode;
}) => {
    const currentTheme = activeTheme || getThemeFromStorage();
    return (
        <MuiThemeProvider activeTheme={currentTheme}>
            {children}
        </MuiThemeProvider>
    );
};

export default ThemeWrapper;
