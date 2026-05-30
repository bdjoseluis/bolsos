import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RevealDirective } from '../../shared/directives/reveal.directive';

const API_URL = 'https://api.bdev.qzz.io/api/integrations/lead';
const API_KEY = 'bdev_int_key_2026';

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
