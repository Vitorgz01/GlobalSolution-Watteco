"use client";

import { recoverUserInformation, signInRequest } from "@/services/auth";
import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';
import { api } from "@/services/api";

type User = {
    name: string;
    email: string;
}

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    signIn: (data: SignInData) => Promise<void>;
}

type SignInData = {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'challenge.token': token } = parseCookies();

        if (token) {
            recoverUserInformation().then(response => setUser(response.user))
        }
    }, [router])

    async function signIn({ email, password }: SignInData) {
        const { token, user } = await signInRequest({
            email,
            password
        });

        setCookie(undefined, 'challenge.token', token, {
            maxAge: 60 * 60 * 1, // dura 1 hora o cookie
        });

        api.defaults.headers['Authorization'] = `Bearer ${token}`;

        setUser(user);

        router.push('/dashboard');
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}
