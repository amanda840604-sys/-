import { ReminderConfig } from '../types/routine';

/**
 * Generates an iCalendar (.ics) string for recurring daily intake & skincare events
 */
export function generateIcsCalendar(reminderConfig: ReminderConfig): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');

  const dtstamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}T${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}Z`;

  const startDateStr = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;

  const parseTime = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return `${pad(h)}${pad(m)}00`;
  };

  const breakfastTime = parseTime(reminderConfig.times.breakfast);
  
  // Calculate B-complex time (e.g. +60 mins after breakfast)
  const [bH, bM] = reminderConfig.times.breakfast.split(':').map(Number);
  const totalBMinutes = bH * 60 + bM + reminderConfig.times.bComplexOffset;
  const bComplexHour = Math.floor(totalBMinutes / 60) % 24;
  const bComplexMinute = totalBMinutes % 60;
  const bComplexTime = `${pad(bComplexHour)}${pad(bComplexMinute)}00`;

  const lunchTime = parseTime(reminderConfig.times.lunch);
  const nightTime = parseTime(reminderConfig.times.nightSkincare);
  const bedtimeTime = parseTime(reminderConfig.times.bedtime);

  const events = [
    {
      uid: `glowsync-breakfast-${Date.now()}@glowsync.app`,
      summary: '☀️ 早餐用藥 & BHK\'s 奢光錠 (GlowSync)',
      description: '【處方藥】汎生普樂彼錠 50mg (PTU 3顆) + 信東癲鍵錠 50mg (1顆)\\n【保健品】BHK\'s 奢光錠 (1-2錠隨餐)\\n【注意】與 Thorne B 群間隔 1 小時！',
      startTime: breakfastTime,
      durationMinutes: 15,
      alarmMinutes: 0
    },
    {
      uid: `glowsync-bcomplex-${Date.now()}@glowsync.app`,
      summary: '⚡ Thorne B 群活力補充 (早餐後 1 小時)',
      description: '【保健品】Thorne 基本維生素 B 複合物 1 粒\\n【黃金法則】已與早晨處方藥物間隔 1 小時，避免代謝競爭。尿液變黃屬正常現象，多補充水分！',
      startTime: bComplexTime,
      durationMinutes: 10,
      alarmMinutes: 0
    },
    {
      uid: `glowsync-lunch-${Date.now()}@glowsync.app`,
      summary: '🥗 午間隨餐營養：D3 + 魚油 + 蔓越莓',
      description: '【保健品】Kirkland 維生素 D3 (2錠/700IU，脂溶性隨餐) + Sports Research 魚油 (1粒抗發炎) + Webber Naturals 蔓越莓 (1-2粒抗氧化)\\n【注意】隨餐油脂幫助吸收，下午請維持充足水分！',
      startTime: lunchTime,
      durationMinutes: 20,
      alarmMinutes: 0
    },
    {
      uid: `glowsync-night-${Date.now()}@glowsync.app`,
      summary: '🌙 晚間分區護膚 & 主題保養 (GlowSync)',
      description: '【分區鐵則】兩頰滋潤封層、下巴薄擦 MUJI 米糠乳液！\\n【今日夜間主題】請開啟 GlowSync 查看奇偶週對應主題（水楊酸夜/A醇夜/深層導出/面膜夜）！',
      startTime: nightTime,
      durationMinutes: 30,
      alarmMinutes: 10
    },
    {
      uid: `glowsync-bedtime-${Date.now()}@glowsync.app`,
      summary: '💤 睡前處方安定用藥 (GlowSync)',
      description: '【處方藥】瑞安癲必停 0.5 顆 + 易靜錠 1 顆\\n【核心提醒】睡前不再服用任何保健品！安心入眠放鬆神經。',
      startTime: bedtimeTime,
      durationMinutes: 15,
      alarmMinutes: 0
    }
  ];

  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GlowSync//Routine & Supplement Guide//ZH',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:GlowSync 日常保養品與保健品提醒',
    'X-WR-TIMEZONE:Asia/Taipei'
  ];

  for (const ev of events) {
    icsContent.push(
      'BEGIN:VEVENT',
      `UID:${ev.uid}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART:${startDateStr}T${ev.startTime}`,
      `RRULE:FREQ=DAILY`,
      `SUMMARY:${ev.summary}`,
      `DESCRIPTION:${ev.description}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT' + ev.alarmMinutes + 'M',
      'ACTION:DISPLAY',
      `DESCRIPTION:${ev.summary}`,
      'END:VALARM',
      'END:VEVENT'
    );
  }

  icsContent.push('END:VCALENDAR');
  return icsContent.join('\r\n');
}

/**
 * Triggers a browser download for the .ics file
 */
export function downloadIcsFile(reminderConfig: ReminderConfig) {
  const icsData = generateIcsCalendar(reminderConfig);
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', 'Amanda_GlowSync_Routine.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
