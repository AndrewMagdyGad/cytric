import { api } from "../../../redux/api";
import { LoginBody, LoginResponse, SignupBody, SignupResponse } from "../types";

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<LoginResponse, LoginBody>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
        }),
        signup: build.mutation<SignupResponse, SignupBody>({
            query: (body) => ({
                url: "/users",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
