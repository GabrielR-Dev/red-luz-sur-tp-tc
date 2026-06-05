import { Component } from '@angular/core';
import { TuBarrioDecide } from './tu-barrio-decide/tu-barrio-decide';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-participacion',
  standalone: true,
  imports: [TuBarrioDecide, ScrollAnimationDirective],
  templateUrl: './participacion.html',
  styleUrl: './participacion.scss',
})
export class Participacion {}
