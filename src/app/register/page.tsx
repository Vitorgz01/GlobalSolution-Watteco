"use client";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { wattecoRegisterUser } from "@/services/wattecoApi";
import { WattecoRegisterResponse } from "@/services/wattecoApi";

export default function WattecoRegister() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  async function handleWattecoRegister(data: any) {
    try {
      const response: WattecoRegisterResponse = await wattecoRegisterUser(data);
      console.log(response.message);
      router.push("/login");
    } catch (error) {
      console.error("Erro ao cadastrar na Watteco:", error);
    }
  }

  return (
    <div className="flex h-screen flex-col justify-center items-center bg-gray-50 px-6 lg:px-8">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <button className="text-gray-600 hover:text-green-600 flex items-center mb-6">
          <FiArrowLeft className="mr-2" />
          <Link href={"/"} className="hover:underline">
            Voltar
          </Link>
        </button>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">
          Crie sua conta Watteco
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Preencha seus dados para começar a economizar energia.
        </p>

        <form
          className="space-y-6"
          onSubmit={handleSubmit(handleWattecoRegister)}
        >
          <input
            {...register("name")}
            id="name"
            name="name"
            type="text"
            placeholder="Nome"
            required
            autoComplete="name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            {...register("email")}
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            autoComplete="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            {...register("password")}
            id="password"
            name="password"
            type="password"
            placeholder="Senha"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Cadastrar-se na Watteco
            <FiArrowRight className="ml-2" />
          </button>
        </form>

        <p className="text-center text-gray-600 mt-8">
          Já tem uma conta Watteco?{" "}
          <Link href={"/login"} className="text-green-600 hover:underline">
            Faça Login
          </Link>
        </p>
      </div>
    </div>
  );
}
