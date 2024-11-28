/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container, Box, Typography, CssBaseline, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useLoginMutation } from "../auth/redux/auth.api";
import { selectCurrentUser, userIsLoading } from "../auth/redux/auth.slice";
import { useAppSelector } from "../../redux/store";
import styled from "styled-components";
import SharedInput from "../../shared/component/SharedInput";
import SharedButton from "../../shared/component/SharedButton";
import { Spacing } from "../../shared/constants/Spacing";
import { useSnackbar } from "notistack";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, { isError, isSuccess }] = useLoginMutation();
    const user = useAppSelector(selectCurrentUser);
    const isLoading = useAppSelector(userIsLoading);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (user) {
            navigate("/movies");
            return;
        }
    }, [user, navigate]);

    const handleLogin = async () => {
        try {
            if (email.length > 0 && password.length > 0) {
                await login({ email, password });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isError) {
            enqueueSnackbar({
                message: "Something went wrong!",
                variant: "error",
            });
        }
        if (isSuccess) {
            enqueueSnackbar({
                message: "Logged in successful!",
                variant: "success",
            });
            navigate("/movies");
        }
    }, [isError, isSuccess, enqueueSnackbar, navigate]);

    if (isLoading) {
        return (
            <>
                <CssBaseline />
                <div>Loading...</div>;
            </>
        );
    }

    return (
        <Container maxWidth="xs">
            <CssBaseline />
            {user ? (
                <Navigate to="/movies" />
            ) : (
                <LoginForm>
                    <Typography variant="h1" mb={Spacing.P24}>
                        Sign in
                    </Typography>
                    <LoginContent>
                        <SharedInput
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <SharedInput
                            margin="normal"
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <SharedButton
                            fullWidth
                            variant="contained"
                            onClick={handleLogin}
                        >
                            Login
                        </SharedButton>

                        <SharedButton
                            fullWidth
                            variant="outlined"
                            onClick={() => navigate("/sign-up")}
                        >
                            Signup
                        </SharedButton>
                    </LoginContent>
                </LoginForm>
            )}
        </Container>
    );
}

export default Login;

const LoginForm = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${Spacing.P8};
    width: 100%;
    max-width: 300px;
`;

const LoginContent = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${Spacing.P12};
    width: 100%;
    height: 100%;
`;
