'use client';

import { Card, Text, Group, ThemeIcon } from '@mantine/core';
import {
  IconMessage,
  IconPhoneCall,
  IconUserCheck,
  IconCalendarEvent
} from '@tabler/icons-react';

interface Indicator {
  label: string;
  value: number;
  percent: number;
  icon: React.ReactNode;
}

const indicators: (data: any) => Indicator[] = (data) => [
  {
    label: 'Mensagens Enviadas',
    value: data.mensagens_enviadas,
    percent: data.mensagens_enviadas_percent,
    icon: <IconMessage size={20} />
  },
  {
    label: 'Ligações Realizadas',
    value: data.ligacoes_realizadas,
    percent: data.ligacoes_realizadas_percent,
    icon: <IconPhoneCall size={20} />
  },
  {
    label: 'Conversas Efetivas',
    value: data.conversas_efetivas,
    percent: data.conversas_efetivas_percent,
    icon: <IconUserCheck size={20} />
  },
  {
    label: 'Agendamentos',
    value: data.agendamentos,
    percent: data.agendamentos_percent,
    icon: <IconCalendarEvent size={20} />
  }
];

export const KpiCards = ({ data }: { data: any }) => {
  return (
    <Group grow>
      {indicators(data).map((kpi, i) => (
        <Card key={i} withBorder shadow="sm" radius="md" p="md">
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed">
                {kpi.label}
              </Text>
              <Text size="xl" fw={700}>
                {kpi.value}
              </Text>
              <Text size="xs" c={kpi.percent >= 0 ? 'teal' : 'red'}>
                {kpi.percent >= 0 ? `↑ ${kpi.percent}%` : `↓ ${Math.abs(kpi.percent)}%`} vs last period
              </Text>
            </div>
            <ThemeIcon variant="light" size="lg">
              {kpi.icon}
            </ThemeIcon>
          </Group>
        </Card>
      ))}
    </Group>
  );
};
