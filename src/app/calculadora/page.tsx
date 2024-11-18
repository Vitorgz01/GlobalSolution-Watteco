"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

interface Aparelho {
  nome: string;
  potencia: number;
  tempoUso: number;
  quantidade: number;
}

export default function CalculadoraEficienciaEnergetica() {
  const [aparelhos, setAparelhos] = useState<Aparelho[]>([]);
  const [novoAparelho, setNovoAparelho] = useState<Aparelho>({
    nome: "",
    potencia: 0,
    tempoUso: 0,
    quantidade: 1,
  });
  const mediaConsumo = 250; // kWh
  const { data: session } = useSession();

  const adicionarAparelho = () => {
    if (
      novoAparelho.nome &&
      novoAparelho.potencia > 0 &&
      novoAparelho.tempoUso > 0
    ) {
      setAparelhos([...aparelhos, novoAparelho]);
      setNovoAparelho({ nome: "", potencia: 0, tempoUso: 0, quantidade: 1 });
    }
  };

  const removerAparelho = (index: number) => {
    setAparelhos(aparelhos.filter((_, i) => i !== index));
  };

  const calcularConsumoDiario = (aparelho: Aparelho) => {
    return (aparelho.potencia * aparelho.tempoUso * aparelho.quantidade) / 1000;
  };

  const calcularConsumoMensal = (aparelho: Aparelho) => {
    return calcularConsumoDiario(aparelho) * 30;
  };

  const consumoTotalMensal = aparelhos.reduce(
    (total, aparelho) => total + calcularConsumoMensal(aparelho),
    0
  );

  const salvarDados = async () => {
    if (!session) {
      toast({
        title: "Erro de autenticação",
        description: "Por favor, faça login para salvar os dados.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/calculadora", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          aparelhos,
          consumoTotalMensal,
          acimaMedia: consumoTotalMensal > mediaConsumo,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Dados salvos com sucesso!",
          description: `Os dados da calculadora foram salvos com o ID: ${data.id}`,
        });
      } else {
        throw new Error("Falha ao salvar os dados");
      }
    } catch (error) {
      toast({
        title: "Erro ao salvar dados",
        description: "Ocorreu um erro ao enviar os dados para a API.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mb-20 mt-20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Calculadora de Eficiência Energética Residencial
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-5 gap-2">
            <Input
              placeholder="Aparelho"
              value={novoAparelho.nome}
              onChange={(e) =>
                setNovoAparelho({ ...novoAparelho, nome: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Potência (W)"
              value={novoAparelho.potencia || ""}
              onChange={(e) =>
                setNovoAparelho({
                  ...novoAparelho,
                  potencia: Number(e.target.value),
                })
              }
            />
            <Input
              type="number"
              placeholder="Tempo de Uso (h/dia)"
              value={novoAparelho.tempoUso || ""}
              onChange={(e) =>
                setNovoAparelho({
                  ...novoAparelho,
                  tempoUso: Number(e.target.value),
                })
              }
            />
            <Input
              type="number"
              placeholder="Quantidade"
              value={novoAparelho.quantidade}
              onChange={(e) =>
                setNovoAparelho({
                  ...novoAparelho,
                  quantidade: Number(e.target.value),
                })
              }
            />
            <Button onClick={adicionarAparelho}>
              <Plus className="mr-2 h-4 w-4" /> Adicionar
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aparelho</TableHead>
                <TableHead>Potência (W)</TableHead>
                <TableHead>Tempo de Uso (h/dia)</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Consumo Diário (kWh)</TableHead>
                <TableHead>Consumo Mensal (kWh)</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aparelhos.map((aparelho, index) => (
                <TableRow key={index}>
                  <TableCell>{aparelho.nome}</TableCell>
                  <TableCell>{aparelho.potencia}</TableCell>
                  <TableCell>{aparelho.tempoUso}</TableCell>
                  <TableCell>{aparelho.quantidade}</TableCell>
                  <TableCell>
                    {calcularConsumoDiario(aparelho).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {calcularConsumoMensal(aparelho).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removerAparelho(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 space-y-2">
            <p className="font-semibold">
              Consumo Total Mensal: {consumoTotalMensal.toFixed(2)} kWh
            </p>
            <p className="font-semibold">
              Comparação com a Média:{" "}
              {consumoTotalMensal > mediaConsumo ? (
                <span className="text-red-500">
                  Consumo acima da média! Considere reduzir.
                </span>
              ) : (
                <span className="text-green-500">Consumo dentro da média.</span>
              )}
            </p>
          </div>

          <Button onClick={salvarDados} className="w-full">
            <Save className="mr-2 h-4 w-4" /> Salvar Dados
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
