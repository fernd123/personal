import { Component, computed, inject } from '@angular/core';
import { LangService } from '../../services/lang.service';

const PROCESS_TEXT = {
  es: {
    badge: '// METODOLOGÍA DE TRABAJO',
    title: 'Del brief al lanzamiento',
    subtitle: 'Un proceso claro y transparente para que siempre sepas en qué punto está tu proyecto.',
    steps: [
      { number: 1, icon: 'fa-comments',      title: 'Kick-off & Discovery',      description: 'Nos conocemos. Escucho tus necesidades, objetivos y contexto de negocio, sin tecnicismos ni compromisos.' },
      { number: 2, icon: 'fa-pen-ruler',     title: 'Diseño de la Solución',     description: 'Plasmo tu idea en un diseño funcional. No escribo código hasta que estés cómodo con la propuesta.' },
      { number: 3, icon: 'fa-calendar-check', title: 'Planificación & Hitos',    description: 'Acordamos un calendario de entregables con hitos claros. Sabrás siempre en qué punto está tu proyecto.' },
      { number: 4, icon: 'fa-gears',         title: 'Desarrollo & Feedback',     description: 'Construcción incremental con demos periódicas. Ajustes y mejoras detectados a tiempo, sin sorpresas.' },
      { number: 5, icon: 'fa-rocket',        title: 'Entrega & Formación',       description: 'Deploy en producción, manuales y formación para que domines tu aplicación desde el primer día.' },
    ],
  },
  en: {
    badge: '// WORKING METHODOLOGY',
    title: 'From brief to launch',
    subtitle: 'A clear and transparent process so you always know where your project stands.',
    steps: [
      { number: 1, icon: 'fa-comments',      title: 'Kick-off & Discovery',      description: 'We meet. I listen to your needs, goals and business context — no jargon, no obligations.' },
      { number: 2, icon: 'fa-pen-ruler',     title: 'Solution Design',           description: 'I turn your idea into a functional design. No code is written until you are comfortable with the proposal.' },
      { number: 3, icon: 'fa-calendar-check', title: 'Planning & Milestones',    description: 'We agree on a deliverable schedule with clear milestones. You will always know where your project stands.' },
      { number: 4, icon: 'fa-gears',         title: 'Development & Feedback',    description: 'Incremental builds with periodic demos. Adjustments and improvements caught early — no surprises.' },
      { number: 5, icon: 'fa-rocket',        title: 'Delivery & Training',       description: 'Production deployment, documentation and training so you master your application from day one.' },
    ],
  },
} as const;

@Component({
  selector: 'app-process',
  standalone: true,
  template: `
    <section id="proceso-seccion">

      <div class="mb-12">
        <span class="font-mono text-xs text-brand-accent tracking-wider font-bold">{{ t().badge }}</span>
        <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white">
          {{ t().title }}
        </h2>
        <p class="text-slate-400 text-sm mt-2 max-w-xl">
          {{ t().subtitle }}
        </p>
      </div>

      <div class="relative">

        <!-- Línea conectora horizontal (solo desktop) -->
        <div class="hidden lg:block absolute top-9 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent pointer-events-none"></div>

        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
          @for (step of t().steps; track step.number) {
            <div class="flex flex-row lg:flex-col items-start lg:items-center gap-5 lg:gap-4 lg:text-center">

              <!-- Icono + número -->
              <div class="relative z-10 flex-shrink-0 w-[4.5rem] h-[4.5rem] rounded-2xl bg-brand-card border border-slate-800 flex flex-col items-center justify-center shadow-lg group-hover:border-brand-accent transition-colors">
                <i [class]="'fa-solid ' + step.icon + ' text-brand-accent text-lg'"></i>
                <span class="font-mono text-[10px] text-slate-500 mt-0.5">0{{ step.number }}</span>
              </div>

              <!-- Texto -->
              <div class="flex-1">
                <h3 class="text-sm font-bold text-white mb-1.5">{{ step.title }}</h3>
                <p class="text-xs text-slate-400 leading-relaxed">{{ step.description }}</p>
              </div>

            </div>
          }
        </div>
      </div>

    </section>
  `
})
export class ProcessComponent {
  private langService = inject(LangService);
  t = computed(() => PROCESS_TEXT[this.langService.lang()]);
}
