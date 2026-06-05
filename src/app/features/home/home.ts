import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ScrollAnimationDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
