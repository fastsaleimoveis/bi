'use client';

interface TotalComercialProps {
  data: User[];
}

export const TotalComercial = ({ data }: TotalComercialProps) => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const totals = {
    meetings_held: 0,
    in_negotiation: 0,
    lost: 0,
    accept_verbal: 0,
    link_sent: 0,
    sales: 0,
    vgv: 0,
    contacts_made: 0,
    effective_contacts: 0,
    phone_calls_made: 0,
    effective_phone_calls: 0,
    no_answer: 0,
    appointments: 0,
    no_show: 0,
  };

  data.forEach((user) => {
    const indicator = user.indicators.find(
      (ind) => ind.month === currentMonth && ind.year === currentYear
    );
    if (!indicator) return;

    // Soma indicadores comuns para SDRs e Closers
    totals.meetings_held += indicator.meetings_held || 0;
    totals.in_negotiation += indicator.in_negotiation || 0;
    totals.lost += indicator.lost || 0;
    totals.accept_verbal += indicator.accept_verbal || 0;
    totals.link_sent += indicator.link_sent || 0;
    totals.sales += indicator.sales || 0;
    totals.vgv += indicator.vgv || 0;
    totals.contacts_made += indicator.contacts_made || 0;
    totals.effective_contacts += indicator.effective_contacts || 0;
    totals.phone_calls_made += indicator.phone_calls_made || 0;
    totals.effective_phone_calls += indicator.effective_phone_calls || 0;
    totals.no_answer += indicator.no_answer || 0;
    totals.appointments += indicator.appointments || 0;
    totals.no_show += indicator.no_show || 0;
  });

  const dataNumbers = [
    // { label: 'Contato Realizado', number: totals.contacts_made },
    { label: 'Contato Efetivo', number: totals.effective_contacts },
    // { label: 'Ligação Realizada', number: totals.phone_calls_made },
    { label: 'Ligação Efetiva', number: totals.effective_phone_calls },
    // { label: 'Sem Resposta', number: totals.no_answer },
    { label: 'Total Contatos', number: totals.effective_phone_calls + totals.effective_contacts },
    { label: 'Agendamentos', number: totals.appointments },
    {
      label: '% Agendamentos',
      number:
        totals.appointments > 0
          ? (
              (totals.appointments * 100) /
              (totals.effective_contacts + totals.effective_phone_calls || 1)
            ).toFixed(1) + '%'
          : 0 + '%',
    },
    // { label: 'No Show', number: totals.no_show },
    // {
    //   label: '% No Show',
    //   number:
    //     totals.appointments > 0
    //       ? ((totals.no_show * 100) / totals.appointments).toFixed(0)
    //       : 0,
    // },
    { label: 'Reunião Realizada', number: totals.meetings_held },
    { label: 'Em Negociação', number: totals.in_negotiation.toLocaleString('pt-br', {minimumFractionDigits: 2}) },
    { label: 'Não Venda', number: totals.lost.toLocaleString('pt-br', {minimumFractionDigits: 2}) },
    { label: 'Aceite Verbal', number: totals.accept_verbal.toLocaleString('pt-br', {minimumFractionDigits: 2}) },
    { label: 'Link de Pagamento', number: totals.link_sent.toLocaleString('pt-br', {minimumFractionDigits: 2}) },
    { label: 'Vendas', number: totals.sales },
    {
      label: 'Venda VGV',
      number: totals.vgv.toLocaleString('pt-br', {minimumFractionDigits: 2}),
    },
    {label:'Eficiência', number:totals.sales !== 0 ? ((totals.sales * 100) / totals.meetings_held).toFixed(1) + '%' : 0 + '%'},
  ];

  return (
    <div className="w-full max-w-[680px] shadow-lg border border-[#9CA3AF] rounded-[20px] p-4 flex-1 h-full bg-[#E5E7EB]  -mt-8">
      <div className="flex gap-4 items-center">
        <div>
          <h5 className="	text-[#065F46] font-bold text-[24px] mb-4">Total Comercial</h5>
        </div>
      </div>
      <div className="flex justify-between gap-2 flex-wrap w-full">
        {dataNumbers.map((item, index) => (
          <div className="flex flex-col flex-1 min-w-[140px] max-w-[33%]" key={index}>
            <label className="	text-[#065F46] text-xs text-center mb-1 h-[15px]">
              {item.label}
            </label>
            <span className="border bg-white text-[#4B5563] font-bold text-center text-xl rounded-lg w-full flex items-center justify-center h-[40px]">
              {item.number}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
