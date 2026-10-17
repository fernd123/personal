import { Component, computed, inject } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { RevealDirective } from '../../shared/reveal.directive';

interface ExperienceEntry {
  period: string;
  company: string;
  location: string;
  role: string;
  mode?: string;
  bullets: string[];
  stack: string[];
}

interface ExperienceLang {
  title: string;
  intro: string;
  cv: string;
  entries: ExperienceEntry[];
  educationTitle: string;
  education: { period: string; title: string; school: string }[];
  languagesTitle: string;
  languages: { name: string; level: string }[];
}

const EXPERIENCE_TEXT: Record<'es' | 'en', ExperienceLang> = {
  es: {
    title: 'Experiencia',
    intro: 'Más de diez años en desarrollo full-stack, gestionando también proyectos y equipos, en sectores como ERP, industria, procurement y sanidad.',
    cv: 'CV completo en PDF',
    entries: [
      {
        period: 'May 2025 — actualidad',
        company: 'Freelance',
        location: 'Remoto · varios sectores',
        role: 'Senior Full-Stack Engineer',
        bullets: [
          'Trabajo como freelance en proyectos de distintos sectores y estoy abierto a nuevas áreas.',
          'Proyecto actual en el sector sanitario: aplicaciones full-stack para sistemas críticos de gestión, visualización y procesamiento de datos clínicos.',
          'Frontends en Angular 22 y backends en Java 21, siguiendo buenas prácticas de arquitectura, seguridad y mantenibilidad.',
          'Trabajo con equipos multidisciplinares (producto, QA, negocio) en entornos ágiles, participando en decisiones técnicas y en el diseño de la solución.',
        ],
        stack: ['Angular 22', 'Java 21', 'Spring Boot', 'Microservicios', 'Microfrontends'],
      },
      {
        period: 'Sep 2020 — Abr 2025',
        company: 'Mas Ingenieros',
        location: 'Villarreal, Castellón',
        role: 'Senior Full-Stack Engineer · Responsable del departamento de innovación',
        mode: 'Híbrido',
        bullets: [
          'Responsable del departamento de innovación: gestión de equipos y proyectos, compaginada con el desarrollo.',
          'Diseño, desarrollo y mantenimiento de productos de software propios y soluciones a medida para clientes industriales, orientados a la optimización de procesos y la monitorización de dispositivos físicos.',
          'Arquitecturas de microservicios con Spring Boot y frontends escalables en Angular (hasta v15), con bases de datos relacionales y no relacionales.',
          'Integración con hardware y sistemas industriales mediante MQTT, Modbus TCP, Zigbee y HTTP.',
          'Gestión de proyectos de principio a fin (análisis, arquitectura, desarrollo, pruebas y despliegue), coordinando equipos remotos con metodologías ágiles.',
          'Definición de un ecosistema de software modular y reutilizable, desplegado en varios clientes y entornos industriales.',
        ],
        stack: ['Java', 'Spring Boot', 'Angular ≤15', 'SQL / NoSQL', 'MQTT', 'Modbus TCP', 'Zigbee', 'Docker', 'Rancher'],
      },
      {
        period: 'Feb 2020 — Sep 2020',
        company: 'Innova Consulting',
        location: 'Castellón',
        role: 'Desarrollador y analista Navision / Business Central',
        bullets: [
          'Implantación y personalización de soluciones empresariales sobre Microsoft Dynamics NAV y Business Central.',
          'Análisis funcional y técnico para adaptar el sistema a las necesidades de cada negocio, incluida la integración con servicios externos.',
          'Soporte técnico y formación a usuarios finales y a equipos de soporte internos.',
        ],
        stack: ['Microsoft Dynamics NAV', 'Business Central'],
      },
      {
        period: 'Mar 2018 — Feb 2020',
        company: 'Buypower',
        location: 'Mataró, Barcelona',
        role: 'Desarrollador Full-Stack (Java + Angular)',
        mode: 'Remoto',
        bullets: [
          'Desarrollo de una plataforma web modular con Angular 8 y Spring Boot dentro de un equipo distribuido.',
          'Colaboración con stakeholders en la toma de requisitos y la validación funcional.',
          'Diseño e implementación de pruebas de integración y end-to-end con JUnit y Selenium, integradas en pipelines de CI/CD, que mejoraron la estabilidad y redujeron las incidencias en producción.',
        ],
        stack: ['Angular 8', 'Spring Boot', 'JUnit', 'Mockito', 'Selenium', 'CI/CD'],
      },
      {
        period: 'Abr 2015 — Mar 2018',
        company: 'Opentix S.L.',
        location: 'Castellón de la Plana',
        role: 'Desarrollador y analista ERP',
        bullets: [
          'Proyectos de implantación de ERP a nivel nacional e internacional (España y Chile) sobre Openbravo en Java 1.8.',
          'Programación de módulos de negocio: facturación, contabilidad, albaranes, almacén, informes y flujos de aprobación, adaptados a los procesos de cada cliente.',
          'Integración de Openbravo ERP, SugarCRM y aplicaciones móviles en Ionic 3.',
          'Responsable técnico de equipos pequeños y definición de metodologías internas de desarrollo.',
        ],
        stack: ['Java 1.8', 'Openbravo ERP', 'SugarCRM', 'Ionic 3'],
      },
    ],
    educationTitle: 'Formación',
    education: [
      { period: '2012 — 2016', title: 'Grado en Ingeniería Informática, especialidad en Software', school: 'Universitat Jaume I, Castellón de la Plana' },
      { period: '2011', title: 'Bachillerato Científico-Tecnológico', school: 'I.E.S. Peñagolosa, Castellón de la Plana' },
    ],
    languagesTitle: 'Idiomas',
    languages: [
      { name: 'Español, valenciano', level: 'Nativo' },
      { name: 'Inglés', level: 'C1 · EOI' },
      { name: 'Alemán', level: 'A2 · EOI' },
    ],
  },
  en: {
    title: 'Experience',
    intro: 'More than ten years in full-stack development, also managing projects and teams, in sectors such as ERP, manufacturing, procurement and healthcare.',
    cv: 'Full CV as PDF',
    entries: [
      {
        period: 'May 2025 — present',
        company: 'Freelance',
        location: 'Remote · several sectors',
        role: 'Senior Full-Stack Engineer',
        bullets: [
          'Freelancing on projects across different sectors, and open to new areas.',
          'Current project in healthcare: full-stack applications for critical systems that manage, visualise and process clinical data.',
          'Angular 22 frontends and Java 21 backends, following good practice in architecture, security and maintainability.',
          'Working with multidisciplinary teams (product, QA, business) in agile environments, contributing to technical decisions and solution design.',
        ],
        stack: ['Angular 22', 'Java 21', 'Spring Boot', 'Microservices', 'Microfrontends'],
      },
      {
        period: 'Sep 2020 — Apr 2025',
        company: 'Mas Ingenieros',
        location: 'Villarreal, Castellón',
        role: 'Senior Full-Stack Engineer · Head of the innovation department',
        mode: 'Hybrid',
        bullets: [
          'Responsible for the innovation department: managing teams and projects while continuing to program.',
          'Led the design, development and maintenance of in-house software products and custom solutions for industrial clients, focused on process optimisation and monitoring of physical devices.',
          'Microservice architectures with Spring Boot and scalable Angular frontends (up to v15), using relational and non-relational databases.',
          'Integration with industrial hardware and systems over MQTT, Modbus TCP, Zigbee and HTTP.',
          'Ran projects end to end (analysis, architecture, development, testing and deployment), coordinating remote teams with agile methods.',
          'Defined a modular, reusable software ecosystem deployed across several clients and industrial sites.',
        ],
        stack: ['Java', 'Spring Boot', 'Angular ≤15', 'SQL / NoSQL', 'MQTT', 'Modbus TCP', 'Zigbee', 'Docker', 'Rancher'],
      },
      {
        period: 'Feb 2020 — Sep 2020',
        company: 'Innova Consulting',
        location: 'Castellón',
        role: 'Navision / Business Central Developer & Analyst',
        bullets: [
          'Implementation and customisation of business solutions on Microsoft Dynamics NAV and Business Central.',
          'Functional and technical analysis to fit the system to each business, including integration with external services.',
          'Technical support and training for end users and internal support teams.',
        ],
        stack: ['Microsoft Dynamics NAV', 'Business Central'],
      },
      {
        period: 'Mar 2018 — Feb 2020',
        company: 'Buypower',
        location: 'Mataró, Barcelona',
        role: 'Full-Stack Developer (Java + Angular)',
        mode: 'Remote',
        bullets: [
          'Led development of a modular web platform with Angular 8 and Spring Boot in a distributed team.',
          'Worked with stakeholders on requirements gathering and functional validation.',
          'Designed and implemented integration and end-to-end tests with JUnit and Selenium, wired into CI/CD pipelines, improving stability and reducing production incidents.',
        ],
        stack: ['Angular 8', 'Spring Boot', 'JUnit', 'Mockito', 'Selenium', 'CI/CD'],
      },
      {
        period: 'Apr 2015 — Mar 2018',
        company: 'Opentix S.L.',
        location: 'Castellón de la Plana',
        role: 'ERP Developer & Analyst',
        bullets: [
          'ERP implementation projects in Spain and Chile on Openbravo, in Java 1.8.',
          'Business modules: invoicing, accounting, delivery notes, warehouse, reports and approval workflows, adapted to each client’s processes.',
          'Integrated Openbravo ERP, SugarCRM and Ionic 3 mobile applications.',
          'Technical lead for small teams; defined internal development methodologies.',
        ],
        stack: ['Java 1.8', 'Openbravo ERP', 'SugarCRM', 'Ionic 3'],
      },
    ],
    educationTitle: 'Education',
    education: [
      { period: '2012 — 2016', title: 'BSc Computer Engineering, Software specialisation', school: 'Universitat Jaume I, Castellón de la Plana' },
      { period: '2011', title: 'Science & Technology Baccalaureate', school: 'I.E.S. Peñagolosa, Castellón de la Plana' },
    ],
    languagesTitle: 'Languages',
    languages: [
      { name: 'Spanish, Valencian', level: 'Native' },
      { name: 'English', level: 'C1 · EOI' },
      { name: 'German', level: 'A2 · EOI' },
    ],
  },
};

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="experiencia" class="border-t border-rule py-20 md:py-28" aria-labelledby="exp-title">
      <div class="wrap grid gap-y-10 md:grid-cols-12 md:gap-x-8">
        <header class="md:col-span-3 md:sticky md:top-24 md:self-start">
          <p class="meta text-accent">03</p>
          <h2 id="exp-title" class="mt-2 font-display text-4xl font-semibold text-ink">{{ t().title }}</h2>
          <p class="mt-4 text-[0.95rem] leading-relaxed max-w-[36ch]">{{ t().intro }}</p>
          <p class="mt-6 flex gap-4 text-sm">
            <a href="/assets/cv-fernando-rodriguez-es.pdf" download class="link" hreflang="es">CV · ES</a>
            <a href="/assets/cv-fernando-rodriguez-en.pdf" download class="link" hreflang="en">CV · EN</a>
          </p>
        </header>

        <div class="md:col-span-9">
          <ol class="border-t border-ink">
            @for (e of t().entries; track e.period) {
              <li appReveal class="grid gap-x-8 gap-y-3 py-8 border-b border-rule lg:grid-cols-9">
                <div class="lg:col-span-2">
                  <p class="font-mono text-[0.8rem] text-ink whitespace-nowrap">{{ e.period }}</p>
                  <p class="meta mt-1">{{ e.location }}</p>
                  @if (e.mode) {
                    <p class="meta">{{ e.mode }}</p>
                  }
                </div>
                <div class="lg:col-span-7">
                  <h3 class="font-display text-2xl font-semibold text-ink leading-tight">{{ e.company }}</h3>
                  <p class="mt-1 text-ink">{{ e.role }}</p>
                  <ul class="mt-4 space-y-2 max-w-[68ch]">
                    @for (b of e.bullets; track b) {
                      <li class="relative pl-5 leading-relaxed before:absolute before:left-0 before:top-[0.7em] before:w-2.5 before:h-px before:bg-mute">
                        {{ b }}
                      </li>
                    }
                  </ul>
                  <p class="mt-4 font-mono text-[0.78rem] text-mute">{{ e.stack.join(' · ') }}</p>
                </div>
              </li>
            }
          </ol>

          <div class="mt-16 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 class="meta uppercase tracking-[0.12em]">{{ t().educationTitle }}</h3>
              <ul class="mt-4 border-t border-rule">
                @for (ed of t().education; track ed.title) {
                  <li class="py-4 border-b border-rule">
                    <p class="font-mono text-[0.78rem] text-mute">{{ ed.period }}</p>
                    <p class="mt-1 text-ink font-medium">{{ ed.title }}</p>
                    <p class="text-sm">{{ ed.school }}</p>
                  </li>
                }
              </ul>
            </div>
            <div>
              <h3 class="meta uppercase tracking-[0.12em]">{{ t().languagesTitle }}</h3>
              <dl class="mt-4 border-t border-rule">
                @for (l of t().languages; track l.name) {
                  <div class="flex justify-between gap-4 py-4 border-b border-rule">
                    <dt class="text-ink">{{ l.name }}</dt>
                    <dd class="font-mono text-[0.78rem] text-mute">{{ l.level }}</dd>
                  </div>
                }
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ExperienceComponent {
  private langService = inject(LangService);
  t = computed(() => EXPERIENCE_TEXT[this.langService.lang()]);
}
