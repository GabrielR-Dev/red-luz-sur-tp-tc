import { Component, computed, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { VotingService } from '../../../core/services/voting.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-tu-barrio-decide',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './tu-barrio-decide.html',
  styleUrl: './tu-barrio-decide.scss',
})
export class TuBarrioDecide {
  protected readonly step = signal<'login' | 'voting' | 'results'>('login');
  protected readonly userVoted = signal(false);
  protected form = { dni: '', numeroCliente: '' };
  protected readonly error = signal('');

  readonly voting;

  constructor(
    private votingSvc: VotingService,
    protected authSvc: AuthService,
  ) {
    this.voting = this.votingSvc.voting;

    effect(() => {
      if (!this.authSvc.isLoggedIn()) {
        this.step.set('login');
        this.form = { dni: '', numeroCliente: '' };
        this.error.set('');
      }
    });
  }

  readonly percentageA = computed(() => {
    const v = this.voting();
    return v.totalVotes > 0 ? Math.round((v.options[0].votes / v.totalVotes) * 100) : 0;
  });

  readonly percentageB = computed(() => {
    const v = this.voting();
    return v.totalVotes > 0 ? Math.round((v.options[1].votes / v.totalVotes) * 100) : 0;
  });

  readonly daysLeft = computed(() => {
    const now = new Date();
    const end = new Date(this.voting().endDate);
    const diff = end.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  });

  ngOnInit(): void {
    const u = this.authSvc.user();
    if (u) {
      if (this.votingSvc.hasVoted(u.dni)) {
        this.userVoted.set(true);
        this.step.set('results');
      } else {
        this.step.set('voting');
      }
    }
  }

  ingresar(): void {
    this.error.set('');
    if (!this.form.dni || !this.form.numeroCliente) {
      this.error.set('Completá ambos campos para identificarte como socio/a.');
      return;
    }
    const ok = this.authSvc.login(this.form.dni, this.form.numeroCliente);
    if (!ok) {
      this.error.set('DNI o número de cliente incorrecto. No pudimos identificarte.');
      return;
    }
    if (this.votingSvc.hasVoted(this.form.dni)) {
      this.userVoted.set(true);
      this.step.set('results');
    } else {
      this.step.set('voting');
    }
  }

  votar(optionId: string): void {
    const u = this.authSvc.user();
    if (!u) return;
    this.votingSvc.vote(optionId, u.dni);
    this.userVoted.set(true);
    this.step.set('results');
  }

  cerrarSesion(): void {
    this.authSvc.logout();
    this.form = { dni: '', numeroCliente: '' };
    this.error.set('');
    this.step.set('login');
  }
}
