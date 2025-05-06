'use client';

import { useEffect, useState } from 'react';
import { Loader, Stack, Container, Title } from '@mantine/core';
import instance from '@/app/lib/axios';
import { IndicadoresTabs } from '../IndicadoresTabs';


export const DashboardComponent = () => {
  const [data, setData] = useState<BiDashboard | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance
      .get('/bi-dashboard?type=operacional&month=5&year=2025')
      .then((res) => setData(res.data))
      .catch((err) => console.error('Erro ao carregar dashboard:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    data &&
    <Container size="xl">
      <Stack py={12}>
        <Title order={2}>Dashboard Operacional</Title>
        <IndicadoresTabs sdrData={data.sdrs} closersData={data.closers} consolidado={data.consolidado} />

        {/* <PerformanceTrendsChart data={data.grafico_tendencia} /> */}
      </Stack>
    </Container>
  );
};
