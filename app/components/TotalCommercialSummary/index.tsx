'use client';

import { Card, Title, Group, Text, Stack } from '@mantine/core';

interface TotalCommercialSummaryProps {
  agendamentos: number;
  reunioes_noshow: number;
  vendas: number;
  eficiencia: number;
}

export const TotalCommercialSummary: React.FC<TotalCommercialSummaryProps> = ({
  agendamentos,
  reunioes_noshow,
  vendas,
  eficiencia,
}) => {
  return (
    <Card withBorder shadow="sm" radius="md" p="lg">
      <Title order={5} mb="md">
        Total Comercial
      </Title>
      <Stack spacing="xs">
        <Group position="apart">
          <Text size="sm">Agendamentos</Text>
          <Text weight={500}>{agendamentos}</Text>
        </Group>
        <Group position="apart">
          <Text size="sm">No-Show</Text>
          <Text weight={500}>{reunioes_noshow}</Text>
        </Group>
        <Group position="apart">
          <Text size="sm">Vendas</Text>
          <Text weight={500}>{vendas}</Text>
        </Group>
        <Group position="apart">
          <Text size="sm">Eficiência</Text>
          <Text weight={500}>{eficiencia}%</Text>
        </Group>
      </Stack>
    </Card>
  );
};
