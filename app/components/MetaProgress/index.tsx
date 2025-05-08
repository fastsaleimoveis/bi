'use client';

import { BarChart } from '@mantine/charts';

interface MetaProgressProps {
  atingido: number;
  atingidoAss:number;
  metas:Metas;
}

export const MetaProgress = ({ atingido, metas, atingidoAss }: MetaProgressProps) => {

  const meta = metas.gerais.filter(m => m.label === 'VGV')[0].value
  const metaAss = metas.gerais.filter(m => m.label === 'Assinaturas')[0].value

  const restante = Math.max(meta - atingido, 0);
  const restanteAss = Math.max(metaAss - atingidoAss, 0);
  
  return (
    <div className="flex flex-col gap-4">
        <div className="p-4 shadow-lg border border-[#E5E7EB] rounded-[20px]">
            <h3 className="text-[#1F2937] font-semibold mb-4 text-lg">Meta VGV</h3>
            <BarChart
                h={280}
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
        <div className="p-4 shadow-lg border border-[#E5E7EB] rounded-[20px]">
            <h3 className="text-[#1F2937] font-semibold mb-4 text-lg">Meta Vendas</h3>
            <BarChart
                h={280}
                className="mt-6"
                data={[
                    { name: 'Atingido', value: atingidoAss },
                    { name: 'Restante', value: restanteAss },
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
                    domain: [0, metaAss],
                }}
                xAxisProps={{
                    tick: { fill: 'gray.8', fontSize: 12 },
                }}
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
    </div>
  );
};
