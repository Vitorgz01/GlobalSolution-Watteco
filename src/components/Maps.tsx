"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import car from "@/image/home/problems-car.png";
import timer from "@/image/home/timer.png";
import warning from "@/image/home/warning.png";
import person from "@/image/home/person.png";

const Problems = () => {
  useEffect(() => {
    // Carregar o script do Google Charts quando o componente é montado
    const loadGoogleCharts = () => {
      const script = document.createElement("script");
      script.src = "https://www.gstatic.com/charts/loader.js";
      script.onload = () => {
        if (typeof window !== "undefined" && window.google) {
          window.google.charts.load("current", {
            packages: ["geochart"],
          });
          window.google.charts.setOnLoadCallback(drawRegionsMap);
        }
      };
      document.body.appendChild(script);

      // Listener para redimensionamento do gráfico ao ajustar a janela
      window.addEventListener("resize", drawRegionsMap);
    };

    const drawRegionsMap = () => {
      if (typeof window !== "undefined" && window.google) {
        const data = window.google.visualization.arrayToDataTable([
          ["Country", "Popularity"],
          ["China", 1000],
          ["United States", 900],
          ["Germany", 850],
          ["India", 800],
          ["Spain", 750],
          ["United Kingdom", 700],
          ["Brazil", 650],
          ["Denmark", 600],
          ["Netherlands", 550],
          ["Sweden", 500],
          ["Norway", 450],
          ["Portugal", 400],
          ["Australia", 350],
          ["Canada", 300],
          ["France", 250],
        ]);

        const options = {
          colorAxis: { colors: ["#e0f7fa", "#00796b"] },
          backgroundColor: "#f0f0f0",
        };

        const chart = new window.google.visualization.GeoChart(
          document.getElementById("regions_div")
        );
        chart.draw(data, options);
      }
    };

    loadGoogleCharts();

    // Cleanup do event listener quando o componente for desmontado
    return () => {
      window.removeEventListener("resize", drawRegionsMap);
    };
  }, []);

  const infos = {
    problemsItems: [
      {
        title: "Relate seu problema",
        description:
          "Descreva os sintomas ou falhas que você está enfrentando com o seu veículo. Nossa plataforma guiará você no processo de identificar a causa provável e oferecer recomendações.",
      },
      {
        title: "Realize o diagnóstico",
        description:
          "Através de uma série de perguntas e etapas guiadas, você pode fazer uma avaliação inicial dos principais sistemas do veículo. Obtenha informações detalhadas sobre o que pode estar acontecendo.",
      },
      {
        title: "Orçe e realize o reparo",
        description:
          "Receba uma estimativa dos custos para solucionar o problema e agende o reparo de maneira prática e rápida, com opções de locais de confiança recomendados pela Porto Seguro.",
      },
    ],
    cards: [
      {
        image: timer,
        title: "Ganho de tempo e dinheiro",
        description:
          "Com o AutoCheckup, você economiza tempo ao diagnosticar problemas rapidamente, sem precisar esperar uma avaliação inicial em uma oficina. Economize dinheiro ao saber exatamente o que precisa de atenção.",
      },
      {
        image: warning,
        title: "Prevenção de maiores problemas",
        description:
          "Detecte pequenos problemas antes que se transformem em grandes despesas. Realizar o diagnóstico regular ajuda a manter o veículo em excelente estado e evita surpresas indesejadas.",
      },
      {
        image: person,
        title: "Praticidade e conforto",
        description:
          "Tenha todo o suporte necessário para cuidar do seu veículo, direto do seu dispositivo. A plataforma é intuitiva e fácil de usar, garantindo que você tenha controle total, onde quer que esteja.",
      },
    ],
  };

  return (
    <div className="p-5 sm:p-10 mb-20 mt-20">
      <section className="mt-12">
        <h2 className="text-green-500 text-xl font-semibold mb-6 text-center">
          Distribuição de Popularidade de Energia Eólica/Sustentável
        </h2>
        <div
          id="regions_div"
          className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] max-w-full mx-auto"
        ></div>
      </section>
    </div>
  );
};

export default Problems;
