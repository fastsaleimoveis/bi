import { Avatar, Table, Card, Text } from '@mantine/core';

interface User {
  name: string;
  photo_url: string;
  indicators: Indicators[];
}

interface Indicators {
  contacts_made: number;
  effective_contacts: number;
  phone_calls_made: number;
  effective_phone_calls: number;
  appointments: number;
  no_show: number;
  month: number;
  year: number;
}

interface SDRPerformanceTableProps {
  sdrs: User[];
}

export const SDRPerformanceTable = ({ sdrs }: SDRPerformanceTableProps) => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const rows = sdrs.map((user, index) => {
    const indicator = user.indicators.find(
      (ind) => ind.month === currentMonth && ind.year === currentYear
    );

    const contatosRealizados = indicator?.contacts_made ?? 0;
    const contatosEfetivos = indicator?.effective_contacts ?? 0;
    const ligacoesRealizadas = indicator?.phone_calls_made ?? 0;
    const ligacoesEfetivas = indicator?.effective_phone_calls ?? 0;
    const agendamentos = indicator?.appointments ?? 0;
    const noShow = indicator?.no_show ?? 0;

    const baseEfetivos = contatosEfetivos + ligacoesEfetivas;

    const eficiencia =
      baseEfetivos > 0 ? Math.round((agendamentos * 100) / baseEfetivos) + '%' : '0%';

    return (
      <tr key={index}>
        <td style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar radius="xl" src={user.photo_url} alt={user.name}>
            {user.name.charAt(0)}
          </Avatar>
          <Text size="sm">{user.name}</Text>
        </td>
        <td className="text-center">{contatosRealizados}</td>
        <td className="text-center">{contatosEfetivos}</td>
        <td className="text-center">{ligacoesRealizadas}</td>
        <td className="text-center">{ligacoesEfetivas}</td>
        <td className="text-center">{agendamentos}</td>
        <td className="text-center">{noShow}</td>
        <td className="text-center">{eficiencia}</td>
      </tr>
    );
  });

  return (
    <Card shadow="sm" radius="md" padding="lg" withBorder>
      <Text fw={600} mb="md">
        Desempenho SDR - {now.toLocaleString('pt-BR', { month: 'long' }).toUpperCase()}
      </Text>
      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr>
            <th>NOME</th>
            <th>CONTATO REALIZADO</th>
            <th>CONTATO EFETIVO</th>
            <th>LIGAÇÃO REALIZADA</th>
            <th>LIGAÇÃO EFETIVA</th>
            <th>AGENDAMENTOS</th>
            <th>NO SHOW</th>
            <th>EFICIÊNCIA</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Card>
  );
};
