import { Pipe, PipeTransform } from '@angular/core';

export interface MarkSegment {
  text: string;
  marked: boolean;
}

/** Splits copy like 'plain [[highlighted]] plain' into segments so key phrases can be underlined. */
@Pipe({ name: 'marks' })
export class MarksPipe implements PipeTransform {
  transform(value: string): MarkSegment[] {
    return value
      .split(/\[\[(.+?)\]\]/)
      .map((text, i) => ({ text, marked: i % 2 === 1 }))
      .filter((s) => s.text);
  }
}
