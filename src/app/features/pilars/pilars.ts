import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-pilars',
  standalone: true,
  imports: [ScrollAnimationDirective],
  templateUrl: './pilars.html',
  styleUrl: './pilars.scss',
})
export class Pilars {}
