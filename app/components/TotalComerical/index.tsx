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
    tag_not_sale:0,
    no_show: 0,
    escheduled:0,
  };

  data.forEach((user) => {
    const indicator = user.indicators.find(
      (ind) => ind.month === currentMonth && ind.year === currentYear
    );
    if (!indicator) return;

    Object.entries(totals).forEach(([key]) => {
      totals[key as keyof typeof totals] += indicator[key as keyof typeof totals] || 0;
    });
  });

  const dataSections = [
    {
      title: 'Contatos',
      items: [
        { label: 'WhatsApp Iniciado', number: totals.contacts_made },
        { label: 'WhatsApp Efetivo', number: totals.effective_contacts },
        { label: 'WhatsApp Conversão', number: ((totals.effective_contacts * 100) / totals.contacts_made).toFixed(1) + "%"  },
        { label: 'Ligação Realizada', number: totals.phone_calls_made },
        { label: 'Ligação Efetiva', number: totals.effective_phone_calls },
        { label: 'Ligação Conversão', number: ((totals.effective_phone_calls * 100) / totals.phone_calls_made).toFixed(1) + "%" },
        {
          label: 'Contato Iniciado',
          number: (totals.contacts_made || 0) + (totals.phone_calls_made || 0),
        },
        {
          label: 'Contato Efetivo',
          number: (totals.effective_contacts || 0) + (totals.effective_phone_calls || 0),
        },
        {
          label: 'Contato Conversão',
          number: (totals.contacts_made + totals.phone_calls_made) > 0
          ? (
              ((totals.effective_contacts + totals.effective_phone_calls) * 100) /
              (totals.contacts_made + totals.phone_calls_made)
            ).toFixed(1) + "%"
          : "0%",
        },
      ],
    },
    {
      title: 'Agendamentos',
      items: [
        { label: 'Agendamentos', number: totals.escheduled },
        {
          label: '% Agendamentos',
          number:
            totals.escheduled > 0
              ? (
                  (totals.escheduled * 100) /
                  (totals.effective_contacts + totals.effective_phone_calls || 1)
                ).toFixed(1) + '%'
              : '0%',
        },
        { label: 'No Show', number: totals.no_show },
        {
          label: '% No Show',
          number:
            totals.escheduled > 0
              ? ((totals.no_show * 100) / totals.escheduled).toFixed(0) + '%'
              : '0%',
        },
      ],
    },
    {
      title: 'Negociação',
      items: [
        { label: 'Reunião Realizada', number: totals.meetings_held },
        {
          label: 'Em Negociação',
          number: totals.in_negotiation.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
          }),
        },
        {
          label: 'Não Venda',
          number: totals.tag_not_sale.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
          }),
        },
      ],
    },
    {
      title: 'Fechamentos',
      items: [
        {
          label: 'Aceite Verbal',
          number: totals.accept_verbal.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
          }),
        },
        {
          label: 'Link de Pagamento',
          number: totals.link_sent.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
          }),
        },
        { label: 'Vendas', number: totals.sales },
        {
          label: 'Venda VGV',
          number: totals.vgv.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
          }),
        },
        {
          label: 'Eficiência',
          number:
            totals.sales !== 0
              ? ((totals.sales * 100) / totals.meetings_held).toFixed(1) + '%'
              : '0%',
        },
      ],
    },
  ];

  return (
    <div className="w-full shadow-lg border border-[#9CA3AF] rounded-[20px] p-4 flex-1 h-full bg-[#F3F4F6] mt-4 max-h-max">
      <h5 className="text-[#065F46] font-bold text-[24px] mb-4">
        Total Comercial
      </h5>

      {dataSections.map((section, i) => (
        <div key={i} className="mb-5">
          <h6 className="text-[#065F46] font-semibold text-sm mb-2 border-b pb-1 border-[#D1D5DB]">
            {section.title}
          </h6>
          <div className="flex flex-wrap gap-2">
            {section.items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col flex-1 min-w-[130px] max-w-[32%]"
              >
                <label className="text-[#374151] text-xs text-center mb-1">
                  {item.label}
                </label>
                <span className="bg-white border text-[#4B5563] font-bold text-center text-lg rounded-lg w-full h-[40px] flex items-center justify-center">
                  {item.number}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
