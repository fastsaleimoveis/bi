'use client';

import { PieChart } from '@mantine/charts';

interface EfficiencyProps {
  vendas: number;
  reunioes: number;
}

export const Efficiency = ({ vendas, reunioes }: EfficiencyProps) => {
  const restante = Math.max(reunioes - vendas, 0);

  return (
    <div>
      <h3 className="text-white font-semibold text-lg">Eficiência de vendas</h3>
      <PieChart
        className="h-[300px]"
        data={[
          { name: 'Vendas', value: vendas, color: 'green.4' },
          { name: 'Restante', value: restante, color: 'white' },
        ]}
        withLabelsLine
        labelsPosition="outside"
        labelsType="percent"
        size={240}
        withLabels
      />
    </div>
  );
};
