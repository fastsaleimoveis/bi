'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Text } from '@mantine/core'

type AfOriginData = {
  aforigin: string
  total: number
}

export function AforiginChart({ data }: { data: AfOriginData[] }) {
  if (!data || data.length === 0) return <Text>Nenhum dado</Text>

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="aforigin" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}