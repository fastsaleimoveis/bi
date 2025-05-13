import { Avatar } from "@mantine/core";
import {
  IconBrandWhatsapp,
  IconPhoneCall,
  IconUsersGroup,
  IconCalendarCheck,
} from "@tabler/icons-react";

interface BiSdrCardProps {
  data: Indicators | null;
  name: string;
  metas:Metas;
}

export const BiSdrCard = ({ data, name, metas }: BiSdrCardProps) => {
  if (!data) return;

  const rows = [
    {
      icon: <IconBrandWhatsapp className="text-[#16A34A]" size={18} />,
      title: "WhatsApp",
      items: [
        { label: "Iniciado", number: data.contacts_made || 0 },
        { label: "Efetivo", number: data.effective_contacts || 0 },
        {
          label: "Conversão",
          number:
            data.contacts_made > 0
              ? ((data.effective_contacts * 100) / data.contacts_made).toFixed(1) + "%"
              : "0%",
        },
      ],
    },
    {
      icon: <IconPhoneCall className="text-[#2563EB]" size={18} />,
      title: "Ligações",
      items: [
        { label: "Realizada", number: data.phone_calls_made || 0 },
        { label: "Efetiva", number: data.effective_phone_calls || 0 },
        {
          label: "Conversão",
          number:
            data.phone_calls_made > 0
              ? ((data.effective_phone_calls * 100) / data.phone_calls_made).toFixed(1) + "%"
              : "0%",
        },
      ],
    },
    {
      icon: <IconUsersGroup className="text-[#F59E0B]" size={18} />,
      title: "Total",
      items: [
        {
          label: "Iniciado",
          number: (data.contacts_made || 0) + (data.phone_calls_made || 0),
        },
        {
            label: "Efetivo",
            number: (data.effective_contacts || 0) + (data.effective_phone_calls || 0),
          },
        {
          label: "Conversão",
          number:
            (data.contacts_made + data.phone_calls_made) > 0
              ? (
                  ((data.effective_contacts + data.effective_phone_calls) * 100) /
                  (data.contacts_made + data.phone_calls_made)
                ).toFixed(1) + "%"
              : "0%",
        },
      ],
    },
    {
      icon: <IconCalendarCheck className="text-[#8B5CF6]" size={18} />,
      title: "Agendamentos",
      items: [
        { label: "Total", number: data.escheduled || 0 },
        {
          label: "Conversão",
          number:
            (data.effective_contacts + data.effective_phone_calls) > 0
              ? (
                  (data.escheduled * 100) /
                  (data.effective_contacts + data.effective_phone_calls)
                ).toFixed(1) + "%"
              : "0%",
        },
      ],
    },
  ];

  function getBusinessDaysUntilToday(): number {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    let businessDays = 0;
  
    for (let d = new Date(firstDay); d <= today; d.setDate(d.getDate() + 1)) {
      const day = d.getDay();
      if (day !== 0 && day !== 6) {
        businessDays++;
      }
    }
  
    return businessDays;
  }

  const diasUteis = getBusinessDaysUntilToday();
  const metaColaborador = metas.sdrs.find((sdr) => sdr.id === data.collaborator_id);
  
  let cardColorClass = "border-[#D1D5DB] bg-[#F9FAFB]";
  if (metaColaborador) {
    const metaDiaria = metaColaborador.contatos_efetivos_mes / metaColaborador.dias_no_mes;
    const metaAteHoje = Math.round(metaDiaria * diasUteis);
    const contatosEfetivos = (data.effective_contacts || 0) + (data.effective_phone_calls || 0);
  
    if (contatosEfetivos >= metaAteHoje) {
      cardColorClass = "border-[#4ADE80] bg-[#ECFDF5]";
    } else {
      cardColorClass = "border-[#F87171] bg-[#fecaca]";
    }
  }

  let contatosFaltando = null;

  if (metaColaborador) {
    const metaDiaria = metaColaborador.contatos_efetivos_mes / metaColaborador.dias_no_mes;
    const metaAteHoje = Math.round(metaDiaria * diasUteis);
    const contatosEfetivos = (data.effective_contacts || 0) + (data.effective_phone_calls || 0);
  
    const faltam = metaAteHoje - contatosEfetivos;
    if (faltam > 0) {
      contatosFaltando = faltam;
    }
  }

  return (
    <div className={`w-full max-w-[425px] shadow-lg border rounded-2xl p-2 relative ${cardColorClass}`}>

      <div className="flex gap-4 items-center mb-2">
        <Avatar size={40} color="green" />
        <div className="flex items-center gap-2">
          <h5 className="text-[#059669] font-bold text-[14px]">SDR</h5>
          <h2 className="text-[#065F46] font-bold text-[20px] -mt-1 whitespace-nowrap">{name}</h2>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {rows.map((row, i) => (
          <div key={i} className="flex gap-4 bg-[#F3F4F6] rounded-xl p-1 shadow-sm">
            <div className="flex items-center flex-col  mb-1 justify-center w-[100px]">
              {row.icon}
              <h4 className="text-xs font-semibold text-gray-700">{row.title}</h4>
            </div>
            <div className="flex gap-2 flex-wrap">
              {row.items.map((item, idx) => (
                <div key={idx} className="flex flex-col flex-1 min-w-[80px]">
                  <span className="text-xs text-[#4B5563] text-center">{item.label}</span>
                  <span className="px-2 text-[#1F2937] font-bold text-center text-lg rounded-lg -mt-1">
                    {item.number}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {contatosFaltando && (
            <div className="text-xs text-[#DC2626] font-medium absolute top-[3px] right-[20px]">
                Faltam <span className="font-semibold">{contatosFaltando}</span> contatos
            </div>
        )}
    </div>
  );
};
