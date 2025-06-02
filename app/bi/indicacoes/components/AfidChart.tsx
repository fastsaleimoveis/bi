'use client'

import { Card } from '@mantine/core'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface AfidChartProps {
  data: {
    afid: string
    name: string
    total: number
    percent: number
  }[]
}

export const AfidChart = ({ data }: AfidChartProps) => {
  return (
    <Card>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value: number) => `${value} acessos`} />
          <Bar dataKey="total" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
