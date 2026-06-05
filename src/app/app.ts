import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/components/navbar/navbar';
import { Footer } from './core/components/footer/footer';
import { WhatsappBtn } from './core/components/whatsapp-btn/whatsapp-btn';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, WhatsappBtn],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
