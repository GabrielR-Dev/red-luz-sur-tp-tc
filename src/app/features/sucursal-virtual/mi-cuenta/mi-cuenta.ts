import { Component, signal, computed, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { SemaforoConsumo } from '../semaforo-consumo/semaforo-consumo';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { Invoice } from '../../../core/models/invoice.interface';
import { ScrollAnimationDirective } from '../../../shared/directives/scroll-animation.directive';

export interface DailyPoint {
  day: number;
  value: number;
  label: string;
}

@Component({
  selector: 'app-mi-cuenta',
  standalone: true,
  imports: [FormsModule, SemaforoConsumo, DecimalPipe, ScrollAnimationDirective],
  templateUrl: './mi-cuenta.html',
  styleUrl: './mi-cuenta.scss',
})
export class MiCuenta {
  private authSvc = inject(AuthService);
  private userSvc = inject(UserService);

  protected readonly step = signal<'login' | 'loading' | 'dashboard'>('login');

  protected form = { dni: '', numeroCliente: '' };
  protected error = signal('');
  protected detailInvoice = signal<Invoice | null>(null);

  protected readonly user = this.authSvc.user;
  protected readonly isLoggedIn = this.authSvc.isLoggedIn;
  protected readonly pendingInvoice = computed(() =>
    this.user()?.invoices.find(i => i.status === 'pending' || i.status === 'overdue') ?? null,
  );
  private readonly monthMap: Record<string, number> = {
    Enero: 1, Febrero: 2, Marzo: 3, Abril: 4, Mayo: 5, Junio: 6,
    Julio: 7, Agosto: 8, Septiembre: 9, Octubre: 10, Noviembre: 11, Diciembre: 12,
  };

  private periodToNum(period: string): number {
    const [mes, anio] = period.split(' ');
    return parseInt(anio) * 100 + (this.monthMap[mes] ?? 0);
  }

  protected readonly allInvoicesSorted = computed(() => {
    const invs = this.user()?.invoices ?? [];
    return [...invs].sort((a, b) => this.periodToNum(b.period) - this.periodToNum(a.period));
  });
  protected readonly consumption = computed(() =>
    this.pendingInvoice()?.consumption ?? 0,
  );

  protected readonly allInvoices = computed(() => {
    const u = this.user();
    if (!u) return [];
    return [...u.invoices].sort((a, b) => this.periodToNum(a.period) - this.periodToNum(b.period));
  });

  protected readonly maxConsumption = computed(() =>
    Math.max(...this.allInvoices().map(i => i.consumption), 1),
  );

  protected readonly avgConsumption = computed(() => {
    const invs = this.allInvoices();
    return invs.length ? Math.round(invs.reduce((s, i) => s + i.consumption, 0) / invs.length) : 0;
  });

  protected readonly minConsumption = computed(() =>
    Math.min(...this.allInvoices().map(i => i.consumption)),
  );

  protected readonly trend = computed(() => {
    const invs = this.allInvoices();
    if (invs.length < 2) return 'stable';
    const last = invs[invs.length - 1].consumption;
    const prev = invs[invs.length - 2].consumption;
    if (last > prev * 1.05) return 'up';
    if (last < prev * 0.95) return 'down';
    return 'stable';
  });

  protected readonly hasEstimated = computed(() =>
    this.allInvoices().some(i => i.estimated),
  );



  constructor() {
    effect(() => {
      if (!this.isLoggedIn()) {
        this.step.set('login');
        this.form = { dni: '', numeroCliente: '' };
        this.detailInvoice.set(null);
      }
    });
  }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.step.set('dashboard');
    }
  }

  ingresar(): void {
    this.error.set('');
    if (!this.form.dni || !this.form.numeroCliente) {
      this.error.set('Completá ambos campos para ingresar.');
      return;
    }
    this.step.set('loading');
    setTimeout(() => {
      const ok = this.authSvc.login(this.form.dni, this.form.numeroCliente);
      if (ok) {
        this.step.set('dashboard');
      } else {
        this.error.set('DNI o número de cliente incorrecto. Probá de nuevo.');
        this.step.set('login');
      }
    }, 1200);
  }

  cerrarSesion(): void {
    this.authSvc.logout();
    this.form = { dni: '', numeroCliente: '' };
    this.detailInvoice.set(null);
    this.step.set('login');
  }

  pagarFactura(): void {
    const u = this.user();
    const inv = this.pendingInvoice();
    if (!u || !inv) return;
    const updated = this.userSvc.payInvoice(u, inv.id);
    this.authSvc.updateUser(updated);
  }

  verDetalle(inv: Invoice): void {
    this.detailInvoice.set(inv);
  }

  cerrarDetalle(): void {
    this.detailInvoice.set(null);
  }

  protected barHeight(consumption: number): number {
    const min = this.minConsumption();
    const max = this.maxConsumption();
    if (max === min) return 250;
    return 50 + ((consumption - min) / (max - min)) * 200;
  }

  protected readonly dailyData = computed<DailyPoint[]>(() => {
    const inv = this.detailInvoice();
    if (!inv) return [];
    const total = inv.consumption;
    const [mes, anio] = inv.period.split(' ');
    const monthNum = this.monthMap[mes];
    const daysInMonth = new Date(parseInt(anio), monthNum, 0).getDate();

    const base = total / daysInMonth;
    const values: number[] = [];
    let sum = 0;
    for (let d = 0; d < daysInMonth; d++) {
      const variation = 0.5 + Math.random() * 1.2;
      const weekend = (new Date(parseInt(anio), monthNum - 1, d + 1).getDay() % 6 === 0) ? 1.3 : 1;
      values.push(base * variation * weekend);
      sum += values[d];
    }
    const factor = total / sum;
    return values.map((v, i) => ({
      day: i + 1,
      value: Math.round(v * factor * 10) / 10,
      label: `${i + 1}/${mes.toLowerCase().slice(0, 3)}`,
    }));
  });

  protected readonly chartPoints = computed(() => {
    const data = this.dailyData();
    if (!data.length) return '';
    const w = 600;
    const h = 200;
    const pad = 10;
    const maxVal = Math.max(...data.map(d => d.value));
    const stepX = (w - pad * 2) / (data.length - 1);
    const scaleY = (v: number) => h - pad - ((v - 0) / (maxVal || 1)) * (h - pad * 2);

    const pts = data.map((d, i) => `${(i * stepX + pad).toFixed(1)},${scaleY(d.value).toFixed(1)}`);
    const area = data.map((d, i) => `${(i * stepX + pad).toFixed(1)},${scaleY(d.value).toFixed(1)}`);

    const mid = Math.floor(data.length / 2);
    const c1x = (parseFloat(pts[0].split(',')[0]) + parseFloat(pts[mid].split(',')[0])) / 2;
    const c1y = (parseFloat(pts[0].split(',')[1]) + parseFloat(pts[mid].split(',')[1])) / 2;
    const c2x = (parseFloat(pts[mid].split(',')[0]) + parseFloat(pts[pts.length - 1].split(',')[0])) / 2;
    const c2y = (parseFloat(pts[mid].split(',')[1]) + parseFloat(pts[pts.length - 1].split(',')[1])) / 2;

    const smoothLine = pts.map((p, i) => {
      const [x, y] = p.split(',');
      if (i === 0) return `M ${x} ${y}`;
      const prev = pts[i - 1].split(',');
      const cpx = (parseFloat(prev[0]) + parseFloat(x)) / 2;
      return `Q ${cpx} ${prev[1]}, ${x} ${y}`;
    }).join(' ');

    const areaPath = smoothLine + ` L ${w - pad} ${h} L ${pad} ${h} Z`;

    return { smoothLine, areaPath, maxVal, stepX, pad, w, h };
  });

  protected readonly chartTooltip = signal<{ x: number; y: number; day: number; value: number; label: string } | null>(null);

  protected onChartHover(event: MouseEvent, svgEl: SVGSVGElement): void {
    const data = this.dailyData();
    if (!data.length) return;
    const rect = svgEl.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const chartW = rect.width;
    const pad = 10;
    const stepX = (chartW - pad * 2) / (data.length - 1);
    const idx = Math.round((mouseX - pad) / stepX);
    const d = data[Math.max(0, Math.min(idx, data.length - 1))];
    const maxVal = Math.max(...data.map(p => p.value));
    const scaleY = (v: number) => 200 - pad - ((v - 0) / (maxVal || 1)) * (200 - pad * 2);
    this.chartTooltip.set({
      x: (idx * stepX + pad) / chartW * 100,
      y: scaleY(d.value),
      day: d.day,
      value: d.value,
      label: d.label,
    });
  }

  protected onChartLeave(): void {
    this.chartTooltip.set(null);
  }

  protected readonly chartMetrics = computed(() => {
    const data = this.dailyData();
    if (!data.length) return null;
    const total = data.reduce((s, d) => s + d.value, 0);
    const avg = total / data.length;
    const max = data.reduce((a, b) => a.value > b.value ? a : b);
    const min = data.reduce((a, b) => a.value < b.value ? a : b);
    return { total: Math.round(total), avg: Math.round(avg * 10) / 10, max, min };
  });

  protected barColor(consumption: number): string {
    if (consumption <= 250) return 'linear-gradient(180deg, #66bb6a, #2e7d32)';
    if (consumption <= 400) return 'linear-gradient(180deg, #ffd54f, #f5a623)';
    return 'linear-gradient(180deg, #ef9a9a, #d32f2f)';
  }

  protected shortPeriod(period: string): string {
    const [mes, anio] = period.split(' ');
    const abbr: Record<string, string> = {
      Enero: 'Ene', Febrero: 'Feb', Marzo: 'Mar', Abril: 'Abr',
      Mayo: 'May', Junio: 'Jun', Julio: 'Jul', Agosto: 'Ago',
      Septiembre: 'Sep', Octubre: 'Oct', Noviembre: 'Nov', Diciembre: 'Dic',
    };
    return `${abbr[mes] ?? mes} ${anio}`;
  }
}
