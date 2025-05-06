import { Avatar, Table, Card, Text } from '@mantine/core';

interface SDRData {
  nome: string;
  foto: string | null;
  ligacoes_realizadas: number;
  contatos_realizados: number;
  contatos_efetivos: number;
  ligacoes_efetivas:number;
  agendamentos: number;
}

interface SDRPerformanceTableProps {
  sdrs: SDRData[];
}

export const SDRPerformanceTable = ({ sdrs }: SDRPerformanceTableProps) => {
  const rows = sdrs.map((sdr, index) => {
    const conversao =
      sdr.contatos_efetivos > 0
        ? ((sdr.agendamentos / sdr.contatos_efetivos) * 100).toFixed(1) + '%'
        : '0.0%';

    return (
      <tr key={index}>
        <td style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar radius="xl" src={sdr.foto} alt={sdr.nome}>
            {sdr.nome.charAt(0)}
          </Avatar>
          <Text size="sm">{sdr.nome}</Text>
        </td>
        <td className="text-center">{sdr.contatos_realizados ?? 0}</td>
        <td className="text-center">{sdr.ligacoes_realizadas ?? 0}</td>
        <td className="text-center">{(sdr.contatos_efetivos + sdr.ligacoes_efetivas) ?? 0}</td>
        <td className="text-center">{sdr.agendamentos ?? 0}</td>
        <td className="text-center">{conversao}</td>
      </tr>
    );
  });

  return (
    <Card shadow="sm" radius="md" padding="lg" withBorder>
      <Text fw={600} mb="md">
        Desempenho SDR
      </Text>
      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr>
            <th>NOME</th>
            <th>MENSAGENS ENVIADAS</th>
            <th>LIGAÇÕES REALIZADAS</th>
            <th>CONVERSAS EFETIVAS</th>
            <th>AGENDAMENTOS</th>
            <th>TAXA DE CONVERSÃO</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Card>
  );
};
