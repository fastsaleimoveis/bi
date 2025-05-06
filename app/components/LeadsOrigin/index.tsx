'use client';

import { BarChart } from '@mantine/charts';

export const LeadsOrigin = () => {
  const data = [
    { fonte: 'INSTAGRAM', leads: 30 },
    { fonte: 'ADS', leads: 60 },
    { fonte: 'FILA', leads: 0 },
    { fonte: 'PORTAIS', leads: 30 },
    { fonte: 'GOOGLE', leads: 0 },
    { fonte: 'NETWORKING', leads: 0 },
  ];

  return (
    <div className="mt-16">
      <h3 className="text-white font-semibold text-lg mb-6">Fontes de Leads</h3>
      <BarChart
        h={260}
        data={data}
        dataKey="fonte"
        className="max-w-[610px] -ml-8"
        series={[{ name: 'leads', color: 'green.5' }]}
        xAxisProps={{
          tick: { fill: 'white', fontSize: 12 },
          interval: 0,
        }}
        yAxisProps={{
          tick: { fill: 'white', fontSize: 12 },
          domain: [0, 7],
          tickCount: 8,
        }}
        withBarValueLabel
        valueLabelProps={{
          fill: 'white',
          fontSize: 12,
          fontWeight: 600,
          position: 'top',
        }}
        gridAxis="y"
        tickLine="xy"
        withTooltip={false}
      />
    </div>
  );
};
