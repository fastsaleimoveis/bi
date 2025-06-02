'use client'

import { Table } from '@mantine/core'

type UtmCampaignItem = {
  utm_campaign: string
  total: number
  percent: number
}

export function UtmCampaignTable({ data }: { data: UtmCampaignItem[] }) {
  return (
    <Table striped highlightOnHover>
      <thead>
        <tr>
          <th>Campanha</th>
          <th>Total</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i} style={{marginBottom:'20px'}}>
            <td>{item.utm_campaign}</td>
            <td style={{textAlign:'center'}}>{item.total}</td>
            <td style={{textAlign:'center'}}>{item.percent}%</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
