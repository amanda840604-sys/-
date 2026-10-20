import { WeekType } from '../types/routine';

/**
 * Calculates the ISO week number for a given date
 */
export function getISOWeekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

/**
 * Determines whether the given date is in an Odd week or Even week
 */
export function getWeekType(d: Date): WeekType {
  const weekNum = getISOWeekNumber(d);
  return weekNum % 2 === 1 ? 'odd' : 'even';
}

/**
 * Formats a date into a friendly traditional Chinese string
 */
export function formatChineseDate(d: Date): string {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const dayName = days[d.getDay()];
  return `${year} 年 ${month} 月 ${date} 日 ${dayName}`;
}

/**
 * Generates key for localStorage daily checklist: "YYYY-MM-DD"
 */
export function getDateKey(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const date = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${date}`;
}
