'use client';

import { Card, Group, Text, SimpleGrid, ThemeIcon } from '@mantine/core';
import {
  IconCalendarCheck,
  IconShoppingCartCheck,
  IconCurrencyDollar,
  IconFileDollar,
  IconHandClick,
  IconX,
} from '@tabler/icons-react';

interface Indicator {
  label: string;
  number: number | string;
  icon: React.ReactNode;
  color: string;
  suffix?: string;
}

interface User {
  name: string;
  indicators: {
    month: number;
    year: number;
    meetings_held: number;
    in_negotiation: number;
    lost: number;
    accept_verbal: number;
    link_sent: number;
    sales: number;
    vgv: number;
  }[];
}

interface ClosersIndicadoresCardsProps {
  data: User[];
}

export const ClosersIndicadoresCards = ({ data }: ClosersIndicadoresCardsProps) => {
  if (!data) return null;

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  return (
    <div className="flex flex-col gap-10">
      {data.map((user, index) => {
        const indicator = user.indicators.find(
          (ind) => ind.month === currentMonth && ind.year === currentYear
        );
        if (!indicator) return null;

        const indicadores: Indicator[] = [
          { label: 'Reunião Realizada', number: indicator.meetings_held || 0, icon: <IconCalendarCheck />, color: 'blue' },
          { label: 'Em Negociação', number: indicator.in_negotiation || 0, icon: <IconHandClick />, color: 'yellow' },
          { label: 'Perdido', number: indicator.lost || 0, icon: <IconX />, color: 'gray' },
          { label: 'Aceite Verbal', number: indicator.accept_verbal || 0, icon: <IconFileDollar />, color: 'teal' },
          { label: 'Link Pagamento', number: indicator.link_sent || 0, icon: <IconHandClick />, color: 'cyan' },
          { label: 'Vendas', number: indicator.sales || 0, icon: <IconShoppingCartCheck />, color: 'green' },
          { label: 'VGV', number: indicator.vgv.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), icon: <IconCurrencyDollar />, color: 'lime' },
        ];

        return (
          <div key={index}>
            <Text fw={700} fz="lg" mb={-6}>{user.name}</Text>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing="lg">
              {indicadores.map((item) => (
                <Card key={item.label} withBorder shadow="sm" radius="md" p="lg">
                  <Group gap="sm">
                    <ThemeIcon variant="light" color={item.color} radius="xl" size="lg">
                      {item.icon}
                    </ThemeIcon>
                    <Text size="sm" c="dimmed">{item.label}</Text>
                  </Group>
                  <Text size="xl" fw={700} mt="md">
                    {item.number}{item.suffix ?? ''}
                  </Text>
                </Card>
              ))}
            </SimpleGrid>
          </div>
        );
      })}
    </div>
  );
};
