export interface InvoiceDetail {
  cargoFijo: number;
  consumo: number;
  impuestos: number;
  fondoSolar: number;
  mantenimiento: number;
}

export type InvoiceStatus = 'pending' | 'paid' | 'overdue';

export interface Invoice {
  id: string;
  period: string;
  issuedDate: string;
  dueDate: string;
  total: number;
  consumption: number;
  status: InvoiceStatus;
  details: InvoiceDetail;
  paidDate?: string;
  estimated?: boolean;
}

export interface User {
  dni: string;
  numeroCliente: string;
  nombre: string;
  apellido: string;
  direccion: string;
  barrio: string;
  categoria: string;
}

export interface UserSession extends User {
  invoices: Invoice[];
}
