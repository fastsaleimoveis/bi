'use client';

import { Card, Group, Text, SimpleGrid, ThemeIcon } from '@mantine/core';
import {
  IconCalendarCancel,
  IconCalendarCheck,
  IconShoppingCartCheck,
  IconPercentage,
  IconCurrencyDollar,
} from '@tabler/icons-react';

interface Closer {
    reunioes_noshow: number;
    reunioes_realizadas: number;
    vendas_fechadas: number;
    vgv: number;
  }
  
  interface ClosersIndicadoresCardsProps {
    data: Closer[];
  }
  
  export const ClosersIndicadoresCards = ({ data }: ClosersIndicadoresCardsProps) => {
    const total = data.reduce(
      (acc, closer) => ({
        reunioes_noshow: acc.reunioes_noshow + closer.reunioes_noshow,
        reunioes_realizadas: acc.reunioes_realizadas + closer.reunioes_realizadas,
        vendas_fechadas: acc.vendas_fechadas + closer.vendas_fechadas,
        vgv: acc.vgv + closer.vgv,
      }),
      {
        reunioes_noshow: 0,
        reunioes_realizadas: 0,
        vendas_fechadas: 0,
        vgv: 0,
      }
    );
  
    const eficiencia =
      total.reunioes_realizadas + total.reunioes_noshow > 0
        ? Math.round((total.reunioes_realizadas / (total.reunioes_realizadas + total.reunioes_noshow)) * 100)
        : 0;
  
    const indicadores: any[] = [
      {
        label: 'Reuniões NoShow',
        value: total.reunioes_noshow,
        icon: <IconCalendarCancel size={20} />,
        color: 'red',
      },
      {
        label: 'Reuniões Realizadas',
        value: total.reunioes_realizadas,
        icon: <IconCalendarCheck size={20} />,
        color: 'green',
      },
      {
        label: 'Vendas fechadas',
        value: total.vendas_fechadas,
        icon: <IconShoppingCartCheck size={20} />,
        color: 'blue',
      },
      {
        label: 'Eficiência',
        value: eficiencia,
        icon: <IconPercentage size={20} />,
        color: 'indigo',
        suffix: '%',
      },
      {
        label: 'VGV total',
        value: `R$ ${Number(total.vgv).toLocaleString('pt-BR')}`,
        icon: <IconCurrencyDollar size={20} />,
        color: 'orange',
      },
    ];
  
    return (
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
              {item.value}{item.suffix ?? ''}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    );
  };
  