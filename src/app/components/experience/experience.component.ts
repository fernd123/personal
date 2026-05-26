import { Component, computed, inject } from '@angular/core';
import { LangService } from '../../services/lang.service';

interface ExperienceEntry {
  period: string;
  roleBadge: string;
  remoteBadge?: string;
  title: string;
  location: string;
  description: string;
  bullets: string[];
}

interface ExperienceLang {
  badge: string;
  title: string;
  subtitle: string;
  entries: ExperienceEntry[];
}

const EXPERIENCE_TEXT: Record<'es' | 'en', ExperienceLang> = {
  es: {
    badge: '// TRAYECTORIA PROFESIONAL',
    title: 'Evolución Profesional',
    subtitle: '+10 años construyendo software en sectores industriales, sanitarios, cerámico, procurement y gestión empresarial.',
    entries: [
      {
        period: 'May 2025 – Actualidad',
        roleBadge: 'Full-Stack Senior · Freelance',
        remoteBadge: '100% Remoto',
        title: 'Desarrollador Freelance Full-Stack Senior',
        location: 'Remoto',
        description: 'Trabajo actualmente como desarrollador freelance full-stack, con proyectos activos en los sectores sanitario e industrial. Ofrezco un servicio completo: desde la toma de requisitos y arquitectura hasta el desarrollo, despliegue y mantenimiento en producción.',
        bullets: [
          'Desarrollo de aplicaciones con Angular 20 y Java 21 / Spring Boot para sistemas críticos del sector salud, con enfoque en seguridad, normativa sanitaria y escalabilidad.',
          'Participación activa en proyectos del sector industrial, aportando visión técnica, coordinación de equipo y comunicación directa con cliente.',
          'Gestión autónoma del ciclo completo: análisis, arquitectura, desarrollo, validación y soporte continuo en producción.',
        ],
      },
      {
        period: 'Sep 2020 – Abr 2025',
        roleBadge: 'Full-Stack Senior · Director de Proyectos',
        remoteBadge: 'Semi presencial',
        title: 'Mas Ingenieros',
        location: 'Villarreal, Castellón',
        description: 'Incorporación como desarrollador senior con evolución a Director de Proyectos. Construí el departamento de innovación de la empresa desde cero: definiendo la estructura de metodologías, el stack tecnológico, los procesos de desarrollo y las dinámicas de equipo.',
        bullets: [
          'Diseñé el ecosistema de software propio de la empresa con soluciones modulares y reutilizables desplegadas en múltiples clientes de sectores industrial, cerámico, sanitario y procurement.',
          'Arquitecturas con Spring Boot (microservicios y monolitos) y Angular (hasta v15), SQL y NoSQL, integración con hardware industrial (MQTT, Modbus TCP, Zigbee, BLE) y despliegue con Docker y Rancher.',
          'Gestión completa de proyectos: análisis, definición de requisitos, planificación, desarrollo, testing y despliegue, coordinando equipos remotos en metodologías ágiles.',
          'Interlocución directa con clientes, detención de oportunidades de negocio y transformación en soluciones de valor entregadas de principio a fin.',
        ],
      },
      {
        period: 'Mar 2018 – Feb 2020',
        roleBadge: 'Desarrollador Full-Stack',
        remoteBadge: 'Remoto',
        title: 'Buypower',
        location: 'Mataró, Barcelona',
        description: 'Desarrollo full-stack de una plataforma SaaS desde cero en equipo distribuido, con responsabilidad directa sobre arquitectura, calidad de código y relación con stakeholders para toma de requisitos y validación funcional.',
        bullets: [
          'Construcción de una arquitectura de microservicios con Spring Boot y frontend modular en Angular 8, con foco en escalabilidad y mantenibilidad a largo plazo.',
          'Estrategia de testing completa: pruebas unitarias con JUnit y Mockito, end-to-end con Selenium, integradas en pipelines CI/CD, logrando cero incidencias críticas en pases a producción.',
          'Participación activa en decisiones de producto, refinamientos de backlog y demos a cliente en ciclos de entrega ágil.',
        ],
      },
      {
        period: 'Mar 2018 – Jul 2018',
        roleBadge: 'Desarrollador y Analista',
        title: 'Indra',
        location: 'Valencia',
        description: 'Integración en un equipo multidisciplinar deslocalizado para un proyecto estratégico del Ministerio de Defensa de España, desarrollando interfaces con Angular 5 en un entorno corporativo de alta exigencia.',
        bullets: [
          'Desarrollo de componentes frontend complejos bajo estrictos estándares de calidad, seguridad y entrega definidos por el cliente institucional.',
          'Trabajo en entornos Agile con equipos distribuidos de gran escala, con requisitos de auditoría técnica y documentación formal.',
        ],
      },
      {
        period: 'Abr 2015 – Mar 2018',
        roleBadge: 'Desarrollador y Analista ERP',
        title: 'Opentix S.L.',
        location: 'Castellón de la Plana',
        description: 'Desarrollo, personalización e implantación de módulos ERP a nivel nacional e internacional (España y Chile), adaptando los flujos de negocio del cliente sobre la plataforma Openbravo en Java 1.8.',
        bullets: [
          'Programación de módulos de negocio clave: facturación, contabilidad, albaranes, gestión de almacén, informes y flujos de aprobación, ajustando la plataforma a los procesos específicos de cada cliente.',
          'Integración del ERP con aplicaciones móviles corporativas en Ionic 3, conectando los flujos de planta y ventas con el back-office empresarial.',
          'Dirección técnica de equipos pequeños y definición de metodologías internas de desarrollo, documentación y gestión de proyectos.',
        ],
      },
    ],
  },
  en: {
    badge: '// PROFESSIONAL TRAJECTORY',
    title: 'Professional Evolution',
    subtitle: '+10 years building software in industrial, healthcare, ceramic, procurement and business management sectors.',
    entries: [
      {
        period: 'May 2025 – Present',
        roleBadge: 'Full-Stack Senior · Freelance',
        remoteBadge: '100% Remote',
        title: 'Senior Full-Stack Freelance Developer',
        location: 'Remote',
        description: 'Currently working as a senior full-stack freelance developer, with active projects in the healthcare and industrial sectors. I offer a complete service: from requirements gathering and architecture through to development, deployment and production maintenance.',
        bullets: [
          'Application development with Angular 20 and Java 21 / Spring Boot for critical healthcare systems, focusing on security, healthcare regulations and scalability.',
          'Active participation in industrial sector projects, contributing technical vision, team coordination and direct client communication.',
          'Autonomous management of the full cycle: analysis, architecture, development, validation and continuous production support.',
        ],
      },
      {
        period: 'Sep 2020 – Apr 2025',
        roleBadge: 'Full-Stack Senior · Project Director',
        remoteBadge: 'Hybrid',
        title: 'Mas Ingenieros',
        location: 'Villarreal, Castellón',
        description: 'Joined as a senior developer and evolved into Project Director. I built the company\'s innovation department from scratch: defining the methodology structure, technology stack, development processes and team dynamics.',
        bullets: [
          'Designed the company\'s own software ecosystem with modular, reusable solutions deployed across multiple clients in industrial, ceramic, healthcare and procurement sectors.',
          'Architectures with Spring Boot (microservices and monoliths) and Angular (up to v15), SQL and NoSQL, integration with industrial hardware (MQTT, Modbus TCP, Zigbee, BLE) and deployment with Docker and Rancher.',
          'Full project management: analysis, requirements definition, planning, development, testing and deployment, coordinating remote teams using agile methodologies.',
          'Direct client liaison, identifying business opportunities and transforming them into end-to-end value solutions.',
        ],
      },
      {
        period: 'Mar 2018 – Feb 2020',
        roleBadge: 'Full-Stack Developer',
        remoteBadge: 'Remote',
        title: 'Buypower',
        location: 'Mataró, Barcelona',
        description: 'Full-stack development of a SaaS platform from scratch in a distributed team, with direct responsibility for architecture, code quality and stakeholder relations for requirements gathering and functional validation.',
        bullets: [
          'Built a microservices architecture with Spring Boot and modular frontend in Angular 8, focusing on long-term scalability and maintainability.',
          'Complete testing strategy: unit tests with JUnit and Mockito, end-to-end with Selenium, integrated into CI/CD pipelines, achieving zero critical incidents in production releases.',
          'Active participation in product decisions, backlog refinements and client demos in agile delivery cycles.',
        ],
      },
      {
        period: 'Mar 2018 – Jul 2018',
        roleBadge: 'Developer & Analyst',
        title: 'Indra',
        location: 'Valencia',
        description: 'Integration into a multidisciplinary distributed team for a strategic project for the Spanish Ministry of Defence, developing interfaces with Angular 5 in a high-demand corporate environment.',
        bullets: [
          'Development of complex frontend components under strict quality, security and delivery standards defined by the institutional client.',
          'Work in Agile environments with large-scale distributed teams, with technical audit and formal documentation requirements.',
        ],
      },
      {
        period: 'Apr 2015 – Mar 2018',
        roleBadge: 'Developer & ERP Analyst',
        title: 'Opentix S.L.',
        location: 'Castellón de la Plana',
        description: 'Development, customisation and implementation of ERP modules at national and international level (Spain and Chile), adapting client business flows on the Openbravo platform in Java 1.8.',
        bullets: [
          'Programming of key business modules: invoicing, accounting, delivery notes, warehouse management, reports and approval workflows, tailoring the platform to each client\'s specific processes.',
          'ERP integration with corporate mobile applications in Ionic 3, connecting plant and sales flows with the business back-office.',
          'Technical leadership of small teams and definition of internal development, documentation and project management methodologies.',
        ],
      },
    ],
  },
};

