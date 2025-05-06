import { Card, Text, Group, Stack } from '@mantine/core';

interface VisaoGeralProps {
  total_sdrs: number;
  total_closers: number;
  agendamentos_mensais: number;
  vendas_mensais: number;
  taxa_conversao: number;
  vgv_mensal: number;
}


export const TeamOverview: React.FC<{ data: VisaoGeralProps }> = ({ data }) => {
  return (
    <Card shadow="sm" radius="md" p="lg" withBorder>
      <div>
        <h3 className="font-bold text-gray-800 text-lg mb-2">Visão Geral da Equipe</h3>
        <ul>
          <li className="flex justify-between w-full">
            <p className="text-gray-800">Total de SDRs</p>
            <p className="text-gray-800 font-bold">{data.total_sdrs}</p>
          </li>
          <li className="flex justify-between w-full">
            <p className="text-gray-800">Total de Closers</p>
            <p className="text-gray-800 font-bold">{data.total_closers}</p>
          </li>
          <li className="flex justify-between w-full">
            <p className="text-gray-800">Agendamentos</p>
            <p className="text-gray-800 font-bold">{data.agendamentos_mensais}</p>
          </li>
          <li className="flex justify-between w-full">
            <p className="text-gray-800">Total de SDRs</p>
            <p className="text-gray-800 font-bold">{data.vendas_mensais}</p>
          </li>
          <li className="flex justify-between w-full">
            <p className="text-gray-800">Taxa de Conversão</p>
            <p className="text-gray-800 font-bold">{data.taxa_conversao}%</p>
          </li>
          <li className="flex justify-between w-full">
            <p className="text-gray-800">VGV</p>
            <p className="text-gray-800 font-bold">R$ {data.vgv_mensal.toLocaleString('pt-BR')}</p>
          </li>
        </ul>
      </div>
    </Card>
  );
};
