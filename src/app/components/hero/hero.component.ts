import { Component, computed, inject, signal } from '@angular/core';
import { NgStyle } from '@angular/common';
import { LangService } from '../../services/lang.service';

interface CardStyle {
  transform: string;
  boxShadow: string;
}

const HERO_TEXT = {
  es: {
    badge: '// SENIOR FULL-STACK ENGINEER · +10 AÑOS DE EXPERIENCIA · REMOTO',
    description: 'Ingeniero de software senior con más de 10 años de experiencia entregando soluciones full-stack de principio a fin. Me involucro en cada fase del proyecto: desde el kickoff y la captura de requisitos hasta el despliegue, la validación y el mantenimiento en producción, asegurando que cada entrega cumpla con lo que el negocio realmente necesita. He desarrollado proyectos en sectores industrial, cerámico, procurement, sanitario y de gestión empresarial, aportando tanto criterio técnico como capacidad de coordinación de equipo.',
    dockerChip: 'Docker · Despliegue',
    softSkills: [
      { icon: 'fa-wifi',             label: '100% Remoto' },
      { icon: 'fa-arrows-spin',      label: 'Metodologías Ágiles' },
      { icon: 'fa-comments',         label: 'Comunicativo' },
      { icon: 'fa-users',            label: 'Trabajo en Equipo' },
      { icon: 'fa-circle-check',     label: 'Orientado a Calidad' },
      { icon: 'fa-layer-group',      label: 'End-to-End' },
      { icon: 'fa-lightbulb',        label: 'Proactivo' },
      { icon: 'fa-magnifying-glass', label: 'Atención al Detalle' },
    ],
    location: 'Castellón, ES · Remoto',
    copyEmail: 'Copiar Email',
    copied: '¡Copiado!',
    hint: 'Pasa el ratón (o pulsa) para interactuar con la tarjeta',
  },
  en: {
    badge: '// SENIOR FULL-STACK ENGINEER · +10 YEARS OF EXPERIENCE · REMOTE',
    description: 'Senior software engineer with over 10 years of experience delivering end-to-end full-stack solutions. I get involved in every phase of the project: from kickoff and requirements gathering through deployment, validation and production maintenance, ensuring each delivery truly meets business needs. I have worked across industrial, ceramic, procurement, healthcare and enterprise management sectors, bringing both technical expertise and team coordination skills.',
    dockerChip: 'Docker · Deployment',
    softSkills: [
      { icon: 'fa-wifi',             label: '100% Remote' },
      { icon: 'fa-arrows-spin',      label: 'Agile Methodologies' },
      { icon: 'fa-comments',         label: 'Communicative' },
      { icon: 'fa-users',            label: 'Teamwork' },
      { icon: 'fa-circle-check',     label: 'Quality-Oriented' },
      { icon: 'fa-layer-group',      label: 'End-to-End' },
      { icon: 'fa-lightbulb',        label: 'Proactive' },
      { icon: 'fa-magnifying-glass', label: 'Attention to Detail' },
    ],
    location: 'Castellón, ES · Remote',
    copyEmail: 'Copy Email',
    copied: 'Copied!',
    hint: 'Hover (or tap) to interact with the card',
  },
} as const;

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgStyle],
  template: `
    <section class="flex flex-col items-center justify-center pt-4">
      <div class="perspective-container w-full max-w-2xl">
        <div
          class="tilt-card bg-gradient-to-br from-brand-card to-slate-950 rounded-2xl border border-slate-800 p-8 sm:p-10 shadow-2xl relative overflow-hidden cursor-pointer"
          [ngStyle]="cardStyle()"
          (mousemove)="onMouseMove($event)"
          (mouseleave)="onMouseLeave()">

          <!-- Efectos de brillo de fondo -->
          <div class="absolute -right-20 -top-20 w-56 h-56 bg-brand-accent/15 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -left-20 -bottom-20 w-56 h-56 bg-brand-highlight/15 rounded-full blur-3xl pointer-events-none"></div>

          <div class="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <span class="font-mono text-xs text-brand-accent tracking-wider font-bold">{{ t().badge }}</span>
              <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-white">
                Fernando Rodríguez
              </h1>

            </div>
            <div class="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center border border-slate-800 shadow-inner">
              <i class="fa-solid fa-microchip text-2xl text-brand-accent"></i>
            </div>
          </div>

          <!-- Propuesta de Valor -->
          <div class="mb-8 space-y-4">
            <p class="text-slate-300 text-sm leading-relaxed font-light">
              {{ t().description }}
            </p>
            <!-- Stack tech -->
            <div class="flex flex-wrap gap-2 pt-1">
              <span class="px-2.5 py-1 bg-slate-900/80 text-slate-300 text-xs font-mono rounded-lg border border-slate-800 flex items-center gap-1.5">
                <i class="fa-brands fa-java text-orange-500"></i> Java 21 / Spring Boot
              </span>
              <span class="px-2.5 py-1 bg-slate-900/80 text-slate-300 text-xs font-mono rounded-lg border border-slate-800 flex items-center gap-1.5">
                <i class="fa-brands fa-angular text-red-500"></i> Angular (v5–20)
              </span>
              <span class="px-2.5 py-1 bg-slate-900/80 text-slate-300 text-xs font-mono rounded-lg border border-slate-800 flex items-center gap-1.5">
                <i class="fa-solid fa-database text-sky-400"></i> MySQL / PostgreSQL
              </span>
              <span class="px-2.5 py-1 bg-slate-900/80 text-slate-300 text-xs font-mono rounded-lg border border-slate-800 flex items-center gap-1.5">
                <i class="fa-brands fa-docker text-sky-400"></i> {{ t().dockerChip }}
              </span>
              <span class="px-2.5 py-1 bg-slate-900/80 text-slate-300 text-xs font-mono rounded-lg border border-slate-800 flex items-center gap-1.5">
                <i class="fa-solid fa-mobile-screen text-slate-300"></i> Ionic Mobile (v3–5)
              </span>
              <span class="px-2.5 py-1 bg-slate-900/80 text-slate-300 text-xs font-mono rounded-lg border border-slate-800 flex items-center gap-1.5">
                <i class="fa-brands fa-github text-slate-300"></i> GitHub
              </span>
              <span class="px-2.5 py-1 bg-slate-900/80 text-slate-300 text-xs font-mono rounded-lg border border-slate-800 flex items-center gap-1.5">
                <i class="fa-solid fa-gear text-amber-400"></i> Jenkins
              </span>
              <span class="px-2.5 py-1 bg-slate-900/80 text-slate-300 text-xs font-mono rounded-lg border border-slate-800 flex items-center gap-1.5">
                <i class="fa-brands fa-jira text-blue-400"></i> Jira
              </span>
              <span class="px-2.5 py-1 bg-slate-900/80 text-slate-300 text-xs font-mono rounded-lg border border-slate-800 flex items-center gap-1.5">
                <i class="fa-brands fa-confluence text-blue-300"></i> Confluence
              </span>
            </div>
            <!-- Soft skills -->
            <div class="flex flex-wrap gap-2">
              @for (skill of t().softSkills; track skill.label) {
                <span class="px-2.5 py-1 bg-brand-accent/5 text-brand-accent text-[10px] font-mono rounded-lg border border-brand-accent/20 flex items-center gap-1">
                  <i [class]="'fa-solid ' + skill.icon"></i> {{ skill.label }}
                </span>
              }
            </div>
          </div>

          <!-- Contacto -->
          <div class="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800/60">
            <div class="flex gap-4">
              <a href="mailto:frodriguezsidro@gmail.com" class="text-slate-400 hover:text-brand-accent text-xl transition-colors" title="Enviar correo"><i class="fa-solid fa-envelope"></i></a>
              <a href="tel:+34637216029" class="text-slate-400 hover:text-brand-accent text-xl transition-colors" title="Llamar"><i class="fa-solid fa-phone"></i></a>
              <span class="text-xs font-mono text-slate-500 flex items-center gap-1"><i class="fa-solid fa-location-dot"></i> {{ t().location }}</span>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <a href="/assets/cv-fernando-rodriguez-es.pdf" download
                 class="px-4 py-2 bg-brand-accent hover:bg-brand-accent/80 border border-brand-accent/40 rounded-xl text-xs font-mono font-semibold text-white flex items-center gap-2 transition-all shadow-lg shadow-brand-accent/20">
                <i class="fa-solid fa-file-arrow-down"></i> CV · ES
              </a>
              <a href="/assets/cv-fernando-rodriguez-en.pdf" download
                 class="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-mono font-semibold text-slate-300 flex items-center gap-2 transition-all">
                <i class="fa-solid fa-file-arrow-down"></i> CV · EN
              </a>
              <button (click)="copyEmail($event)"
                class="px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-mono transition-all flex items-center gap-2"
                [class]="copied() ? 'text-brand-secondary border-brand-secondary/40 bg-brand-secondary/10' : 'text-slate-300'">
                {{ copied() ? t().copied : t().copyEmail }} <i class="fa-regular fa-copy"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <p class="text-[11px] text-slate-500 mt-5 font-mono text-center select-none">
        <i class="fa-solid fa-arrow-pointer mr-1 animate-pulse"></i> {{ t().hint }}
      </p>
    </section>
  `
})
export class HeroComponent {
  private langService = inject(LangService);
  t = computed(() => HERO_TEXT[this.langService.lang()]);
  cardStyle = signal<CardStyle>({ transform: '', boxShadow: '' });
  copied = signal(false);

  onMouseMove(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const maxRotation = 5;
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * maxRotation * 2;
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -maxRotation * 2;
    this.cardStyle.set({
      transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.005)`,
      boxShadow: '0 20px 40px -12px rgba(99, 102, 241, 0.15)'
    });
  }

  onMouseLeave(): void {
    this.cardStyle.set({ transform: 'rotateY(0deg) rotateX(0deg) scale(1)', boxShadow: 'none' });
  }

  copyEmail(event: Event): void {
    event.stopPropagation();
    navigator.clipboard.writeText('frodriguezsidro@gmail.com').then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
