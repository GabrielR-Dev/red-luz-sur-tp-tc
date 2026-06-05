import { Component, computed, input } from '@angular/core';
import { ConsumptionLevel } from '../../../core/models/consumption.interface';

@Component({
  selector: 'app-semaforo-consumo',
  standalone: true,
  imports: [],
  templateUrl: './semaforo-consumo.html',
  styleUrl: './semaforo-consumo.scss',
})
export class SemaforoConsumo {
  readonly consumption = input.required<number>();

  readonly limits = {
    green: { min: 0, max: 250 },
    yellow: { min: 251, max: 400 },
    red: { min: 401, max: Infinity },
  };

  readonly level = computed<ConsumptionLevel>(() => {
    const c = this.consumption();
    if (c <= this.limits.green.max) return 'green';
    if (c <= this.limits.yellow.max) return 'yellow';
    return 'red';
  });

  readonly levelLabel = computed<string>(() => {
    const labels: Record<ConsumptionLevel, string> = {
      green: 'Consumo bajo — ¡Vas bien!',
      yellow: 'Consumo moderado — Prestá atención',
      red: 'Consumo alto — Revisá tus hábitos',
    };
    return labels[this.level()];
  });

  readonly levelAdvice = computed<string>(() => {
    const advice: Record<ConsumptionLevel, string> = {
      green: 'Seguí así. Recordá apagar luces y desconectar electrodomésticos que no uses.',
      yellow: 'Estás cerca del límite. Revisá el aire acondicionado y los equipos en standby.',
      red: 'Tu consumo está muy elevado. Te recomendamos revisar instalaciones y contactarnos para una auditoría energética gratuita.',
    };
    return advice[this.level()];
  });

  readonly barPercent = computed<number>(() => {
    const c = this.consumption();
    const maxDisplay = 600;
    return Math.min((c / maxDisplay) * 100, 100);
  });
}
