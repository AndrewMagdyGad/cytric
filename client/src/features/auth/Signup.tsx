/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container, Box, Typography, CssBaseline, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useSignupMutation } from "../auth/redux/auth.api";
import { selectCurrentUser, userIsLoading } from "../auth/redux/auth.slice";
import { useAppSelector } from "../../redux/store";
import styled from "styled-components";
import SharedInput from "../../shared/component/SharedInput";
import SharedButton from "../../shared/component/SharedButton";
import { Spacing } from "../../shared/constants/Spacing";
import { signupSchema } from "./utils";
import { useSnackbar } from "notistack";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signup, { isError, isSuccess }] = useSignupMutation();
    const user = useAppSelector(selectCurrentUser);
    const isLoading = useAppSelector(userIsLoading);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleSignup = async () => {
        try {
            signupSchema.parse({ name, email, password });
            await signup({ name, email, password });
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
                message: "Signup successful!",
                variant: "success",
            });
            navigate("/login");
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
                <SignupForm>
                    <Typography variant="h1" mb={Spacing.P24}>
                        Sign up
                    </Typography>
                    <SignupContent>
                        <SharedInput
                            margin="normal"
                            fullWidth
                            id="name"
                            label="name"
                            name="name"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

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
                            onClick={handleSignup}
                        >
                            Signup
                        </SharedButton>

                        <SharedButton
                            fullWidth
                            variant="outlined"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </SharedButton>
                    </SignupContent>
                </SignupForm>
            )}
        </Container>
    );
}

export default Signup;

const SignupForm = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${Spacing.P8};
    width: 100%;
    max-width: 300px;
`;

const SignupContent = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${Spacing.P12};
    width: 100%;
    height: 100%;
`;
