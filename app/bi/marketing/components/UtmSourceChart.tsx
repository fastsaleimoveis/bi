'use client'

import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

type UtmSource = {
  utm_source: string
  total: number
}


export function UtmSourceChart({ data }: { data: UtmSource[] }) {
  const chartData = {
    labels: data.map(d => d.utm_source),
    datasets: [
      {
        label: 'Total de acessos',
        data: data.map(d => d.total),
        backgroundColor: '#3b82f6',
      }
    ]
  }

  return <Bar data={chartData} />
}
