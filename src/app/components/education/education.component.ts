import { Component, signal, computed, inject } from '@angular/core';
import { LangService } from '../../services/lang.service';

interface Skill {
  name: string;
  primary?: boolean;
}

const EDUCATION_TEXT = {
  es: {
    educationTitle: 'Educación y Formación',
    degree: 'Grado en Ingeniería Informática, Especialidad en Software',
    degreeSchool: 'Universitat Jaume I – Castellón de la Plana, España',
    baccalaureate: 'Bachillerato Científico-Tecnológico',
    baccalaureateSchool: 'I.E.S Peñagolosa – Castellón de la Plana, España',
    certsTitle: 'Certificaciones y Menciones',
    certs: [
      { title: 'Metodologías Ágiles – Scrum & Kanban', desc: 'Formación certificada y aplicación práctica continuada en proyectos de equipo durante más de 8 años en entornos profesionales.' },
      { title: 'Distinción Académica en Programación – UJI', desc: 'Reconocimiento por rendimiento y calidad de proyectos de desarrollo de software durante el Grado en Ingeniería Informática.' },
      { title: 'Inglés C1 · Alemán A2', desc: 'Certificados oficiales Escuela Oficial de Idiomas (EOI) – Castellón.' },
    ],
    skillsTitle: 'Aptitudes Técnicas Ampliadas',
    searchPlaceholder: 'Buscar aptitud...',
    noResults: '// Sin resultados para ese término.',
    starLegend: '// ★ = Stack principal',
    languagesLabel: '// IDIOMAS:',
    languagesValue: 'Español & Valenciano (Nativo) | Inglés (C1 EOI) | Alemán (A2 EOI)',
  },
  en: {
    educationTitle: 'Education & Training',
    degree: 'Bachelor\'s Degree in Computer Engineering, Software Specialisation',
    degreeSchool: 'Universitat Jaume I – Castellón de la Plana, Spain',
    baccalaureate: 'Science & Technology Baccalaureate',
    baccalaureateSchool: 'I.E.S Peñagolosa – Castellón de la Plana, Spain',
    certsTitle: 'Certifications & Mentions',
    certs: [
      { title: 'Agile Methodologies – Scrum & Kanban', desc: 'Certified training and continued practical application in team projects for over 8 years in professional environments.' },
      { title: 'Academic Distinction in Programming – UJI', desc: 'Recognition for performance and quality of software development projects during the Computer Engineering degree.' },
      { title: 'English C1 · German A2', desc: 'Official certificates from the Official School of Languages (EOI) – Castellón.' },
    ],
    skillsTitle: 'Expanded Technical Skills',
    searchPlaceholder: 'Search skill...',
    noResults: '// No results for that term.',
    starLegend: '// ★ = Main stack',
    languagesLabel: '// LANGUAGES:',
    languagesValue: 'Spanish & Valencian (Native) | English (C1 EOI) | German (A2 EOI)',
  },
} as const;

