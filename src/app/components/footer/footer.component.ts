import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="border-t border-slate-950 bg-slate-950 py-10 mt-24">
      <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div>
          © 2026 Fernando Rodríguez Sidro. Diseñado con rigor de ingeniería informática.
        </div>
        <div class="flex gap-4">
          <span>Castellón de la Plana, España</span>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
