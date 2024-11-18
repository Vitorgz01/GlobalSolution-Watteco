"use client";

import Image from "next/image";
import Link from "next/link"; // Importe o Link do Next.js
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ArrowRight, Zap, TrendingDown, Sprout } from "lucide-react";
import calculadora1 from "@/image/calculadora1.png";

export default function WattecoBanner() {
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      text: "Monitoramento em tempo real",
    },
    {
      icon: <TrendingDown className="w-6 h-6 text-green-400" />,
      text: "Redução de custos",
    },
    {
      icon: <Sprout className="w-6 h-6 text-green-600" />,
      text: "Impacto ambiental positivo",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl shadow-lg mx-auto my-8 max-w-7xl overflow-hidden mb-20 mt-20">
      <div className="px-6 py-12 md:px-12 md:py-20 lg:py-24 flex flex-col lg:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 text-center lg:text-left mb-8 lg:mb-0 lg:pr-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-blue-900">
            Transforme seu consumo de energia com{" "}
            <span className="text-green-600">inteligência</span>
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-blue-800 opacity-80">
            A Watteco oferece insights poderosos para otimizar seu uso de
            energia, economizar dinheiro e proteger o meio ambiente.
          </p>
          <Link href="/calculadora">
            {" "}
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white transition-all duration-300 ease-in-out transform hover:scale-105"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Comece sua jornada energética
              <ArrowRight
                className={`ml-2 transition-all duration-300 ${
                  isHovered ? "translate-x-1" : ""
                }`}
              />
            </Button>
          </Link>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white border-none shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="flex items-center p-4">
                  {feature.icon}
                  <span className="ml-2 text-sm font-medium text-blue-900">
                    {feature.text}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 w-full max-w-lg lg:max-w-xl"
        >
          <Card className="bg-white shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <Image
                src={calculadora1}
                alt="Casa inteligente com monitoramento de energia"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
