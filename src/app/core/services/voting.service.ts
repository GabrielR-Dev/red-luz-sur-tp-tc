import { Injectable, signal } from '@angular/core';
import { Voting } from '../models/voting.interface';

@Injectable({ providedIn: 'root' })
export class VotingService {
  private readonly _voting = signal<Voting>({
    id: '1',
    title: '¿Con el fondo de este mes…?',
    description: 'Votá cómo usar el fondo comunitario de junio. El resultado se define entre todos los socios el último día del mes.',
    month: 'Junio 2026',
    budget: 285000,
    budgetDescription: 'Fondo comunitario disponible este mes, acumulado del 5% de cada factura.',
    participacionAnt: '72% de los socios participaron en la votación de mayo.',
    endDate: new Date('2026-06-30'),
    votedDnis: [],
    totalVotes: 347,
    options: [
      {
        id: 'a',
        title: 'Iluminamos la plaza',
        description: 'Colocamos luces LED eficientes en la plaza principal del barrio.',
        longDescription: 'Instalación de 12 columnas con luminarias LED de bajo consumo, temporizador automático y sensor de movimiento. La plaza va a quedar iluminada toda la noche gastando un 70% menos que las luces actuales.',
        impact: 'Beneficia a más de 800 familias que usan la plaza a diario. Menos consumo, más seguridad.',
        duration: 'Ejecución estimada: 15 días.',
        votes: 182,
        icon: '💡',
      },
      {
        id: 'b',
        title: 'Paneles en el club',
        description: 'Instalamos paneles solares en el Club Social y Deportivo.',
        longDescription: 'Montaje de 18 paneles fotovoltaicos de 450W en la terraza del club. El club pasa a generar su propia energía y el ahorro se reinvierte en actividades gratuitas para los pibes del barrio.',
        impact: 'El club ahorra $8.000 por mes en electricidad. Esos fondos se destinan a talleres deportivos y culturales gratuitos.',
        duration: 'Ejecución estimada: 30 días.',
        votes: 165,
        icon: '☀️',
      },
    ],
  });

  readonly voting = this._voting.asReadonly();

  hasVoted(dni: string): boolean {
    return this._voting().votedDnis.includes(dni);
  }

  vote(optionId: string, dni: string): boolean {
    this._voting.update(v => {
      if (v.votedDnis.includes(dni)) return v;
      const options = v.options.map(o =>
        o.id === optionId ? { ...o, votes: o.votes + 1 } : o
      );
      return {
        ...v,
        options,
        totalVotes: v.totalVotes + 1,
        votedDnis: [...v.votedDnis, dni],
      };
    });
    return true;
  }
}
