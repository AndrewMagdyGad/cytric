import "./Theme.d";

import { ThemeProvider } from "@mui/material";
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";
import { useMemo, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import DarkTheme from "./dark/DarkTheme";
import { Theme } from "./Theme.d";
import ThemeModeContext from "./ThemeModeContext";
import { isSystemDark, saveTheme } from "./helpers";

type DefaultThemeproviderProps = Omit<ThemeProviderProps, "theme"> & {
    activeTheme?: Theme;
};

const getTheme = (activeTheme?: Theme) => {
    switch (activeTheme) {
        case Theme.LIGHT:
        case Theme.DARK:
            return DarkTheme;
        case Theme.SYSTEM:
        default:
            return isSystemDark ? DarkTheme : DarkTheme; // TO DO: add LightTheme
    }
};

export { Theme };

export function MuiThemeProvider({
    activeTheme,
    ...props
}: DefaultThemeproviderProps) {
    const [themeMode, setThemeMode] = useState(activeTheme || Theme.SYSTEM);

    const themeModeContextProvider = useMemo(
        () => ({
            setThemeMode: (mode: Theme) => {
                saveTheme(mode);
                setThemeMode(mode);
            },
        }),
        []
    );

    const currentTheme = getTheme(themeMode);

    return (
        <ThemeModeContext.Provider value={themeModeContextProvider}>
            <ThemeProvider {...props} theme={currentTheme}>
                <StyledThemeProvider theme={currentTheme}>
                    {props.children}
                </StyledThemeProvider>
            </ThemeProvider>
        </ThemeModeContext.Provider>
    );
}

export default MuiThemeProvider;
