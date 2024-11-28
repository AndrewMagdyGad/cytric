export type User = {
    _id: string;
    name: string;
    email: string;
    password: string;
};

export type LoginResponse = {
    token: string;
    user: User;
};

export type LoginBody = { email: string; password: string };

export type SignupBody = { name: string; email: string; password: string };

export type SignupResponse = { user: User };
