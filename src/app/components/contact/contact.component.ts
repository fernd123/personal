import { Component, signal, computed } from '@angular/core';

interface PricingOption {
  key: string;
  label: string;
  description: string;
  value: number;
  days: number;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  template: `
    <section id="contacto-seccion" class="bg-gradient-to-br from-slate-950 to-brand-card rounded-2xl border border-slate-800 p-8 shadow-xl">
      <div class="max-w-3xl mx-auto space-y-8">
        <div class="text-center space-y-2">
          <span class="px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-mono rounded-full border border-brand-accent/20">HERRAMIENTA INTEGRADA</span>
          <h2 class="text-3xl font-bold tracking-tight text-white mt-1">Configura un Proyecto / Servicio</h2>
          <p class="text-slate-400 text-sm">Selecciona las soluciones que tu empresa o departamento requiere para calcular un esfuerzo técnico orientativo.</p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 items-center">
          <!-- Checkboxes -->
          <div class="space-y-3">
            @for (option of options; track option.key) {
              <label class="flex items-center gap-3 p-3.5 bg-brand-bg/60 rounded-xl border border-slate-800 hover:border-slate-700 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  [checked]="selected().has(option.key)"
                  (change)="toggle(option)"
                  class="w-4 h-4 rounded text-brand-accent focus:ring-brand-accent">
                <div class="text-xs">
                  <span class="block font-medium text-white">{{ option.label }}</span>
                  <span class="text-[11px] text-slate-400">{{ option.description }}</span>
                </div>
              </label>
            }
          </div>

          <!-- Resumen y contacto -->
          <div class="bg-brand-bg/90 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between h-full space-y-6">
            <div>
              <span class="font-mono text-xs text-brand-secondary uppercase tracking-wider font-bold">// ESTIMACIÓN DE ESFUERZO</span>
              <div class="mt-4 flex items-baseline gap-2">
                <span class="text-4xl font-extrabold tracking-tight text-white">{{ total() }}€</span>
                <span class="text-sm text-slate-400">~{{ totalDays() }} días laborables</span>
              </div>
              <p class="text-[11px] text-slate-500 mt-2.5 leading-normal">
                * Nota: Sirve como referencia base inicial. Para proyectos complejos o arquitecturas empresariales se realiza un análisis de requisitos formal.
              </p>
            </div>
            <div class="space-y-2">
              <a [href]="emailHref()"
                class="w-full py-3 bg-brand-accent hover:bg-brand-accent/90 text-white rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors">
                <i class="fa-solid fa-paper-plane"></i> ENVIAR_ESTUDIO_PROYECTO
              </a>
              <a href="/assets/cv-fernando-rodriguez-es.pdf" download
                class="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors">
                <i class="fa-solid fa-file-pdf"></i> DESCARGAR_PORTFOLIO_CV.pdf
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent {
  options: PricingOption[] = [
    { key: 'api', label: 'Arquitectura API / Microservicios (Spring Boot)', description: 'Modelado backend, seguridad JWT y persistencia SQL.', value: 700, days: 5 },
    { key: 'frontend', label: 'Frontend Dashboard o SPA (Angular)', description: 'Interfaz interactiva, modular y conectada con API REST.', value: 600, days: 5 },
    { key: 'iot', label: 'Integración Planta / Protocolos IoT', description: 'Adquisición Modbus, OPC UA o MQTT en contenedores Docker.', value: 800, days: 7 },
    { key: 'mobile', label: 'Aplicación Móvil Multiplataforma (Ionic)', description: 'Desarrollo híbrido optimizado para terminales móviles de planta o almacén.', value: 500, days: 4 }
  ];

  selected = signal<Set<string>>(new Set(['api']));

  total = computed(() => {
    const sel = this.selected();
    return this.options.filter(o => sel.has(o.key)).reduce((sum, o) => sum + o.value, 0);
  });

  totalDays = computed(() => {
    const sel = this.selected();
    return this.options.filter(o => sel.has(o.key)).reduce((sum, o) => sum + o.days, 0);
  });

  emailHref = computed(() => {
    const sel = this.selected();
    const items = this.options.filter(o => sel.has(o.key)).map(o => o.label).join(', ');
    const subject = encodeURIComponent('Propuesta de Proyecto Freelance');
    const body = encodeURIComponent(`Hola Fernando,\n\nMe interesa hablar sobre: ${items || 'varios servicios'}.\n\nPresupuesto estimado: ${this.total()}€ (~${this.totalDays()} días).\n\nQuedo a tu disposición.`);
    return `mailto:frodriguezsidro@gmail.com?subject=${subject}&body=${body}`;
  });

  toggle(option: PricingOption): void {
    const current = new Set(this.selected());
    if (current.has(option.key)) current.delete(option.key);
    else current.add(option.key);
    this.selected.set(current);
  }

  printPage(): void {
    window.print();
  }
}
