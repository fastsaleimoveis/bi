'use client';

import { Card, Title } from '@mantine/core';
import { BarChart } from '@mantine/charts';

interface LeadSource {
  fonte: string;
  total: number;
}

interface LeadSourcesChartProps {
  data: LeadSource[];
}

export const LeadSourcesChart: React.FC<LeadSourcesChartProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <Card withBorder shadow="sm" radius="md" p="lg">
      <Title order={5} mb="md">
        Fontes de Leads
      </Title>
      <BarChart
        h={250}
        data={data}
        dataKey="fonte"
        series={[{ name: 'total', color: 'green.6' }]}
        grid={{ y: true }}
      />
    </Card>
  );
};
