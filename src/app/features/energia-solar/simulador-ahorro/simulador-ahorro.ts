import { DecimalPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-simulador-ahorro',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './simulador-ahorro.html',
  styleUrl: './simulador-ahorro.scss',
})
export class SimuladorAhorro {
  readonly consumoActual = signal(400);
  readonly costoKwhCoop = 35;
  readonly costoKwhPriv = 50;

  readonly paneles = computed(() => Math.ceil(this.consumoActual() / 150));
  readonly facturaCoop = computed(() => Math.round(this.consumoActual() * this.costoKwhCoop));
  readonly facturaPriv = computed(() => Math.round(this.consumoActual() * this.costoKwhPriv));
  readonly ahorroVsPriv = computed(() => this.facturaPriv() - this.facturaCoop());
  readonly ahorroMensual = computed(() => Math.round(this.consumoActual() * this.costoKwhCoop * 0.6));
  readonly ahorroAnual = computed(() => this.ahorroMensual() * 12);
  readonly ahorro5a = computed(() => this.ahorroMensual() * 60);
  readonly co2 = computed(() => Math.round(this.consumoActual() * 0.00042 * 365));

  setConsumo(val: string): void {
    const n = parseInt(val, 10);
    if (!isNaN(n) && n >= 0) this.consumoActual.set(n);
  }
}
