'use client'

import { useEffect, useState } from 'react'
import instance from '@/app/lib/axios'
import { Loader, Title, Paper, Grid, Table, Text } from '@mantine/core'
import { BarChart } from '@mantine/charts'

export default function EngajamentoDashboard() {
  const [data, setData] = useState<EngajamentoData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    instance.get('/bi/engajamento-summary')
      .then(res => setData(res.data))
      .catch(err => console.error('Erro ao carregar engajamento:', err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />

  return (
    data &&
    <div className="p-6">
      <Title order={2} className="mb-4">Análise de Engajamento</Title>

      <Grid gutter="xl">
        <Grid.Col span={6}>
          <Paper p="md" withBorder>
            <Title order={4} mb="sm">Top 10 Páginas Acessadas</Title>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Página</Table.Th>
                  <Table.Th>Acessos</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {data.top_pages.map((page, i: number) => (
                  <Table.Tr key={i}>
                    <Table.Td>{page.url}</Table.Td>
                    <Table.Td>{page.total}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        </Grid.Col>

        <Grid.Col span={6}>
          <Paper p="md" withBorder>
            <Title order={4} mb="sm">Páginas por Sessão (por tipo)</Title>
            <ul style={{ paddingLeft: 20 }}>
              {Object.entries(data.by_user_type).map(([key, val], i) => (
                <li key={i}>
                  <Text>{key}: {Number(val).toFixed(2)} páginas/sessão</Text>
                </li>
              ))}
            </ul>
          </Paper>
        </Grid.Col>

        <Grid.Col span={12}>
          <Paper p="md" withBorder>
            <Title order={4} mb="sm">Fluxos Comuns (Top Navegação)</Title>
            <Table striped>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Sequência</Table.Th>
                  <Table.Th>Total Sessões</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {data.flows.slice(0, 10).map((flow, i: number) => (
                  <Table.Tr key={i}>
                    <Table.Td>{flow.sequence.join(' → ')}</Table.Td>
                    <Table.Td>{flow.count}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        </Grid.Col>

        <Grid.Col span={12}>
          <Paper p="md" withBorder>
            <Title order={4} mb="sm">Acessos por Hora</Title>
            <BarChart
              h={300}
              data={data.access_by_hour.map((d) => ({
                hour: `${d.hour}h`,
                acessos: d.total
              }))}
              dataKey="hour"
              series={[{ name: 'acessos', color: 'blue' }]}
              yAxisLabel="Acessos"
            />
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  )
}
