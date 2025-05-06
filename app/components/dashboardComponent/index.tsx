'use client';

import { useEffect, useState } from 'react';
import { Loader, Stack, Container, Title } from '@mantine/core';
import instance from '@/app/lib/axios';
import { IndicadoresTabs } from '../IndicadoresTabs';


export const DashboardComponent = () => {
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance
      .get('/collaborators')
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
        <IndicadoresTabs
          sdrData={data.filter(users => users.type && users.type.type === 'sdr')}
          closersData={data.filter(users => users.type && users.type.type === 'sdr')}
        />

        {/* <PerformanceTrendsChart data={data.grafico_tendencia} /> */}
      </Stack>
    </Container>
  );
};
