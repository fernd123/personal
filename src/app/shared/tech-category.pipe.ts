import { Pipe, PipeTransform } from '@angular/core';

export type TechCategory = 'frontend' | 'mobile' | 'backend' | 'arch' | 'data' | 'infra';

/** Ordered: the first matching rule wins (e.g. "Microfrontends" is architecture, not frontend). */
const RULES: [TechCategory, RegExp][] = [
  ['arch', /microserv|microfront|hexagonal|mvc|monolit|api-first|multitenant/i],
  ['mobile', /ionic|iot|ble/i],
  ['data', /postgres|mysql|mongo|sql server|influx/i],
  ['infra', /docker|rancher|jenkins|nexus|gitlab|kubernetes|ci\/cd/i],
  ['frontend', /angular|signals|ngprime|scss|tailwind|typescript|javascript|jquery|html|css/i],
  ['backend', /java|spring|quarkus|node|python|django|openapi|rest|websocket/i],
];

/** Maps a technology name to the colour category used by `.chip[data-cat]`. */
@Pipe({ name: 'techCategory' })
export class TechCategoryPipe implements PipeTransform {
  transform(tech: string): TechCategory {
    return RULES.find(([, re]) => re.test(tech))?.[0] ?? 'infra';
  }
}
