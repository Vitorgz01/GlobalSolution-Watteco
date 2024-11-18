import Image from "next/image";
import lightbulbIcon from "@/image/icons/lightbulb.png";
import solarPanelIcon from "@/image/icons/solar-panel.png";
import windTurbineIcon from "@/image/icons/wind-turbine.png";
import recycleIcon from "@/image/icons/recycle.png";

const energyInfoItems = {
  cards: [
    {
      icon: lightbulbIcon,
      title: "Eficiência Energética",
      info: "Trocar lâmpadas incandescentes por LEDs pode reduzir o consumo de energia em até 90%.",
      tip: "Dica: Aproveite a luz natural sempre que possível.",
    },
    {
      icon: solarPanelIcon,
      title: "Energia Solar",
      info: "A energia solar pode suprir até 100% da demanda elétrica de uma residência.",
      tip: "Dica: Considere instalar painéis solares para economia a longo prazo.",
    },
    {
      icon: windTurbineIcon,
      title: "Energia Eólica",
      info: "Uma única turbina eólica pode gerar energia suficiente para abastecer até 1.400 residências.",
      tip: "Dica: Apoie iniciativas de energia eólica em sua comunidade.",
    },
    {
      icon: recycleIcon,
      title: "Reciclagem e Energia",
      info: "Reciclar uma lata de alumínio economiza energia suficiente para manter uma TV ligada por 3 horas.",
      tip: "Dica: Separe seu lixo e recicle sempre que possível.",
    },
  ],
};

export default function EnergyInfoCards() {
  return (
    <section className="w-full py-16 px-8 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="mb-8">
        <h2 className="text-green-600 text-3xl font-bold pl-4">
          Informações sobre Energia
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl pl-4">
          Descubra fatos interessantes sobre energia e aprenda como você pode
          contribuir para um futuro mais sustentável. Pequenas mudanças em nosso
          dia a dia podem fazer uma grande diferença para o planeta.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {energyInfoItems.cards.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 text-center transform transition hover:scale-105 hover:shadow-xl"
          >
            <Image
              src={item.icon}
              alt={`Ícone de ${item.title}`}
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-green-700 font-semibold text-xl mb-2">
              {item.title}
            </h3>
            <p className="text-gray-700 text-sm mb-4">{item.info}</p>
            <p className="text-blue-600 text-sm font-medium">{item.tip}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
