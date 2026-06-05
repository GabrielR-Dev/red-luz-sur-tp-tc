import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [ScrollAnimationDirective],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.scss',
})
export class Nosotros {}
