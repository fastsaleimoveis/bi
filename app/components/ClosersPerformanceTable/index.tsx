import { Avatar, Table, Card, Text } from '@mantine/core';

interface CloserData {
  nome: string;
  foto: string | null;
  reunioes_realizadas: number;
  reunioes_noshow: number;
  vendas_fechadas: number;
  vgv: number;
  eficiencia: number; // em porcentagem: 0 a 100
}

interface ClosersPerformanceTableProps {
  closers: CloserData[];
}

export const ClosersPerformanceTable = ({ closers }: ClosersPerformanceTableProps) => {
  const rows = closers.map((closer, index) => (
    <tr key={index}>
      <td style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Avatar radius="xl" src={closer.foto} alt={closer.nome}>
          {closer.nome.charAt(0)}
        </Avatar>
        <Text size="sm">{closer.nome}</Text>
      </td>
      <td className="text-center">{closer.reunioes_realizadas ?? 0}</td>
      <td className="text-center">{closer.reunioes_noshow ?? 0}</td>
      <td className="text-center">{closer.vendas_fechadas ?? 0}</td>
      <td className="text-center">{closer.vgv?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? 'R$ 0,00'}</td>
      <td className="text-center">{(closer.eficiencia ?? 0).toFixed(1)}%</td>
    </tr>
  ));

  return (
    <Card shadow="sm" radius="md" padding="lg" withBorder>
      <Text fw={600} mb="md">
        Desempenho Closers
      </Text>
      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr>
            <th>NOME</th>
            <th>REUNIÕES</th>
            <th>NO SHOW</th>
            <th>VENDAS</th>
            <th>VGV</th>
            <th>EFICIÊNCIA</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Card>
  );
};
