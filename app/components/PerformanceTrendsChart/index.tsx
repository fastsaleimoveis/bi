'use client';

import { Card, Text } from '@mantine/core';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface PerformanceTrendsChartProps {
  data: {
    labels: string[];
    messages: number[];
    calls: number[];
    appointments: number[];
  };
}

export const PerformanceTrendsChart = ({ data }: PerformanceTrendsChartProps) => {
  const chartData = data.labels.map((label, index) => ({
    name: label,
    Messages: data.messages[index],
    Calls: data.calls[index],
    Appointments: data.appointments[index],
  }));

  return (
    <Card shadow="sm" radius="md" p="lg" mt="md">
      <Text size="lg" fw={600} mb="md">
        Tendências de Desempenho
      </Text>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Messages" fill="#3b82f6" />
          <Bar dataKey="Calls" fill="#10b981" />
          <Bar dataKey="Appointments" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