@Component({
  selector: 'app-experience',
  standalone: true,
  template: `
    <section id="experiencia-seccion" class="space-y-12">
      <div class="border-b border-slate-800 pb-4">
        <span class="text-xs font-mono text-slate-500">{{ t().badge }}</span>
        <h2 class="text-3xl font-bold tracking-tight text-white mt-1">{{ t().title }}</h2>
        <p class="text-slate-400 text-sm">{{ t().subtitle }}</p>
      </div>

      <div class="relative pl-6 border-l border-slate-800 space-y-12 ml-4">

        <!-- Freelance actual -->
        <div class="relative group">
          <span class="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-brand-secondary border-4 border-brand-bg transition-transform group-hover:scale-125"></span>
          <div class="space-y-2">
            <div class="flex flex-wrap items-baseline gap-2">
              <span class="font-mono text-xs text-brand-secondary">{{ t().entries[0].period }}</span>
              <span class="px-2 py-0.5 bg-rose-500/10 text-[10px] font-mono text-rose-400 rounded border border-rose-500/20">{{ t().entries[0].roleBadge }}</span>
              <span class="px-2 py-0.5 bg-brand-accent/10 text-[10px] font-mono text-brand-accent rounded border border-brand-accent/20">{{ t().entries[0].remoteBadge }}</span>
            </div>
            <h3 class="text-lg font-bold text-white">{{ t().entries[0].title }} <span class="text-xs text-slate-500 font-normal">| {{ t().entries[0].location }}</span></h3>
            <p class="text-xs text-slate-400 max-w-3xl leading-relaxed">{{ t().entries[0].description }}</p>
            <ul class="text-[11px] text-slate-300 list-disc list-inside space-y-1 pl-2">
              @for (b of t().entries[0].bullets; track b) { <li>{{ b }}</li> }
            </ul>
          </div>
        </div>

        <!-- Mas Ingenieros -->
        <div class="relative group">
          <span class="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-600 border-4 border-brand-bg transition-transform group-hover:scale-125"></span>
          <div class="space-y-2">
            <div class="flex flex-wrap items-baseline gap-2">
              <span class="font-mono text-xs text-slate-400">{{ t().entries[1].period }}</span>
              <span class="px-2 py-0.5 bg-slate-900 text-[10px] font-mono text-slate-400 rounded border border-slate-800">{{ t().entries[1].roleBadge }}</span>
              <span class="px-2 py-0.5 bg-slate-900 text-[10px] font-mono text-slate-500 rounded border border-slate-800">{{ t().entries[1].remoteBadge }}</span>
            </div>
            <h3 class="text-lg font-bold text-white">{{ t().entries[1].title }} <span class="text-xs text-slate-500 font-normal">| {{ t().entries[1].location }}</span></h3>
            <p class="text-xs text-slate-400 max-w-3xl leading-relaxed">{{ t().entries[1].description }}</p>
            <ul class="text-[11px] text-slate-300 list-disc list-inside space-y-1 pl-2">
              @for (b of t().entries[1].bullets; track b) { <li>{{ b }}</li> }
            </ul>
          </div>
        </div>

        <!-- Buypower -->
        <div class="relative group">
          <span class="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-700 border-4 border-brand-bg transition-transform group-hover:scale-125"></span>
          <div class="space-y-2">
            <div class="flex flex-wrap items-baseline gap-2">
              <span class="font-mono text-xs text-slate-500">{{ t().entries[2].period }}</span>
              <span class="px-2 py-0.5 bg-slate-900 text-[10px] font-mono text-slate-400 rounded border border-slate-800">{{ t().entries[2].roleBadge }}</span>
              <span class="px-2 py-0.5 bg-brand-accent/10 text-[10px] font-mono text-brand-accent rounded border border-brand-accent/20">{{ t().entries[2].remoteBadge }}</span>
            </div>
            <h3 class="text-lg font-bold text-slate-300">{{ t().entries[2].title }} <span class="text-xs text-slate-500 font-normal">| {{ t().entries[2].location }}</span></h3>
            <p class="text-xs text-slate-400 max-w-3xl leading-relaxed">{{ t().entries[2].description }}</p>
            <ul class="text-[11px] text-slate-300 list-disc list-inside space-y-1 pl-2">
              @for (b of t().entries[2].bullets; track b) { <li>{{ b }}</li> }
            </ul>
          </div>
        </div>

        <!-- Indra -->
        <div class="relative group">
          <span class="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-700 border-4 border-brand-bg transition-transform group-hover:scale-125"></span>
          <div class="space-y-2">
            <div class="flex flex-wrap items-baseline gap-2">
              <span class="font-mono text-xs text-slate-500">{{ t().entries[3].period }}</span>
              <span class="px-2 py-0.5 bg-slate-900 text-[10px] font-mono text-slate-400 rounded border border-slate-800">{{ t().entries[3].roleBadge }}</span>
            </div>
            <h3 class="text-lg font-bold text-slate-300">{{ t().entries[3].title }} <span class="text-xs text-slate-500 font-normal">| {{ t().entries[3].location }}</span></h3>
            <p class="text-xs text-slate-400 max-w-3xl leading-relaxed">{{ t().entries[3].description }}</p>
            <ul class="text-[11px] text-slate-300 list-disc list-inside space-y-1 pl-2">
              @for (b of t().entries[3].bullets; track b) { <li>{{ b }}</li> }
            </ul>
          </div>
        </div>

        <!-- Opentix -->
        <div class="relative group">
          <span class="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-700 border-4 border-brand-bg transition-transform group-hover:scale-125"></span>
          <div class="space-y-2">
            <div class="flex flex-wrap items-baseline gap-2">
              <span class="font-mono text-xs text-slate-500">{{ t().entries[4].period }}</span>
              <span class="px-2 py-0.5 bg-slate-900 text-[10px] font-mono text-slate-400 rounded border border-slate-800">{{ t().entries[4].roleBadge }}</span>
            </div>
            <h3 class="text-lg font-bold text-slate-300">{{ t().entries[4].title }} <span class="text-xs text-slate-500 font-normal">| {{ t().entries[4].location }}</span></h3>
            <p class="text-xs text-slate-400 max-w-3xl leading-relaxed">{{ t().entries[4].description }}</p>
            <ul class="text-[11px] text-slate-300 list-disc list-inside space-y-1 pl-2">
              @for (b of t().entries[4].bullets; track b) { <li>{{ b }}</li> }
            </ul>
          </div>
        </div>

      </div>
    </section>
  `
})
export class ExperienceComponent {
  private langService = inject(LangService);
  t = computed(() => EXPERIENCE_TEXT[this.langService.lang()]);
}

