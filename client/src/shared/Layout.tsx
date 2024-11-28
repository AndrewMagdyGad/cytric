import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { styled } from "styled-components";
import DarkColors from "../theme/dark/DarkColors";

function Layout() {
    return (
        <LayoutContainer>
            <Outlet />
        </LayoutContainer>
    );
}

export default Layout;

const LayoutContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: ${DarkColors.BACKGROUND_COLOR};
    background-image: url("./footer.svg");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: bottom;
`;
