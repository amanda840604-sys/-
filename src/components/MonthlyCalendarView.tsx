import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  Info,
  Clock,
  Eye,
  ArrowRight,
  Filter,
  Zap,
  Flame,
  Droplets,
  AlertCircle,
  Timer
} from 'lucide-react';
import { WeekType, SkincareProduct } from '../types/routine';
import { SKINCARE_PRODUCTS, WEEKLY_NIGHT_ROUTINES, PRESCRIPTION_MEDS, ORAL_SUPPLEMENTS } from '../data/routineData';
import { formatChineseDate, getISOWeekNumber } from '../utils/dateUtils';

export interface DeviceUsageGuide {
  mode: '深層導出' | '保濕導入';
  name: string;
  pairingProduct: string;
  duration: string;
  instructions: string;
  tips: string;
}

export interface CalendarDayData {
  dayNumber: number; // 1 to 28
  dayOfWeek: number; // 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat, 0=Sun
  weekNumber: 1 | 2 | 3 | 4;
  weekType: WeekType;
  typeCode: 'A' | 'B' | 'C' | 'D' | 'E';
  typeName: string;
  typeColor: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
  };
  title: string;
  summary: string;
  productNumbers: string[];
  isMakeupDay?: boolean;
  deviceUsage?: DeviceUsageGuide;
}

interface MonthlyCalendarViewProps {
  onSelectDayRoutine: (dayOfWeek: number, weekType: WeekType) => void;
  onSelectProduct: (product: SkincareProduct) => void;
  completedDayNumbers: number[];
  onToggleDayCompleted: (dayNumber: number) => void;
  currentDate?: Date;
  currentWeekType?: WeekType;
  onOpenTimerWithMode?: (mode: 'bha' | 'mask' | 'bcomplex') => void;
}

