import { Component, OnInit, inject, signal } from '@angular/core';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="sticky top-0 z-50 backdrop-blur-md bg-brand-bg/85 border-b border-slate-800">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="w-3.5 h-3.5 rounded-full bg-brand-secondary animate-pulse" title="Disponible para proyectos"></span>
          <span class="font-mono text-xs text-slate-400">status: <span class="text-brand-secondary font-bold">FREELANCE</span></span>
        </div>
        <div class="flex items-center gap-3">
          <a href="#portfolio-seccion" class="hidden sm:inline-flex text-xs font-mono text-slate-400 hover:text-slate-300 transition-colors">
            // demos.ts
          </a>
          <a href="#experiencia-seccion" class="hidden sm:inline-flex text-xs font-mono text-slate-400 hover:text-slate-300 transition-colors">
            // experiencia.java
          </a>
          <!-- Language toggle -->
          <button (click)="langService.toggle()"
            class="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-300 transition-all font-mono text-xs font-bold"
            [title]="langService.lang() === 'es' ? 'Switch to English' : 'Cambiar a Español'">
            {{ langService.lang() === 'es' ? 'EN' : 'ES' }}
          </button>
          <!-- Theme toggle -->
          <button (click)="toggleTheme()"
            class="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-300 transition-all"
            [title]="isDark() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'">
            @if (isDark()) {
              <i class="fa-solid fa-sun text-sm text-amber-400"></i>
            } @else {
              <i class="fa-solid fa-moon text-sm"></i>
            }
          </button>
          <a href="#contacto-seccion" class="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono font-medium rounded-xl text-brand-secondary flex items-center gap-2 transition-all">
            <i class="fa-solid fa-envelope"></i> Contactar
          </a>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent implements OnInit {
  langService = inject(LangService);
  isDark = signal(false);

  ngOnInit(): void {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      this.isDark.set(true);
    } else {
      // ensure light mode class is absent on init
      document.documentElement.classList.remove('dark');
    }
  }

  toggleTheme(): void {
    const dark = !this.isDark();
    this.isDark.set(dark);
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
