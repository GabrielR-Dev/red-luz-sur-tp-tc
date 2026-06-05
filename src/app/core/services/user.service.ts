import { Injectable } from '@angular/core';
import { UserSession, Invoice, InvoiceStatus } from '../models/invoice.interface';

function makeInvoice(
  id: string,
  period: string,
  issued: string,
  due: string,
  total: number,
  consumption: number,
  status: InvoiceStatus,
  paidDate?: string,
  estimated?: boolean,
): Invoice {
  const base = Math.round(total * 0.35);
  const consumo = Math.round(total * 0.30);
  const impuestos = Math.round(total * 0.15);
  const fondoSolar = Math.round(total * 0.10);
  const mantenimiento = total - base - consumo - impuestos - fondoSolar;
  return {
    id, period, issuedDate: issued, dueDate: due, total, consumption,
    status, paidDate, estimated,
    details: { cargoFijo: base, consumo, impuestos, fondoSolar, mantenimiento },
  };
}

let nextId = 1;
function id(): string {
  return 'F-' + String(nextId++).padStart(3, '0');
}

const USERS: UserSession[] = [
  {
    dni: '12345678', numeroCliente: '100234',
    nombre: 'Lucía', apellido: 'Gómez',
    direccion: 'Av. Siempre Viva 742', barrio: 'Villa Crespo',
    categoria: 'Residencial',
    invoices: [
      makeInvoice(id(), 'Julio 2025', '01/07/2025', '31/07/2025', 2950, 210, 'paid', '29/07/2025'),
      makeInvoice(id(), 'Agosto 2025', '01/08/2025', '31/08/2025', 3100, 220, 'paid', '28/08/2025'),
      makeInvoice(id(), 'Septiembre 2025', '01/09/2025', '30/09/2025', 3050, 215, 'paid', '27/09/2025'),
      makeInvoice(id(), 'Octubre 2025', '01/10/2025', '31/10/2025', 3300, 240, 'paid', '30/10/2025'),
      makeInvoice(id(), 'Noviembre 2025', '01/11/2025', '30/11/2025', 3400, 245, 'paid', '28/11/2025'),
      makeInvoice(id(), 'Diciembre 2025', '01/12/2025', '31/12/2025', 3800, 275, 'paid', '27/12/2025'),
      makeInvoice(id(), 'Enero 2026', '01/01/2026', '31/01/2026', 3200, 230, 'paid', '28/01/2026'),
      makeInvoice(id(), 'Febrero 2026', '01/02/2026', '28/02/2026', 3450, 250, 'paid', '25/02/2026'),
      makeInvoice(id(), 'Marzo 2026', '01/03/2026', '31/03/2026', 3620, 265, 'paid', '29/03/2026'),
      makeInvoice(id(), 'Abril 2026', '01/04/2026', '30/04/2026', 3850, 280, 'paid', '28/04/2026'),
      makeInvoice(id(), 'Mayo 2026', '01/05/2026', '30/05/2026', 4210, 310, 'paid', '29/05/2026'),
      makeInvoice(id(), 'Junio 2026', '01/06/2026', '30/06/2026', 4850, 355, 'pending', undefined, true),
    ],
  },
  {
    dni: '23456789', numeroCliente: '100451',
    nombre: 'Roberto', apellido: 'Méndez',
    direccion: 'Calle Los Paraísos 1130', barrio: 'San Martín',
    categoria: 'Residencial',
    invoices: [
      makeInvoice(id(), 'Agosto 2025', '01/08/2025', '31/08/2025', 4750, 370, 'paid', '27/08/2025'),
      makeInvoice(id(), 'Septiembre 2025', '01/09/2025', '30/09/2025', 4900, 380, 'paid', '25/09/2025'),
      makeInvoice(id(), 'Octubre 2025', '01/10/2025', '31/10/2025', 5100, 395, 'paid', '28/10/2025'),
      makeInvoice(id(), 'Noviembre 2025', '01/11/2025', '30/11/2025', 5300, 410, 'paid', '26/11/2025'),
      makeInvoice(id(), 'Diciembre 2025', '01/12/2025', '31/12/2025', 5600, 430, 'paid', '24/12/2025'),
      makeInvoice(id(), 'Enero 2026', '01/01/2026', '31/01/2026', 5200, 405, 'paid', '28/01/2026'),
      makeInvoice(id(), 'Febrero 2026', '01/02/2026', '28/02/2026', 5050, 390, 'paid', '26/02/2026'),
      makeInvoice(id(), 'Marzo 2026', '01/03/2026', '31/03/2026', 4950, 385, 'paid', '27/03/2026'),
      makeInvoice(id(), 'Abril 2026', '01/04/2026', '30/04/2026', 5100, 400, 'paid', '25/04/2026'),
      makeInvoice(id(), 'Mayo 2026', '01/05/2026', '30/05/2026', 4780, 370, 'paid', '27/05/2026'),
      makeInvoice(id(), 'Junio 2026', '01/06/2026', '30/06/2026', 5320, 420, 'pending', undefined, true),
    ],
  },
  {
    dni: '34567890', numeroCliente: '100687',
    nombre: 'Ana', apellido: 'Martínez',
    direccion: 'Pasaje La Lomita 89', barrio: 'Villa Crespo',
    categoria: 'Residencial',
    invoices: [
      makeInvoice(id(), 'Octubre 2025', '01/10/2025', '31/10/2025', 2650, 170, 'paid', '30/10/2025'),
      makeInvoice(id(), 'Noviembre 2025', '01/11/2025', '30/11/2025', 2800, 180, 'paid', '28/11/2025'),
      makeInvoice(id(), 'Diciembre 2025', '01/12/2025', '31/12/2025', 3100, 200, 'paid', '27/12/2025'),
      makeInvoice(id(), 'Enero 2026', '01/01/2026', '31/01/2026', 2750, 175, 'paid', '29/01/2026'),
      makeInvoice(id(), 'Febrero 2026', '01/02/2026', '28/02/2026', 2850, 185, 'paid', '26/02/2026'),
      makeInvoice(id(), 'Marzo 2026', '01/03/2026', '31/03/2026', 2900, 188, 'paid', '30/03/2026'),
      makeInvoice(id(), 'Abril 2026', '01/04/2026', '30/04/2026', 2950, 190, 'paid', '29/04/2026'),
      makeInvoice(id(), 'Mayo 2026', '01/05/2026', '30/05/2026', 3100, 205, 'paid', '30/05/2026'),
      makeInvoice(id(), 'Junio 2026', '01/06/2026', '30/06/2026', 3380, 225, 'pending', undefined, true),
    ],
  },
  {
    dni: '45678901', numeroCliente: '100892',
    nombre: 'Carlos', apellido: 'Pereyra',
    direccion: 'Rivadavia 2345', barrio: 'San Martín',
    categoria: 'Comercial',
    invoices: [
      makeInvoice(id(), 'Agosto 2025', '01/08/2025', '31/08/2025', 11500, 820, 'paid', '21/08/2025'),
      makeInvoice(id(), 'Septiembre 2025', '01/09/2025', '30/09/2025', 11200, 800, 'paid', '18/09/2025'),
      makeInvoice(id(), 'Octubre 2025', '01/10/2025', '31/10/2025', 11800, 840, 'paid', '22/10/2025'),
      makeInvoice(id(), 'Noviembre 2025', '01/11/2025', '30/11/2025', 12100, 860, 'paid', '20/11/2025'),
      makeInvoice(id(), 'Diciembre 2025', '01/12/2025', '31/12/2025', 12600, 900, 'paid', '19/12/2025'),
      makeInvoice(id(), 'Enero 2026', '01/01/2026', '31/01/2026', 12000, 855, 'paid', '23/01/2026'),
      makeInvoice(id(), 'Febrero 2026', '01/02/2026', '28/02/2026', 11800, 840, 'paid', '22/02/2026'),
      makeInvoice(id(), 'Marzo 2026', '01/03/2026', '31/03/2026', 12100, 870, 'paid', '19/03/2026'),
      makeInvoice(id(), 'Abril 2026', '01/04/2026', '30/04/2026', 12400, 890, 'paid', '20/04/2026'),
      makeInvoice(id(), 'Mayo 2026', '01/05/2026', '30/05/2026', 11850, 850, 'overdue', undefined, true),
      makeInvoice(id(), 'Junio 2026', '01/06/2026', '30/06/2026', 13200, 920, 'pending', undefined, true),
    ],
  },
];

@Injectable({ providedIn: 'root' })
export class UserService {
  private users = USERS;

  findUser(dni: string, numeroCliente: string): UserSession | null {
    return this.users.find(
      u => u.dni === dni && u.numeroCliente === numeroCliente,
    ) ?? null;
  }

  payInvoice(user: UserSession, invoiceId: string): UserSession {
    const updated = {
      ...user,
      invoices: user.invoices.map(inv =>
        inv.id === invoiceId
          ? { ...inv, status: 'paid' as InvoiceStatus, paidDate: new Date().toLocaleDateString('es-AR') }
          : inv,
      ),
    };
    const idx = this.users.findIndex(u => u.dni === user.dni);
    if (idx !== -1) this.users[idx] = updated;
    return updated;
  }
}
