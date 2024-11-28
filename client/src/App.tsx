import React from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Layout from "./shared/Layout";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import { PrivateRoute } from "./shared/PrivateRoute";
import Movies from "./features/movies";
import AddMovie from "./features/movies/AddMovie";

function App() {
    return (
        <>
            <CssBaseline />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<Signup />} />
                    <Route
                        path="/movies"
                        element={<PrivateRoute component={Movies} />}
                    />
                    <Route
                        path="/movies/create"
                        element={<PrivateRoute component={AddMovie} />}
                    />
                </Route>
            </Routes>
        </>
    );
}

export default App;
