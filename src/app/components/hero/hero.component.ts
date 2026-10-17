import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { LangService } from '../../services/lang.service';

const HERO_TEXT = {
  es: {
    eyebrow: 'Full-stack · Gestión de proyectos y equipos',
    lead: 'Ingeniero de software full-stack con más de diez años de experiencia. Desarrollo backend en Java y frontend en Angular, y he dirigido proyectos y equipos en sectores como ERP, industria, procurement y sanidad.',
    body: 'En estos años he diseñado y desarrollado aplicaciones web completas, del backend y las APIs al frontend, las he integrado con ERPs, hardware industrial y servicios de terceros, y las he llevado a producción. Durante buena parte de ese tiempo he compaginado el desarrollo con la gestión de proyectos y equipos.',
    bannerLabel: 'Lo que hago',
    banner: ['Desarrollo de software', 'Gestión de equipos', 'Gestión de proyectos', 'Arquitectura de software', 'Backend Java · Frontend Angular'],
    spec: [
      { k: 'Base', v: 'Castellón de la Plana', accent: false },
      { k: 'Modalidad', v: 'Remoto', accent: false },
      { k: 'Estado', v: 'Freelance desde mayo de 2025 · disponible', accent: true },
      { k: 'Experiencia', v: 'Más de 10 años en desarrollo de software', accent: false },
      { k: 'Sectores', v: 'ERP, industria, procurement, sanidad', accent: false },
      { k: 'Idiomas', v: 'Español, valenciano, inglés C1, alemán A2', accent: false },
    ],
    areasLabel: 'Áreas principales',
    devLabel: 'Desarrollo full-stack',
    mgmtLabel: 'Gestión',
    dev: [
      { title: 'Backend', text: 'Java, Spring Boot y Quarkus. Microservicios, APIs REST y arquitectura hexagonal.' },
      { title: 'Frontend', text: 'Angular (8 → 22), webs y apps híbridas con Ionic.' },
      { title: 'Integración', text: 'ERPs, hardware industrial y servicios de terceros.' },
    ],
    mgmt: [
      { title: 'Proyectos', text: 'De principio a fin: análisis y requisitos con el cliente, planificación por hitos, entrega y soporte en producción.' },
      { title: 'Equipos', text: 'Responsable del departamento de innovación en Mas Ingenieros. Coordinación de equipos remotos con Scrum y Kanban y definición de metodologías de trabajo.' },
    ],
    ctaWork: 'Ver proyectos',
    ctaMail: 'Escribirme',
    cv: 'CV en PDF',
  },
  en: {
    eyebrow: 'Full-stack · Project and team management',
    lead: 'Full-stack software engineer with more than ten years of experience. I build Java backends and Angular frontends, and I have led projects and teams in sectors such as ERP, manufacturing, procurement and healthcare.',
    body: 'Over these years I have designed and built complete web applications, from the backend and APIs to the frontend, integrated them with ERPs, industrial hardware and third-party services, and taken them to production. For much of that time I have combined development with managing projects and teams.',
    bannerLabel: 'What I do',
    banner: ['Software development', 'Team management', 'Project management', 'Software architecture', 'Java backend · Angular frontend'],
    spec: [
      { k: 'Based in', v: 'Castellón de la Plana, Spain', accent: false },
      { k: 'Work', v: 'Remote', accent: false },
      { k: 'Status', v: 'Freelance since May 2025 · available', accent: true },
      { k: 'Experience', v: 'More than 10 years in software development', accent: false },
      { k: 'Sectors', v: 'ERP, manufacturing, procurement, healthcare', accent: false },
      { k: 'Languages', v: 'Spanish, Valencian, English C1, German A2', accent: false },
    ],
    areasLabel: 'Core areas',
    devLabel: 'Full-stack development',
    mgmtLabel: 'Management',
    dev: [
      { title: 'Backend', text: 'Java, Spring Boot and Quarkus. Microservices, REST APIs and hexagonal architecture.' },
      { title: 'Frontend', text: 'Angular (8 → 22), websites and hybrid apps with Ionic.' },
      { title: 'Integration', text: 'ERPs, industrial hardware and third-party services.' },
    ],
    mgmt: [
      { title: 'Projects', text: 'End to end: analysis and requirements with the client, milestone planning, delivery and production support.' },
      { title: 'Teams', text: 'Head of the innovation department at Mas Ingenieros. Coordinating remote teams with Scrum and Kanban and defining ways of working.' },
    ],
    ctaWork: 'See the work',
    ctaMail: 'Email me',
    cv: 'CV as PDF',
  },
} as const;

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section id="inicio" class="wrap pt-14 pb-20 md:pt-24 md:pb-28" aria-labelledby="hero-title">
      <p class="meta uppercase tracking-[0.14em]">{{ t().eyebrow }}</p>
      <div class="mt-5 flex flex-wrap items-end gap-x-10 gap-y-6">
        <h1
          id="hero-title"
          class="font-display font-semibold text-ink tracking-[-0.02em] leading-[0.92] text-[clamp(3rem,10vw,7.25rem)]"
        >
          Fernando<br />Rodríguez Sidro
        </h1>
        <!-- Rotating banner of main skills; decorative, the same facts are in the text below -->
        <p
          class="mb-[0.6rem] w-[19rem] max-w-full border-l-2 border-accent pl-4 font-mono text-sm sm:text-base text-ink whitespace-nowrap"
          aria-hidden="true"
        >
          <span class="meta block mb-1">{{ t().bannerLabel }}</span>
          <span>{{ typed() }}</span><span class="caret text-accent">▍</span>
        </p>
      </div>

      <div class="mt-10 grid gap-y-12 md:grid-cols-12 md:gap-x-8">
        <div class="md:col-span-8">
          <p class="max-w-[34ch] text-xl sm:text-2xl leading-snug text-ink">{{ t().lead }}</p>
          <p class="mt-6 max-w-[60ch] leading-relaxed">{{ t().body }}</p>

          <div class="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
            <a href="#proyectos" class="inline-flex items-center gap-2 bg-ink text-paper px-5 py-3 font-medium hover:bg-accent transition-colors">
              {{ t().ctaWork }} <span aria-hidden="true">↓</span>
            </a>
            <a href="mailto:frodriguezsidro@gmail.com" class="link">{{ t().ctaMail }}</a>
            <span class="flex items-center gap-3">
              <span class="text-mute">{{ t().cv }}</span>
              <a href="/assets/cv-fernando-rodriguez-es.pdf" download class="link font-mono text-xs" hreflang="es">ES</a>
              <a href="/assets/cv-fernando-rodriguez-en.pdf" download class="link font-mono text-xs" hreflang="en">EN</a>
            </span>
          </div>
        </div>

        <dl class="md:col-span-4 md:self-start border-t border-ink text-sm">
          @for (row of t().spec; track row.k) {
            <div class="grid grid-cols-[7rem_1fr] gap-3 py-3 border-b border-rule">
              <dt class="meta pt-px">{{ row.k }}</dt>
              <dd class="text-ink flex items-baseline gap-2">
                @if (row.accent) {
                  <span class="inline-block w-2 h-2 bg-accent shrink-0 translate-y-[-1px]" aria-hidden="true"></span>
                }
                {{ row.v }}
              </dd>
            </div>
          }
        </dl>
      </div>

      <div class="mt-20 border-t border-rule pt-6">
        <h2 class="meta uppercase tracking-[0.14em]">{{ t().areasLabel }}</h2>
        <!-- Hybrid profile: development on the left, management on the right -->
        <div class="mt-6 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div class="lg:col-span-7">
            <h3 class="font-display text-2xl font-semibold text-ink pb-3 border-b border-ink">{{ t().devLabel }}</h3>
            <ol class="mt-6 grid gap-8 sm:grid-cols-3">
              @for (area of t().dev; track area.title; let i = $index) {
                <li>
                  <span class="meta text-accent">0{{ i + 1 }}</span>
                  <h4 class="mt-1 font-display text-xl font-semibold text-ink">{{ area.title }}</h4>
                  <p class="mt-2 text-[0.95rem] leading-relaxed">{{ area.text }}</p>
                </li>
              }
            </ol>
          </div>
          <div class="lg:col-span-5">
            <h3 class="font-display text-2xl font-semibold text-ink pb-3 border-b border-ink">{{ t().mgmtLabel }}</h3>
            <ol class="mt-6 grid gap-8 sm:grid-cols-2">
              @for (area of t().mgmt; track area.title; let i = $index) {
                <li>
                  <span class="meta text-accent">0{{ t().dev.length + i + 1 }}</span>
                  <h4 class="mt-1 font-display text-xl font-semibold text-ink">{{ area.title }}</h4>
                  <p class="mt-2 text-[0.95rem] leading-relaxed">{{ area.text }}</p>
                </li>
              }
            </ol>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent implements OnInit, OnDestroy {
  private langService = inject(LangService);
  t = computed(() => HERO_TEXT[this.langService.lang()]);
  typed = signal('');

  private timer?: ReturnType<typeof setTimeout>;
  private word = 0;
  private chars = 0;
  private deleting = false;

  ngOnInit(): void {
    const reduced = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      this.rotate();
    } else {
      this.type();
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

  /** Typewriter: type a skill, hold it, delete it, move to the next one. */
  private type(): void {
    const skills = this.t().banner;
    const current = skills[this.word % skills.length];
    let delay: number;
    if (!this.deleting) {
      this.chars = Math.min(this.chars + 1, current.length);
      delay = this.chars === current.length ? 1800 : 55;
      this.deleting = this.chars === current.length;
    } else {
      this.chars--;
      delay = 28;
      if (this.chars <= 0) {
        this.chars = 0;
        this.deleting = false;
        this.word++;
        delay = 350;
      }
    }
    this.typed.set(current.slice(0, this.chars));
    this.timer = setTimeout(() => this.type(), delay);
  }

  /** Reduced motion: swap whole words, no typing. */
  private rotate(): void {
    const skills = this.t().banner;
    this.typed.set(skills[this.word++ % skills.length]);
    this.timer = setTimeout(() => this.rotate(), 3000);
  }
}
