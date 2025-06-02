'use client'

import { useEffect, useState } from 'react'
import instance from '@/app/lib/axios'
import { Loader, Title, Paper, Grid } from '@mantine/core'
import { UtmSourceChart } from './components/UtmSourceChart'
import { UtmMediumChart } from './components/UtmMediumChart'
import { UtmCampaignTable } from './components/UtmCampaignTable'
import { PageFunnelChart } from './components/PageFunnelChart'
import CampaignFunnelGraph from './components/CampaignFunnelTable'
import { FbclidJourneyList } from './components/FbclidJourneyList'

type UtmSource = {
  utm_source: string
  total: number
}
type UtmMedium = {
  utm_medium: string
  total: number
}
type UtmCampaign = {
  utm_campaign: string
  total: number
  percent: number
}
type PageTotal = { page: string; total: number }

type FunnelRow = {
  utm_campaign: string | null
  step_registre_se: number
  step_passo_2: number
  step_passo_3: number
  step_cadastro_finalizado: number
  step_carrinho: number
  step_checkout: number
  step_compra: number
  step_reuniao_agendada: number
  step_em_negociacao: number
  step_venda_por_reuniao: number
}

type JourneyStep = {
  page: string
  utm_campaign: string | null
  ts: string
}

type FbclidJourneyItem = {
  fbclid: string
  journey: JourneyStep[]
}

type UtmSummaryData = {
  utm_sources: UtmSource[]
  utm_mediums: UtmMedium[]
  utm_campaigns: UtmCampaign[]
  pages: PageTotal[]
  funnels_by_campaign: FunnelRow[]
  fbclids: FbclidJourneyItem[]
}


export default function UtmDashboard() {
  const [data, setData] = useState<UtmSummaryData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    instance.get('/bi/utm-summary')
      .then(res => setData(res.data))
      .catch(err => console.error('Erro ao carregar dados de UTM:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />

  return (
    data &&
    <div className="p-6">
      <Title order={3} style={{marginBottom:'20px'}}>Análise de Origem de Acessos</Title>

      <Grid>
        <Grid.Col span={3}>
          <Paper p="md" withBorder style={{height: '360px'}}>
            <Title order={4} mb={10}>Canais (utm_source)</Title>
            <UtmSourceChart data={data.utm_sources} />
          </Paper>
        </Grid.Col>

        <Grid.Col span={2}>
          <Paper p="md" withBorder style={{height: '360px'}}>
            <Title order={4} mb={10}>Mídias (utm_medium)</Title>
            <UtmMediumChart data={data.utm_mediums} />
          </Paper>
        </Grid.Col>

        <Grid.Col span={3}>
          <Paper p="md" withBorder style={{height: '360px'}}>
            <Title order={4} mb={10}>Top 10 Campanhas (utm_campaign)</Title>
            <UtmCampaignTable data={data.utm_campaigns} />
          </Paper>
        </Grid.Col>

        <Grid.Col span={4}>
            <Paper p="md" withBorder style={{height: '360px'}}>
                <Title order={4} mb={10}>Funil Geral por Página</Title>
                <PageFunnelChart data={data.pages} />
            </Paper>
        </Grid.Col>

        <Grid.Col span={6}>
            <Paper p="md" withBorder>
                <Title order={4} mb={10}>Funil de conversões</Title>
                {data.funnels_by_campaign.map((row) => (
                    <div key={row.utm_campaign}>
                        <Title order={5} style={{color:'#333'}}>{row.utm_campaign || '(indefinida)'}</Title>
                        <CampaignFunnelGraph row={row} />
                    </div>
                ))}
            </Paper>
        </Grid.Col>

        <Grid.Col span={6}>
            <Paper p="md" withBorder>
                <Title order={4} mb={10}>Jornada por Usuário (fbclid)</Title>
                <FbclidJourneyList data={data.fbclids.slice(0, 10)} />
            </Paper>
        </Grid.Col>
      </Grid>
    </div>
  )
}