@Component({
  selector: 'app-education',
  standalone: true,
  template: `
    <section class="space-y-12 border-t border-slate-900 pt-12">

      <!-- Educación + Certificaciones -->
      <div class="grid md:grid-cols-2 gap-8">

        <!-- Educación -->
        <div class="space-y-6">
          <h3 class="text-xl font-bold text-white flex items-center gap-2">
            <i class="fa-solid fa-graduation-cap text-brand-accent"></i> {{ t().educationTitle }}
          </h3>
          <div class="space-y-4">
            <div class="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span class="font-mono text-xs text-brand-accent">2012 – 2016</span>
              <h4 class="font-bold text-white mt-1">{{ t().degree }}</h4>
              <p class="text-xs text-slate-400">{{ t().degreeSchool }}</p>
            </div>
            <div class="p-4 bg-slate-900 rounded-xl border border-slate-800">
              <span class="font-mono text-xs text-slate-500">2011</span>
              <h4 class="font-bold text-slate-300 mt-1">{{ t().baccalaureate }}</h4>
              <p class="text-xs text-slate-500">{{ t().baccalaureateSchool }}</p>
            </div>
          </div>
        </div>

        <!-- Certificaciones y Menciones -->
        <div class="space-y-6">
          <h3 class="text-xl font-bold text-white flex items-center gap-2">
            <i class="fa-solid fa-award text-brand-secondary"></i> {{ t().certsTitle }}
          </h3>
          <div class="space-y-3">
            <div class="p-4 bg-slate-900 rounded-xl border border-slate-800 flex gap-3 items-start">
              <i class="fa-solid fa-star text-amber-400 mt-0.5 flex-shrink-0"></i>
              <div>
                <h4 class="font-bold text-white text-sm">{{ t().certs[0].title }}</h4>
                <p class="text-xs text-slate-400 mt-0.5">{{ t().certs[0].desc }}</p>
              </div>
            </div>
            <div class="p-4 bg-slate-900 rounded-xl border border-slate-800 flex gap-3 items-start">
              <i class="fa-solid fa-trophy text-amber-400 mt-0.5 flex-shrink-0"></i>
              <div>
                <h4 class="font-bold text-white text-sm">{{ t().certs[1].title }}</h4>
                <p class="text-xs text-slate-400 mt-0.5">{{ t().certs[1].desc }}</p>
              </div>
            </div>
            <div class="p-4 bg-slate-900 rounded-xl border border-slate-800 flex gap-3 items-start">
              <i class="fa-solid fa-certificate text-brand-accent mt-0.5 flex-shrink-0"></i>
              <div>
                <h4 class="font-bold text-white text-sm">{{ t().certs[2].title }}</h4>
                <p class="text-xs text-slate-400 mt-0.5">{{ t().certs[2].desc }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Aptitudes Técnicas con buscador -->
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 class="text-xl font-bold text-white flex items-center gap-2">
            <i class="fa-solid fa-code text-brand-accent"></i> {{ t().skillsTitle }}
          </h3>
          <div class="relative w-full sm:w-72">
            <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
            <input
              type="text"
              [placeholder]="t().searchPlaceholder"
              [value]="searchQuery()"
              (input)="searchQuery.set($any($event.target).value)"
              class="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-brand-accent/60 transition-colors">
          </div>
        </div>

        @if (filteredSkills().length === 0) {
          <p class="text-xs text-slate-500 font-mono py-4">{{ t().noResults }}</p>
        } @else {
          <div class="flex flex-wrap gap-2">
            @for (skill of filteredSkills(); track skill.name) {
              <span [class]="skill.primary
                ? 'px-2.5 py-1 bg-brand-accent/10 text-brand-accent text-xs font-mono rounded-lg border border-brand-accent/30 font-semibold'
                : 'px-2.5 py-1 bg-slate-900 text-slate-300 text-xs font-mono rounded-lg border border-slate-800'">
                {{ skill.name }}@if (skill.primary) {<span class="ml-1 text-[9px] opacity-50">★</span>}
              </span>
            }
          </div>
        }

        <p class="text-[10px] font-mono text-slate-600">{{ t().starLegend }}</p>

        <div class="space-y-1 font-mono text-xs text-slate-400 pt-2 border-t border-slate-800/60">
          <p>{{ t().languagesLabel }}</p>
          <p class="text-slate-300">{{ t().languagesValue }}</p>
        </div>
      </div>

    </section>
  `
})
export class EducationComponent {
  private langService = inject(LangService);
  t = computed(() => EDUCATION_TEXT[this.langService.lang()]);
  searchQuery = signal('');

  allSkills: Skill[] = [
    // Frontend
    { name: 'Angular (v5–20)', primary: true },
    { name: 'TypeScript', primary: true },
    { name: 'JavaScript' },
    { name: 'NGPrime' },
    { name: 'Angular Material' },
    { name: 'Tailwind CSS' },
    { name: 'Bootstrap / SCSS' },
    { name: 'HTML / CSS' },
    { name: 'Ionic (v3–5)' },
    { name: 'WebSockets / SSE' },
    // Backend
    { name: 'Java (8–21)', primary: true },
    { name: 'Spring Boot', primary: true },
    { name: 'Microservicios' },
    { name: 'Microfrontends' },
    { name: 'API REST', primary: true },
    { name: 'OpenAPI' },
    { name: 'Python' },
    { name: 'Django REST' },
    { name: 'Node.js / Express' },
    // Bases de datos
    { name: 'MySQL', primary: true },
    { name: 'PostgreSQL', primary: true },
    { name: 'MongoDB' },
    { name: 'InfluxDB' },
    { name: 'SQL Server' },
    // DevOps & Herramientas
    { name: 'Docker', primary: true },
    { name: 'Rancher' },
    { name: 'Jenkins' },
    { name: 'GitLab CI/CD' },
    { name: 'Nexus' },
    { name: 'GitHub' },
    { name: 'Jira' },
    { name: 'Confluence' },
    // Testing
    { name: 'JUnit / Mockito' },
    { name: 'Selenium' },
    // IoT & Protocolos
    { name: 'MQTT' },
    { name: 'Modbus/TCP' },
    { name: 'OPC UA' },
    { name: 'Zigbee' },
    { name: 'BLE / Bluetooth' },
    { name: 'PLC Integration' },
    // ERP & Sistemas
    { name: 'Openbravo ERP' },
    { name: 'Odoo' },
  ];

  filteredSkills = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.allSkills;
    return this.allSkills.filter(s => s.name.toLowerCase().includes(q));
  });
}
