'use client';

import { useEffect, useState } from 'react';
import {
  Button,
  Loader,
} from '@mantine/core';
import instance from '@/app/lib/axios';
import { BiSdrCard } from '../biSdrCard';
import { BiCloserCard } from '../biCloserCard';
import { MetaProgress } from '../MetaProgress';
import { Efficiency } from '../Efficiency';
import { TotalComercial } from '../TotalComercial';
import { LeadsOrigin } from '../LeadsOrigin';
import Image from 'next/image';
import Link from 'next/link';


const meta = 100000

export const OperationComponent = () => {
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance
      .get('/collaborators')
      .then((res) => setData(res.data))
      .catch((err) => console.error('Erro ao carregar dashboard:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const now = new Date();
  const atingido = data
    ?.filter(user => user.type?.type === 'closer')
    .map(user => user.indicators.find(ind =>
      ind.month === now.getMonth() + 1 &&
      ind.year === now.getFullYear()
    ))
    .filter(Boolean)
    .reduce((sum, ind) => sum + (ind?.vgv || 0), 0) || 0;

    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const nomeMes = meses[now.getMonth()];

  return (
    data &&
    <div className="bg-green-800 fixed w-full h-full overflow-hidden inset-0 p-4">
        <div className="flex items-center justify-between pb-4">
            <Image
              src="/logo-light.png"
              width={140}
              height={100}
              alt="Logo Fast Sale"
            />
            <h1 className="text-2xl text-white font-bold uppercase">Dashboard Operacional - {nomeMes}</h1>

            <Link href="/login"><Button size="md">Login</Button></Link>
        </div>

        <span className="block w-full h-px bg-green-700 mb-4"></span>

        <div className="flex gap-12 h-full pb-20">
            <div className="w-[35%] flex flex-col gap-4 flex-wrap h-full">
            {data
              .filter(users => users.type && users.type.type === 'sdr')
              .map((item, index) => {
                const now = new Date();
                const currentIndicator = item.indicators.find(ind =>
                  ind.month === now.getMonth() + 1 &&
                  ind.year === now.getFullYear()
                );

                return (
                  <BiSdrCard key={index} data={currentIndicator || null} name={item.name} />
                );
              })}
            </div>
            <div className="w-[30%] flex flex-col gap-12">
                <MetaProgress meta={meta} atingido={atingido}/>

                {/* <Efficiency vendas={vendas + 1} reunioes={reunioes + 10} /> */}
            </div>
            <div className="w-[35%] flex flex-col gap-4 flex-wrap h-full">
              {data
                .filter(users => users.type && users.type.type === 'closer')
                .map((item, index) => {
                  const now = new Date();
                  const currentIndicator = item.indicators.find(ind =>
                    ind.month === now.getMonth() + 1 &&
                    ind.year === now.getFullYear()
                  );

                  return (
                    <BiCloserCard key={index} data={currentIndicator || null} name={item.name} />
                  );
                })}

                {/* <TotalComercial data={data}/> */}

                {/* <LeadsOrigin/> */}
            </div>
        </div>

    </div>
  );
};
