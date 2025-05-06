import { Avatar } from "@mantine/core";

interface TotalComercialProps {
  data: BiDashboard;
}

export const TotalComercial = ({ data }: TotalComercialProps) => {
  const agendamentos = data.sdrs.reduce((sum: number, sdr) => sum + (sdr.agendamentos || 0), 0);
  const noShow = data.closers.reduce((sum: number, closer) => sum + (closer.reunioes_noshow || 0), 0);
  const vendas = data.closers.reduce((sum: number, closer) => sum + (closer.vendas_fechadas || 0), 0);
  const reunioes = data.closers.reduce((sum: number, closer) => sum + (closer.reunioes_realizadas || 0), 0);
  const eficiencia = reunioes > 0 ? ((vendas / reunioes) * 100).toFixed(0) : "0";

  return (
    <div className="flex items-center gap-4 w-full border rounded-lg p-2 border-green-700 max-w-[580px] mt-12">
      <div className="w-[60]">
        <Avatar size={60} color="#fff" />
      </div>
      <div className="flex flex-col w-full">
        <div className="w-full flex justify-start">
          <h2 className="text-white font-semibold">Total Comercial</h2>
        </div>
        <div className="flex justify-between gap-1">
          <div className="flex flex-col flex-1">
            <label className="text-green-500 text-xs text-center">Agendamentos</label>
            <span className="bg-green-200 text-gray-600 font-bold text-center text-xl rounded-lg">{agendamentos}</span>
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-green-500 text-xs text-center">No Show</label>
            <span className="bg-green-200 text-gray-600 font-bold text-center text-xl rounded-lg">{noShow}</span>
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-green-500 text-xs text-center">Vendas</label>
            <span className="bg-green-200 text-gray-600 font-bold text-center text-xl rounded-lg">{vendas}</span>
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-green-500 text-xs text-center">Eficiência</label>
            <span className="bg-green-200 text-gray-600 font-bold text-center text-xl rounded-lg">{eficiencia}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
