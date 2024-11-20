"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { wattecoApi } from "@/services/wattecoApi";
import {
  recoverUserInformation,
  signInRequest,
} from "@/services/wattecoServices";

type WattecoUser = {
  name: string;
  email: string;
};

type WattecoAuthContextType = {
  isAuthenticated: boolean;
  user: WattecoUser | null;
  signIn: (data: WattecoSignIn) => Promise<void>;
};

type WattecoSignIn = {
  email: string;
  password: string;
};

export const WattecoAuthContext = createContext({} as WattecoAuthContextType);

export function WattecoAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<WattecoUser | null>(null);
  const router = useRouter();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "watteco.token": token } = parseCookies();

    if (token) {
      recoverUserInformation().then((response) => setUser(response.user));
    }
  }, []);

  async function signIn({ email, password }: WattecoSignIn) {
    const { token, user } = await signInRequest({
      email,
      password,
    });

    setCookie(undefined, "watteco.token", token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    wattecoApi.defaults.headers["Authorization"] = `Bearer ${token}`;

    setUser(user);

    router.push("/dashboard");
  }

  return (
    <WattecoAuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </WattecoAuthContext.Provider>
  );
}
