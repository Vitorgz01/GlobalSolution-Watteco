"use client";

import React, { useEffect } from "react";
import { FaClock, FaExclamationTriangle, FaUser } from "react-icons/fa";

// Declaração global para reconhecer window.google
declare global {
  interface Window {
    google: any;
  }
}

const Maps = () => {
  useEffect(() => {
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

    return () => {
      window.removeEventListener("resize", drawRegionsMap);
    };
  }, []);

  return (
    <div className="p-5 sm:p-10 mb-20 mt-20">
      {/* Seção do gráfico */}
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

export default Maps;
