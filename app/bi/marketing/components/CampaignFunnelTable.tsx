'use client'

import './funnel.css' 

type FunnelRow = {
  utm_campaign: string | null
  step_registre_se: number
  step_passo_2: number
  step_passo_3: number
  step_cadastro_finalizado: number
  step_carrinho: number
  step_checkout: number
  step_compra: number
  step_reuniao_agendada: number
  step_em_negociacao: number
  step_venda_por_reuniao: number
}


export default function CampaignFunnelGraph({ row }: { row: FunnelRow }) {

  return (
    <div className="f-wrapper">
      <div className="initial-row">
        <div className="item-box" style={{backgroundColor:'#cbd5e1'}}>
          <h3>Cadastro</h3>
          <p>{row.step_registre_se}</p>
        </div>
        <div className="item-box" style={{backgroundColor:'#64748b', color:'#fff'}}>
          <h3>Passo 2</h3>
          <p>{row.step_passo_2}</p>
        </div>
        <div className="item-box" style={{backgroundColor:'#334155', color:'#fff'}}>
          <h3>Passo 3</h3>
          <p>{row.step_passo_3}</p>
        </div>
        <div className="item-box" style={{backgroundColor:'#0f172a', color:'#fff'}}>
          <h3>Concluído</h3>
          <p>{row.step_cadastro_finalizado}</p>
        </div>
        <div className="sequence-line">
          <div className="initial-row">
            <div className="item-box" style={{backgroundColor:'#ccfbf1'}}>
              <h3>Carrinho</h3>
              <p>{row.step_carrinho}</p>
            </div>
            <div className="item-box" style={{backgroundColor:'#5eead4'}}>
              <h3>Checkout</h3>
              <p>{row.step_checkout}</p>
            </div>
            <div className="item-box" style={{backgroundColor:'#0d9488', color:'#fff'}}>
              <h3>Venda</h3>
              <p>{row.step_compra}</p>
            </div>
          </div>
          <div className="initial-row">
            <div className="item-box" style={{backgroundColor:'#dcfce7'}}>
              <h3>Reunião</h3>
              <p>{row.step_reuniao_agendada}</p>
            </div>
            <div className="item-box" style={{backgroundColor:'#86efac'}}>
              <h3>Negociação</h3>
              <p>{row.step_em_negociacao}</p>
            </div>
            <div className="item-box" style={{backgroundColor:'#16a34a', color:'#fff'}}>
              <h3>Venda</h3>
              <p>{row.step_venda_por_reuniao}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
