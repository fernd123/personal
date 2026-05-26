import { Component, computed, inject, signal } from '@angular/core';
import { LangService } from '../../services/lang.service';

const ABOUT_TEXT = {
  es: {
    badge: '// ALGO MÁS SOBRE MÍ',
    title: 'Más Allá del Código',
    p1: 'Más allá de la pantalla, soy una persona con curiosidad genuina por el mundo. Durante una temporada viví y recorrí Asia —',
    p1highlight: 'China, Vietnam, Tailandia o Malasia',
    p1end: '— aprendiendo de culturas, metodologías y mentalidades de trabajo radicalmente distintas a las occidentales. Esa experiencia cambió mi forma de escuchar, de priorizar y de colaborar en equipo.',
    p2: 'En mi tiempo libre practico fútbol, tenis y ciclismo. La naturaleza me desconecta de verdad, y el buen café me acompaña en cada sprint de trabajo.',
    tags: [
      { icon: 'fa-plane-departure',  color: 'text-brand-accent', label: 'Viajar y culturas' },
      { icon: 'fa-futbol',           color: 'text-emerald-400',  label: 'Fútbol' },
      { icon: 'fa-baseball-bat-ball',color: 'text-sky-400',      label: 'Tenis' },
      { icon: 'fa-person-biking',    color: 'text-amber-400',    label: 'Ciclismo' },
      { icon: 'fa-tree',             color: 'text-green-400',    label: 'Naturaleza' },
      { icon: 'fa-mug-hot',          color: 'text-orange-400',   label: 'Buen café' },
    ],
  },
  en: {
    badge: '// A BIT MORE ABOUT ME',
    title: 'Beyond the Code',
    p1: 'Beyond the screen, I am a person with genuine curiosity about the world. For a while I lived and travelled across Asia —',
    p1highlight: 'China, Vietnam, Thailand and Malaysia',
    p1end: '— learning from cultures, methodologies and ways of working radically different from Western ones. That experience changed how I listen, prioritise and collaborate in a team.',
    p2: 'In my free time I play football, tennis and cycling. Nature truly disconnects me, and good coffee accompanies every work sprint.',
    tags: [
      { icon: 'fa-plane-departure',  color: 'text-brand-accent', label: 'Travel & cultures' },
      { icon: 'fa-futbol',           color: 'text-emerald-400',  label: 'Football' },
      { icon: 'fa-baseball-bat-ball',color: 'text-sky-400',      label: 'Tennis' },
      { icon: 'fa-person-biking',    color: 'text-amber-400',    label: 'Cycling' },
      { icon: 'fa-tree',             color: 'text-green-400',    label: 'Nature' },
      { icon: 'fa-mug-hot',          color: 'text-orange-400',   label: 'Good coffee' },
    ],
  },
} as const;

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section class="border-t border-slate-800/60 pt-6 space-y-8">

      <div>
        <span class="text-xs font-mono text-slate-500">{{ t().badge }}</span>
        <h2 class="text-3xl font-bold tracking-tight text-white mt-1">{{ t().title }}</h2>
      </div>

      <div class="grid lg:grid-cols-2 gap-10 items-center">

        <!-- Texto personal -->
        <div class="space-y-6">
          <p class="text-slate-300 text-sm leading-relaxed">
            {{ t().p1 }}
            <span class="text-white font-medium">{{ t().p1highlight }}</span>
            {{ t().p1end }}
          </p>
          <p class="text-slate-400 text-sm leading-relaxed">{{ t().p2 }}</p>

          <!-- Tags personales -->
          <div class="flex flex-wrap gap-2 pt-2">
            @for (tag of t().tags; track tag.label) {
              <span class="px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono rounded-xl flex items-center gap-2">
                <i class="fa-solid {{ tag.icon }} {{ tag.color }}"></i> {{ tag.label }}
              </span>
            }
          </div>
        </div>

        <!-- Grid de fotos -->
        <div class="grid grid-cols-2 grid-rows-2 gap-3 h-72 lg:h-80">

          <div class="row-span-2 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 group cursor-zoom-in"
               (click)="openPhoto('assets/foto-vietnam.png')">
            <img
              src="assets/foto-vietnam.png"
              alt="Vietnam"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          </div>

          <div class="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 group cursor-zoom-in"
               (click)="openPhoto('assets/foto-aeropuerto.png')">
            <img
              src="assets/foto-aeropuerto.png"
              alt="Trabajando en el aeropuerto"
              class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500">
          </div>

          <div class="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 group cursor-zoom-in"
               (click)="openPhoto('assets/foto-cafe.png')">
            <img
              src="assets/foto-cafe.png"
              alt="Café"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          </div>

        </div>
      </div>

    </section>

    <!-- Lightbox -->
    @if (activePhoto()) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        (click)="closePhoto()">
        <button
          class="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          (click)="closePhoto()">
          <i class="fa-solid fa-xmark text-2xl"></i>
        </button>
        <img
          [src]="activePhoto()"
          class="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl object-contain"
          (click)="$event.stopPropagation()">
      </div>
    }
  `
})
export class AboutComponent {
  private langService = inject(LangService);
  t = computed(() => ABOUT_TEXT[this.langService.lang()]);
  activePhoto = signal<string | null>(null);

  openPhoto(src: string): void {
    this.activePhoto.set(src);
  }

  closePhoto(): void {
    this.activePhoto.set(null);
  }
}
