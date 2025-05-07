import { Avatar } from "@mantine/core"

interface BiCloserCardProps{
    data:Indicators | null
    name:string
}


export const BiCloserCard = ({data, name}:BiCloserCardProps) => {


    if (!data) return;

    const dataNumbers = [
        {label:'Reuniões Agendadas', number:data.total_mettings || 0},
        {label:'Reunião Realizada', number:data.meetings_held || 0},
        {label:'Em Negociação', number:(data.in_negotiation || 0).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })},
        {label:'Não Venda', number:(data.lost || 0).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })},
        {label:'Aceite Verbal', number:(data.accept_verbal || 0).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })},
        {label:'Link de Pagamento', number:(data.link_sent || 0).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })},
        {label:'Venda', number:data.sales || 0},
        {label:'Venda Vgv', number:(data.vgv || 0).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })},
        {label:'Eficiência', number:data.sales !== 0 ? ((data.sales * 100) / data.meetings_held).toFixed(1) + '%' : 0 + '%'},
    ]

    return(
        <div className="w-full max-w-[680px] shadow-lg border border-[#E5E7EB] rounded-[20px] p-4 flex-1 h-full">
            <div className="flex gap-4 items-center size-2/4">
                <Avatar size={80} color="green" />
                <div className="">
                    <h5 className="text-[#16A34A] font-bold text-[18px]">Closer</h5>
                    <h2 className="text-[#065F46] font-bold text-[26px] -mt-2 whitespace-nowrap">{name}</h2>
                </div>
            </div>
            <div className="flex justify-between gap-2 flex-wrap size-2/4 w-full">
                {dataNumbers.map((item, index) => (
                    <div className="flex flex-col flex-1 min-w-[120px]" key={index}>
                        <label className="text-[#065F46] text-xs text-center mb-1 h-[15px]">{item.label}</label>
                        <span className="py-1 bg-[#BBF7D0] border text-[#4B5563] font-bold text-center text-xl rounded-lg w-full flex items-center justify-center">{item.number}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}