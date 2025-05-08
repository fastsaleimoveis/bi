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
import { TrendComponent } from '../TrendComponent';
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';


const metas = {
  gerais: [
    { type: 'all', label: 'VGV', value: 107000 },
    { type: 'all', label: 'Assinaturas', value: 36 },
  ],
  sdrs: [
    {
      id: 14,
      contatos_efetivos_mes: 450,
      dias_no_mes: 22
    },
    {
      id: 15,
      contatos_efetivos_mes: 450,
      dias_no_mes: 22
    }
  ],
  closers: [
    {
      id: 9,
      reunioes_mes: 72,
      dias_no_mes: 22
    },
    {
      id: 5,
      reunioes_mes: 72,
      dias_no_mes: 22
    },
    {
      id: 8,
      reunioes_mes: 72,
      dias_no_mes: 22
    }
  ]
};

export const OperationComponent = () => {
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

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
  
    fetchData();
  
    const fetchInterval = setInterval(fetchData, 60 * 3000);
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
  
    let slideInterval: NodeJS.Timeout | null = null;
    if (autoSlide) {
      slideInterval = setInterval(() => {
        setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
      }, 10000);
    }
  
    return () => {
      clearInterval(fetchInterval);
      clearInterval(timeInterval);
      if (slideInterval) clearInterval(slideInterval);
    };
  }, [autoSlide]);
  

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

  const atingidoAss = data
    ?.filter(user => user.type?.type === 'closer')
    .map(user => user.indicators.find(ind =>
      ind.month === now.getMonth() + 1 &&
      ind.year === now.getFullYear()
    ))
    .filter(Boolean)
    .reduce((sum, ind) => sum + (ind?.sales || 0), 0) || 0;

    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const nomeMes = meses[now.getMonth()];

    const mockData = {
      accept_verbal:100,
      appointments:100,
      collaborator_id:100,
      contacts_made:100,
      effective_contacts:100,
      effective_phone_calls:100,
      efficiency:100,
      id:999,
      link_sent:100,
      meetigs_held:100,
      month:5,
      no_show:100,
      phone_calls_made:100,
      sales:100,
      vgv:100,
      year:2025,
      rescheduled:100,
      escheduled:100,
      future_return:100,
      no_answer:100,
      lost:100,
      reschedule:100,
      in_negotiation:100,
      tag_not_sale:100,
      meetings_held:100,
      total_mettings:100,
    }

  return (
    data &&
    <div className="bg-[#fff] fixed w-full h-full overflow-hidden inset-0 py-2 px-4">
        <div className="flex items-center justify-between pb-2">
          <span className="w-[300px]">
            <Image
              src="/logo-dark.png"
              width={140}
              height={100}
              alt="Logo Fast Sale"
            />
            </span>
            <h1 className="text-2xl text-[#1F2937] font-bold uppercase">Dashboard Comercial - {nomeMes}</h1>

            <div className="flex justify-center gap-2">
              <div className="text-right text-sm font-semibold text-[#4B5563] leading-tight">
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
              <button
                className={`px-4 py-1 rounded-full text-sm font-bold ${currentSlide === 0
                  ? 'bg-[#059669] text-[#FFFFFF]'
                  : 'bg-[#E5E7EB] text-[#1F2937]'}`}
                onClick={() => setCurrentSlide(0)}
              >
                <IconArrowNarrowLeft/>
              </button>
              <button
                className="px-4 py-1 rounded-full text-sm font-bold bg-[#E5E7EB] text-[#1F2937]"
                onClick={() => setAutoSlide(prev => !prev)}
              >
                {autoSlide ? <IconPlayerPause size={20} /> : <IconPlayerPlay size={20} />}
              </button>
              <button
                className={`px-4 py-1 rounded-full text-sm font-bold ${currentSlide === 1
                  ? 'bg-[#059669] text-[#FFFFFF]'
                  : 'bg-[#E5E7EB] text-[#1F2937]'}`}
                onClick={() => setCurrentSlide(1)}
              >
                <IconArrowNarrowRight/>
              </button>
            </div>
        </div>

        <span className="block w-full h-px bg-[#065F46] mb-4"></span>


        {currentSlide === 0 && (
          <div className="flex gap-6 h-full pb-20">
              <div className="max-w-[69%] w-[69%] flex gap-2 flex-wrap h-full">
              {data
                .filter(users => users.type && (users.type.type === 'sdr' || users.type.type === 'closer'))
                .map((item, index) => {
                  const now = new Date();
                  const currentIndicator = item.indicators.find(ind =>
                    ind.month === now.getMonth() + 1 &&
                    ind.year === now.getFullYear()
                  );

                  return (
                    <BiSdrCard metas={metas} key={index} data={currentIndicator || null} name={item.name} />
                  );
                })}
              
                <BiSdrCard metas={metas} data={mockData || null} name={'Vago'} />
                <BiSdrCard metas={metas} data={mockData || null} name={'Vago'} />
                <BiSdrCard metas={metas} data={mockData || null} name={'Vago'} />
              </div>
              <div className="w-[30%] flex flex-col gap-4 h-full">
                {data
                  .filter(users => users.type && users.type.type === 'closer')
                  .map((item, index) => {
                    const now = new Date();
                    const currentIndicator = item.indicators.find(ind =>
                      ind.month === now.getMonth() + 1 &&
                      ind.year === now.getFullYear()
                    );

                    return (
                      <BiCloserCard metas={metas} key={index} data={currentIndicator || null} name={item.name} />
                    );
                  })}
              </div>
          </div>
        )}

        {currentSlide === 1 && (
          <div className="w-full flex gap-12 p-4">
            <div className="w-[30%] pt-[18px]">
              <MetaProgress metas={metas} atingido={atingido} atingidoAss={atingidoAss}/>
            </div>
            <div className="w-[30%] pt-[18px]">
              <TrendComponent metas={metas} atingido={atingido} atingidoAss={atingidoAss} data={data.filter(users => users.type)}/>
            </div>
            <div className="w-[40%]">
              <TotalComercial data={data.filter(users => users.type)}/>
            </div>
          </div>
        )}

    </div>
  );
};
