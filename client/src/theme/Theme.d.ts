import { LightColors } from "./light/LightColors";

export enum Theme {
    LIGHT = "LIGHT",
    DARK = "DARK",
    SYSTEM = "SYSTEM",
}

declare module "@mui/material/styles" {
    interface Theme {
        colors: {
            [key in keyof typeof LightColors]: (typeof LightColors)[key];
        };
        name: CreatopyTheme;
    }
    interface ThemeOptions {
        colors?: Theme["colors"];
        name: Theme["name"];
    }
}
