import { Component, computed, inject, signal } from '@angular/core';
import { LangService } from '../../services/lang.service';

const EMAIL = 'frodriguezsidro@gmail.com';

const CONTACT_TEXT = {
  es: {
    title: 'Contacto',
    lead: 'Estoy disponible para proyectos freelance en remoto. Si tienes un proyecto o un puesto en el que pueda encajar, escríbeme y cuéntame el contexto.',
    email: 'Email',
    copy: 'Copiar',
    copied: 'Copiado',
    phone: 'Teléfono',
    cv: 'CV',
    place: 'Castellón de la Plana, España',
  },
  en: {
    title: 'Contact',
    lead: 'I am available for remote freelance projects. If you have a project or a role I might fit, email me with some context.',
    email: 'Email',
    copy: 'Copy',
    copied: 'Copied',
    phone: 'Phone',
    cv: 'CV',
    place: 'Castellón de la Plana, Spain',
  },
} as const;

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer id="contacto" class="ink-block bg-paper text-ink-2 border-t border-rule" aria-labelledby="contact-title">
      <div class="wrap py-20 md:py-28 grid gap-y-10 md:grid-cols-12 md:gap-x-8">
        <header class="md:col-span-3">
          <p class="meta text-accent">06</p>
          <h2 id="contact-title" class="mt-2 font-display text-4xl font-semibold text-ink">{{ t().title }}</h2>
        </header>

        <div class="md:col-span-9">
          <p class="text-xl sm:text-2xl leading-snug max-w-[40ch] text-ink">{{ t().lead }}</p>

          <a
            [href]="'mailto:' + email"
            class="mt-10 inline-block font-display font-semibold text-[clamp(1.6rem,5vw,3.25rem)] leading-tight break-all text-ink hover:text-accent transition-colors"
            >{{ email }}</a
          >

          <dl class="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-4 border-t border-rule text-sm">
            <div class="pt-4 pb-2">
              <dt class="meta">{{ t().email }}</dt>
              <dd class="mt-1">
                <button type="button" class="underline underline-offset-4 decoration-mute text-ink hover:decoration-accent" (click)="copyEmail()" aria-live="polite">
                  {{ copied() ? t().copied : t().copy }}
                </button>
              </dd>
            </div>
            <div class="pt-4 pb-2">
              <dt class="meta">{{ t().phone }}</dt>
              <dd class="mt-1"><a href="tel:+34637216029" class="text-ink hover:text-accent">+34 637 21 60 29</a></dd>
            </div>
            <div class="pt-4 pb-2">
              <dt class="meta">LinkedIn</dt>
              <dd class="mt-1">
                <a href="https://www.linkedin.com/in/fernando-rodriguez-sidro-653531b4/" target="_blank" rel="noopener" class="text-ink hover:text-accent">
                  fernando-rodriguez-sidro ↗
                </a>
              </dd>
            </div>
            <div class="pt-4 pb-2">
              <dt class="meta">{{ t().cv }}</dt>
              <dd class="mt-1 flex gap-4">
                <a href="/assets/cv-fernando-rodriguez-es.pdf" download hreflang="es" class="text-ink hover:text-accent">PDF · ES</a>
                <a href="/assets/cv-fernando-rodriguez-en.pdf" download hreflang="en" class="text-ink hover:text-accent">PDF · EN</a>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="border-t border-rule">
        <div class="wrap py-6 flex flex-col sm:flex-row justify-between gap-2 meta">
          <span>© {{ year }} Fernando Rodríguez Sidro</span>
          <span>{{ t().place }}</span>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  private langService = inject(LangService);
  t = computed(() => CONTACT_TEXT[this.langService.lang()]);
  email = EMAIL;
  year = new Date().getFullYear();
  copied = signal(false);

  copyEmail(): void {
    navigator.clipboard?.writeText(EMAIL).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
