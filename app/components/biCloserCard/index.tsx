import { Avatar } from "@mantine/core"

interface BiCloserCardProps{
    data:Indicators | null
    name:string;
    metas:Metas;
}


export const BiCloserCard = ({data, name, metas}:BiCloserCardProps) => {


    if (!data) return;

    const dataNumbers = [
        {label:'Reuniões Agendadas', number:data.total_mettings || 0},
        {label:'Reunião Realizada', number:data.meetings_held || 0},
        {label:'Em Negociação', number:(data.in_negotiation || 0).toLocaleString('pt-br', {minimumFractionDigits: 2})},
        {label:'Não Venda', number:(data.lost || 0).toLocaleString('pt-br', {minimumFractionDigits: 2})},
        {label:'Aceite Verbal', number:(data.accept_verbal || 0).toLocaleString('pt-br', {minimumFractionDigits: 2})},
        {label:'Link de Pagamento', number:(data.link_sent || 0).toLocaleString('pt-br', {minimumFractionDigits: 2})},
        {label:'Venda', number:data.sales || 0},
        {label:'Venda Vgv', number:(data.vgv || 0).toLocaleString('pt-br', {minimumFractionDigits: 2})},
        {label:'Eficiência', number:data.sales !== 0 ? ((data.sales * 100) / data.meetings_held).toFixed(1) + '%' : 0 + '%'},
    ]

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
    const metaCloser = metas.closers.find((closer) => closer.id === data.id);
    
    let cardColorClass = "border-[#D1D5DB] bg-[#F9FAFB]";
    let faltamReunioesHoje: number | null = null;
    
    if (metaCloser) {
        const metaDiaria = metaCloser.reunioes_mes / metaCloser.dias_no_mes;
        const metaAteHoje = Math.round(metaDiaria * diasUteis);
        const realizadas = data.meetings_held || 0;
    
        if (realizadas >= metaAteHoje) {
            cardColorClass = "border-[#4ADE80] bg-[#ECFDF5]";
        } else {
            cardColorClass = "border-[#F87171] bg-[#fecaca]";
            faltamReunioesHoje = metaAteHoje - realizadas;
        }
    }

    return(
            <div className={`w-full max-w-[680px] shadow-lg border rounded-[20px] p-4 flex-1 h-auto relative ${cardColorClass}`}>

            {faltamReunioesHoje && (
                <div className="text-xs text-[#DC2626] font-medium mt-1 absolute top-[5px] right-[20px]">
                    Faltam <span className="font-semibold">{faltamReunioesHoje}</span> reuniões
                </div>
            )}

            <div className="flex gap-4 items-center">
                <Avatar size={60} color="green" />
                <div className="flex gap-2 items-center">
                    <h5 className="text-[#16A34A] font-bold text-[18px]">Closer</h5>
                    <h2 className="text-[#065F46] font-bold text-[22px] whitespace-nowrap">{name}</h2>
                </div>
            </div>
            <div className="flex justify-between gap-1 flex-wrap w-full">
                {dataNumbers.map((item, index) => (
                    <div className="flex flex-col flex-1 min-w-[130px]" key={index}>
                        <label className="text-[#065F46] text-xs text-center mb-1 h-[15px]">{item.label}</label>
                        <span className="py-1 bg-[#BBF7D0] border text-[#4B5563] font-bold text-center text-lg rounded-lg w-full flex items-center justify-center">{item.number}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}