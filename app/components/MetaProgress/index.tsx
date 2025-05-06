'use client';

import { BarChart } from '@mantine/charts';

interface MetaProgressProps {
  meta: number;
  atingido: number;
}

export const MetaProgress = ({ meta, atingido }: MetaProgressProps) => {
  const restante = Math.max(meta - atingido, 0);

  return (
    <div>
      <h3 className="text-gray-800 font-semibold mb-4 text-lg">Progresso Meta</h3>
        <BarChart
            h={360}
            data={[
                { name: 'Atingido', value: atingido },
                { name: 'Restante', value: restante },
            ]}
            dataKey="name"
            textColor="gray.8"
            series={[
                {
                    name: 'value',
                },
            ]}
            getBarColor={(value) =>
                value === atingido ? 'green.5' : 'green.9'
            }
            yAxisProps={{
                tick: { fill: 'gray.8', fontSize: 12 },
                domain: [0, meta],
                tickFormatter: (val: number) =>
                val.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    maximumFractionDigits: 0,
                }),
            }}
            xAxisProps={{
                tick: { fill: 'gray.8', fontSize: 12 },
            }}
            valueFormatter={(val: number) =>
                val.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                maximumFractionDigits: 0,
                })
            }
            withBarValueLabel
            valueLabelProps={{
                fill: 'gray.8',
                fontSize: 14,
                fontWeight: 600,
                position: 'top',
            }}
            gridAxis="y"
            tickLine="y"
            withTooltip={false}
        />
    </div>
  );
};