export const MonthlyCalendarView: React.FC<MonthlyCalendarViewProps> = ({
  onSelectDayRoutine,
  onSelectProduct,
  completedDayNumbers,
  onToggleDayCompleted,
  currentDate = new Date(),
  currentWeekType = 'odd',
  onOpenTimerWithMode
}) => {
  const [selectedDayDetail, setSelectedDayDetail] = useState<CalendarDayData | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const getProduct = (num: string) => SKINCARE_PRODUCTS.find(p => p.number === num);

  // Calculate which day in the 4-week cycle corresponds to "Today"
  // Day of week: 1=Mon ... 6=Sat, 0=Sun
  const todayDayOfWeek = currentDate.getDay();
  // Map dayOfWeek (1=Mon ... 0=Sun) into 1-indexed (Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6, Sun=7)
  const dayOffset = todayDayOfWeek === 0 ? 7 : todayDayOfWeek;
  const todayCycleDayNumber = currentWeekType === 'odd' ? dayOffset : 7 + dayOffset;

  // Generate the 28 days of the 4-week cycle
  const generate4WeekCycle = (): CalendarDayData[] => {
    const days: CalendarDayData[] = [];
    
    for (let w = 1; w <= 4; w++) {
      const weekType: WeekType = (w % 2 === 1) ? 'odd' : 'even';
      
      // Mon (dayOfWeek 1)
      days.push({
        dayNumber: (w - 1) * 7 + 1,
        dayOfWeek: 1,
        weekNumber: w as 1 | 2 | 3 | 4,
        weekType,
        typeCode: 'A',
        typeName: '類型 A：一般修護夜',
        typeColor: {
          bg: 'bg-emerald-50/40',
          border: 'border-emerald-200',
          text: 'text-emerald-900',
          badgeBg: 'bg-emerald-100',
          badgeText: 'text-emerald-800'
        },
        title: '日常溫和修護',
        summary: weekType === 'odd'
          ? '日間防曬，夜間溫和卸洗 ＋ 靈芝水 ＋ BOH噴霧 ＋ 兩頰S.NATURE／下巴米糠乳'
          : '偶數週修護：MUJI化妝水 ＋ Ongredients噴霧 ＋ 契爾氏冰河霜(兩頰)',
        productNumbers: weekType === 'odd' ? ['03', '04', '11', '07', '09', '21', '18'] : ['03', '04', '11', '08', '10', '23', '18']
      });

      // Tue (dayOfWeek 2)
      days.push({
        dayNumber: (w - 1) * 7 + 2,
        dayOfWeek: 2,
        weekNumber: w as 1 | 2 | 3 | 4,
        weekType,
        typeCode: 'B',
        typeName: '類型 B：15 寶拉水楊酸夜 (固定週二)',
        typeColor: {
          bg: 'bg-amber-50/50',
          border: 'border-amber-300',
          text: 'text-amber-950',
          badgeBg: 'bg-amber-100',
          badgeText: 'text-amber-900'
        },
        title: '15 寶拉 2% 水楊酸煥膚',
        summary: '下巴與鼻翼點塗 15 寶拉水楊酸（靜置3-5分鐘），兩頰嚴禁碰酸！MUJI化妝水打底',
        productNumbers: ['01', '04', '15', '11', '08', '25', weekType === 'odd' ? '21' : '23', '18']
      });

      // Wed (dayOfWeek 3) -> ⚡ 美容儀深層導出
      days.push({
        dayNumber: (w - 1) * 7 + 3,
        dayOfWeek: 3,
        weekNumber: w as 1 | 2 | 3 | 4,
        weekType,
        typeCode: 'A',
        typeName: weekType === 'odd' ? '類型 A：深層導出夜' : '類型 A：導出＋面膜加強',
        typeColor: {
          bg: 'bg-teal-50/40',
          border: 'border-teal-300',
          text: 'text-teal-950',
          badgeBg: 'bg-teal-100',
          badgeText: 'text-teal-900'
        },
        title: weekType === 'odd' ? '⚡ 離子深層導出 ＋ ANUA提亮' : '⚡ 離子導出 ＋ 33保濕面膜深層注水',
        summary: weekType === 'odd'
          ? '02 舒特膚潔膚水 ＋ 32 CHECK2CHECK 離子深層導出毛孔殘妝 ➔ ANUA桃子精華提亮'
          : '32 離子淨膚儀深層導出殘妝 ＋ 敷一片 33 一般保濕面膜（10-15分）＋ 契爾氏冰河霜封層',
        productNumbers: weekType === 'odd' ? ['02', '32', '04', '11', '09', '13', '21', '18'] : ['02', '32', '04', '11', '33', '10', '23', '18'],
        deviceUsage: {
          mode: '深層導出',
          name: '#32 CHECK2CHECK 離子淨膚儀（深層導出模式）',
          pairingProduct: '#02 Cetaphil 舒特膚 胜肽緊緻賦活潔膚水',
          duration: '3 ～ 5 分鐘',
          instructions: '將化妝棉充分浸濕 #02 舒特膚潔膚水後固定於淨膚儀金屬探頭上，開啟「深層導出模式」。由臉部中央向外、由下往上順著肌膚紋理輕柔滑動。在下巴反覆粉刺區與鼻翼兩側特別加強畫圓打圈，利用離子電荷吸附導出深層殘妝與毛孔髒污。',
          tips: '導出時輕輕貼合肌膚滑動即可，千萬不要大力拉扯！導出完畢後接著使用 #04 綠茶洗面乳洗淨全臉。'
        }
      });

      // Thu (dayOfWeek 4)
      days.push({
        dayNumber: (w - 1) * 7 + 4,
        dayOfWeek: 4,
        weekNumber: w as 1 | 2 | 3 | 4,
        weekType,
        typeCode: 'C',
        typeName: '類型 C：17 A醇微晶夜 (固定週四)',
        typeColor: {
          bg: 'bg-indigo-50/50',
          border: 'border-indigo-300',
          text: 'text-indigo-950',
          badgeBg: 'bg-indigo-100',
          badgeText: 'text-indigo-900'
        },
        title: '17 Celimax A 醇微晶抗老',
        summary: '改善眼下細紋與角質；塗 A 醇前先以 25 雅詩蘭黛眼霜隔離眼周！豌豆大小避開眼周',
        productNumbers: ['01', '04', '11', '08', '25', '17', weekType === 'odd' ? '21' : '23', '18']
      });

      // Fri (dayOfWeek 5)
      days.push({
        dayNumber: (w - 1) * 7 + 5,
        dayOfWeek: 5,
        weekNumber: w as 1 | 2 | 3 | 4,
        weekType,
        typeCode: 'A',
        typeName: weekType === 'odd' ? '類型 A：日常修護夜' : '類型 A：下巴控油修護',
        typeColor: {
          bg: 'bg-emerald-50/40',
          border: 'border-emerald-200',
          text: 'text-emerald-900',
          badgeBg: 'bg-emerald-100',
          badgeText: 'text-emerald-800'
        },
        title: weekType === 'odd' ? '舒緩修復 A 醇後角質' : '偶數週：下巴局部點塗 TO 鋅',
        summary: weekType === 'odd'
          ? '週末前夕舒緩放鬆，以靈芝水與角鯊烷霜強化保濕屏障，下巴維持米糠乳'
          : '下巴易出油粉刺區微量點塗 14 The Ordinary 菸鹼醯胺控油（絕不塗兩頰）',
        productNumbers: weekType === 'odd' ? ['03', '04', '11', '07', '25', '21', '18'] : ['03', '04', '11', '08', '14', '25', '23', '18']
      });

      // Sat (dayOfWeek 6) -> 偶數週六 ⚡ 美容儀保濕導入
      days.push({
        dayNumber: (w - 1) * 7 + 6,
        dayOfWeek: 6,
        weekNumber: w as 1 | 2 | 3 | 4,
        weekType,
        typeCode: 'A',
        typeName: weekType === 'odd' ? '類型 A：酵素去角質' : '類型 A：⚡ 离儀胜肽導入',
        typeColor: {
          bg: weekType === 'odd' ? 'bg-emerald-50/40' : 'bg-purple-50/50',
          border: weekType === 'odd' ? 'border-emerald-200' : 'border-purple-300',
          text: 'text-stone-900',
          badgeBg: weekType === 'odd' ? 'bg-emerald-100' : 'bg-purple-100',
          badgeText: weekType === 'odd' ? 'text-emerald-800' : 'text-purple-800'
        },
        title: weekType === 'odd' ? '06 suisai 酵素洗顏粉' : '⚡ 32 CHECK2CHECK 保濕導入',
        summary: weekType === 'odd'
          ? '06 佳麗寶 suisai 酵素洗顏粉溫和代謝老廢角質與下巴粉刺，停用酸類'
          : '32 離子淨膚儀（保濕導入模式 ＋ 12 Medicube PDRN安瓶）＋ 契爾氏冰河霜強力鎖水',
        productNumbers: weekType === 'odd' ? ['01', '06', '11', '07', '21', '18'] : ['01', '04', '11', '12', '32', '23', '18'],
        isMakeupDay: true,
        ...(weekType === 'even' ? {
          deviceUsage: {
            mode: '保濕導入',
            name: '#32 CHECK2CHECK 離子淨膚儀（保濕導入模式）',
            pairingProduct: '#12 Medicube PDRN 粉紅胜肽補水安瓶',
            duration: '5 分鐘',
            instructions: '全臉按拍 #11 黛珂小紫瓶打底後，均勻滴上 3~4 滴 #12 Medicube PDRN 胜肽安瓶。開啟淨膚儀「保濕導入模式」，以金屬探頭貼合臉部皮膚，順著下巴輪廓線、兩頰向太陽穴方向緩慢向上滑動按摩，透過溫感與微震動將胜肽小分子推入肌底。',
            tips: '導入完成後肌膚水潤透亮，兩頰請立刻厚塗 #23 契爾氏冰河霜封存，下巴薄擦 #18 米糠乳。'
          }
        } : {})
      });

      // Sun (dayOfWeek 0)
      days.push({
        dayNumber: (w - 1) * 7 + 7,
        dayOfWeek: 0,
        weekNumber: w as 1 | 2 | 3 | 4,
        weekType,
        typeCode: 'D',
        typeName: weekType === 'odd' ? '類型 D：AZ100痘痘藍膜夜 (奇數週)' : '類型 D：一般保濕面膜夜 (偶數週)',
        typeColor: weekType === 'odd' 
          ? {
              bg: 'bg-amber-50/50',
              border: 'border-amber-300',
              text: 'text-amber-950',
              badgeBg: 'bg-amber-100',
              badgeText: 'text-amber-900'
            }
          : {
              bg: 'bg-teal-50/50',
              border: 'border-teal-300',
              text: 'text-teal-950',
              badgeBg: 'bg-teal-100',
              badgeText: 'text-teal-900'
            },
        title: weekType === 'odd' ? '30 Quality 1st AZ100 痘痘藍膜日' : '33 一般日常保濕面膜日',
        summary: weekType === 'odd'
          ? '敷 30 藍瓶 AZ100 壬二酸面膜（10-15分），噴 BOH 噴霧，兩頰以 22 Dr. Reju-All 修復霜強力封層（下巴薄擦 18 米糠乳）'
          : '敷 33 一般日常保濕面膜（10-15分），取下後噴 10 Ongredients 噴霧，兩頰立刻用 23 契爾氏冰河霜強力封層（下巴薄擦 18 米糠乳）',
        productNumbers: weekType === 'odd' ? ['02', '04', '11', '30', '09', '22', '18'] : ['02', '04', '11', '33', '10', '23', '18']
      });
    }

    return days;
  };

  const allCycleDays = generate4WeekCycle();
  const todayCycleData = allCycleDays.find(d => d.dayNumber === todayCycleDayNumber) || allCycleDays[1];

  const filteredDays = filterType === 'all' 
    ? allCycleDays 
    : allCycleDays.filter(d => d.typeCode === filterType);

  const weekHeaders = [
    { title: '週一 (Mon · 類型A 修護)', icon: '💧' },
    { title: '週二 (Tue · 類型B 水楊酸)', icon: '🧪' },
    { title: '週三 (Wed · ⚡ 離子導出)', icon: '🌿' },
    { title: '週四 (Thu · 類型C A醇)', icon: '🌙' },
    { title: '週五 (Fri · 類型A 修護)', icon: '💧' },
    { title: '週六 (Sat · 去角質/⚡導入)', icon: '🌟' },
    { title: '週日 (Sun · 雙週面膜交替)', icon: '✨' },
  ];

  const weekMeta = [
    {
      weekNum: 1,
      title: '第 1 週：基底穩固與淨膚啟動（奇數週 · 週末 suisai 酵素代謝 & AZ100 壬二酸面膜）',
      subtitle: '早晨使用 09 BOH 噴霧 ＋ 13 ANUA 桃子精華；週三【⚡ 32 離子淨膚儀導出＋ANUA提亮】；週四【17 A醇微晶】；週六【06 suisai 酵素洗顏粉】；週日【30 AZ100 藍瓶面膜 ＋ 22 Dr. Reju-All 修復霜】。'
    },
    {
      weekNum: 2,
      title: '第 2 週：水光激活與微針輪替（偶數週 · 週六離子導入 & 週日 VT 300 微針夜）',
      subtitle: '早晨使用 10 Ongredients 噴霧 ＋ 12 Medicube 安瓶 ＋ 20 黛珂 AQ 乳；週三【⚡ 32 淨膚儀導出＋33保濕面膜深層注水】；週四【17 A醇微晶】；週五【TO 菸鹼醯胺下巴控油】；週六【⚡ 32 淨膚儀保濕導入＋12 Medicube安瓶】；週日【33 一般日常保濕面膜日】。'
    },
    {
      weekNum: 3,
      title: '第 3 週：屏障強韌與角質更新（奇數週 · 週末 suisai 酵素代謝 & AZ100 壬二酸面膜）',
      subtitle: '循環奇數週流程：早晨 09 BOH 噴霧 ＋ 13 ANUA 桃子精華；週三【⚡ 32 離子淨膚儀導出＋ANUA提亮】；週四【17 A醇微晶】；週六【06 suisai 酵素粉】；週日【30 AZ100 面膜】。'
    },
    {
      weekNum: 4,
      title: '第 4 週：深層滲透與細緻收尾（偶數週 · 週六離子導入 & 週日 VT 300 微針夜）',
      subtitle: '循環偶數週流程：早晨 10 Ongredients 噴霧 ＋ 12 Medicube 安瓶 ＋ 20 AQ 乳；週三【⚡ 32 淨膚儀導出＋33保濕面膜深層注水】；週四【17 A醇微晶】；週五【TO 菸鹼醯胺】；週六【⚡ 32 淨膚儀保濕導入＋12 Medicube安瓶】；週日【33 一般保濕面膜日】。'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* 🌟 NEW: 今日重點專區 (Today's Key Focus Spotlight Banner) */}
      <div className="bg-gradient-to-r from-stone-900 via-rose-950 to-stone-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-rose-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            {/* Today Badge & Date */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500 text-white font-black text-xs shadow-sm animate-pulse">
                <Sparkles className="w-3.5 h-3.5" /> 今日重點聚光燈 (TODAY)
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-stone-200 text-xs font-semibold backdrop-blur-xs border border-white/10">
                {formatChineseDate(currentDate)} · 第 {getISOWeekNumber(currentDate)} 週 ({currentWeekType === 'odd' ? '奇數週' : '偶數週'})
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-400 text-stone-900 text-xs font-extrabold font-mono">
                循環 DAY {todayCycleDayNumber}
              </span>
            </div>

            {/* Title & Theme */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <span>{todayCycleData.title}</span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg ${todayCycleData.typeColor.badgeBg} ${todayCycleData.typeColor.badgeText}`}>
                  {todayCycleData.typeName}
                </span>
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
                {todayCycleData.summary}
              </p>
            </div>

            {/* Quick highlights: Zoning & Device status */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
              <div className="flex items-center gap-1.5 bg-black/30 border border-white/15 px-3 py-1.5 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span><strong>兩頰分區：</strong>{currentWeekType === 'odd' ? '#21 S.NATURE 霜滋潤' : '#23 契爾氏冰河霜封層'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/30 border border-white/15 px-3 py-1.5 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span><strong>下巴分區：</strong>固定薄擦 #18 MUJI 米糠乳液</span>
              </div>

              {/* Device alert for today */}
              {todayCycleData.deviceUsage ? (
                <div className="flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3 py-1.5 rounded-xl font-bold">
                  <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
                  <span>⚡ 今日任務：使用 #32 離子淨膚儀（{todayCycleData.deviceUsage.mode}模式）</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-stone-400 px-3 py-1.5 rounded-xl">
                  <span>⚡ 今日無美容儀器排程</span>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons on banner */}
          <div className="shrink-0 flex flex-wrap lg:flex-col gap-2.5 self-start lg:self-center">
            <button
              onClick={() => onSelectDayRoutine(todayCycleData.dayOfWeek, todayCycleData.weekType)}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all hover:scale-105"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>前往今日打卡執行</span>
            </button>

            <button
              onClick={() => setSelectedDayDetail(todayCycleData)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-stone-200 rounded-2xl font-semibold text-xs flex items-center gap-1.5 border border-white/15 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>查看今日完整 SOP</span>
            </button>

            {todayDayOfWeek === 2 && onOpenTimerWithMode && (
              <button
                onClick={() => onOpenTimerWithMode('bha')}
                className="px-3 py-1.5 bg-amber-500/30 hover:bg-amber-500/40 text-amber-200 border border-amber-400/30 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Timer className="w-3.5 h-3.5 text-amber-300" />
                <span>水楊酸 3-5分計時</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Top Legend Box ("輪值類型圖例") - Exactly matching reference image layout */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-stone-700">
            <span className="font-bold text-stone-900 mr-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-rose-500" />
              輪值類型圖例：
            </span>
            <button
              onClick={() => setFilterType(filterType === 'A' ? 'all' : 'A')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-all ${
                filterType === 'A' ? 'bg-emerald-100 ring-2 ring-emerald-500 font-bold' : 'hover:bg-stone-100'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>類型 A：一般修護夜 (週一/三/五/六)</span>
            </button>
            <button
              onClick={() => setFilterType(filterType === 'B' ? 'all' : 'B')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-all ${
                filterType === 'B' ? 'bg-amber-100 ring-2 ring-amber-500 font-bold' : 'hover:bg-stone-100'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>類型 B：15 寶拉水楊酸夜 (固定週二)</span>
            </button>
            <button
              onClick={() => setFilterType(filterType === 'C' ? 'all' : 'C')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-all ${
                filterType === 'C' ? 'bg-indigo-500 text-white rounded-lg px-2' : 'hover:bg-stone-100'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span>類型 C：17 Celimax A 醇微晶 (固定週四)</span>
            </button>
            <button
              onClick={() => setFilterType(filterType === 'D' ? 'all' : 'D')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-all ${
                filterType === 'D' ? 'bg-amber-100 ring-2 ring-amber-500 font-bold' : 'hover:bg-stone-100'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>類型 D：週末深度面膜夜 (奇數AZ100 / 偶數一般保濕)</span>
            </button>
            {/* Prominent device legend badge */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-50 text-purple-900 border border-purple-200 font-bold">
              <Zap className="w-3.5 h-3.5 text-purple-600" />
              <span>⚡ 離子儀：週三【深層導出】／ 偶週六【保濕導入】</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-cyan-800">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span>週末底妝日 (週六 AM)</span>
            </span>
          </div>

          {filterType !== 'all' && (
            <button
              onClick={() => setFilterType('all')}
              className="text-xs text-rose-600 hover:underline font-bold"
            >
              顯示全部類型
            </button>
          )}
        </div>
      </div>

      {/* 4-Week Calendar Grid */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200/90 shadow-xs space-y-8 overflow-x-auto">
        {/* Table Day Headers */}
        <div className="hidden lg:grid grid-cols-7 gap-3 pb-3 border-b border-stone-200 text-center text-xs font-bold text-stone-700">
          {weekHeaders.map((hdr, idx) => (
            <div key={idx} className="flex items-center justify-center gap-1 py-1">
              <span>{hdr.icon}</span>
              <span>{hdr.title}</span>
            </div>
          ))}
        </div>

        {/* 4 Weeks Iteration */}
        {weekMeta.map((wInfo) => {
          const weekDays = allCycleDays.filter(d => d.weekNumber === wInfo.weekNum);

          return (
            <div key={wInfo.weekNum} className="space-y-3">
              {/* Week Header Row */}
              <div className="bg-stone-50/80 rounded-2xl p-3 border border-stone-200/80">
                <h3 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${wInfo.weekNum % 2 === 1 ? 'bg-rose-500' : 'bg-emerald-600'}`} />
                  {wInfo.title}
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {wInfo.subtitle}
                </p>
              </div>

              {/* 7 Days in Week Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
                {weekDays.map((day) => {
                  const isCompleted = completedDayNumbers.includes(day.dayNumber);
                  const isFilteredOut = filterType !== 'all' && day.typeCode !== filterType;
                  const isToday = day.dayNumber === todayCycleDayNumber;

                  return (
                    <div
                      key={day.dayNumber}
                      onClick={() => setSelectedDayDetail(day)}
                      className={`rounded-2xl p-3.5 border transition-all cursor-pointer flex flex-col justify-between group relative ${
                        day.typeColor.bg
                      } ${day.typeColor.border} ${
                        isFilteredOut ? 'opacity-30' : 'hover:shadow-md hover:scale-[1.01]'
                      } ${
                        isToday 
                          ? 'ring-3 ring-rose-500 shadow-md shadow-rose-500/20' 
                          : isCompleted 
                          ? 'ring-2 ring-emerald-500' 
                          : ''
                      }`}
                    >
                      <div>
                        {/* Day Number, Today Badge and Checkbox */}
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-black text-xs font-mono text-stone-900">
                              DAY {day.dayNumber}
                            </span>
                            {isToday && (
                              <span className="text-[9px] font-black px-1.5 py-0.2 rounded-md bg-rose-600 text-white animate-pulse">
                                今日
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleDayCompleted(day.dayNumber);
                            }}
                            className="text-stone-400 hover:text-emerald-600 transition-colors"
                            title={isCompleted ? '標記為未完成' : '標記此日已完成'}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-50" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        {/* Type Badge */}
                        <div className="mb-1.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md block truncate ${day.typeColor.badgeBg} ${day.typeColor.badgeText}`}>
                            {day.typeName}
                          </span>
                        </div>

                        {/* Device Badge if applicable */}
                        {day.deviceUsage && (
                          <div className="mb-1.5">
                            <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-300 flex items-center gap-1">
                              <Zap className="w-2.5 h-2.5 text-purple-700 shrink-0" />
                              <span className="truncate">⚡ 離子淨膚儀（{day.deviceUsage.mode}）</span>
                            </span>
                          </div>
                        )}

                        {/* Summary Description */}
                        <p className="text-[11px] text-stone-700 leading-snug line-clamp-3 mb-2 font-medium">
                          {day.summary}
                        </p>

                        {/* Product Numbers Chips */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {day.productNumbers.slice(0, 3).map((num) => (
                            <span
                              key={num}
                              className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md ${
                                num === '32' 
                                  ? 'bg-purple-600 text-white font-extrabold' 
                                  : 'bg-white/80 border border-stone-200 text-stone-700'
                              }`}
                            >
                              #{num}
                            </span>
                          ))}
                          {day.productNumbers.length > 3 && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-white/60 text-stone-500">
                              +{day.productNumbers.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom SOP Link */}
                      <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-600 group-hover:text-rose-600 font-semibold">
                        <span>詳細保養品SOP</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Day SOP Drawer / Modal with Device Detailed Instructions */}
      {selectedDayDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-5 bg-stone-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-base font-black px-3 py-1 rounded-xl bg-rose-500 text-white font-mono">
                  DAY {selectedDayDetail.dayNumber}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-300">
                      第 {selectedDayDetail.weekNumber} 週 · {selectedDayDetail.weekType === 'odd' ? '奇數週' : '偶數週'}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.2 rounded-md ${selectedDayDetail.typeColor.badgeBg} ${selectedDayDetail.typeColor.badgeText}`}>
                      {selectedDayDetail.typeName}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-white mt-0.5">
                    {selectedDayDetail.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedDayDetail(null)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm">
              {/* ⚡ PROMINENT DEVICE USAGE SECTION (IF APPLICABLE) */}
              {selectedDayDetail.deviceUsage && (
                <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-amber-50/50 border-2 border-purple-300 rounded-2xl p-4.5 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 bg-purple-600 text-white rounded-xl shadow-xs">
                        <Zap className="w-4 h-4 animate-bounce" />
                      </span>
                      <div>
                        <h4 className="font-black text-purple-950 text-sm">
                          今日美容儀操作：{selectedDayDetail.deviceUsage.name}
                        </h4>
                        <span className="text-[11px] text-purple-800 font-semibold">
                          建議時長：{selectedDayDetail.deviceUsage.duration}
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-purple-600 text-white font-extrabold text-xs shadow-xs">
                      {selectedDayDetail.deviceUsage.mode}模式
                    </span>
                  </div>

                  <div className="p-3 bg-white/80 rounded-xl border border-purple-200 text-xs text-stone-700 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-purple-900">
                      <span>🧴 搭配品項：</span>
                      <span className="text-rose-600">{selectedDayDetail.deviceUsage.pairingProduct}</span>
                    </div>
                    <p className="leading-relaxed">
                      <strong>手法指引：</strong>{selectedDayDetail.deviceUsage.instructions}
                    </p>
                    <p className="text-amber-800 font-medium text-[11px] bg-amber-50 p-2 rounded-lg border border-amber-200">
                      💡 <strong>注意提醒：</strong>{selectedDayDetail.deviceUsage.tips}
                    </p>
                  </div>
                </div>
              )}

              {/* Strategy Banner */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-1.5">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                  今日重點策略
                </span>
                <p className="text-stone-800 font-medium leading-relaxed">
                  {selectedDayDetail.summary}
                </p>
              </div>

              {/* Product sequence list */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-stone-700 tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  今日指定保養品與美容儀清單（依序使用）：
                </span>

                <div className="space-y-2">
                  {selectedDayDetail.productNumbers.map((num, idx) => {
                    const p = getProduct(num);
                    if (!p) return null;
                    const isDevice = num === '32';

                    return (
                      <div
                        key={num}
                        onClick={() => {
                          onSelectProduct(p);
                        }}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isDevice 
                            ? 'bg-purple-50/70 border-purple-300 hover:border-purple-500' 
                            : 'bg-white border-stone-200 hover:border-rose-400 hover:bg-rose-50/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-stone-400">
                            {idx + 1}.
                          </span>
                          <span className={`text-xs font-black px-2 py-0.5 rounded-lg font-mono shrink-0 ${
                            isDevice ? 'bg-purple-700 text-white' : 'bg-stone-900 text-white'
                          }`}>
                            #{p.number}
                          </span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-stone-900">
                                {p.brand} {p.name}
                              </span>
                              {isDevice && (
                                <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-md bg-purple-600 text-white">
                                  美容儀
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-stone-500 block">
                              {p.role} · 部位：{
                                p.targetZone === 'cheeks' ? '兩頰' :
                                p.targetZone === 'chin' ? '下巴' :
                                p.targetZone === 'eyes' ? '眼周' : '全臉'
                              }
                            </span>
                          </div>
                        </div>

                        <ChevronRight className="w-4 h-4 text-stone-400 shrink-0" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Supplements reminder for this day */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-2">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  今日內服與處方服用提醒：
                </span>
                <ul className="text-xs text-amber-950/80 space-y-1 list-disc list-inside">
                  <li><strong>早餐後：</strong> PTU 3顆 ＋ 癲鍵錠 1顆 ＋ BHK's 奢光錠</li>
                  <li><strong>早餐後 1 小時：</strong> Thorne B 群 1 粒（與處方藥錯開）</li>
                  <li><strong>午/晚餐隨餐：</strong> 維生素 D3 (2錠) ＋ 魚油 (1粒) ＋ 蔓越莓膠囊</li>
                  <li><strong>睡前：</strong> 瑞安癲必停 0.5 顆 ＋ 易靜錠 1 顆</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
              <button
                onClick={() => {
                  onSelectDayRoutine(selectedDayDetail.dayOfWeek, selectedDayDetail.weekType);
                  setSelectedDayDetail(null);
                }}
                className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>前往今日打卡執行此排程</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setSelectedDayDetail(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-200/60 rounded-xl transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
