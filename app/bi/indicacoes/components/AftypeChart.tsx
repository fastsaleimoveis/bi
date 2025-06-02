'use client'

import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { Text } from '@mantine/core'

type AfTypeData = {
  aftype: string
  total: number
}

export function AftypeChart({ data }: { data: AfTypeData[] }) {
  if (!data || data.length === 0) return <Text>Nenhum dado</Text>

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="total"
          nameKey="aftype"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}