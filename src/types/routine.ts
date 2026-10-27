export type WeekType = 'odd' | 'even';

export type Category = 
  | 'prescription'
  | 'supplement'
  | 'cleansing'
  | 'toner'
  | 'serum'
  | 'cream'
  | 'eye'
  | 'sunscreen'
  | 'mask'
  | 'device'
  | 'spot'
  | 'body_lotion';

export interface BodyLotionItem {
  id: string;
  code: string; // e.g. "B-01"
  brand: string;
  name: string;
  textureAndIngredients: string;
  positioningAndUsage: string;
  role: string;
  cautions?: string;
}

export interface PrescriptionItem {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  timeSlot: 'breakfast' | 'bedtime';
  category: '抗甲狀腺製劑' | '抗痙攣/情緒穩定劑' | '水溶性抗痙攣劑' | '精神治療藥(鎮靜安眠)';
  efficacy: string; // 藥物功效與適應症
  instructions: string;
  safetyNotes: string;
}

export interface SupplementItem {
  id: string;
  number: string;
  name: string;
  brand: string;
  specification: string;
  recommendedDose: string;
  timing: string;
  timeSlot: 'breakfast' | 'post_breakfast_1hr' | 'lunch_or_dinner';
  isLipophilic: boolean;
  benefits: string[];
  safetyNotes: string;
  whyThisTime: string;
}

export interface SkincareProduct {
  id: string;
  number: string;
  brand: string;
  name: string;
  category: string;
  categoryType: Category;
  role: string;
  applicableWeeks: 'both' | 'odd' | 'even';
  applicableDays?: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
  usageTiming?: string; // 使用時機 (e.g. 早晨美白 / 夜間A醇封層 / 每週修護)
  targetZone: 'all' | 'cheeks' | 'chin' | 't-zone' | 'eyes' | 'custom';
  usageInstructions: string;
  cautions?: string;
  isHighActive?: boolean; // BHA, Retinol, Reedle shot
}

export interface DayRoutine {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ...
  dayName: string;
  themeTitle: string;
  themeIcon: string;
  oddWeekDetails: {
    cleansing: string;
    steps: {
      step: number;
      label: string;
      productNumbers: string[];
      details: string;
      zone?: '全臉' | '兩頰' | '下巴' | '眼周';
    }[];
    notes: string;
  };
  evenWeekDetails: {
    cleansing: string;
    steps: {
      step: number;
      label: string;
      productNumbers: string[];
      details: string;
      zone?: '全臉' | '兩頰' | '下巴' | '眼周';
    }[];
    notes: string;
  };
}

export interface TimeSlotConfig {
  id: string;
  name: string;
  defaultTime: string;
  icon: string;
  description: string;
}

export interface ReminderConfig {
  enabled: boolean;
  soundEnabled: boolean;
  times: {
    breakfast: string;       // e.g. "08:00"
    bComplexOffset: number;  // 60 minutes after breakfast
    lunch: string;           // e.g. "12:30"
    nightSkincare: string;   // e.g. "21:00"
    bedtime: string;         // e.g. "23:00"
  };
}

export interface DailyLogState {
  dateKey: string; // "YYYY-MM-DD"
  completedItemIds: string[];
  waterIntakeMl: number;
  notes: string;
}
