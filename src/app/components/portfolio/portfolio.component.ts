import { Component, computed, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { LangService } from '../../services/lang.service';

interface ProjectBase {
  id: string;
  tags: string[];
  badgeClass: string;
  icon: string;
  image?: string;
  stack: string[];
}

interface DemoBase {
  id: string;
  icon: string;
  color: string;
  url: string;
  stack: string[];
}

interface PortfolioLang {
  sectionBadge: string;
  sectionTitle: string;
  sectionSubtitle: string;
  challengeLabel: string;
  impactLabel: string;
  filters: { key: string; label: string }[];
  projects: { badge: string; title: string; challenge: string; impact: string }[];
  demosLabel: string;
  demosTitle: string;
  demosSubtitle: string;
  techLabel: string;
  viewDemo: string;
  demos: { title: string; tagline: string; description: string; features: string[] }[];
}

const PORTFOLIO_TEXT: Record<'es' | 'en', PortfolioLang> = {
  es: {
    sectionBadge: '// PROYECTOS EN PRODUCCIÓN',
    sectionTitle: 'Proyectos Destacados',
    sectionSubtitle: 'Proyectos reales donde el objetivo no fue solo entregar código, sino resolver el problema de negocio de principio a fin: industrial, sanitario, cerámico, procurement y gestión interna.',
    challengeLabel: '// El Reto Técnico (Arquitectura):',
    impactLabel: '// El Impacto de Negocio:',
    filters: [
      { key: 'all',     label: 'Todos' },
      { key: 'backend', label: 'Backend / Java' },
      { key: 'web',     label: 'Angular / Web' },
      { key: 'mobile',  label: 'Móvil / Ionic' },
      { key: 'erp',     label: 'ERP / Integraciones' },
      { key: 'saas',    label: 'SaaS / Distribuido' },
    ],
    projects: [
      { badge: 'MOBILE + IoT',       title: 'App Showroom Cerámico + Backoffice Web',                  challenge: 'App móvil Ionic con programación de dispositivos IoT/BLE para orquestar una experiencia inmersiva en el showroom. El sistema registra el recorrido del visitante, zonas de mayor interés y tiempos de permanencia, generando al finalizar la visita un informe personalizado entregado directamente al cliente.',                                                                                      impact: 'Comerciales y responsables financieros pueden analizar tendencias de comportamiento, cruzar las preferencias del visitante con pedidos reales del ERP y construir una propuesta comercial diferencial, convirtiendo cada visita en una oportunidad de venta de alto valor.' },
      { badge: 'SECTOR SANITARIO',   title: 'Plataforma Clínica – Historia Clínica Digital',           challenge: 'Desarrollo en un entorno de microservicios y microfrontends para la gestión, mantenimiento y consulta de historias clínicas. Sistema crítico con estrictos requisitos de seguridad, normativa sanitaria y rendimiento bajo alta carga de usuarios concurrentes.',                                                                                                                         impact: 'Proyecto con una empresa referente del sector sanitario a nivel nacional. Entrega de un sistema robusto, escalable y auditable que centraliza la información clínica del paciente y da soporte a los flujos asistenciales diarios de múltiples centros.' },
      { badge: 'PLANTA INDUSTRIAL',  title: 'Software de Gestión de Planta Industrial – Sector Madera', challenge: 'Aplicación full-stack que actúa como intermediario entre el ERP de órdenes de fabricación y las máquinas de planta (sierra, chapadora, taladro). Integración con PLCs industriales y captura de métricas de producción en MongoDB para análisis y reporting.',                                                                                                                      impact: 'Los operarios de planta pueden lanzar órdenes de trabajo a cada máquina desde una interfaz intuitiva, eliminando procesos manuales, reduciendo errores de producción y permitiendo a dirección disponer de datos reales de rendimiento de planta en tiempo real.' },
      { badge: 'PLATAFORMA PROPIA',  title: 'Fluxo · Dashboard Builder Embebible',                    challenge: 'Plataforma multisector para construir dashboards dinámicos conectados a múltiples orígenes de datos (PostgreSQL, MySQL, SQL Server). Dashboards embebibles en cualquier web mediante un snippet, con gestión de usuarios, roles, alarmas y notificaciones en tiempo real.',                                                                                                           impact: 'Empresas de cualquier sector pueden disponer de sus propios dashboards analíticos integrados en sus herramientas existentes sin desarrollo adicional, con personalización total y acceso en tiempo real a sus métricas de negocio.' },
      { badge: 'API-FIRST / OpenAPI', title: 'SyncHub · Plataforma de Intercambio de Datos',           challenge: 'Plataforma multitenant API-First donde cada empresa define sus modelos de datos, sube información vía API REST documentada con OpenAPI y la comparte con terceros de forma controlada. Arquitectura de microservicios con Spring Boot en contenedores.',                                                                                                                             impact: 'Elimina la fricción en el intercambio de datos entre empresas u organizaciones, unificando la información bajo un entorno común para ser explotada, analizada o exportada a sistemas externos con control de acceso granular.' },
      { badge: 'GESTIÓN INTERNA',    title: 'Plataforma de Control Interno y Gestión de Equipo',       challenge: 'Aplicación web completa para gestión interna de equipos: control de vacaciones y ausencias, registro de jornada (inicio/fin) con lugar de trabajo, asignación a proyectos, imputación de horas y desglose completo de tareas por proyecto.',                                                                                                                                   impact: 'Visibilidad total del equipo en un único panel: quién trabaja en qué proyecto, cuántas horas, desde dónde y con qué tareas. Herramienta clave para responsables y RRHH en entornos de trabajo remoto o híbrido.' },
    ],
    demosLabel: '// DEMOS ONLINE',
    demosTitle: 'Proyectos Propios',
    demosSubtitle: 'Plataformas construidas desde cero: arquitectura, diseño, desarrollo y despliegue.',
    techLabel: '// TECNOLOGÍAS:',
    viewDemo: 'Ver demo',
    demos: [
      { title: 'Fluxo',   tagline: 'Dashboard Builder · Embebible · Multi-datasource', description: 'Plataforma para construir dashboards dinámicos basados en consultas sobre múltiples orígenes de datos (PostgreSQL, MySQL, SQL Server, etc.). Los dashboards pueden embeberse en cualquier web externa con un simple snippet, y cuentan con gestión de usuarios, roles, notificaciones, personalización de colores y sistema de alarmas.', features: ['Conexión a múltiples fuentes de datos: PostgreSQL, MySQL, SQL Server y más', 'Dashboards embebibles en cualquier web con iframe o snippet JS', 'Gestión de usuarios, roles y permisos granulares', 'Personalización visual (colores, temas) y sistema de alarmas configurables', 'Notificaciones en tiempo real'] },
      { title: 'SyncHub', tagline: 'Data Exchange Platform · Multitenant · API-First',  description: 'Plataforma multitenant de intercambio de datos entre empresas. Cada empresa define sus propios modelos de datos, puede subir información vía API REST y compartirla con terceros de forma controlada. Todos los datos quedan unificados bajo un mismo entorno para ser explotados, analizados o exportados a otros sistemas.',             features: ['Arquitectura multitenant: cada empresa gestiona sus propios modelos de datos', 'Ingesta de datos vía API REST con documentación OpenAPI', 'Compartición de datos entre empresas con control de acceso granular', 'Explotación y análisis unificado; exportación a sistemas externos', 'Microservicios con Spring Boot y despliegue en contenedores'] },
    ],
  },
  en: {
    sectionBadge: '// PROJECTS IN PRODUCTION',
    sectionTitle: 'Featured Projects',
    sectionSubtitle: 'Real-world projects where the goal was not just to deliver code, but to solve the business problem end-to-end: industrial, healthcare, ceramic, procurement and internal management.',
    challengeLabel: '// Technical Challenge (Architecture):',
    impactLabel: '// Business Impact:',
    filters: [
      { key: 'all',     label: 'All' },
      { key: 'backend', label: 'Backend / Java' },
      { key: 'web',     label: 'Angular / Web' },
      { key: 'mobile',  label: 'Mobile / Ionic' },
      { key: 'erp',     label: 'ERP / Integrations' },
      { key: 'saas',    label: 'SaaS / Distributed' },
    ],
    projects: [
      { badge: 'MOBILE + IoT',        title: 'Ceramic Showroom App + Web Backoffice',             challenge: 'Ionic mobile app with IoT/BLE device programming to orchestrate an immersive showroom experience. The system records the visitor\'s tour, areas of greatest interest and dwell times, generating a personalised report delivered directly to the client at the end of the visit.',                                                                                              impact: 'Sales staff and financial managers can analyse behaviour trends, cross-reference visitor preferences with actual ERP orders and build a differentiated commercial proposal, turning every visit into a high-value sales opportunity.' },
      { badge: 'HEALTHCARE',          title: 'Clinical Platform – Electronic Health Record',       challenge: 'Development in a microservices and microfrontends environment for the management, maintenance and consultation of clinical records. Critical system with strict security requirements, healthcare regulations and performance under heavy concurrent user load.',                                                                                                         impact: 'Project for a nationally leading healthcare company. Delivery of a robust, scalable and auditable system that centralises patient clinical information and supports the daily care workflows of multiple medical centres.' },
      { badge: 'INDUSTRIAL PLANT',    title: 'Industrial Plant Management Software – Wood Sector', challenge: 'Full-stack application acting as the bridge between the manufacturing order ERP and plant machines (saw, edge bander, drill). Integration with industrial PLCs and production metrics capture in MongoDB for analysis and reporting.',                                                                                                                                    impact: 'Plant operators can launch work orders to each machine from an intuitive interface, eliminating manual processes, reducing production errors and enabling management to access real-time plant performance data.' },
      { badge: 'OWN PLATFORM',        title: 'Fluxo · Embeddable Dashboard Builder',              challenge: 'Multi-sector platform for building dynamic dashboards connected to multiple data sources (PostgreSQL, MySQL, SQL Server). Dashboards embeddable in any website via a snippet, with user/role management, alarms and real-time notifications.',                                                                                                                           impact: 'Companies in any sector can have their own analytics dashboards integrated into their existing tools with no additional development, with full customisation and real-time access to their business metrics.' },
      { badge: 'API-FIRST / OpenAPI', title: 'SyncHub · Data Exchange Platform',                  challenge: 'API-First multitenant platform where each company defines its data models, uploads information via OpenAPI-documented REST API and shares it with third parties in a controlled way. Microservices architecture with Spring Boot in containers.',                                                                                                                          impact: 'Eliminates friction in data exchange between companies or organisations, unifying information under a common environment to be exploited, analysed or exported to external systems with granular access control.' },
      { badge: 'INTERNAL MANAGEMENT', title: 'Internal Control & Team Management Platform',        challenge: 'Complete web application for internal team management: holiday and absence tracking, working time logging (start/end) with workplace location, project assignment, time imputation and full task breakdown per project.',                                                                                                                                               impact: 'Full team visibility in a single dashboard: who works on which project, how many hours, from where and on which tasks. Key tool for managers and HR in remote or hybrid work environments.' },
    ],
    demosLabel: '// LIVE DEMOS',
    demosTitle: 'Own Projects',
    demosSubtitle: 'Platforms built from scratch: architecture, design, development and deployment.',
    techLabel: '// TECHNOLOGIES:',
    viewDemo: 'View demo',
    demos: [
      { title: 'Fluxo',   tagline: 'Dashboard Builder · Embeddable · Multi-datasource', description: 'Platform for building dynamic dashboards based on queries across multiple data sources (PostgreSQL, MySQL, SQL Server, etc.). Dashboards can be embedded in any external website with a simple snippet, and include user/role management, notifications, colour customisation and an alarm system.', features: ['Connection to multiple data sources: PostgreSQL, MySQL, SQL Server and more', 'Dashboards embeddable in any website via iframe or JS snippet', 'User, role and granular permission management', 'Visual customisation (colours, themes) and configurable alarm system', 'Real-time notifications'] },
      { title: 'SyncHub', tagline: 'Data Exchange Platform · Multitenant · API-First',  description: 'Multitenant data exchange platform between companies. Each company defines its own data models, can upload information via REST API and share it with third parties in a controlled way. All data is unified under a single environment to be exploited, analysed or exported to other systems.',                                                                                    features: ['Multitenant architecture: each company manages its own data models', 'Data ingestion via REST API with OpenAPI documentation', 'Data sharing between companies with granular access control', 'Unified exploitation and analysis; export to external systems', 'Microservices with Spring Boot and container deployment'] },
    ],
  },
};

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [NgClass],
  template: `
    <section id="portfolio-seccion" class="space-y-12">
      <div class="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span class="text-xs font-mono text-slate-500">{{ t().sectionBadge }}</span>
          <h2 class="text-3xl font-bold tracking-tight text-white mt-1">{{ t().sectionTitle }}</h2>
          <p class="text-slate-400 text-sm mt-1">{{ t().sectionSubtitle }}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          @for (filter of t().filters; track filter.key) {
            <button
              (click)="activeFilter.set(filter.key)"
              [ngClass]="activeFilter() === filter.key
                ? 'bg-brand-accent text-white border-brand-accent/30'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'"
              class="px-3 py-1.5 text-xs font-mono rounded-lg border transition-all flex items-center gap-1.5">
              {{ filter.label }}
            </button>
          }
        </div>
      </div>

      <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        @for (project of visibleProjects(); track project.id) {
          <div class="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden group hover:border-brand-accent/40 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div class="aspect-video bg-slate-950 relative overflow-hidden flex items-center justify-center border-b border-slate-900">
                <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent dark:from-black/90 dark:via-black/30 z-10"></div>
                @if (project.image) {
                  <img [src]="project.image" [alt]="project.title" class="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-500">
                } @else {
                  <i [class]="'fa-solid ' + project.icon + ' text-5xl text-slate-800 group-hover:scale-110 transition-transform duration-300'"></i>
                }
                <span [class]="'absolute top-3 right-3 z-20 text-[10px] px-2.5 py-1 rounded-full font-mono border font-bold uppercase ' + project.badgeClass">{{ project.badge }}</span>
              </div>
              <div class="p-6 space-y-4">
                <h3 class="text-lg font-bold text-white group-hover:text-brand-highlight transition-colors">{{ project.title }}</h3>
                <div class="space-y-3">
                  <div>
                    <span class="text-[10px] font-mono text-brand-accent uppercase tracking-wider font-semibold block">{{ t().challengeLabel }}</span>
                    <p class="text-[11px] text-slate-400">{{ project.challenge }}</p>
                  </div>
                  <div>
                    <span class="text-[10px] font-mono text-brand-secondary uppercase tracking-wider font-semibold block">{{ t().impactLabel }}</span>
                    <p class="text-[11px] text-slate-300">{{ project.impact }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-6 pb-6 pt-3 flex flex-wrap gap-1 bg-slate-950 border-t border-slate-800">
              @for (tag of project.stack; track tag) {
                <span class="text-[9px] font-mono bg-slate-800 border border-slate-600 text-white px-2 py-0.5 rounded font-semibold">{{ tag }}</span>
              }
            </div>
          </div>
        }
      </div>

      <!-- DEMOS ONLINE -->
      <div class="pt-8 border-t border-slate-800/60">
        <div class="mb-8">
          <span class="text-xs font-mono text-brand-secondary">{{ t().demosLabel }}</span>
          <h2 class="text-3xl font-bold tracking-tight text-white mt-1">{{ t().demosTitle }}</h2>
          <p class="text-slate-400 text-sm mt-1">{{ t().demosSubtitle }}</p>
        </div>
        <div class="grid md:grid-cols-2 gap-8">
          @for (demo of translatedDemos(); track demo.id) {
            <div [class]="'rounded-2xl border overflow-hidden group transition-all duration-300 hover:scale-[1.01] flex flex-col ' + demo.color">
              <!-- Header -->
              <div class="p-6 pb-4 flex items-start justify-between gap-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shadow-inner flex-shrink-0">
                    <i [class]="'fa-solid ' + demo.icon + ' text-xl text-white'"></i>
                  </div>
                  <div>
                    <h3 class="text-xl font-extrabold text-white tracking-tight">{{ demo.title }}</h3>
                    <p class="text-xs text-white/70 font-mono">{{ demo.tagline }}</p>
                  </div>
                </div>
                <a [href]="demo.url" target="_blank" rel="noopener"
                   class="flex-shrink-0 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-xs font-mono flex items-center gap-1.5 transition-all">
                  <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> {{ t().viewDemo }}
                </a>
              </div>
              <!-- Body -->
              <div class="px-6 pb-4 flex-1">
                <p class="text-sm text-white/80 leading-relaxed">{{ demo.description }}</p>
                <ul class="mt-3 space-y-1.5">
                  @for (feat of demo.features; track feat) {
                    <li class="text-xs text-white/70 flex items-start gap-2">
                      <i class="fa-solid fa-check text-white/50 mt-0.5 flex-shrink-0"></i> {{ feat }}
                    </li>
                  }
                </ul>
              </div>
              <!-- Footer stack -->
              <div class="px-6 py-4 bg-slate-950/50 border-t border-slate-800/60">
                <span class="text-[10px] font-mono text-white/50 mb-2 block">{{ t().techLabel }}</span>
                <div class="flex flex-wrap gap-1.5">
                  @for (tech of demo.stack; track tech) {
                    <span class="text-[9px] font-mono bg-white/10 border border-white/15 text-white/80 px-2 py-0.5 rounded">{{ tech }}</span>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class PortfolioComponent {
  private langService = inject(LangService);
  t = computed(() => PORTFOLIO_TEXT[this.langService.lang()]);
  activeFilter = signal('all');

  projectBase: ProjectBase[] = [
    { id: 'showroom',       tags: ['mobile', 'web', 'backend'],      badgeClass: 'bg-violet-500/10 text-violet-400 border-violet-500/20',  icon: 'fa-mobile-screen-button', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=70&auto=format&fit=crop',  stack: ['Ionic 4', 'Angular', 'IoT / BLE', 'Java', 'Spring Boot', 'PostgreSQL'] },
    { id: 'healthcare',     tags: ['backend', 'web', 'saas'],         badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/20',        icon: 'fa-heart-pulse',          image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=70&auto=format&fit=crop',  stack: ['Angular 20', 'Java 21', 'Spring Boot', 'Microservicios', 'Microfrontends', 'PostgreSQL'] },
    { id: 'industrial-wood', tags: ['backend', 'web'],                badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20',     icon: 'fa-industry',             image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=70&auto=format&fit=crop',  stack: ['Java 17', 'Angular 14', 'Spring Boot', 'MySQL', 'MongoDB', 'PLC Integration'] },
    { id: 'fluxo',          tags: ['web', 'saas'],                    badgeClass: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',  icon: 'fa-chart-area',           image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=70&auto=format&fit=crop',  stack: ['Angular 13', 'NGPrime', 'Node.js', 'MongoDB', 'Docker', 'WebSockets', 'SCSS'] },
    { id: 'synchub',        tags: ['backend', 'saas', 'erp'],         badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: 'fa-arrows-rotate',       image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=70&auto=format&fit=crop',  stack: ['Angular 20', 'Java 21', 'Spring Boot', 'Microservicios', 'OpenAPI', 'PostgreSQL'] },
    { id: 'hr-control',     tags: ['backend', 'web'],                 badgeClass: 'bg-sky-500/10 text-sky-400 border-sky-500/20',           icon: 'fa-clock',                image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=70&auto=format&fit=crop',  stack: ['Angular 14', 'Java 17', 'Spring Boot', 'MySQL'] },
  ];

  demoBase: DemoBase[] = [
    { id: 'fluxo',   icon: 'fa-chart-area',   color: 'bg-gradient-to-br from-indigo-900/60 to-slate-900 border-indigo-500/30 hover:border-indigo-400/50',   url: 'http://nasfertesting.myvnc.com:4201',             stack: ['Angular 13', 'Node.js', 'MongoDB', 'Docker'] },
    { id: 'synchub', icon: 'fa-arrows-rotate', color: 'bg-gradient-to-br from-emerald-900/60 to-slate-900 border-emerald-500/30 hover:border-emerald-400/50', url: 'http://nasfertesting.myvnc.com:93/auth/login',    stack: ['Angular 20', 'Java 21', 'Spring Boot', 'Microservicios', 'OpenAPI', 'PostgreSQL', 'Tailwind', 'SCSS'] },
  ];

  allProjects = computed(() =>
    this.projectBase.map((p, i) => ({ ...p, ...this.t().projects[i] }))
  );

  translatedDemos = computed(() =>
    this.demoBase.map((d, i) => ({ ...d, ...this.t().demos[i] }))
  );

  visibleProjects = computed(() => {
    const filter = this.activeFilter();
    const projects = this.allProjects();
    if (filter === 'all') return projects;
    return projects.filter(p => p.tags.includes(filter));
  });
}

