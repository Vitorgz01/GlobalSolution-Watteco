"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, Leaf, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import logo from "@/image/foto_curriculo-removebg-preview.png";

const FooterSection = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-green-200/20 py-4 md:border-none">
      <button
        className="flex w-full items-center justify-between text-left md:cursor-default"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-green-400">{title}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 md:hidden" />
        ) : (
          <ChevronDown className="h-5 w-5 md:hidden" />
        )}
      </button>
      <ul className={`mt-2 space-y-2 ${isOpen ? "block" : "hidden md:block"}`}>
        {items.map((item, index) => (
          <li key={index}>
            <Link
              href="#"
              className="text-sm text-gray-300 hover:text-green-400 transition-colors"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  const footerData = {
    sections: [
      {
        title: "Soluções",
        items: [
          "Residencial",
          "Comercial",
          "Industrial",
          "Consultoria Energética",
          "Auditorias",
        ],
      },
      {
        title: "Recursos",
        items: ["Blog", "E-books", "Calculadoras", "Webinars", "FAQ"],
      },
      {
        title: "Empresa",
        items: ["Sobre nós", "Equipe", "Carreiras", "Parceiros", "Contato"],
      },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-green-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center mb-8 text-center">
          <Image
            src={logo}
            alt="Watteco"
            width={100}
            height={100}
            className="mb-4"
          />
          <h2 className="text-3xl font-bold mb-2">Watteco</h2>
          <p className="text-green-400 flex items-center">
            <Leaf className="mr-2 h-5 w-5" />
            Energizando um futuro sustentável
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {footerData.sections.map((section, index) => (
            <FooterSection
              key={index}
              title={section.title}
              items={section.items}
            />
          ))}
        </div>

        <div className="border-t border-green-200/20 pt-8">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Fique por dentro das novidades
          </h3>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
            <Input
              type="email"
              placeholder="Seu e-mail"
              className="bg-white/10 border-green-600 placeholder-gray-400 text-white flex-grow"
            />
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Send className="mr-2 h-4 w-4" />
              Assinar
            </Button>
          </form>
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2023 Watteco. Todos os direitos reservados.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-green-400 transition-colors">
                Termos de Uso
              </Link>
              <Link href="#" className="hover:text-green-400 transition-colors">
                Política de Privacidade
              </Link>
              <Link href="#" className="hover:text-green-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
