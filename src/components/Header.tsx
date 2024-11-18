"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import logo from "@/image/foto_curriculo-removebg-preview.png";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 to-green-800 text-white shadow-lg w-full py-4 px-6 lg:px-10">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="Logo Watteco"
            className="h-20 w-auto filter  "
            width={200}
            height={48}
          />
        </div>
        <div className="hidden lg:flex space-x-8 items-center">
          <Link
            href={"/"}
            className="text-white hover:text-green-300 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href={"/educacional"}
            className="text-white hover:text-green-300 transition-colors duration-200"
          >
            Educacional
          </Link>
          <Link
            href={"/calculadora"}
            className="text-white hover:text-green-300 transition-colors duration-200"
          >
            Calculadora
          </Link>
          <Link
            href={"/membros"}
            className="text-white hover:text-green-300 transition-colors duration-200"
          >
            Participantes
          </Link>
          <Button
            asChild
            variant="outline"
            className="bg-transparent text-white border-white hover:bg-white hover:text-blue-900 transition-colors duration-300"
          >
            <Link href={"/login"}>Login</Link>
          </Button>
        </div>
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="text-white hover:bg-blue-800"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 pb-4">
          <nav className="flex flex-col space-y-4">
            <Link
              href={"/"}
              className="text-white hover:text-green-300 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href={"/diagnostico"}
              className="text-white hover:text-green-300 transition-colors duration-200"
            >
              Diagnóstico
            </Link>
            <Link
              href={"../app/membros"}
              className="text-white hover:text-green-300 transition-colors duration-200"
            >
              Participantes
            </Link>
            <Button
              asChild
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white hover:text-blue-900 transition-colors duration-300"
            >
              <Link href={"/login"}>Área do Cliente</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
