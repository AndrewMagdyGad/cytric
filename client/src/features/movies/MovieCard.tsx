import styled from "styled-components";
import DarkColors from "../../theme/dark/DarkColors";
import { Spacing } from "../../shared/constants/Spacing";
import { Movie } from "./types";
import { Typography } from "@mui/material";

function MovieCard({ movie }: { movie: Movie }) {
    return (
        <Wrapper>
            <Image src={movie.poster} />
            <Typography variant="body2">{movie.title}</Typography>
            <Typography variant="body1">{movie.published_year}</Typography>
        </Wrapper>
    );
}

export default MovieCard;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    max-width: 282px;
    max-height: 504px;
    background-color: ${DarkColors.CARD_COLOR};
    border-radius: ${Spacing.P12};
    display: flex;
    flex-direction: column;
    gap: ${Spacing.P16};
    padding: ${Spacing.P12};
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    min-height: 400px;
    flex-grow: 1;
    border-radius: ${Spacing.P12};
`;
