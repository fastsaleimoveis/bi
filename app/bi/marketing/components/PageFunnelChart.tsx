'use client'

import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

type PageAccess = {
  page: string
  total: number
}

export function PageFunnelChart({ data }: { data: PageAccess[] }) {
  const ordered = [
    'registre-se',
    'registro-passo-2',
    'registro-passo-3',
    'dashboard',
    'carrinho',
    'checkout',
    'compra-finalizada',
  ]

  const chartData = {
    labels: ordered.map((step) => step),
    datasets: [
      {
        label: 'Acessos por etapa',
        data: ordered.map((step) => {
          const found = data.find((item) => item.page === step)
          return found ? found.total : 0
        }),
        backgroundColor: '#10b981',
      }
    ]
  }

  return <Bar data={chartData} />
}
