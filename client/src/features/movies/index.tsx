import { IconButton, Pagination, Stack, Typography } from "@mui/material";
import EmptyMovies from "./EmptyMovies";
import MovieCard from "./MovieCard";
import { useLazyListMoviesQuery } from "./redux/movies.api";
import styled from "styled-components";
import { Spacing } from "../../shared/constants/Spacing";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import SharedButton from "../../shared/component/SharedButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch } from "../../redux/store";
import { logout } from "../auth/redux/auth.slice";
import { useEffect, useState } from "react";

function Movies() {
    const [page, setPage] = useState(1);
    const [listMovies, { data }] = useLazyListMoviesQuery();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        listMovies({ page, per_page: 1 });
    }, [page, listMovies]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    if (!data || data.movies.length === 0) return <EmptyMovies />;
    return (
        <Wrapper>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h2">
                    My movies
                    <IconButton onClick={() => navigate("/movies/create")}>
                        <AddIcon />
                    </IconButton>
                </Typography>
                <SharedButton
                    variant="text"
                    endIcon={<LogoutIcon />}
                    onClick={handleLogout}
                >
                    Logout
                </SharedButton>
            </Stack>
            <Stack direction="row" gap={Spacing.P20}>
                {data.movies.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                ))}
            </Stack>
            <Pagination
                sx={{ margin: "auto" }}
                count={data.noOfPages}
                variant="outlined"
                color="standard"
                page={data.page}
                onChange={(_, page) => setPage(page)}
            />
        </Wrapper>
    );
}

export default Movies;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 52px;
`;
