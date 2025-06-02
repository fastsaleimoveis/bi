'use client'

import { Table } from '@mantine/core'

type CouponAnalytics = {
  coupon: string
  total: number
  conversions: number
  conversion_rate: number
}

export function CouponTable({ data }: { data: CouponAnalytics[] }) {
  if (!data || data.length === 0) return <p>Nenhum dado</p>

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Cupom</th>
          <th>Total Usos</th>
          <th>Conversões</th>
          <th>Taxa de Conversão (%)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i}>
            <td>{item.coupon}</td>
            <td>{item.total}</td>
            <td>{item.conversions}</td>
            <td>{item.conversion_rate}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}