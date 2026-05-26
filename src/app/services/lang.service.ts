import { Injectable, signal } from '@angular/core';

export type Lang = 'es' | 'en';

@Injectable({ providedIn: 'root' })
export class LangService {
  lang = signal<Lang>('es');

  toggle(): void {
    this.lang.set(this.lang() === 'es' ? 'en' : 'es');
  }
}
