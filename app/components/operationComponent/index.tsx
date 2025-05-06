'use client';

import { useEffect, useState } from 'react';
import {
  Loader,
} from '@mantine/core';
import instance from '@/app/lib/axios';
import { BiSdrCard } from '../biSdrCard';
import { BiCloserCard } from '../biCloserCard';
import { MetaProgress } from '../MetaProgress';
import Image from 'next/image';
// import Link from 'next/link';
import { TotalComercial } from '../TotalComerical';


const meta = 100000

export const OperationComponent = () => {
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchData = () => {
      instance
        .get('/collaborators')
        .then((res) => {
          setData(res.data);
          setLastUpdated(new Date());
        })
        .catch((err) => console.error('Erro ao carregar dashboard:', err))
        .finally(() => setLoading(false));
    };

    fetchData(); // primeira chamada

    const fetchInterval = setInterval(fetchData, 60 * 1000); // 1 minuto
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000); // atualiza relógio atual

    return () => {
      clearInterval(fetchInterval);
      clearInterval(timeInterval);
    };
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
    <div className="bg-white fixed w-full h-full overflow-hidden inset-0 p-4">
        <div className="flex items-center justify-between pb-4">
          <span className="w-[240px]">
            <Image
              src="/logo-dark.png"
              width={140}
              height={100}
              alt="Logo Fast Sale"
            />
            </span>
            <h1 className="text-2xl text-gray-800 font-bold uppercase">Dashboard Comercial - {nomeMes}</h1>

            <div className="text-right text-sm font-semibold text-gray-600 leading-tight">
              <div>Atualizado: {lastUpdated?.toLocaleString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              }) || '--'}</div>
              <div>Agora: {currentTime.toLocaleString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}</div>
            </div>
        </div>

        <span className="block w-full h-px bg-[#065F46] mb-4"></span>

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
                <TotalComercial data={data.filter(users => users.type)}/>
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
            </div>
        </div>

    </div>
  );
};
