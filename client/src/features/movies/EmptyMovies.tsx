import { Typography } from "@mui/material";
import styled from "styled-components";
import SharedButton from "../../shared/component/SharedButton";
import { useNavigate } from "react-router-dom";
import { Spacing } from "../../shared/constants/Spacing";

function EmptyMovies() {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Typography variant="h1">Your movie list is empty</Typography>
            <SharedButton
                variant="contained"
                onClick={() => navigate("/movies/create")}
            >
                Add a new movie
            </SharedButton>
        </Wrapper>
    );
}

export default EmptyMovies;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    gap: ${Spacing.P24};
`;
