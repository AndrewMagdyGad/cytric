import { Theme } from "./ThemeProvider";

export const isSystemDark = window?.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)")?.matches
    : undefined;

export function clearTheme() {
    window.localStorage && localStorage.removeItem("selectedTheme");
}

export function saveTheme(theme: Theme) {
    window.localStorage && localStorage.setItem("selectedTheme", theme);
}

export function getThemeFromStorage(): Theme {
    return window.localStorage
        ? (localStorage.getItem("selectedTheme") as Theme) || Theme.SYSTEM
        : Theme.SYSTEM;
}
