'use client';

import { Card, Group, Text, SimpleGrid, ThemeIcon } from '@mantine/core';
import {
  IconMessageCircle2,
  IconPhoneCall,
  IconUserCheck,
  IconCalendarStats,
  IconArrowUpRight,
  IconUserPlus,
  IconPhonePlus,
} from '@tabler/icons-react';

interface Indicador {
  label: string;
  value: number;
  percent: number;
  icon: React.ReactNode;
  color: string;
}

interface IndicadoresCardsProps {
  data: Sdr[];
}

export const IndicadoresCards: React.FC<IndicadoresCardsProps> = ({ data }) => {
  const total = data.reduce(
    (acc, sdr) => ({
      contatos_realizados: acc.contatos_realizados + (sdr.contatos_realizados || 0),
      contatos_efetivos: acc.contatos_efetivos + (sdr.contatos_efetivos || 0),
      ligacoes_realizadas: acc.ligacoes_realizadas + (sdr.ligacoes_realizadas || 0),
      ligacoes_efetivas: acc.ligacoes_efetivas + (sdr.ligacoes_efetivas || 0),
      agendamentos: acc.agendamentos + (sdr.agendamentos || 0),
    }),
    {
      contatos_realizados: 0,
      contatos_efetivos: 0,
      ligacoes_realizadas: 0,
      ligacoes_efetivas: 0,
      agendamentos: 0,
    }
  );

  const indicadores: Indicador[] = [
    {
      label: 'Contatos realizados',
      value: total.contatos_realizados,
      percent: 0,
      icon: <IconUserPlus size={20} />,
      color: 'blue',
    },
    {
      label: 'Contatos efetivos',
      value: total.contatos_efetivos,
      percent: 0,
      icon: <IconUserCheck size={20} />,
      color: 'indigo',
    },
    {
      label: 'Ligações realizadas',
      value: total.ligacoes_realizadas,
      percent: 0,
      icon: <IconPhonePlus size={20} />,
      color: 'teal',
    },
    {
      label: 'Ligações efetivas',
      value: total.ligacoes_efetivas,
      percent: 0,
      icon: <IconPhoneCall size={20} />,
      color: 'cyan',
    },
    {
      label: 'Agendamentos',
      value: total.agendamentos,
      percent: 0,
      icon: <IconCalendarStats size={20} />,
      color: 'orange',
    },
  ];

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing="lg">
      {indicadores.map((item) => (
        <Card key={item.label} withBorder shadow="sm" radius="md" p="lg">
          <Group justify="space-between">
            <Group gap="sm">
              <ThemeIcon variant="light" color={item.color} radius="xl" size="lg">
                {item.icon}
              </ThemeIcon>
              <Text size="sm" c="dimmed">{item.label}</Text>
            </Group>
            <Group gap={4}>
              <IconArrowUpRight size={18} color="gray" />
              <Text size="sm" c="gray">0%</Text>
            </Group>
          </Group>
          <Text size="xl" fw={700} mt="md">{item.value}</Text>
        </Card>
      ))}
    </SimpleGrid>
  );
};
