// SPDX-FileCopyrightText: 2025--2026 Basingstoke Repair Network
// SPDX-License-Identifier: MIT

export interface RepairCafeSchedule {
  dayOfWeek: string;
  weekOfMonth: string;
  startTime: string;
  /** Cutoff for accepting items; the venue itself stays open until endTime. */
  lastItemsTime?: string;
  endTime: string;
}

export interface NextOccurrence {
  /** True when the computed occurrence falls on today's date. */
  isToday: boolean;
  date: Date;
  endTime: Date;
}

const DAY_NAMES = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

const WEEK_OF_MONTH_ORDINALS: Record<string, number> = {
  '1st': 1,
  '2nd': 2,
  '3rd': 3,
  '4th': 4,
  '5th': 5,
};

function nthWeekdayOfMonth(
  year: number,
  month: number,
  weekday: number,
  weekOfMonth: string,
): Date {
  if (weekOfMonth.toLowerCase() === 'last') {
    const lastOfMonth = new Date(year, month + 1, 0);
    const offset = (lastOfMonth.getDay() - weekday + 7) % 7;
    return new Date(year, month, lastOfMonth.getDate() - offset);
  }

  const ordinal = WEEK_OF_MONTH_ORDINALS[weekOfMonth.toLowerCase()];
  if (!ordinal) {
    throw new Error(`Unrecognised weekOfMonth value: "${weekOfMonth}"`);
  }

  const firstOfMonth = new Date(year, month, 1);
  const offset = (weekday - firstOfMonth.getDay() + 7) % 7;
  return new Date(year, month, 1 + offset + (ordinal - 1) * 7);
}

function withTime(date: Date, time: string): Date {
  const [hours, minutes] = time.split(':').map(Number);
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
}

/**
 * Walks forward month by month from `now` until it finds the next occurrence
 * of the recurring schedule (e.g. "3rd Saturday") that hasn't finished yet.
 */
export function getNextOccurrence(
  schedule: RepairCafeSchedule,
  now: Date = new Date(),
): NextOccurrence {
  const weekday = DAY_NAMES.indexOf(schedule.dayOfWeek.toLowerCase());
  if (weekday === -1) {
    throw new Error(`Unrecognised dayOfWeek value: "${schedule.dayOfWeek}"`);
  }

  let year = now.getFullYear();
  let month = now.getMonth();

  for (let i = 0; i < 12; i++) {
    const date = nthWeekdayOfMonth(year, month, weekday, schedule.weekOfMonth);
    const endTime = withTime(date, schedule.endTime);

    if (endTime >= now) {
      return { isToday: date.toDateString() === now.toDateString(), date, endTime };
    }

    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
  }

  throw new Error('Could not determine next occurrence within the next 12 months');
}

export function formatEventTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'pm' : 'am';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return minutes === 0
    ? `${hour12}${period}`
    : `${hour12}:${minutes.toString().padStart(2, '0')}${period}`;
}

const DATE_FORMATTER = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

/**
 * Renders the label shown to visitors: the next date, or today's end time.
 *
 * The "last items" cutoff is not part of this label — it's the same time
 * every occurrence, so it's rendered statically alongside this component
 * rather than waiting on the client-side date calculation (see
 * Locations.astro).
 */
export function formatNextDateLabel(occurrence: NextOccurrence): string {
  if (occurrence.isToday) {
    return `Today, until ${formatEventTime(occurrence.endTime)}`;
  }
  return DATE_FORMATTER.format(occurrence.date);
}
