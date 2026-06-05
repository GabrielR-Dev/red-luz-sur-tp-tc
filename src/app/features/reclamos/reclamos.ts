import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';

@Component({
  selector: 'app-reclamos',
  standalone: true,
  imports: [FormsModule, ScrollAnimationDirective],
  templateUrl: './reclamos.html',
  styleUrl: './reclamos.scss',
})
export class Reclamos {
  protected readonly enviado = signal(false);

  protected form = {
    nombre: '',
    numeroCliente: '',
    direccion: '',
    telefono: '',
    tipo: '',
    descripcion: '',
  };

  protected readonly problemas = [
    {
      icon: '💡',
      titulo: 'Corte de luz total',
      desc: 'No llega electricidad a tu domicilio. Puede deberse a una falla en la red, tormentas, o mantenimiento programado.',
    },
    {
      icon: '⚡',
      titulo: 'Baja tensión / Parpadeos',
      desc: 'Las luces titilan o los electrodomésticos funcionan con menos potencia. Suele ocurrir por sobrecarga en el transformador del barrio.',
    },
    {
      icon: '🔌',
      titulo: 'Medidor averiado',
      desc: 'El medidor no registra, hace ruidos extraños, o dejó de funcionar. Es importante cambiarlo cuanto antes para evitar consumos mal facturados.',
    },
    {
      icon: '📋',
      titulo: 'Error en la facturación',
      desc: 'El monto no coincide con tu consumo habitual, o aparecen cargos que no reconocés. Podés pedir una revisión sin costo.',
    },
    {
      icon: '🌳',
      titulo: 'Árboles en el tendido',
      desc: 'Las ramas están tocando o muy cerca de los cables de media tensión. Esto puede causar cortes y es peligroso en días de lluvia.',
    },
    {
      icon: '🏗️',
      titulo: 'Cableado caído o suelto',
      desc: 'Viste un cable en la vereda o colgando muy bajo. No lo toques ni te acerques; reportalo y lo resolveremos a la brevedad.',
    },
  ];

  enviarReclamo(): void {
    this.enviado.set(true);
  }
}
