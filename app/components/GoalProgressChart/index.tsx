'use client';

import { Card, Title, Group, Stack, Progress, Text } from '@mantine/core';

interface GoalProgressChartProps {
  atingido: number;
  meta: number;
}

export const GoalProgressChart: React.FC<GoalProgressChartProps> = ({ atingido, meta }) => {
  const restante = Math.max(meta - atingido, 0);
  const progresso = Math.min((atingido / meta) * 100, 100);

  return (
    <Card withBorder shadow="sm" radius="md" p="lg">
      <Title order={5} mb="md">
        Progresso Meta
      </Title>
      <Stack spacing="xs">
        <Group position="apart">
          <Text size="sm">Atingido</Text>
          <Text size="sm">R$ {atingido?.toLocaleString('pt-BR')}</Text>
        </Group>
        <Group position="apart">
          <Text size="sm">Restante</Text>
          <Text size="sm">R$ {restante?.toLocaleString('pt-BR')}</Text>
        </Group>
        <Progress sections={[
          { value: progresso, color: 'blue' },
        ]} size="lg" />
      </Stack>
    </Card>
  );
};
