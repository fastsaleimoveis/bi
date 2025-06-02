'use client'

import { Table } from '@mantine/core'

type FunnelByAfidItem = {
  name: string | null
  step_registre_se: number
  step_passo_2: number
  step_passo_3: number
  step_cadastro_finalizado: number
  step_carrinho: number
  step_checkout: number
  step_compra: number
}

export function FunnelByAfidTable({ data }: { data: FunnelByAfidItem[] }) {
  if (!data || data.length === 0) return <p>Nenhum dado</p>

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Afiliado</th>
          <th>Registre-se</th>
          <th>Passo 2</th>
          <th>Passo 3</th>
          <th>Cadastro Finalizado</th>
          <th>Carrinho</th>
          <th>Checkout</th>
          <th>Compra</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i}>
            <td>{item.name || '(desconhecido)'}</td>
            <td className="text-center">{item.step_registre_se}</td>
            <td className="text-center">{item.step_passo_2}</td>
            <td className="text-center">{item.step_passo_3}</td>
            <td className="text-center">{item.step_cadastro_finalizado}</td>
            <td className="text-center">{item.step_carrinho}</td>
            <td className="text-center">{item.step_checkout}</td>
            <td className="text-center">{item.step_compra}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
