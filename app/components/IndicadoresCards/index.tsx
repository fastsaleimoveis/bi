'use client';

import { Card, Group, Text, SimpleGrid, ThemeIcon } from '@mantine/core';
import {
  IconPhoneCall,
  IconUserCheck,
  IconCalendarStats,
  IconArrowUpRight,
  IconUserPlus,
  IconPhonePlus,
} from '@tabler/icons-react';
import { Fragment } from 'react';

interface Indicador {
  label: string;
  number: number;
  icon: React.ReactNode;
  color: string;
}

interface IndicadoresCardsProps {
  data: User[];
}

export const IndicadoresCards: React.FC<IndicadoresCardsProps> = ({ data }) => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  if (!data) return null;

  return (
    <div className="flex flex-col gap-10">
      {data.map((user, index) => {
        const indicator = user.indicators.find(ind => ind.month === currentMonth && ind.year === currentYear);
        if (!indicator) return null;

        const indicadores: Indicador[] = [
          { label: 'Contato Realizado', number: indicator.contacts_made || 0, icon: <IconUserPlus />, color: 'blue' },
          { label: 'Contato Efetivo', number: indicator.effective_contacts || 0, icon: <IconUserCheck />, color: 'green' },
          { label: 'Ligação Realizada', number: indicator.phone_calls_made || 0, icon: <IconPhoneCall />, color: 'cyan' },
          { label: 'Ligação Efetiva', number: indicator.effective_phone_calls || 0, icon: <IconPhonePlus />, color: 'teal' },
          { label: 'Agendamentos', number: indicator.appointments || 0, icon: <IconCalendarStats />, color: 'violet' },
          { label: 'No Show', number: indicator.no_show || 0, icon: <IconCalendarStats />, color: 'red' },
          {
            label: 'Eficiência',
            number:
              indicator.effective_contacts + indicator.effective_phone_calls > 0
                ? Math.round(
                    (indicator.appointments * 100) /
                      (indicator.effective_contacts + indicator.effective_phone_calls)
                  )
                : 0,
            icon: <IconArrowUpRight />,
            color: 'orange',
          },
        ];

        return (
          <Fragment key={index}>
            <Text fw={700} fz="lg" mb={-6}>{user.name}</Text>
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
                  </Group>
                  <Text size="xl" fw={700} mt="md">{item.number}</Text>
                </Card>
              ))}
            </SimpleGrid>
          </Fragment>
        );
      })}
    </div>
  );
};
