// Utilidades de formato puras (sin DOM ni dependencias de Astro).

/** Formatea una fecha completa, p. ej. "18 de octubre de 2026". */
export function formatDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** Convierte "AAAA-MM" en una fecha UTC al día 1 de ese mes. */
export function parseMonth(value: string): Date {
  const [year, month] = value.split('-').map(Number);
  return new Date(Date.UTC(year ?? 1970, (month ?? 1) - 1, 1));
}

/** Formatea "AAAA-MM" como mes abreviado y año, p. ej. "abr 2025". */
export function formatMonth(value: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
    .format(parseMonth(value))
    .replace('.', '');
}

/** Meses entre dos "AAAA-MM", ambos incluidos. Sin fin, cuenta hasta `now`. */
export function monthsBetween(start: string, end?: string, now = new Date()): number {
  const from = parseMonth(start);
  const to = end ? parseMonth(end) : new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const months =
    (to.getUTCFullYear() - from.getUTCFullYear()) * 12 + (to.getUTCMonth() - from.getUTCMonth()) + 1;
  return Math.max(1, months);
}

/** Duración legible, p. ej. "1 año y 3 meses" / "1 yr 3 mos". */
export function formatDuration(months: number, locale: string): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const spanish = locale.startsWith('es');
  const parts: string[] = [];
  if (years > 0) {
    parts.push(spanish ? `${years} ${years === 1 ? 'año' : 'años'}` : `${years} ${years === 1 ? 'yr' : 'yrs'}`);
  }
  if (rest > 0) {
    parts.push(spanish ? `${rest} ${rest === 1 ? 'mes' : 'meses'}` : `${rest} ${rest === 1 ? 'mo' : 'mos'}`);
  }
  return parts.join(spanish ? ' y ' : ' ');
}
