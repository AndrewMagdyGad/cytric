export type Pagination = {
    per_page?: number;
    page?: number;
};

export type Movie = {
    _id: string;
    title: string;
    published_year: number | null;
    poster: string;
};

export type ListMoivesRespones = {
    movies: Movie[];
    page: number;
    per_page: number;
    noOfPages: number;
};

export type FormData = {
    title: string;
    published_year: number;
    file: string;
};
