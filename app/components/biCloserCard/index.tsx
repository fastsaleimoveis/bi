import { Avatar } from "@mantine/core"

interface BiCloserCardProps{
    data:Indicators | null
    name:string
}


export const BiCloserCard = ({data, name}:BiCloserCardProps) => {


    if (!data) return;

    const dataNumbers = [
        {label:'Reunião Realizada', number:data.meetings_held || 0},
        {label:'Em Negociação', number:data.in_negotiation || 0},
        {label:'Perdido', number:data.lost || 0},
        {label:'Aceite Verbal', number:data.accept_verbal || 0},
        {label:'Link de Pagamento', number:data.link_sent || 0},
        {label:'Venda', number:data.sales || 0},
        {label:'Vgv', number:data.vgv || 0},
    ]

    return(
        <div className="w-full max-w-[680px] border rounded-[20px] border-green-700 p-4 flex-1 h-full">
            <div className="flex gap-4 items-center size-2/4">
                <Avatar size={80} color="#fff" />
                <div className="">
                    <h5 className="text-green-200 font-bold text-[18px]">Closer</h5>
                    <h2 className="text-white font-bold text-[26px] -mt-2 whitespace-nowrap">{name}</h2>
                </div>
            </div>
            <div className="flex justify-between gap-2 flex-wrap size-2/4 w-full">
                {dataNumbers.map((item, index) => (
                    <div className="flex flex-col flex-1 min-w-[120px]" key={index}>
                        <label className="text-green-500 text-xs text-center mb-1 h-[15px]">{item.label}</label>
                        <span className="bg-green-200 text-gray-600 font-bold text-center text-4xl rounded-lg w-full flex items-center justify-center">{item.number}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}