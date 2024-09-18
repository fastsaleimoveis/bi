'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  Text,
  Title,
  Container,
  SimpleGrid,
  Group,
  ThemeIcon,
} from '@mantine/core';
import {
  IconBuilding,
  IconUser,
  IconHome,
  IconChartBar,
  IconCurrencyDollar,
} from '@tabler/icons-react';
import { LineChart } from '@mantine/charts';

interface DataType {
  imobiliarias_total: string;
  corretores_total: string;
  construtoras_total: string;
  imobiliarias_premium: string;
  imobiliarias_start: string;
  corretores_premium: string;
  corretores_start: string;
  imoveis_vendidos_ext_value: string;
  imoveis_vendidos_value: string;
  total_valor_unidades: string;
  imoveis_valor: string;
  media_imoveis_novos: string;
  media_valor_imoveis_novos: string;
  shares_mes: { [key: number]: number }[];
  talks_mes: { [key: number]: number }[];
  views_mes: { [key: number]: number }[];
  downloads_mes: { [key: number]: number }[];
}

export default function Home() {
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    axios
      .get<DataType>('https://dev.fastsaleimoveis.com.br/api/get-count-temp')
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      });
  }, []);

  if (!data) {
    return <div>Carregando...</div>;
  }

  const totalUsuarios =
    parseInt(data.corretores_total, 10) +
    parseInt(data.imobiliarias_total, 10) +
    parseInt(data.construtoras_total, 10);

  const totalAssinantes =
    parseInt(data.imobiliarias_premium, 10) +
    parseInt(data.imobiliarias_start, 10) +
    parseInt(data.corretores_premium, 10) +
    parseInt(data.corretores_start, 10);

  const imoveisVendidos =
    (parseInt(data.imoveis_vendidos_ext_value, 10) +
      parseInt(data.imoveis_vendidos_value, 10)) /
    100;

  const unidadesDisponiveis = parseInt(data.total_valor_unidades, 10) / 100;
  const imoveisDisponiveis = parseInt(data.imoveis_valor, 10) / 100;
  const valorTotalImoveis =
    (parseInt(data.total_valor_unidades, 10) +
      parseInt(data.imoveis_valor, 10)) /
    100;

  const mediaImoveisNovos = parseInt(data.media_imoveis_novos, 10);
  const valorMedioMensal = parseFloat(data.media_valor_imoveis_novos) / 100;

  const combineChartData = () => {
    const months = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    return months.map((month, index) => ({
      date: month,
      Compartilhamentos: data.shares_mes[index] ? Object.values(data.shares_mes[index])[0] : 0,
      Conversas: data.talks_mes[index] ? Object.values(data.talks_mes[index])[0] : 0,
      Visualizações: data.views_mes[index] ? Object.values(data.views_mes[index])[0] : 0,
      Downloads: data.downloads_mes[index] ? Object.values(data.downloads_mes[index])[0] : 0,
    }));
  };

  const chartData = combineChartData();

  return (
    <Container size="xl" py="md">
      {/* <Title mb="lg">Fast Sale</Title> */}
      <SimpleGrid cols={5} spacing="lg">

        <Card shadow="sm" p="lg" radius="md" style={{ gridColumn: 'span 5' }}>
          <Title order={4}>Estatísticas por Mês (2024)</Title>
          <LineChart
            h={300}
            data={chartData}
            dataKey="date"
            series={[
              { name: 'Compartilhamentos', color: 'indigo.6' },
              { name: 'Conversas', color: 'blue.6' },
              { name: 'Visualizações', color: 'teal.6' },
              { name: 'Downloads', color: 'red.6' },
            ]}
            curveType="linear"
          />
        </Card>

        {/* Restante dos Cards */}
        <Card shadow="sm" p="lg" radius="md">
          <Group align="center">
            <Group>
              <ThemeIcon color="blue" variant="light">
                <IconBuilding size={24} />
              </ThemeIcon>
              <Text>Imobiliárias</Text>
            </Group>
            <Title order={2}>{data.imobiliarias_total}</Title>
          </Group>
        </Card>

        <Card shadow="sm" p="lg" radius="md">
          <Group align="center">
            <Group>
              <ThemeIcon color="green" variant="light">
                <IconUser size={24} />
              </ThemeIcon>
              <Text>Corretores</Text>
            </Group>
            <Title order={2}>{data.corretores_total}</Title>
          </Group>
        </Card>

        <Card shadow="sm" p="lg" radius="md">
          <Group align="center">
            <Group>
              <ThemeIcon color="teal" variant="light">
                <IconBuilding size={24} />
              </ThemeIcon>
              <Text>Construtoras</Text>
            </Group>
            <Title order={2}>{data.construtoras_total}</Title>
          </Group>
        </Card>

        <Card shadow="sm" p="lg" radius="md">
          <Group align="center">
            <Group>
              <ThemeIcon color="indigo" variant="light">
                <IconUser size={24} />
              </ThemeIcon>
              <Text>Total de Usuários</Text>
            </Group>
            <Title order={2}>{totalUsuarios}</Title>
          </Group>
        </Card>

        <Card shadow="sm" p="lg" radius="md">
          <Group align="center">
            <Group>
              <ThemeIcon color="orange" variant="light">
                <IconUser size={24} />
              </ThemeIcon>
              <Text>Assinantes</Text>
            </Group>
            <Title order={2}>{totalAssinantes}</Title>
          </Group>
        </Card>

        <Card shadow="sm" p="lg" radius="md">
          <Group align="center">
            <Group>
              <ThemeIcon color="red" variant="light">
                <IconCurrencyDollar size={24} />
              </ThemeIcon>
              <Text>Imóveis Vendidos</Text>
            </Group>
            <Title order={4}>
              R${' '}
              {imoveisVendidos.toLocaleString('pt-br', {
                minimumFractionDigits: 2,
              })}
            </Title>
          </Group>
        </Card>

        <Card shadow="sm" p="lg" radius="md">
          <Group align="center">
            <Group>
              <ThemeIcon color="cyan" variant="light">
                <IconHome size={24} />
              </ThemeIcon>
              <Text>Unidades Disponíveis</Text>
            </Group>
            <Title order={4}>
              R${' '}
              {unidadesDisponiveis.toLocaleString('pt-br', {
                minimumFractionDigits: 2,
              })}
            </Title>
          </Group>
        </Card>

        <Card shadow="sm" p="lg" radius="md">
          <Group align="center">
            <Group>
              <ThemeIcon color="grape" variant="light">
                <IconHome size={24} />
              </ThemeIcon>
              <Text>Imóveis Disponíveis</Text>
            </Group>
            <Title order={4}>
              R${' '}
              {imoveisDisponiveis.toLocaleString('pt-br', {
                minimumFractionDigits: 2,
              })}
            </Title>
          </Group>
        </Card>

        <Card shadow="sm" p="lg" radius="md">
          <Group align="center">
            <Group>
              <ThemeIcon color="pink" variant="light">
                <IconHome size={24} />
              </ThemeIcon>
              <Text>Valor Total de Imóveis</Text>
            </Group>
            <Title order={4}>
              R${' '}
              {valorTotalImoveis.toLocaleString('pt-br', {
                minimumFractionDigits: 2,
              })}
            </Title>
          </Group>
        </Card>

        <Card shadow="sm" p="lg" radius="md">
          <Group>
            <Group align="center">
              <Group>
                <ThemeIcon color="lime" variant="light">
                  <IconChartBar size={24} />
                </ThemeIcon>
                <Text>Imóveis/mês (3 m)</Text>
              </Group>
              <Title order={4}>{mediaImoveisNovos}</Title>
            </Group>
            <Text size="sm" color="dimmed">
              Valor:{' '}
              R${' '}
              {valorMedioMensal.toLocaleString('pt-br', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </Group>
        </Card>
      </SimpleGrid>
    </Container>
  );
}
