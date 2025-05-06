'use client';

import { Card, Title } from '@mantine/core';
import { PieChart } from '@mantine/charts';

interface SalesEfficiencyChartProps {
  totalReunioes: number;
  reunioesComVenda: number;
}

export const SalesEfficiencyChart: React.FC<SalesEfficiencyChartProps> = ({
  totalReunioes,
  reunioesComVenda,
}) => {
  const reunioesSemVenda = totalReunioes - reunioesComVenda;

  if (totalReunioes === 0) return null;

  return (
    <Card withBorder shadow="sm" radius="md" p="lg">
      <Title order={5} mb="md">
        Eficiência de Vendas
      </Title>
      <PieChart
        withLabels
        h={250}
        data={[
          { name: 'Vendas', value: reunioesComVenda, color: 'teal.6' },
          { name: 'Sem Venda', value: reunioesSemVenda, color: 'gray.4' },
        ]}
      />
    </Card>
  );
};
