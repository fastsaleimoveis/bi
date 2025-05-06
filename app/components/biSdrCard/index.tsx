import { Avatar } from "@mantine/core"

interface BiSdrCardProps{
    data:Indicators | null
    name:string
}

export const BiSdrCard = ({data, name}:BiSdrCardProps) => {


    if (!data) return;

    const dataNumbers = [
        // {label:'Conversa Iniciada', number:data.contacts_made || 0},
        {label:'Contato Efetivo', number:data.effective_contacts || 0},
        // {label:'Ligação Realizada', number:data.phone_calls_made || 0},
        {label:'Ligação Efetivo', number:data.effective_phone_calls || 0},
        {label:'Total Contatos', number:(data.effective_phone_calls || 0) + (data.effective_contacts || 0)},
        // {label:'Sem Resposta', number:data.no_answer || 0},
        {label:'Agendamentos', number:data.appointments || 0},
        {label:'% Agendamentos', number:((data.appointments * 100) / (data.effective_contacts + data.effective_phone_calls)).toFixed(0) + '%'},
        // {label:'No Show', number:data.no_show || 0},
        // {label:'% No Show', number:data.appointments !== 0 ? (((data.no_show || 0) * 100) / data.appointments).toFixed(0) : 0},
    ]

    return(
        <div className="w-full max-w-[680px]  shadow-lg border border-gray-200 rounded-[20px] p-4 flex-1 h-full">
            <div className="flex gap-4 items-center size-2/4">
                <Avatar size={80} color="green" />
                <div className="">
                    <h5 className="text-green-600 font-bold text-[18px]">SDR</h5>
                    <h2 className="text-green-800 font-bold text-[26px] -mt-2 whitespace-nowrap">{name}</h2>
                </div>
            </div>
            <div className="flex justify-between gap-1 flex-wrap size-2/4 w-full">
                {dataNumbers.map((item, index) => (
                    <div className="flex flex-col flex-1 min-w-[100px]" key={index}>
                        <label className="text-green-800 text-xs text-center mb-1 h-[15px]">{item.label}</label>
                        <span className="py-1 border bg-green-200 text-gray-600 font-bold text-center text-3xl rounded-lg w-full flex items-center justify-center">{item.number}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}