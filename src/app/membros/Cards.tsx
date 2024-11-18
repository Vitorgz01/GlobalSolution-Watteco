import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

import vitorImg from "@/image/members/fotovitor (1).png";
import gomesImg from "@/image/members/gabriel-177x250.jpeg";

export default function ParticipantCards() {
  const participants = [
    {
      name: "Vitor de Oliveira Ginza",
      rm: "RM5554849",
      imageSrc: vitorImg,
    },
    {
      name: "Gay",
      rm: "RM558424",
      imageSrc: gomesImg,
    },
  ];

  return (
    <section className="px-4 py-16 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">Participantes</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {participants.map((participant) => (
            <Card
              key={participant.rm}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-0">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={participant.imageSrc}
                    alt={participant.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-1">
                    {participant.name}
                  </h3>
                  <p className="text-muted-foreground">{participant.rm}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
