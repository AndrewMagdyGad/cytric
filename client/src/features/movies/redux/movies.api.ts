import { api } from "../../../redux/api";
import { ListMoivesRespones, Movie, Pagination } from "../types";

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        listMovies: build.query<ListMoivesRespones, Pagination>({
            query: (params) => ({
                method: "GET",
                url: "/movies",
                params,
            }),
        }),
        create: build.mutation<Movie, FormData>({
            query: (body) => ({
                url: "/movies",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useListMoviesQuery, useCreateMutation, useLazyListMoviesQuery } =
    authApi;
