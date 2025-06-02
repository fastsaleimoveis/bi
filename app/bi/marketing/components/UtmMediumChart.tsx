'use client'

import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

type UtmMedium = {
  utm_medium: string
  total: number
}

export function UtmMediumChart({ data }: { data: UtmMedium[] }) {
  const chartData = {
    labels: data.map(d => d.utm_medium),
    datasets: [
      {
        label: 'Distribuição',
        data: data.map(d => d.total),
        backgroundColor: [
          '#34d399', '#60a5fa', '#facc15', '#f87171', '#a78bfa', '#fb923c'
        ],
      }
    ]
  }

  return <Pie data={chartData} />
}
