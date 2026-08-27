import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { environment } from '../../../environments/environment';

const API_URL = environment.integracionLeads.url;
const API_KEY = environment.integracionLeads.clave;

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [RouterLink, RevealDirective, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss',
})
export class ContactoComponent {
  nombre   = signal('');
  email    = signal('');
  telefono = signal('');
  mensaje  = signal('');
  estado   = signal<'idle' | 'loading' | 'ok' | 'error'>('idle');

  async enviar() {
    if (!this.nombre().trim() || !this.email().trim()) return;
    this.estado.set('loading');
    try {
      const r = await fetch(API_URL, {
        method:  'POST',
        headers: {
          'Content-Type':      'application/json',
          'X-Integration-Key': API_KEY,
        },
        body: JSON.stringify({
          nombre:   this.nombre().trim(),
          email:    this.email().trim(),
          telefono: this.telefono().trim(),
          mensaje:  this.mensaje().trim(),
          fuente:   'bolsos-clari',
        }),
      });
      this.estado.set(r.ok ? 'ok' : 'error');
    } catch {
      this.estado.set('error');
    }
  }
}
