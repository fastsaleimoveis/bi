'use client';

import { Tabs, Text, rem } from '@mantine/core';
import { IconUsersGroup, IconBriefcase } from '@tabler/icons-react';
import { IndicadoresCards } from '../IndicadoresCards';
import { ClosersIndicadoresCards } from '../ClosersIndicadoresCardsProps';
import { SDRPerformanceTable } from '../SDRPerformanceTable';
import { ClosersPerformanceTable } from '../ClosersPerformanceTable';
import { TeamOverview } from '../TeamOverview';


interface IndicadoresTabsProps {
  sdrData:Sdr[];
  closersData: Closer[];
  consolidado:Consolidado;
}

export const IndicadoresTabs = ({ sdrData, closersData, consolidado }: IndicadoresTabsProps) => {
  return (
    <Tabs defaultValue="sdr" variant="outline" radius="md">
      <Tabs.List>
        <Tabs.Tab value="sdr" leftSection={<IconUsersGroup size={20} />}>
          Indicadores SDR
        </Tabs.Tab>
        <Tabs.Tab value="closer" leftSection={<IconBriefcase size={20} />}>
          Indicadores Closer
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="sdr" pt="md">
        <IndicadoresCards data={sdrData} />
        <div className="h-8"></div>
        <TeamOverview data={consolidado} />
        <Text size="lg" fw={500} mt="lg">Desempenho por SDR</Text>
        <SDRPerformanceTable sdrs={sdrData}/>
      </Tabs.Panel>

      <Tabs.Panel value="closer" pt="md">
        <ClosersIndicadoresCards data={closersData} />
        <div className="h-8"></div>
        <TeamOverview data={consolidado} />
        <Text size="lg" fw={500} mt="lg">Desempenho por Closer</Text>
        <ClosersPerformanceTable closers={closersData}/>
      </Tabs.Panel>
    </Tabs>
  );
};
