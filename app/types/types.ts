interface BiDashboard{
    closers:Closer[];
    consolidado:Consolidado;
    filters:Filters;
    sdrs:Sdr[];
  }

  interface Closer{
    agendamentos:number;
    contatos_efetivos:number;
    contatos_realizados:number;
    eficiencia:number;
    foto:string;
    ligacoes_efetivas:number;
    ligacoes_realizadas:number;
    nome:string;
    reunioes_noshow:number;
    reunioes_realizadas:number;
    vendas_fechadas:number;
    vgv:number;
  }

  interface Sdr{
    agendamentos:number;
    contatos_efetivos:number;
    contatos_realizados:number;
    eficiencia:number;
    foto:string;
    ligacoes_efetivas:number;
    ligacoes_realizadas:number;
    nome:string;
    reunioes_noshow:number;
    reunioes_realizadas:number;
    vendas_fechadas:number;
    vgv:number;
  }

  interface Filters{
    day:string | null;
    month:string | null;
    type:string | null;
    year:string | null;
  }

  interface Consolidado{
    agendamentos_mensais:number;
    taxa_conversao:number;
    total_closers:number;
    total_sdrs:number;
    vendas_mensais:number;
    vgv_mensal:number;
  }

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
  }

  interface UserType{
    collaborator_id:number;
    type:string;
  }