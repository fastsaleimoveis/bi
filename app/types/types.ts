
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
  }

  interface UserType{
    collaborator_id:number;
    type:string;
  }