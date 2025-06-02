'use client'

import { useEffect, useState } from 'react'
import instance from '@/app/lib/axios'
import { Loader, Title, Paper, Grid } from '@mantine/core'
import { AfidChart } from './components/AfidChart'
import { AforiginChart } from './components/AforiginChart'
import { AftypeChart } from './components/AftypeChart'
import { CouponTable } from './components/CouponTable'
import { FunnelByAfidTable } from './components/FunnelByAfidTable'


export default function AffiliateDashboard() {
  const [data, setData] = useState<AffiliateSummaryData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    instance.get('/bi/affiliate-summary')
      .then(res => setData(res.data))
      .catch(err => console.error('Erro ao carregar dados de afiliados:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />

  return (
    data &&
    <div className="p-6">
      <Title order={2} className="mb-4">Análise de Afiliados e Cupons</Title>

      <Grid>
        <Grid.Col span={4}>
          <Paper p="md" withBorder>
            <Title order={4} mb={10}>Afiliados (afid)</Title>
            <AfidChart data={data.afids} />
          </Paper>
        </Grid.Col>

        <Grid.Col span={4}>
          <Paper p="md" withBorder>
            <Title order={4} mb={10}>Origem (aforigin)</Title>
            <AforiginChart data={data.aforigins} />
          </Paper>
        </Grid.Col>

        <Grid.Col span={4}>
          <Paper p="md" withBorder>
            <Title order={4} mb={10}>Tipo (aftype)</Title>
            <AftypeChart data={data.aftypes} />
          </Paper>
        </Grid.Col>

        <Grid.Col span={12}>
          <Paper p="md" withBorder>
            <Title order={4} mb={10}>Conversão por Cupom</Title>
            <CouponTable data={data.coupons} />
          </Paper>
        </Grid.Col>

        <Grid.Col span={12}>
          <Paper p="md" withBorder>
            <Title order={4} mb={10}>Funil por Afiliado (afid)</Title>
            <FunnelByAfidTable data={data.funnels_by_afid} />
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  )
}
