"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarIcon,
  ClockIcon,
  ArrowRight,
  Lightbulb,
  Zap,
  Sprout,
} from "lucide-react";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/contexts/AuthContext";
import { parseCookies } from "nookies";
import { api } from "@/services/api";
import casa from "@/image/5-maneiras-de-deixar-sua-casa-com-mais-eficiencia-energetica.jpg";

export default function WattecoBlogPost() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const { "challenge.token": token } = parseCookies();

    if (!token) {
      router.push("/educacional");
    } else {
      api.get("/educacional");
    }
  }, [router]);

  const relatedPosts = [
    { title: "Como escolher eletrodomésticos eficientes", icon: Lightbulb },
    { title: "O impacto da energia solar na sua conta de luz", icon: Zap },
    { title: "Práticas sustentáveis para empresas", icon: Sprout },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <Image
          src={casa}
          alt="Painel de controle de energia inteligente"
          width={1200}
          height={400}
          className="w-full h-64 object-cover"
        />
        <div className="p-8">
          <div className="flex items-center mb-4 text-sm text-blue-600">
            <CalendarIcon className="w-4 h-4 mr-2" />
            <span>12 de Junho, 2023</span>
            <ClockIcon className="w-4 h-4 ml-4 mr-2" />
            <span>5 min de leitura</span>
          </div>
          <h1 className="text-3xl font-bold text-blue-900 mb-4">
            5 Maneiras de Melhorar a Eficiência Energética em Sua Casa
          </h1>
          <div className="flex items-center mb-6">
            <div>
              <p className="font-semibold text-blue-800">Ana Silva</p>
              <p className="text-sm text-blue-600">
                Especialista em Eficiência Energética
              </p>
            </div>
          </div>
          <div className="prose max-w-none text-blue-800">
            <p>
              A eficiência energética não é apenas uma tendência passageira, mas
              uma necessidade crescente em nosso mundo moderno. Com o aumento
              dos custos de energia e a preocupação com o impacto ambiental, é
              crucial que todos façamos nossa parte para reduzir o consumo de
              energia em nossas casas. Neste artigo, exploraremos cinco maneiras
              eficazes de melhorar a eficiência energética em sua residência.
            </p>
            <h2 className="text-2xl font-semibold text-blue-900 mt-6 mb-3">
              1. Invista em iluminação LED
            </h2>
            <p>
              Substituir suas lâmpadas tradicionais por LEDs pode reduzir
              significativamente o consumo de energia. As lâmpadas LED são até
              80% mais eficientes que as incandescentes e duram muito mais.
            </p>
            <h2 className="text-2xl font-semibold text-blue-900 mt-6 mb-3">
              2. Utilize termostatos inteligentes
            </h2>
            <p>
              Termostatos inteligentes podem aprender seus hábitos e ajustar
              automaticamente a temperatura, economizando energia quando você
              não está em casa ou durante a noite.
            </p>
            <h2 className="text-2xl font-semibold text-blue-900 mt-6 mb-3">
              3. Melhore o isolamento da sua casa
            </h2>
            <p>
              Um bom isolamento pode reduzir significativamente os custos de
              aquecimento e resfriamento. Verifique e melhore o isolamento em
              seu sótão, paredes e pisos.
            </p>
            <h2 className="text-2xl font-semibold text-blue-900 mt-6 mb-3">
              4. Opte por eletrodomésticos eficientes
            </h2>
            <p>
              Ao substituir eletrodomésticos antigos, escolha modelos com
              certificação de eficiência energética. Eles podem consumir até 50%
              menos energia que modelos mais antigos.
            </p>
            <h2 className="text-2xl font-semibold text-blue-900 mt-6 mb-3">
              5. Monitore seu consumo de energia
            </h2>
            <p>
              Utilize sistemas de monitoramento de energia, como o oferecido
              pela Watteco, para identificar áreas de alto consumo e tomar
              medidas para reduzir o desperdício.
            </p>
            <p className="mt-6">
              Implementando essas estratégias, você não apenas reduzirá sua
              conta de energia, mas também contribuirá para um futuro mais
              sustentável. Lembre-se, pequenas mudanças podem ter um grande
              impacto quando se trata de eficiência energética.
            </p>
          </div>
        </div>
      </article>

      <div className="max-w-4xl mx-auto mt-12">
        <h3 className="text-2xl font-bold text-blue-900 mb-6">
          Posts Relacionados
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPosts.map((post, index) => (
            <Card
              key={index}
              className="bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <post.icon className="w-10 h-10 text-green-500 mb-4" />
                <h4 className="text-lg font-semibold text-blue-900 mb-2">
                  {post.title}
                </h4>
                <Button variant="link" className="text-green-600 p-0">
                  Ler mais <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
