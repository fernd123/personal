import { Component, computed, inject } from '@angular/core';
import { LangService } from '../../services/lang.service';

const SERVICES_TEXT = {
  es: {
    badge: 'QUÉ APORTO A TU EQUIPO',
    title: 'Especialización de Extremo a Extremo',
    subtitle: 'No solo escribo líneas de código; traduzco problemas complejos de negocio y de planta industrial en sistemas confiables, estructurados y mantenibles.',
    cards: [
      {
        title: 'Front-End, UI & Móvil',
        description: 'Interfaces limpias y de alto rendimiento con Angular (v5–20) y librerías UI como NGPrime y Angular Material. Visualización de datos en tiempo real mediante WebSockets y SSE. Desarrollo móvil híbrido con Ionic (v3–5): apps para tablets y smartphones con integración BLE, acceso a sensores y sincronización con backends REST.',
        stackLabel: '// FRONTEND, CSS & MÓVIL:',
      },
      {
        title: 'Back-End & Arquitectura',
        description: 'Diseño e implemento backends robustos: proyectos monolíticos y sistemas distribuidos con Spring Boot y API REST. Especialista en persistencia SQL (MySQL, PostgreSQL), testing automatizado (JUnit, Mockito, Selenium) y gestión de entornos con Docker.',
        stackLabel: '// STACK PRINCIPAL:',
      },
      {
        title: 'Integraciones & DevOps',
        description: 'Conexión de sistemas y plataformas de terceros mediante API REST y Web Services. Experiencia en entornos multisector (industrial, cerámico, procurement, sanitario) y pipelines CI/CD con herramientas profesionales de DevOps para garantizar entregas estables y continuas.',
        stackLabel: '// HERRAMIENTAS & DEVOPS:',
      },
    ],
  },
  en: {
    badge: 'WHAT I BRING TO YOUR TEAM',
    title: 'End-to-End Specialization',
    subtitle: 'I don\'t just write lines of code; I translate complex business and industrial problems into reliable, structured and maintainable systems.',
    cards: [
      {
        title: 'Front-End, UI & Mobile',
        description: 'Clean, high-performance interfaces with Angular (v5–20) and UI libraries such as NGPrime and Angular Material. Real-time data visualization via WebSockets and SSE. Hybrid mobile development with Ionic (v3–5): apps for tablets and smartphones with BLE integration, sensor access and REST backend synchronization.',
        stackLabel: '// FRONTEND, CSS & MOBILE:',
      },
      {
        title: 'Back-End & Architecture',
        description: 'I design and implement robust backends: monolithic projects and distributed systems with Spring Boot and REST APIs. Specialist in SQL persistence (MySQL, PostgreSQL), automated testing (JUnit, Mockito, Selenium) and environment management with Docker.',
        stackLabel: '// MAIN STACK:',
      },
      {
        title: 'Integrations & DevOps',
        description: 'Connecting systems and third-party platforms via REST APIs and Web Services. Experience across multi-sector environments (industrial, ceramic, procurement, healthcare) and CI/CD pipelines with professional DevOps tooling to ensure stable, continuous delivery.',
        stackLabel: '// TOOLS & DEVOPS:',
      },
    ],
  },
} as const;

@Component({
  selector: 'app-services',
  standalone: true,
  template: `
    <section id="servicios-seccion" class="space-y-12">
      <div class="text-center max-w-2xl mx-auto space-y-3">
        <span class="px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-mono rounded-full border border-brand-accent/20">{{ t().badge }}</span>
        <h2 class="text-3xl font-extrabold tracking-tight">{{ t().title }}</h2>
        <p class="text-slate-400 text-sm">
          {{ t().subtitle }}
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">

        <!-- Tarjeta 1: Frontend -->
        <div class="bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-6 rounded-2xl border border-slate-800 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div class="w-11 h-11 bg-sky-500/10 text-sky-400 rounded-xl flex items-center justify-center mb-5 border border-sky-500/20 shadow-inner">
              <i class="fa-solid fa-laptop-code text-lg"></i>
            </div>
            <h3 class="text-lg font-bold text-white">{{ t().cards[0].title }}</h3>
            <p class="text-xs text-slate-400 mt-2 leading-relaxed">{{ t().cards[0].description }}</p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-800/60">
            <span class="block text-[10px] font-mono text-slate-500 mb-2">{{ t().cards[0].stackLabel }}</span>
            <div class="flex flex-wrap gap-1">
              <span class="text-[9px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">Angular (v5–20)</span>
              <span class="text-[9px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">Ionic (v3–5)</span>
              <span class="text-[9px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">NGPrime</span>
              <span class="text-[9px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">Angular Material</span>
              <span class="text-[9px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">Tailwind CSS</span>
              <span class="text-[9px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">Bootstrap / SCSS</span>
              <span class="text-[9px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">Node.js</span>
              <span class="text-[9px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">WebSockets / SSE</span>
            </div>
          </div>
        </div>

        <!-- Tarjeta 2: Backend -->
        <div class="bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-6 rounded-2xl border border-slate-800 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div class="w-11 h-11 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center mb-5 border border-indigo-500/20 shadow-inner">
              <i class="fa-solid fa-server text-lg"></i>
            </div>
            <h3 class="text-lg font-bold text-white">{{ t().cards[1].title }}</h3>
            <p class="text-xs text-slate-400 mt-2 leading-relaxed">{{ t().cards[1].description }}</p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-800/60">
            <span class="block text-[10px] font-mono text-slate-500 mb-2">{{ t().cards[1].stackLabel }}</span>
            <div class="flex flex-wrap gap-1">
              <span class="text-[9px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">Java 1.8 – 21</span>
              <span class="text-[9px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">Spring Boot</span>
              <span class="text-[9px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">MySQL / PostgreSQL</span>
              <span class="text-[9px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">JUnit / Mockito</span>
              <span class="text-[9px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">Selenium</span>
              <span class="text-[9px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">Docker</span>
            </div>
          </div>
        </div>

        <!-- Tarjeta 3: Integraciones & DevOps -->
        <div class="bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-6 rounded-2xl border border-slate-800 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between">
          <div>
            <div class="w-11 h-11 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-5 border border-emerald-500/20 shadow-inner">
              <i class="fa-solid fa-arrows-left-right-to-line text-lg"></i>
            </div>
            <h3 class="text-lg font-bold text-white">{{ t().cards[2].title }}</h3>
            <p class="text-xs text-slate-400 mt-2 leading-relaxed">{{ t().cards[2].description }}</p>
          </div>
          <div class="mt-6 pt-4 border-t border-slate-800/60">
            <span class="block text-[10px] font-mono text-slate-500 mb-2">{{ t().cards[2].stackLabel }}</span>
            <div class="flex flex-wrap gap-1">
              <span class="text-[9px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">Jenkins</span>
              <span class="text-[9px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">GitLab CI/CD</span>
              <span class="text-[9px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">Nexus</span>
              <span class="text-[9px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">Rancher</span>
              <span class="text-[9px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">OpenAPI</span>
              <span class="text-[9px] font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">GitHub</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class ServicesComponent {
  private langService = inject(LangService);
  t = computed(() => SERVICES_TEXT[this.langService.lang()]);
}
