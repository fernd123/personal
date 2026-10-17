import { Component, computed, inject, signal } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { RevealDirective } from '../../shared/reveal.directive';

const ABOUT_TEXT = {
  es: {
    title: 'Sobre mí',
    approachTitle: 'Cómo trabajo',
    approach: [
      'En la mayoría de mis proyectos he estado desde la toma de requisitos hasta el mantenimiento en producción. Eso me obliga a pensar en el sistema completo: quién lo va a usar, con qué otros sistemas tiene que hablar y cómo se va a desplegar.',
      'Antes de escribir código quiero entender el contexto de negocio y tener un diseño funcional acordado. Después trabajo por hitos, de forma incremental y con demos periódicas, para que los ajustes aparezcan pronto. Al terminar entrego el sistema desplegado, documentado y con formación para quien lo vaya a usar.',
    ],
    steps: ['Contexto', 'Diseño', 'Hitos', 'Desarrollo incremental', 'Entrega y formación'],
    personalTitle: 'Fuera del trabajo',
    personal1: 'Durante una temporada viví y viajé por Asia: China, Vietnam, Tailandia o Malasia. Conocer culturas y formas de trabajar muy distintas a las occidentales cambió cómo escucho, cómo priorizo y cómo colaboro en equipo.',
    personal2: 'En mi tiempo libre juego al fútbol y al tenis y salgo en bici. La naturaleza me desconecta, y el buen café me acompaña cuando trabajo.',
    photos: [
      { src: 'assets/foto-vietnam.webp', alt: 'Fernando en Vietnam, junto a un río entre montañas kársticas', caption: 'Vietnam', w: 600, h: 877, pos: 'object-center' },
      { src: 'assets/foto-aeropuerto.webp', alt: 'Fernando trabajando con el portátil en un aeropuerto', caption: 'Trabajando en el aeropuerto', w: 765, h: 434, pos: 'object-[75%_center]' },
      { src: 'assets/foto-cafe.webp', alt: 'Un café helado en vaso junto a unas vías de tren', caption: 'Café', w: 482, h: 708, pos: 'object-center' },
    ],
    enlarge: 'Ampliar foto',
    close: 'Cerrar',
  },
  en: {
    title: 'About',
    approachTitle: 'How I work',
    approach: [
      'On most of my projects I have been involved from requirements gathering through to production maintenance. That makes me think about the whole system: who will use it, which other systems it has to talk to, and how it will be deployed.',
      'Before writing code I want to understand the business context and have an agreed functional design. Then I work in milestones, incrementally and with regular demos, so that adjustments surface early. At the end I hand over the system deployed, documented, and with training for the people who will use it.',
    ],
    steps: ['Context', 'Design', 'Milestones', 'Incremental build', 'Handover & training'],
    personalTitle: 'Outside work',
    personal1: 'For a while I lived and travelled across Asia: China, Vietnam, Thailand or Malaysia. Getting to know cultures and ways of working very different from Western ones changed how I listen, prioritise and collaborate in a team.',
    personal2: 'In my free time I play football and tennis and go cycling. Nature is how I switch off, and good coffee keeps me company while I work.',
    photos: [
      { src: 'assets/foto-vietnam.webp', alt: 'Fernando in Vietnam, by a river between karst mountains', caption: 'Vietnam', w: 600, h: 877, pos: 'object-center' },
      { src: 'assets/foto-aeropuerto.webp', alt: 'Fernando working on a laptop at an airport', caption: 'Working at the airport', w: 765, h: 434, pos: 'object-[75%_center]' },
      { src: 'assets/foto-cafe.webp', alt: 'An iced coffee in a glass next to railway tracks', caption: 'Coffee', w: 482, h: 708, pos: 'object-center' },
    ],
    enlarge: 'Enlarge photo',
    close: 'Close',
  },
} as const;

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RevealDirective],
  host: { '(document:keydown.escape)': 'closePhoto()' },
  template: `
    <section id="sobre-mi" class="border-t border-rule py-20 md:py-28" aria-labelledby="about-title">
      <div class="wrap grid gap-y-10 md:grid-cols-12 md:gap-x-8">
        <header class="md:col-span-3 md:sticky md:top-24 md:self-start">
          <p class="meta text-accent">05</p>
          <h2 id="about-title" class="mt-2 font-display text-4xl font-semibold text-ink">{{ t().title }}</h2>
        </header>

        <div class="md:col-span-9 space-y-16">
          <div appReveal class="grid gap-8 lg:grid-cols-9">
            <div class="lg:col-span-6">
              <h3 class="meta uppercase tracking-[0.12em]">{{ t().approachTitle }}</h3>
              @for (p of t().approach; track $index) {
                <p class="mt-4 text-lg leading-relaxed text-ink max-w-[58ch]">{{ p }}</p>
              }
            </div>
            <ol class="lg:col-span-3 lg:mt-8 border-t border-ink self-start">
              @for (s of t().steps; track s; let i = $index) {
                <li class="flex gap-4 py-2.5 border-b border-rule text-[0.95rem]">
                  <span class="meta pt-0.5">0{{ i + 1 }}</span>{{ s }}
                </li>
              }
            </ol>
          </div>

          <div appReveal class="grid gap-8 lg:grid-cols-9">
            <div class="lg:col-span-4">
              <h3 class="meta uppercase tracking-[0.12em]">{{ t().personalTitle }}</h3>
              <p class="mt-4 leading-relaxed max-w-[52ch]">{{ t().personal1 }}</p>
              <p class="mt-4 leading-relaxed max-w-[52ch]">{{ t().personal2 }}</p>
            </div>

            <!-- Uneven three-photo arrangement -->
            <div class="lg:col-span-5 grid grid-cols-5 gap-3 items-start">
              @for (photo of t().photos; track photo.src; let i = $index) {
                <figure [class]="i === 0 ? 'col-span-3 row-span-2' : i === 1 ? 'col-span-2' : 'col-span-2'">
                  <button
                    type="button"
                    class="block w-full overflow-hidden bg-paper-2 cursor-zoom-in"
                    (click)="activePhoto.set(photo)"
                    [attr.aria-label]="t().enlarge + ': ' + photo.caption"
                  >
                    <img
                      [src]="photo.src"
                      [alt]="photo.alt"
                      [width]="photo.w"
                      [height]="photo.h"
                      loading="lazy"
                      decoding="async"
                      class="w-full object-cover hover:scale-[1.02] transition-transform duration-500"
                      [class]="(i === 0 ? 'aspect-[3/4] ' : 'aspect-square ') + photo.pos"
                    />
                  </button>
                </figure>
              }
            </div>
          </div>
        </div>
      </div>
    </section>

    @if (activePhoto(); as photo) {
      <div
        class="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="photo.caption"
        (click)="closePhoto()"
      >
        <button type="button" class="absolute top-4 right-4 font-mono text-sm text-white/80 hover:text-white" (click)="closePhoto()" autofocus>
          {{ t().close }} ✕
        </button>
        <img [src]="photo.src" [alt]="photo.alt" class="max-h-[90vh] max-w-[90vw] object-contain" (click)="$event.stopPropagation()" />
      </div>
    }
  `,
})
export class AboutComponent {
  private langService = inject(LangService);
  t = computed(() => ABOUT_TEXT[this.langService.lang()]);
  activePhoto = signal<{ src: string; alt: string; caption: string } | null>(null);

  closePhoto(): void {
    this.activePhoto.set(null);
  }
}
