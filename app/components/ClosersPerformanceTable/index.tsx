import { Avatar, Table, Card, Text } from '@mantine/core';

interface ClosersPerformanceTableProps {
  closers: User[];
}

export const ClosersPerformanceTable = ({ closers }: ClosersPerformanceTableProps) => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const rows = closers.map((closer, index) => {
    const indicator = closer.indicators.find(
      (ind) => ind.month === currentMonth && ind.year === currentYear
    );

    return (
      <tr key={index}>
        <td style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar radius="xl" src={closer.photo_url} alt={closer.name}>
            {closer.name.charAt(0)}
          </Avatar>
          <Text size="sm">{closer.name}</Text>
        </td>
        <td className="text-center">{indicator?.meetings_held ?? 0}</td>
        <td className="text-center">{indicator?.in_negotiation ?? 0}</td>
        <td className="text-center">{indicator?.lost ?? 0}</td>
        <td className="text-center">{indicator?.accept_verbal ?? 0}</td>
        <td className="text-center">{indicator?.link_sent ?? 0}</td>
        <td className="text-center">{indicator?.sales ?? 0}</td>
        <td className="text-center">
          {indicator?.vgv
            ? indicator.vgv.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })
            : 'R$ 0,00'}
        </td>
      </tr>
    );
  });

  return (
    <Card shadow="sm" radius="md" padding="lg" withBorder>
      <Text fw={600} mb="md">
        Desempenho Closers - {now.toLocaleString('pt-BR', { month: 'long' }).toUpperCase()}
      </Text>
      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr>
            <th>NOME</th>
            <th>REUNIÕES</th>
            <th>EM NEGOCIAÇÃO</th>
            <th>PERDIDO</th>
            <th>ACEITE VERBAL</th>
            <th>LINK PAGAMENTO</th>
            <th>VENDAS</th>
            <th>VGV</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Card>
  );
};
