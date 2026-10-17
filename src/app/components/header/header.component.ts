import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { LangService } from '../../services/lang.service';

const HEADER_TEXT = {
  es: {
    nav: [
      { href: '#proyectos', label: 'Proyectos' },
      { href: '#demos', label: 'Demos' },
      { href: '#experiencia', label: 'Experiencia' },
      { href: '#stack', label: 'Stack' },
      { href: '#sobre-mi', label: 'Sobre mí' },
      { href: '#contacto', label: 'Contacto' },
    ],
    menu: 'Menú',
    close: 'Cerrar',
    langLabel: 'Switch to English',
    toDark: 'Cambiar a modo oscuro',
    toLight: 'Cambiar a modo claro',
    skip: 'Saltar al contenido',
  },
  en: {
    nav: [
      { href: '#proyectos', label: 'Work' },
      { href: '#demos', label: 'Demos' },
      { href: '#experiencia', label: 'Experience' },
      { href: '#stack', label: 'Stack' },
      { href: '#sobre-mi', label: 'About' },
      { href: '#contacto', label: 'Contact' },
    ],
    menu: 'Menu',
    close: 'Close',
    langLabel: 'Cambiar a español',
    toDark: 'Switch to dark mode',
    toLight: 'Switch to light mode',
    skip: 'Skip to content',
  },
} as const;

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-ink focus:text-paper focus:px-3 focus:py-2 text-sm"
      >{{ t().skip }}</a
    >
    <header class="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-rule">
      <div class="wrap h-14 flex items-center justify-between gap-6">
        <a href="#inicio" class="font-mono text-[0.8rem] text-ink tracking-tight whitespace-nowrap">
          F. Rodríguez <span class="hidden sm:inline text-mute">/ software engineer</span>
        </a>

        <nav class="hidden lg:block" aria-label="Principal">
          <ul class="flex items-center gap-6 text-sm">
            @for (item of t().nav; track item.href) {
              <li><a [href]="item.href" class="text-ink-2 hover:text-accent transition-colors">{{ item.label }}</a></li>
            }
          </ul>
        </nav>

        <div class="flex items-center gap-1">
          <button
            type="button"
            (click)="langService.toggle()"
            class="h-9 px-2 font-mono text-xs text-ink-2 whitespace-nowrap hover:text-accent transition-colors"
            [attr.aria-label]="t().langLabel"
          >
            <span [class.text-ink]="langService.lang() === 'es'" [class.font-medium]="langService.lang() === 'es'">ES</span>
            <span class="text-mute"> / </span>
            <span [class.text-ink]="langService.lang() === 'en'" [class.font-medium]="langService.lang() === 'en'">EN</span>
          </button>
          <button
            type="button"
            (click)="toggleTheme()"
            class="w-9 h-9 flex items-center justify-center text-ink-2 hover:text-accent transition-colors"
            [attr.aria-label]="isDark() ? t().toLight : t().toDark"
          >
            @if (isDark()) {
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
            } @else {
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/></svg>
            }
          </button>
          <button
            type="button"
            class="lg:hidden h-9 pl-2 font-mono text-xs text-ink"
            (click)="menuOpen.set(!menuOpen())"
            [attr.aria-expanded]="menuOpen()"
            aria-controls="mobile-nav"
          >
            {{ menuOpen() ? t().close : t().menu }}
          </button>
        </div>
      </div>

      @if (menuOpen()) {
        <nav id="mobile-nav" class="lg:hidden border-t border-rule" aria-label="Principal">
          <ul class="wrap py-3">
            @for (item of t().nav; track item.href; let i = $index) {
              <li>
                <a
                  [href]="item.href"
                  (click)="menuOpen.set(false)"
                  class="flex items-baseline gap-4 py-2.5 text-ink hover:text-accent"
                >
                  <span class="meta w-6">0{{ i + 1 }}</span>{{ item.label }}
                </a>
              </li>
            }
          </ul>
        </nav>
      }
    </header>
  `,
})
export class HeaderComponent implements OnInit {
  langService = inject(LangService);
  t = computed(() => HEADER_TEXT[this.langService.lang()]);
  isDark = signal(false);
  menuOpen = signal(false);

  ngOnInit(): void {
    // The inline script in index.html already applied the theme; mirror it here.
    this.isDark.set(document.documentElement.classList.contains('dark'));
  }

  toggleTheme(): void {
    const dark = !this.isDark();
    this.isDark.set(dark);
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {}
  }
}
