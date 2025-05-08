'use client';

import {
  IconUsersGroup,
  IconUserCheck,
  IconTrendingDown,
  IconCalendarCheck,
  IconTarget,
  IconAlertCircle,
  IconClockHour4,
} from '@tabler/icons-react';

interface TrendComponentProps {
  data: User[];
  metas: Metas;
  atingido: number;
  atingidoAss: number;
}

export const TrendComponent = ({ data, metas }: TrendComponentProps) => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  function getBusinessDaysUntilToday(): number {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    let businessDays = 0;
    for (let d = new Date(firstDay); d <= today; d.setDate(d.getDate() + 1)) {
      const day = d.getDay();
      if (day !== 0 && day !== 6) businessDays++;
    }
    return businessDays;
  }

  function getTotalBusinessDaysInMonth(): number {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    let count = 0;
    for (let d = new Date(year, month, 1); d <= lastDay; d.setDate(d.getDate() + 1)) {
      const day = d.getDay();
      if (day !== 0 && day !== 6) count++;
    }
    return count;
  }

  const diasUteis = getBusinessDaysUntilToday();
  const diasUteisTotais = getTotalBusinessDaysInMonth();

  const closersMetaTotal = metas.closers.reduce((acc, c) => acc + c.reunioes_mes, 0);
  const sdrsMetaTotal = metas.sdrs.reduce((acc, s) => acc + s.contatos_efetivos_mes, 0);

  const metaReunioesAteHoje = Math.round((closersMetaTotal / diasUteisTotais) * diasUteis);
  const metaContatosAteHoje = Math.round((sdrsMetaTotal / diasUteisTotais) * diasUteis);

  let totalReunioes = 0;
  let totalContatosEfetivos = 0;

  data.forEach((user) => {
    const ind = user.indicators.find(i => i.month === currentMonth && i.year === currentYear);
    if (!ind) return;
    if (user.type?.type === 'closer') {
      totalReunioes += ind.meetings_held || 0;
    }
    if (user.type?.type === 'sdr' && metas.sdrs.some(s => s.id === user.id)) {
      totalContatosEfetivos += (ind.effective_contacts || 0) + (ind.effective_phone_calls || 0);
    }
  });

  const faltamContatos = Math.max(sdrsMetaTotal - totalContatosEfetivos, 0);
  const faltamReunioes = Math.max(closersMetaTotal - totalReunioes, 0);

  const diasRestantes = Math.max(diasUteisTotais - diasUteis, 1);

  const mediaContatosPorDia = Math.ceil(faltamContatos / diasRestantes);
  const mediaReunioesPorDia = Math.ceil(faltamReunioes / diasRestantes);

  const atrasoContatos = Math.max(metaContatosAteHoje - totalContatosEfetivos, 0);
  const atrasoReunioes = Math.max(metaReunioesAteHoje - totalReunioes, 0);

  return (
    <div className="flex flex-col gap-6 text-[#1F2937]">
      <CardBlock
        title="Time SDR"
        icon={<IconUsersGroup size={24} color="#15803D" />}
        highlightGreen={atrasoContatos === 0}
        stats={[
          { label: 'Realizado', value: totalContatosEfetivos, icon: <IconUserCheck size={26} /> },
          { label: 'Meta Mensal', value: sdrsMetaTotal, icon: <IconTarget size={26} /> },
          { label: 'Meta até Hoje', value: metaContatosAteHoje, icon: <IconCalendarCheck size={26} /> },
          { label: 'Atraso', value: atrasoContatos, highlight: atrasoContatos > 0, icon: <IconTrendingDown size={26} /> },
          { label: 'Restante', value: faltamContatos, icon: <IconAlertCircle size={26} /> },
          { label: 'Média p/ dia útil', value: mediaContatosPorDia, icon: <IconClockHour4 size={26} /> },
        ]}
      />

      <CardBlock
        title="Time Closer"
        icon={<IconUsersGroup size={24}  color="#1D4ED8" />}
        highlightGreen={atrasoReunioes === 0}
        stats={[
          { label: 'Realizado', value: totalReunioes, icon: <IconUserCheck size={26} /> },
          { label: 'Meta Mensal', value: closersMetaTotal, icon: <IconTarget size={26} /> },
          { label: 'Meta até Hoje', value: metaReunioesAteHoje, icon: <IconCalendarCheck size={26} /> },
          { label: 'Atraso', value: atrasoReunioes, highlight: atrasoReunioes > 0, icon: <IconTrendingDown size={26} /> },
          { label: 'Restante', value: faltamReunioes, icon: <IconAlertCircle size={26} /> },
          { label: 'Média p/ dia útil', value: mediaReunioesPorDia, icon: <IconClockHour4 size={26} /> },
        ]}
      />
    </div>
  );
};

const CardBlock = ({
  title,
  icon,
  stats,
  highlightGreen,
}: {
  title: string;
  icon: React.ReactNode;
  stats: { label: string; value: number; highlight?: boolean; icon?: React.ReactNode }[];
  highlightGreen?: boolean;
}) => (
  <div className={`rounded-xl p-6 shadow-sm border transition-all duration-300 ${
    highlightGreen
      ? 'border-[#86EFAC] bg-[#DCFCE7]'
      : 'border-[#FCA5A5] bg-[#fecaca]'
  }`}>
    <div className="flex items-center gap-3 mb-5">
      {icon}
      <h3 className="text-lg font-bold font-gray-800 mb-[7px]">{title}</h3>
    </div>
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 ${
            stat.highlight
              ? 'border-[#EF4444] bg-[#FEE2E2] text-[#991B1B]'
              : 'border-[#E5E7EB] bg-[#FFFFFF]'
          }`}
        >
          {stat.icon && <div>{stat.icon}</div>}
          <div className="flex flex-col text-sm">
            <span className="font-medium">{stat.label}</span>
            <span className="text-lg font-bold">{stat.value}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
