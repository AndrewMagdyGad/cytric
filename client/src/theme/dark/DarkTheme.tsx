import { createTheme } from "@mui/material";
import { Theme } from "../Theme.d";
import DarkColors from "./DarkColors";
import Typography from "../Typography";

export const DarkTheme = createTheme({
    name: Theme.DARK,
    colors: {
        ...DarkColors,
    },
    typography: {
        ...Typography,
    },
    components: {}, //TO DO: add customized re-usable components here
});

export default DarkTheme;
