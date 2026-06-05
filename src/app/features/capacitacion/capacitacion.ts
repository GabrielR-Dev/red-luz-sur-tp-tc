import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-capacitacion',
  standalone: true,
  imports: [FormsModule, ScrollAnimationDirective],
  templateUrl: './capacitacion.html',
  styleUrl: './capacitacion.scss',
})
export class Capacitacion {
  protected readonly inscripcionAbierta = signal(true);
  protected readonly enviado = signal(false);

  protected form = {
    nombre: '',
    email: '',
    telefono: '',
    edad: '',
    barrio: '',
    motivo: '',
  };

  enviarFormulario(): void {
    this.enviado.set(true);
  }
}
