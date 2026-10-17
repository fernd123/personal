import { Injectable, effect, signal } from '@angular/core';

export type Lang = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class LangService {
  lang = signal<Lang>('es');

  constructor() {
    effect(() => (document.documentElement.lang = this.lang()));
  }

  toggle(): void {
    this.lang.set(this.lang() === 'es' ? 'en' : 'es');
  }
}
