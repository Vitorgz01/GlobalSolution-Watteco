"use client";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthContext";
import Link from "next/link";

export default function Login() {
  const { register, handleSubmit } = useForm();

  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data: any) {
    console.log(signIn);
    await signIn(data);
  }

  return (
    <>
      <div className="flex h-[100vh] min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
            <button className="text-green-700 flex items-center mb-4">
              <FiArrowLeft className="mr-2" />
              <Link href={"/"}>Voltar</Link>
            </button>
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <p className="text-gray-500 mb-6 text-center">
              Preencha seus dados de acesso para continuar.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
              <input
                {...register("email")}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
                autoComplete="email"
                className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                {...register("password")}
                id="password"
                name="password"
                type="password"
                placeholder="Senha"
                required
                className="w-full p-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center p-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none"
              >
                Cadastrar
                <FiArrowRight className="ml-2" />
              </button>
            </form>

            <p className="text-center text-gray-500 mt-6">
              Não tem conta?{" "}
              <Link href={"/register"}>
                <span className="text-green-700">Cadastre-se aqui!</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
