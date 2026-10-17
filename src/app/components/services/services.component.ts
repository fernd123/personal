import { Component, computed, inject, signal } from '@angular/core';
import { LangService } from '../../services/lang.service';
import { RevealDirective } from '../../shared/reveal.directive';
import { TechCategory } from '../../shared/tech-category.pipe';

interface StackGroup {
  title: string;
  /** Colour category shared with the project chips. */
  cat: TechCategory;
  items: string[];
}

interface StackLang {
  title: string;
  intro: string;
  searchLabel: string;
  searchPlaceholder: string;
  result: string;
  results: string;
  noResults: string;
  clear: string;
  groups: StackGroup[];
}

const STACK_TEXT: Record<'es' | 'en', StackLang> = {
  es: {
    title: 'Stack',
    intro: 'Tecnologías y arquitecturas con las que trabajo, agrupadas por área.',
    searchLabel: 'Buscar tecnología',
    searchPlaceholder: 'p. ej. Angular, Docker…',
    result: 'resultado',
    results: 'resultados',
    noResults: 'No aparece ninguna tecnología con',
    clear: 'Limpiar búsqueda',
    groups: [
      {
        title: 'Backend',
        cat: 'backend',
        items: ['Java 1.8 → 21', 'Spring Boot', 'Quarkus', 'APIs REST · OpenAPI', 'Node.js · Express', 'Python · Django REST'],
      },
      {
        title: 'Frontend',
        cat: 'frontend',
        items: [
          'Angular 8 → 22',
          'TypeScript · JavaScript',
          'jQuery',
          'HTML · CSS · SCSS',
          'Tailwind · Bootstrap',
          'NGPrime · Angular Material',
          'WebSockets · SSE',
          'Ionic',
          'Smartclient',
        ],
      },
      {
        title: 'Arquitectura',
        cat: 'arch',
        items: [
          'Arquitectura hexagonal',
          'MVC',
          'Microservicios',
          'Microfrontends',
          'Monolito modular',
          'API-first · contrato OpenAPI',
          'Multitenant',
        ],
      },
      {
        title: 'Bases de datos',
        cat: 'data',
        items: ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB', 'InfluxDB'],
      },
      {
        title: 'Gestión, entrega y calidad',
        cat: 'infra',
        items: [
          'Jira · Confluence',
          'Scrum · Kanban',
          'Git · GitHub · GitLab',
          'Jenkins · GitLab CI/CD · Nexus',
          'Docker · Rancher',
          'JUnit · Mockito · Selenium',
        ],
      },
    ],
  },
  en: {
    title: 'Stack',
    intro: 'Technologies and architectures I work with, grouped by area.',
    searchLabel: 'Search technologies',
    searchPlaceholder: 'e.g. Angular, Docker…',
    result: 'result',
    results: 'results',
    noResults: 'No technology matches',
    clear: 'Clear search',
    groups: [
      {
        title: 'Backend',
        cat: 'backend',
        items: ['Java 1.8 → 21', 'Spring Boot', 'Quarkus', 'REST APIs · OpenAPI', 'Node.js · Express', 'Python · Django REST'],
      },
      {
        title: 'Frontend',
        cat: 'frontend',
        items: [
          'Angular 8 → 22',
          'TypeScript · JavaScript',
          'jQuery',
          'HTML · CSS · SCSS',
          'Tailwind · Bootstrap',
          'NGPrime · Angular Material',
          'WebSockets · SSE',
          'Ionic',
          'Smartclient',
        ],
      },
      {
        title: 'Architecture',
        cat: 'arch',
        items: [
          'Hexagonal architecture',
          'MVC',
          'Microservices',
          'Microfrontends',
          'Modular monolith',
          'API-first · OpenAPI contract',
          'Multitenant',
        ],
      },
      {
        title: 'Databases',
        cat: 'data',
        items: ['PostgreSQL', 'MySQL', 'SQL Server', 'MongoDB', 'InfluxDB'],
      },
      {
        title: 'Management, delivery & quality',
        cat: 'infra',
        items: [
          'Jira · Confluence',
          'Scrum · Kanban',
          'Git · GitHub · GitLab',
          'Jenkins · GitLab CI/CD · Nexus',
          'Docker · Rancher',
          'JUnit · Mockito · Selenium',
        ],
      },
    ],
  },
};

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="stack" class="border-t border-rule py-20 md:py-28" aria-labelledby="stack-title">
      <div class="wrap grid gap-y-10 md:grid-cols-12 md:gap-x-8">
        <header class="md:col-span-3 md:sticky md:top-24 md:self-start">
          <p class="meta text-accent">04</p>
          <h2 id="stack-title" class="mt-2 font-display text-4xl font-semibold text-ink">{{ t().title }}</h2>
          <p class="mt-4 text-[0.95rem] leading-relaxed max-w-[36ch]">{{ t().intro }}</p>

          <div class="mt-8 max-w-[18rem]">
            <label for="stack-search" class="meta uppercase tracking-[0.12em]">{{ t().searchLabel }}</label>
            <div class="mt-2 flex items-center border-b border-ink focus-within:border-accent">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-mute shrink-0" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
              <input
                id="stack-search"
                type="search"
                autocomplete="off"
                spellcheck="false"
                [placeholder]="t().searchPlaceholder"
                [value]="query()"
                (input)="query.set($any($event.target).value)"
                (keydown.escape)="query.set('')"
                class="stack-search w-full bg-transparent px-2 py-2 font-mono text-sm text-ink placeholder:text-mute focus:outline-none focus-visible:outline-none"
                aria-controls="stack-results"
              />
              @if (query()) {
                <button
                  type="button"
                  class="shrink-0 px-1 font-mono text-xs text-mute hover:text-accent"
                  (click)="query.set('')"
                  [attr.aria-label]="t().clear"
                >
                  ✕
                </button>
              }
            </div>
            <p class="meta mt-2" aria-live="polite">
              @if (query().trim()) {
                {{ matchCount() }} {{ matchCount() === 1 ? t().result : t().results }}
              }
            </p>
          </div>
        </header>

        <div id="stack-results" class="md:col-span-9 md:min-h-[28rem]">
          @if (visibleGroups().length) {
            <div class="grid gap-x-10 gap-y-14 sm:grid-cols-2">
              @for (g of visibleGroups(); track g.title) {
                <div appReveal>
                  <h3 class="flex items-center gap-2.5 font-display text-xl font-semibold text-ink pb-3 border-b border-ink" [attr.data-cat]="g.cat">
                    <span class="swatch" aria-hidden="true"></span>{{ g.title }}
                  </h3>
                  <ul>
                    @for (item of g.items; track item) {
                      <li class="py-2.5 border-b border-rule text-ink">
                        @if (query().trim()) {
                          <mark class="mark">{{ item }}</mark>
                        } @else {
                          {{ item }}
                        }
                      </li>
                    }
                  </ul>
                </div>
              }
            </div>
          } @else {
            <p class="border-t border-ink pt-6 text-lg text-ink max-w-[46ch]">
              {{ t().noResults }} <span class="font-mono">“{{ query().trim() }}”</span>.
              <button type="button" class="link ml-1" (click)="query.set('')">{{ t().clear }}</button>
            </p>
          }
        </div>
      </div>
    </section>
  `,
})
export class ServicesComponent {
  private langService = inject(LangService);
  t = computed(() => STACK_TEXT[this.langService.lang()]);
  query = signal('');

  /** Groups filtered by the search box; matching ignores case and accents. */
  visibleGroups = computed(() => {
    const q = normalize(this.query());
    if (!q) return this.t().groups;
    return this.t()
      .groups.map((g) => ({ ...g, items: g.items.filter((item) => normalize(item).includes(q)) }))
      .filter((g) => g.items.length);
  });

  matchCount = computed(() => this.visibleGroups().reduce((n, g) => n + g.items.length, 0));
}

function normalize(text: string): string {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();
}
