import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../../shared/directives/scroll-animation.directive';

interface Post {
  title: string;
  date: string;
  category: string;
  summary: string;
  img: string;
}

interface Informe {
  title: string;
  date: string;
  description: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [ScrollAnimationDirective],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog {
  protected readonly posts: Post[] = [
    {
      title: 'Taller de energía responsable en la Escuela N°23',
      date: '15 de mayo, 2026',
      category: 'Escuelas',
      summary: 'Chicos y chicas de 6to grado aprendieron cómo reducir el consumo en casa. Se llevaron un kit LED para instalar con sus familias.',
      img: '/img/instalacion-paneles (2).jpg',
    },
    {
      title: 'Nuevos paneles solares en el Centro Comunitario',
      date: '2 de mayo, 2026',
      category: 'Energía Solar',
      summary: 'Gracias al fondo comunitario, instalamos 12 paneles que abastecerán el centro de jubilados. ¡Un ahorro de $15.000 por mes!',
      img: '/img/instalacion-paneles.jpg',
    },
    {
      title: 'Jóvenes del barrio finalizan su capacitación fotovoltaica',
      date: '20 de abril, 2026',
      category: 'Capacitación',
      summary: '8 jóvenes recibieron su certificado tras completar el curso de instalación de paneles solares. Ya están trabajando en sus primeros proyectos.',
      img: '/img/tecnico-electricista.jpg',
    },
  ];

  protected readonly informes: Informe[] = [
    {
      title: 'Informe trimestral Q1 2026',
      date: 'Abril 2026',
      description: 'Ingresos, egresos, inversiones y consumo del primer trimestre. Datos completos y auditados por la asamblea.',
    },
    {
      title: 'Balance anual 2025',
      date: 'Febrero 2026',
      description: 'Resumen del ejercicio: recaudación, fondos destinados a mantenimiento, fondo solar y proyectos comunitarios.',
    },
  ];
}
