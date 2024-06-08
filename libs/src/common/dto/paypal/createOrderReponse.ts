// order-response.interface.ts

import { Breakdown, PurchaseUnit } from "./Paypal";
export interface Payee {
  email_address: string;
  merchant_id: string;
}

export interface Link {
  href: string;
  rel: string;
  method: string;
}

export  interface OrderResponse {
  id: string;
  intent: string;
  status: string;
  purchase_units: PurchaseUnit[];
  create_time: string;
  links: Link[];
}
