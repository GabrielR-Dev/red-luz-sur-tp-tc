import { Component } from '@angular/core';
import { SimuladorAhorro } from './simulador-ahorro/simulador-ahorro';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-energia-solar',
  standalone: true,
  imports: [SimuladorAhorro, ScrollAnimationDirective],
  templateUrl: './energia-solar.html',
  styleUrl: './energia-solar.scss',
})
export class EnergiaSolar {
  readonly costoKwh = 35;
}
