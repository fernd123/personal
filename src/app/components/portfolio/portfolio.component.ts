import { Component, computed, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { LangService } from '../../services/lang.service';
import { RevealDirective } from '../../shared/reveal.directive';
import { MarksPipe } from '../../shared/marks.pipe';
import { TechCategoryPipe, TechCategory } from '../../shared/tech-category.pipe';

// Copy fields accept [[key phrase]] markers, rendered underlined by MarksPipe.
interface Project {
  id: string;
  sector: string;
  title: string;
  lead: string;
  problem: string;
  solution: string;
  outcome: string;
  role?: string;
  stack: string[];
  confidential?: boolean;
  /** Id of the matching entry in the demos list. */
  demo?: string;
}

interface Demo {
  id: string;
  name: string;
  tagline: string;
  url: string;
  credentials: string[];
  description: string;
  stack: string[];
}

interface PortfolioLang {
  workTitle: string;
  workIntro: string;
  labels: { problem: string; solution: string; role: string; outcome: string; stack: string };
  confidential: string;
  seeDemo: string;
  legend: { cat: TechCategory; label: string }[];
  projects: Project[];
  demosTitle: string;
  demosIntro: string;
  demoOpen: string;
  demoCredentials: string;
  demoNote: string;
  demos: Demo[];
}

const PORTFOLIO_TEXT: Record<'es' | 'en', PortfolioLang> = {
  es: {
    workTitle: 'Proyectos',
    workIntro: 'Una selección de los proyectos en los que he participado, no la lista completa. Los clientes no se nombran.',
    labels: { problem: 'Problema', solution: 'Solución', role: 'Mi papel', outcome: 'Resultado', stack: 'Stack' },
    confidential: 'Confidencial',
    seeDemo: 'Ver demo',
    legend: [
      { cat: 'frontend', label: 'Frontend' },
      { cat: 'mobile', label: 'Móvil e IoT' },
      { cat: 'backend', label: 'Backend' },
      { cat: 'arch', label: 'Arquitectura' },
      { cat: 'data', label: 'Datos' },
      { cat: 'infra', label: 'Infraestructura' },
    ],
    projects: [
      {
        id: 'industrial-wood',
        sector: 'Industria · Sector madera',
        title: 'Software de gestión de planta',
        lead: 'Aplicación full-stack que hace de [[intermediario entre el ERP y las máquinas industriales de planta, como sierras, chapadoras o taladros]].',
        problem: 'Las órdenes de fabricación estaban en el ERP, pero llevarlas a cada máquina de planta requería pasos manuales.',
        solution: 'Los operarios lanzan cada orden de trabajo a su máquina desde una interfaz web y la aplicación guarda métricas de producción en MongoDB para análisis y reporting.',
        outcome: 'Desaparecen los pasos manuales entre ERP y máquina, se reducen los errores de producción y dirección dispone de [[datos reales de rendimiento de planta]].',
        stack: ['Java 17', 'Spring Boot', 'Angular 14', 'MySQL', 'MongoDB'],
      },
      {
        id: 'showroom',
        sector: 'Cerámica · Showroom',
        title: 'Sistema de control de visitas y showroom experiencial',
        lead: 'Una app móvil que [[registra el recorrido de cada visitante por el showroom]] y lo convierte en [[información para el equipo comercial]].',
        problem: 'Saber qué le interesa realmente a un cliente durante su visita al showroom.',
        solution: 'App en Ionic conectada a dispositivos IoT/BLE repartidos por el showroom. Registra el recorrido, las zonas de mayor interés y el tiempo de permanencia y, al terminar la visita, genera un informe personalizado para el cliente.',
        outcome: 'Desde un backoffice web, comerciales y responsables financieros [[cruzan las preferencias del visitante con los pedidos reales del ERP]] para preparar la propuesta comercial.',
        stack: ['Ionic 4', 'Angular', 'IoT / BLE', 'Java', 'Spring Boot', 'PostgreSQL'],
      },
      {
        id: 'healthcare',
        sector: 'Sanitario · Freelance, 2025 – actualidad',
        title: 'Plataforma de historia clínica digital',
        lead: 'Gestión y consulta de [[historias clínicas]] para una [[empresa de referencia del sector sanitario a nivel nacional]].',
        problem: 'La información clínica de los pacientes tiene que gestionarse y consultarse desde varios centros, con requisitos estrictos de seguridad, normativa sanitaria y rendimiento con muchos usuarios concurrentes.',
        solution: 'Arquitectura de [[microservicios y microfrontends]] para la gestión, el mantenimiento y la consulta de historias clínicas.',
        outcome: 'Un sistema robusto, escalable y auditable que centraliza la información clínica del paciente y da soporte a los flujos asistenciales diarios de varios centros.',
        role: 'Desarrollo full-stack: [[frontends en Angular 22 y backends en Java 21]]. Participo en decisiones técnicas y en el diseño de la solución junto a producto, QA y negocio.',
        stack: ['Angular 22', 'Java 21', 'Spring Boot', 'Microservicios', 'Microfrontends', 'PostgreSQL'],
        confidential: true,
      },
      {
        id: 'taimo',
        sector: 'PYMEs · Gestión interna',
        title: 'Taimo · Mini CRM para gestionar equipos',
        lead: 'Un único panel para saber [[quién trabaja en qué proyecto, cuántas horas y desde dónde]], con vacaciones, visitas y registro horario en la misma herramienta.',
        problem: 'En una PYME, la jornada, las horas por proyecto, las vacaciones y las visitas se reparten entre hojas de cálculo, correos y papel. Nadie tiene una visión completa del equipo y el registro horario obligatorio cuesta mantenerlo al día.',
        solution: 'Plataforma web con jornada e imputaciones por tarea, clientes y proyectos con su equipo y estimación, solicitud y aprobación de vacaciones, registro de visitas con aviso de privacidad (RGPD), roles y permisos, campos dinámicos, auditoría y exportaciones CSV. Backend con arquitectura hexagonal y el contrato OpenAPI como fuente de verdad.',
        outcome: '[[El día a día del equipo en una sola herramienta]]: cada persona registra su jornada e imputa horas en segundos, los responsables aprueban vacaciones y revisan el registro horario sin pedir datos a nadie, y dirección ve cómo se reparte el trabajo entre proyectos.',
        stack: ['Angular 22', 'Signals', 'Java 21', 'Spring Boot 4', 'Arquitectura hexagonal', 'OpenAPI', 'PostgreSQL', 'Docker'],
        demo: 'taimo',
      },
    ],
    demosTitle: 'Demos',
    demosIntro: 'Algunos proyectos abiertos en los que he participado en todo el ciclo de vida. Se pueden probar con las credenciales de demo.',
    demoOpen: 'Abrir',
    demoCredentials: 'Credenciales',
    demoNote: 'Servidor propio, conexión HTTP.',
    demos: [
      {
        id: 'fluxo',
        name: 'Fluxo',
        tagline: 'Dashboards embebibles',
        url: 'http://netfercs.tplinkdns.com:4201',
        credentials: ['root / default'],
        description: 'Dashboards a partir de consultas sobre PostgreSQL, MySQL o SQL Server, embebibles en cualquier web con un iframe o un snippet JS.',
        stack: ['Angular 13', 'Node.js', 'MongoDB', 'WebSockets', 'Docker'],
      },
      {
        id: 'synchub',
        name: 'SyncHub',
        tagline: 'Intercambio de datos entre empresas',
        url: 'http://netfercs.tplinkdns.com:93/auth/login',
        credentials: ['test@empresa.com / 123'],
        description: 'Cada empresa define sus modelos de datos, los sube vía API REST documentada con OpenAPI y decide qué comparte con terceros.',
        stack: ['Angular 20', 'Java 21', 'Spring Boot', 'Microservicios', 'PostgreSQL'],
      },
      {
        id: 'taimo',
        name: 'Taimo',
        tagline: 'Mini CRM y gestión de equipos',
        url: 'http://netfercs.tplinkdns.com:4280/login',
        credentials: ['demo.admin / Demo12345', 'demo.empleada / Demo12345'],
        description: 'Jornada, imputaciones, proyectos, vacaciones y visitas. La demo simula una empresa de unas 30 personas cuya actividad se actualiza sola.',
        stack: ['Angular 22', 'Java 21', 'Spring Boot 4', 'PostgreSQL', 'Docker'],
      },
    ],
  },
  en: {
    workTitle: 'Work',
    workIntro: 'A selection of the projects I have worked on, not the complete list. Client names are left out.',
    labels: { problem: 'Problem', solution: 'Solution', role: 'My role', outcome: 'Outcome', stack: 'Stack' },
    confidential: 'Confidential',
    seeDemo: 'See demo',
    legend: [
      { cat: 'frontend', label: 'Frontend' },
      { cat: 'mobile', label: 'Mobile & IoT' },
      { cat: 'backend', label: 'Backend' },
      { cat: 'arch', label: 'Architecture' },
      { cat: 'data', label: 'Data' },
      { cat: 'infra', label: 'Infrastructure' },
    ],
    projects: [
      {
        id: 'industrial-wood',
        sector: 'Manufacturing · Wood sector',
        title: 'Plant management software',
        lead: 'A full-stack application that acts as the [[link between the ERP and the industrial machines on the plant floor, such as saws, edge banders and drills]].',
        problem: 'Manufacturing orders lived in the ERP, but getting them to each machine on the floor involved manual steps.',
        solution: 'Operators send each work order to its machine from a web interface, and the application stores production metrics in MongoDB for analysis and reporting.',
        outcome: 'The manual steps between ERP and machine disappear, production errors go down, and management gets [[real plant performance data]].',
        stack: ['Java 17', 'Spring Boot', 'Angular 14', 'MySQL', 'MongoDB'],
      },
      {
        id: 'showroom',
        sector: 'Ceramics · Showroom',
        title: 'Visitor tracking system and experiential showroom',
        lead: 'A mobile app that [[records each visitor’s route through the showroom]] and turns it into [[information for the sales team]].',
        problem: 'Knowing what really interests a client during their visit to the showroom.',
        solution: 'An Ionic app connected to IoT/BLE devices placed around the showroom. It records the route, the areas of most interest and the time spent in each and, at the end of the visit, produces a personalised report for the client.',
        outcome: 'In a web backoffice, sales staff and financial managers [[cross-reference visitor preferences with actual ERP orders]] to prepare the commercial proposal.',
        stack: ['Ionic 4', 'Angular', 'IoT / BLE', 'Java', 'Spring Boot', 'PostgreSQL'],
      },
      {
        id: 'healthcare',
        sector: 'Healthcare · Freelance, 2025 – present',
        title: 'Electronic health record platform',
        lead: 'Management and lookup of [[clinical records]] for a [[leading national healthcare company]].',
        problem: 'Patient clinical information has to be managed and consulted from several centres, under strict security, healthcare-regulation and performance requirements with many concurrent users.',
        solution: 'A [[microservices and microfrontends]] architecture for managing, maintaining and looking up clinical records.',
        outcome: 'A robust, scalable and auditable system that centralises patient clinical information and supports the daily care workflows of several medical centres.',
        role: 'Full-stack development: [[Angular 22 frontends and Java 21 backends]]. I take part in technical decisions and solution design alongside product, QA and business.',
        stack: ['Angular 22', 'Java 21', 'Spring Boot', 'Microservices', 'Microfrontends', 'PostgreSQL'],
        confidential: true,
      },
      {
        id: 'taimo',
        sector: 'SMEs · Internal tooling',
        title: 'Taimo · Mini CRM for managing teams',
        lead: 'One panel to see [[who is working on which project, for how many hours and from where]], with holidays, visits and time records in the same tool.',
        problem: 'In a small company, working hours, time per project, holidays and visits are spread across spreadsheets, emails and paper. Nobody has a full view of the team, and the mandatory time record is hard to keep up to date.',
        solution: 'A web platform with working-day logging and time booking per task, clients and projects with their team and estimate, holiday requests and approvals, a visitor register with a GDPR privacy notice, roles and permissions, dynamic fields, audit log and CSV exports. The backend uses a hexagonal architecture with the OpenAPI contract as the source of truth.',
        outcome: '[[The team’s day-to-day in a single tool]]: people log their working day and book hours in seconds, managers approve holidays and review time records without chasing anyone, and management sees how work is spread across projects.',
        stack: ['Angular 22', 'Signals', 'Java 21', 'Spring Boot 4', 'Hexagonal architecture', 'OpenAPI', 'PostgreSQL', 'Docker'],
        demo: 'taimo',
      },
    ],
    demosTitle: 'Demos',
    demosIntro: 'Some open projects I worked on across the full life cycle. You can try them with the demo credentials.',
    demoOpen: 'Open',
    demoCredentials: 'Credentials',
    demoNote: 'Self-hosted, served over HTTP.',
    demos: [
      {
        id: 'fluxo',
        name: 'Fluxo',
        tagline: 'Embeddable dashboards',
        url: 'http://netfercs.tplinkdns.com:4201',
        credentials: ['root / default'],
        description: 'Dashboards built from queries on PostgreSQL, MySQL or SQL Server, embeddable in any website with an iframe or a JS snippet.',
        stack: ['Angular 13', 'Node.js', 'MongoDB', 'WebSockets', 'Docker'],
      },
      {
        id: 'synchub',
        name: 'SyncHub',
        tagline: 'Data exchange between companies',
        url: 'http://netfercs.tplinkdns.com:93/auth/login',
        credentials: ['test@empresa.com / 123'],
        description: 'Each company defines its data models, uploads data through an OpenAPI-documented REST API and decides what it shares with third parties.',
        stack: ['Angular 20', 'Java 21', 'Spring Boot', 'Microservices', 'PostgreSQL'],
      },
      {
        id: 'taimo',
        name: 'Taimo',
        tagline: 'Mini CRM and team management',
        url: 'http://netfercs.tplinkdns.com:4280/login',
        credentials: ['demo.admin / Demo12345', 'demo.empleada / Demo12345'],
        description: 'Working hours, time booking, projects, holidays and visits. The demo simulates a company of about 30 people whose activity updates on its own.',
        stack: ['Angular 22', 'Java 21', 'Spring Boot 4', 'PostgreSQL', 'Docker'],
      },
    ],
  },
};

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [NgTemplateOutlet, RevealDirective, MarksPipe, TechCategoryPipe],
  template: `
    <!-- 01 · Work -->
    <section id="proyectos" class="border-t border-rule py-20 md:py-28" aria-labelledby="work-title">
      <div class="wrap grid gap-y-10 md:grid-cols-12 md:gap-x-8">
        <header class="md:col-span-3 md:sticky md:top-24 md:self-start">
          <p class="meta text-accent">01</p>
          <h2 id="work-title" class="mt-2 font-display text-4xl font-semibold text-ink">{{ t().workTitle }}</h2>
          <p class="mt-4 text-[0.95rem] leading-relaxed max-w-[36ch]">{{ t().workIntro }}</p>
          <ul class="mt-8 grid grid-cols-2 gap-x-4 gap-y-2 max-w-[18rem]" role="list" aria-label="Stack">
            @for (l of t().legend; track l.cat) {
              <li class="flex items-center gap-2 font-mono text-[0.72rem] text-ink-2" [attr.data-cat]="l.cat">
                <span class="swatch" aria-hidden="true"></span>{{ l.label }}
              </li>
            }
          </ul>
        </header>

        <div class="md:col-span-9 divide-y divide-rule">
          @for (p of t().projects; track p.id; let i = $index) {
            <article appReveal class="py-14 first:pt-0" [attr.aria-labelledby]="'p-' + p.id">
              <p class="meta flex flex-wrap gap-x-3">
                <span class="text-ink">{{ '1.' + (i + 1) }}</span>
                <span>{{ p.sector }}</span>
                @if (p.confidential) {
                  <span class="text-accent uppercase tracking-[0.12em]">· {{ t().confidential }}</span>
                }
                @if (p.demo) {
                  <a [href]="'#demo-' + p.demo" class="text-accent hover:underline">· {{ t().seeDemo }} ↓</a>
                }
              </p>
              <h3 [id]="'p-' + p.id" class="mt-3 font-display text-3xl sm:text-[2.1rem] leading-tight font-semibold text-ink max-w-[30ch]">
                {{ p.title }}
              </h3>
              <p class="mt-6 text-xl sm:text-2xl leading-snug text-ink max-w-[42ch]">
                <ng-container *ngTemplateOutlet="marked; context: { $implicit: p.lead }" />
              </p>

              <div class="mt-10 grid gap-8 sm:grid-cols-3 border-t border-rule pt-6">
                <div>
                  <h4 class="meta uppercase tracking-[0.12em]">{{ t().labels.problem }}</h4>
                  <p class="mt-2 leading-relaxed"><ng-container *ngTemplateOutlet="marked; context: { $implicit: p.problem }" /></p>
                </div>
                <div>
                  <h4 class="meta uppercase tracking-[0.12em]">{{ t().labels.solution }}</h4>
                  <p class="mt-2 leading-relaxed"><ng-container *ngTemplateOutlet="marked; context: { $implicit: p.solution }" /></p>
                </div>
                <div>
                  <h4 class="meta uppercase tracking-[0.12em]">{{ t().labels.outcome }}</h4>
                  <p class="mt-2 leading-relaxed"><ng-container *ngTemplateOutlet="marked; context: { $implicit: p.outcome }" /></p>
                </div>
              </div>

              @if (p.role) {
                <div class="mt-8 grid gap-2 sm:grid-cols-3 sm:gap-8">
                  <h4 class="meta uppercase tracking-[0.12em] sm:pt-1">{{ t().labels.role }}</h4>
                  <p class="sm:col-span-2 leading-relaxed"><ng-container *ngTemplateOutlet="marked; context: { $implicit: p.role }" /></p>
                </div>
              }

              <div class="mt-8 flex flex-wrap items-center gap-2">
                <h4 class="meta uppercase tracking-[0.12em] mr-2">{{ t().labels.stack }}</h4>
                <ul class="contents" role="list">
                  @for (tech of p.stack; track tech) {
                    <li class="chip" [attr.data-cat]="tech | techCategory">{{ tech }}</li>
                  }
                </ul>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <ng-template #marked let-text>@for (s of text | marks; track $index) {@if (s.marked) {<mark class="mark">{{ s.text }}</mark>} @else {{{ s.text }}}}</ng-template>

    <!-- 02 · Demos: compact list, each row is just enough to decide whether to open it -->
    <section id="demos" class="border-t border-rule py-16 md:py-20 bg-paper-2/50" aria-labelledby="demos-title">
      <div class="wrap grid gap-y-8 md:grid-cols-12 md:gap-x-8">
        <header class="md:col-span-3">
          <p class="meta text-accent">02</p>
          <h2 id="demos-title" class="mt-2 font-display text-4xl font-semibold text-ink">{{ t().demosTitle }}</h2>
          <p class="mt-4 text-[0.95rem] leading-relaxed max-w-[36ch]">{{ t().demosIntro }}</p>
          <p class="meta mt-3">{{ t().demoNote }}</p>
        </header>

        <ul class="md:col-span-9 border-t border-ink">
          @for (d of t().demos; track d.id) {
            <li [id]="'demo-' + d.id" class="grid gap-x-8 gap-y-3 py-6 border-b border-rule lg:grid-cols-12 lg:items-start">
              <div class="lg:col-span-3">
                <h3 class="font-display text-2xl font-semibold text-ink leading-none">{{ d.name }}</h3>
                <p class="mt-1.5 text-sm">{{ d.tagline }}</p>
                <a
                  [href]="d.url"
                  target="_blank"
                  rel="noopener"
                  class="mt-4 inline-flex items-center gap-1.5 bg-ink text-paper px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
                  [attr.aria-label]="t().demoOpen + ' ' + d.name"
                >
                  {{ t().demoOpen }} <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div class="lg:col-span-6">
                <p class="text-[0.95rem] leading-relaxed text-ink">{{ d.description }}</p>
                <ul class="mt-3 flex flex-wrap gap-1.5" role="list">
                  @for (tech of d.stack; track tech) {
                    <li class="chip" [attr.data-cat]="tech | techCategory">{{ tech }}</li>
                  }
                </ul>
              </div>
              <div class="lg:col-span-3">
                <p class="meta uppercase tracking-[0.12em]">{{ t().demoCredentials }}</p>
                @for (c of d.credentials; track c) {
                  <p class="mt-1 font-mono text-[0.75rem] text-ink break-all">{{ c }}</p>
                }
              </div>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class PortfolioComponent {
  private langService = inject(LangService);
  t = computed(() => PORTFOLIO_TEXT[this.langService.lang()]);
}
