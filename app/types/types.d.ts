
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface User{
    active:boolean;
    email:string;
    id:number;
    indicators: Indicators[];
    kommo_user_id:number;
    name:string;
    photo_url:string;
    role:string;
    type: UserType;
  }

  interface Indicators{
    accept_verbal:number;
    appointments:number;
    collaborator_id:number;
    contacts_made:number;
    effective_contacts:number;
    effective_phone_calls:number;
    efficiency:number;
    id:number;
    link_sent:number;
    meetigs_held:number;
    month:number;
    no_show:number;
    phone_calls_made:number;
    sales:number;
    vgv:number;
    year:number;
    rescheduled:number;
    escheduled:number;
    future_return:number;
    no_answer:number;
    lost:number;
    reschedule:number;
    in_negotiation:number;
    tag_not_sale:number;
    meetings_held:number;
    total_mettings:number;
  }

  interface UserType{
    collaborator_id:number;
    type:string;
  }

  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Metas{
    gerais:{
      type:string;
      label:string;
      value:number;
    }[];
    sdrs:{
      id:number;
      contatos_efetivos_mes:number;
      dias_no_mes:number;
    }[];
    closers:{
      id:number;
      reunioes_mes:number;
      dias_no_mes:number;
    }[];
  }

  interface TopPage{
    url: string
    total: number
  }
  
  interface Flow{
    sequence: string[]
    count: number
  }
  
  interface AccessByHour{
    hour: number
    total: number
  }
  
  interface EngajamentoData{
    top_pages: TopPage[]
    by_user_type: Record<string, number>
    flows: Flow[]
    access_by_hour: AccessByHour[]
  }

  interface AfidItem{
    afid: string
    name: string
    total: number
    percent: number
  }
  
  interface AfOriginData{
    aforigin: string
    total: number
  }
  
  interface AfTypeData{
    aftype: string
    total: number
  }
  
  interface CouponAnalytics{
    coupon: string
    total: number
    conversions: number
    conversion_rate: number
  }
  
  interface FunnelByAfidItem {
    name: string | null
    step_registre_se: number
    step_passo_2: number
    step_passo_3: number
    step_cadastro_finalizado: number
    step_carrinho: number
    step_checkout: number
    step_compra: number
  }
  

interface AffiliateSummaryData{
    afids: AfidItem[]
    aforigins: AfOriginData[]
    aftypes: AfTypeData[]
    coupons: CouponAnalytics[]
    funnels_by_afid: FunnelByAfidItem[]
  }