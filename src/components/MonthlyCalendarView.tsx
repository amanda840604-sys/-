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
  ArrowLeft,
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
  mode: '導出' | '導入';
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

  const getProduct = (num: string) => {
    return SKINCARE_PRODUCTS.find(p => 
      p.number === num || 
      p.id === num || 
      p.id === `p-${num}` || 
      (num === 'device' && p.categoryType === 'device') || 
      (num.startsWith('mask') && p.categoryType === 'mask') || 
      (num === 'mask' && p.categoryType === 'mask')
    );
  };

  // Calculate which day in the 4-week cycle corresponds to "Today"
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
        typeName: '類型 A · 溫和修護',
        typeColor: {
          bg: 'bg-emerald-50/40',
          border: 'border-emerald-200',
          text: 'text-emerald-900',
          badgeBg: 'bg-emerald-100',
          badgeText: 'text-emerald-800'
        },
        title: '日常溫和修護',
        summary: weekType === 'odd'
          ? '小林抗痘水(下巴) ＋ 小紫瓶 ＋ 黛珂極光 ＋ Torriden ＋ 靈芝水 ＋ BOH噴霧 ＋ 兩頰S.NATURE霜／下巴米糠乳'
          : '偶數週修護：小林抗痘水(下巴) ＋ 小紫瓶 ＋ 黛珂極光 ＋ Torriden ＋ MUJI化妝水 ＋ 契爾氏冰河霜／下巴米糠乳',
        productNumbers: weekType === 'odd' ? ['02', '06', '09', '14', '15', '16', '10', '12', '34', '28', '25'] : ['02', '06', '09', '14', '15', '16', '11', '13', '34', '31', '25']
      });

      // Tue (dayOfWeek 2)
      days.push({
        dayNumber: (w - 1) * 7 + 2,
        dayOfWeek: 2,
        weekNumber: w as 1 | 2 | 3 | 4,
        weekType,
        typeCode: 'B',
        typeName: '類型 B · 水楊酸煥膚',
        typeColor: {
          bg: 'bg-amber-50/50',
          border: 'border-amber-300',
          text: 'text-amber-950',
          badgeBg: 'bg-amber-100',
          badgeText: 'text-amber-900'
        },
        title: '寶拉水楊酸煥膚',
        summary: '下巴與鼻翼點塗寶拉水楊酸（#21，靜置3-5分鐘），可搭 ilso 溶解露粉刺大掃除，兩頰嚴禁碰酸！',
        productNumbers: ['02', '06', '01', '21', '14', '11', '34', weekType === 'odd' ? '28' : '31', '25']
      });

      // Wed (dayOfWeek 3) -> ⚡ 離子儀(導出)
      days.push({
        dayNumber: (w - 1) * 7 + 3,
        dayOfWeek: 3,
        weekNumber: w as 1 | 2 | 3 | 4,
        weekType,
        typeCode: 'A',
        typeName: weekType === 'odd' ? '類型 A · 離子儀(導出)' : '類型 A · 導出＋面膜',
        typeColor: {
          bg: 'bg-teal-50/40',
          border: 'border-teal-300',
          text: 'text-teal-950',
          badgeBg: 'bg-teal-100',
          badgeText: 'text-teal-900'
        },
        title: weekType === 'odd' ? '離子儀(導出) ＋ 提亮精粹' : '離子儀(導出) ＋ 保濕面膜',
        summary: weekType === 'odd'
          ? '舒特膚潔膚水 ＋ 離子儀(導出)毛孔殘妝 ➔ 黛珂極光(#15) ＋ Torriden補水 ＋ ANUA提亮 ＋ 兩頰S.NATURE霜'
          : '離子儀(導出)殘妝 ＋ 敷一片保濕修護面膜（10-15分）＋ 契爾氏冰河霜封層',
        productNumbers: weekType === 'odd' ? ['03', 'device', '06', '14', '15', '16', '12', '19', '34', '28', '25'] : ['03', 'device', '06', '14', 'mask', '13', '34', '31', '25'],
        deviceUsage: {
          mode: '導出',
          name: 'CHECK2CHECK 離子儀(導出)',
          pairingProduct: 'Cetaphil 舒特膚 胜肽緊緻賦活潔膚水',
          duration: '3 ～ 5 分鐘',
          instructions: '將化妝棉充分浸濕舒特膚潔膚水後固定於儀器金屬探頭上，開啟「導出模式」。由臉部中央向外、由下往上順著肌膚紋理輕柔滑動。在下巴反覆粉刺區與鼻翼兩側特別加強畫圓打圈，利用離子電荷吸附導出深層殘妝與毛孔髒污。',
          tips: '導出時輕輕貼合肌膚滑動即可，千萬不要大力拉扯！導出完畢後接著使用綠茶洗面乳洗淨全臉。'
        }
      });

      // Thu (dayOfWeek 4)
      days.push({
        dayNumber: (w - 1) * 7 + 4,
        dayOfWeek: 4,
        weekNumber: w as 1 | 2 | 3 | 4,
        weekType,
        typeCode: 'C',
        typeName: '類型 C · A醇微晶',
        typeColor: {
          bg: 'bg-indigo-50/50',
          border: 'border-indigo-300',
          text: 'text-indigo-950',
          badgeBg: 'bg-indigo-100',
          badgeText: 'text-indigo-900'
        },
        title: 'Celimax A 醇微晶抗老',
        summary: '改善細紋與角質代謝；塗 A 醇前先以雅詩蘭黛眼霜(#34)隔離眼周！豌豆大小避開眼周',
        productNumbers: ['02', '06', '14', '11', '34', '23', weekType === 'odd' ? '28' : '30', '25']
      });

      // Fri (dayOfWeek 5)
      days.push({
        dayNumber: (w - 1) * 7 + 5,
        dayOfWeek: 5,
        weekNumber: w as 1 | 2 | 3 | 4,
        weekType,
        typeCode: 'A',
        typeName: weekType === 'odd' ? '類型 A · 舒緩修復' : '類型 A · 局部控油',
        typeColor: {
          bg: 'bg-emerald-50/40',
          border: 'border-emerald-200',
          text: 'text-emerald-900',
          badgeBg: 'bg-emerald-100',
          badgeText: 'text-emerald-800'
        },
        title: weekType === 'odd' ? '舒緩屏障修護' : '下巴局部點塗菸鹼醯胺',
        summary: weekType === 'odd'
          ? '小林抗痘水下巴抑菌，以靈芝水、黛珂極光與 Dr. Reju-All 修復霜強化屏障，下巴維持米糠乳'
          : '小林抗痘水，下巴點塗 The Ordinary 菸鹼醯胺(#20)控油，兩頰使用妮維雅 630 淡斑晚霜(#32)',
        productNumbers: weekType === 'odd' ? ['04', '06', '09', '14', '15', '16', '10', '12', '34', '29', '25'] : ['04', '06', '09', '14', '15', '16', '11', '13', '34', '32', '20', '25']
      });

      // Sat (dayOfWeek 6) -> 偶數週六 ⚡ 離子儀(導入)
      days.push({
        dayNumber: (w - 1) * 7 + 6,
        dayOfWeek: 6,
        weekNumber: w as 1 | 2 | 3 | 4,
        weekType,
        typeCode: 'A',
        typeName: weekType === 'odd' ? '類型 A · 酵素代謝' : '類型 A · 離子儀(導入)',
        typeColor: {
          bg: weekType === 'odd' ? 'bg-emerald-50/40' : 'bg-purple-50/50',
          border: weekType === 'odd' ? 'border-emerald-200' : 'border-purple-300',
          text: 'text-stone-900',
          badgeBg: weekType === 'odd' ? 'bg-emerald-100' : 'bg-purple-100',
          badgeText: weekType === 'odd' ? 'text-emerald-800' : 'text-purple-800'
        },
        title: weekType === 'odd' ? 'suisai 酵素洗顏代謝' : '離子儀(導入) ＋ 胜肽安瓶',
        summary: weekType === 'odd'
          ? '佳麗寶 suisai 酵素洗顏粉(#08)溫和代謝老廢角質與下巴粉刺，兩頰深層潤澤，當晚停用酸類'
          : '離子儀(導入)搭配 Medicube PDRN 胜肽安瓶(#17) ＋ 契爾氏冰河霜(#31)強力鎖水',
        productNumbers: weekType === 'odd' ? ['02', '08', '14', '10', '34', '28', '25'] : ['02', '06', '14', '17', 'device', '34', '31', '25'],
        isMakeupDay: true,
        ...(weekType === 'even' ? {
          deviceUsage: {
            mode: '導入',
            name: 'CHECK2CHECK 離子儀(導入)',
            pairingProduct: 'Medicube PDRN 粉紅胜肽安瓶',
            duration: '5 分鐘',
            instructions: '全臉按拍黛珂小紫瓶打底後，均勻滴上 3~4 滴 Medicube PDRN 胜肽安瓶。開啟淨膚儀「導入模式」，以金屬探頭貼合臉部皮膚，順著下巴輪廓線、兩頰向太陽穴方向緩慢向上滑動按摩，透過溫感與微震動將胜肽小分子推入肌底。',
            tips: '導入完成後肌膚水潤透亮，兩頰請立刻厚塗契爾氏冰河霜封存，下巴薄擦米糠乳液。'
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
        typeName: weekType === 'odd' ? '類型 D · 痘痘藍膜' : '類型 D · 保濕面膜',
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
        title: weekType === 'odd' ? 'AZ100 痘痘藍膜日' : '一般日常保濕面膜日',
        summary: weekType === 'odd'
          ? '敷 AZ100 痘痘藍膜（10-15分），噴 BOH 噴霧，兩頰以 Dr. Reju-All 修復霜(#29)強力封層（下巴薄擦米糠乳）'
          : '敷一般日常保濕面膜（10-15分），噴 Ongredients 噴霧，兩頰以契爾氏冰河霜(#31)強力封層（下巴薄擦米糠乳）',
        productNumbers: weekType === 'odd' ? ['03', '06', '14', 'mask', '12', '34', '29', '25'] : ['03', '06', '14', 'mask', '13', '34', '31', '25']
      });
    }

    return days;
  };

  const allCycleDays = generate4WeekCycle();
  const todayCycleData = allCycleDays.find(d => d.dayNumber === todayCycleDayNumber) || allCycleDays[1];

  const filteredDays = filterType === 'all' 
    ? allCycleDays 
    : allCycleDays.filter(d => d.typeCode === filterType);

  // Navigation handlers for prev/next day
  const handlePrevDay = () => {
    if (!selectedDayDetail) return;
    const currentIdx = allCycleDays.findIndex(d => d.dayNumber === selectedDayDetail.dayNumber);
    const prevIdx = (currentIdx - 1 + allCycleDays.length) % allCycleDays.length;
    setSelectedDayDetail(allCycleDays[prevIdx]);
  };

  const handleNextDay = () => {
    if (!selectedDayDetail) return;
    const currentIdx = allCycleDays.findIndex(d => d.dayNumber === selectedDayDetail.dayNumber);
    const nextIdx = (currentIdx + 1) % allCycleDays.length;
    setSelectedDayDetail(allCycleDays[nextIdx]);
  };

  const weekHeaders = [
    { title: '週一 · 類型A 修護', icon: '💧' },
    { title: '週二 · 類型B 水楊酸', icon: '🧪' },
    { title: '週三 · 離子儀(導出)', icon: '🌿' },
    { title: '週四 · 類型C A醇', icon: '🌙' },
    { title: '週五 · 類型A 修護', icon: '💧' },
    { title: '週六 · 去角質/導入', icon: '🌟' },
    { title: '週日 · 雙週面膜', icon: '✨' },
  ];

  const weekMeta = [
    {
      weekNum: 1,
      title: '第 1 週：基底穩固與淨膚啟動（奇數週 · 週末 suisai 酵素代謝 & AZ100 痘痘藍膜）',
      subtitle: '早晨使用 BOH 噴霧 ＋ ANUA 桃子精華；週三【⚡ 離子儀(導出) ＋ ANUA提亮】；週四【A醇微晶】；週六【suisai 酵素洗顏粉】；週日【AZ100 藍膜 ＋ Dr. Reju-All 修復霜】。'
    },
    {
      weekNum: 2,
      title: '第 2 週：水光激活與深層注水（偶數週 · 週六離子導入 & 週日 保濕面膜）',
      subtitle: '早晨使用 Ongredients 噴霧 ＋ Medicube 安瓶 ＋ 黛珂 AQ 乳；週三【⚡ 離子儀(導出) ＋ 保濕面膜深層注水】；週四【A醇微晶】；週五【菸鹼醯胺下巴控油】；週六【⚡ 離子儀(導入) ＋ Medicube安瓶】；週日【一般日常保濕面膜日】。'
    },
    {
      weekNum: 3,
      title: '第 3 週：屏障強韌與角質更新（奇數週 · 週末 suisai 酵素代謝 & AZ100 痘痘藍膜）',
      subtitle: '循環奇數週流程：早晨 BOH 噴霧 ＋ ANUA 桃子精華；週三【⚡ 離子儀(導出) ＋ ANUA提亮】；週四【A醇微晶】；週六【suisai 酵素粉】；週日【AZ100 藍膜】。'
    },
    {
      weekNum: 4,
      title: '第 4 週：深層滲透與細緻收尾（偶數週 · 週六離子導入 & 週日 保濕面膜）',
      subtitle: '循環偶數週流程：早晨 Ongredients 噴霧 ＋ Medicube 安瓶 ＋ AQ 乳；週三【⚡ 離子儀(導出) ＋ 保濕面膜深層注水】；週四【A醇微晶】；週五【菸鹼醯胺控油】；週六【⚡ 離子儀(導入) ＋ Medicube安瓶】；週日【一般保濕面膜日】。'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* 🌟 今日重點專區 (Today's Key Focus Spotlight Banner) */}
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
                <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                <span><strong>兩頰分區：</strong>{currentWeekType === 'odd' ? 'S.NATURE 水庫霜滋潤' : '契爾氏冰河霜封層'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/30 border border-white/15 px-3 py-1.5 rounded-xl">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span><strong>下巴分區：</strong>固定薄擦 MUJI 米糠乳液</span>
              </div>

              {/* Device alert for today */}
              {todayCycleData.deviceUsage ? (
                <div className="flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/40 text-amber-300 px-3 py-1.5 rounded-xl font-bold">
                  <Zap className="w-4 h-4 text-amber-400 animate-bounce shrink-0" />
                  <span>⚡ 今日任務：使用 離子儀({todayCycleData.deviceUsage.mode})</span>
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

      {/* Top Legend Box ("輪值類型圖例") - Auto wrapping & clean layout */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-stone-700">
            <span className="font-bold text-stone-900 mr-1 flex items-center gap-1.5 shrink-0">
              <Sparkles className="w-4 h-4 text-rose-500" />
              輪值類型圖例：
            </span>
            <button
              onClick={() => setFilterType(filterType === 'A' ? 'all' : 'A')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all text-xs ${
                filterType === 'A' ? 'bg-emerald-100 ring-2 ring-emerald-500 font-bold text-emerald-900' : 'hover:bg-stone-100 bg-stone-50 border border-stone-200'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="break-words">類型 A：溫和修護夜 (週一/三/五/六)</span>
            </button>
            <button
              onClick={() => setFilterType(filterType === 'B' ? 'all' : 'B')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all text-xs ${
                filterType === 'B' ? 'bg-amber-100 ring-2 ring-amber-500 font-bold text-amber-950' : 'hover:bg-stone-100 bg-stone-50 border border-stone-200'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
              <span className="break-words">類型 B：寶拉水楊酸 (週二)</span>
            </button>
            <button
              onClick={() => setFilterType(filterType === 'C' ? 'all' : 'C')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all text-xs ${
                filterType === 'C' ? 'bg-indigo-100 ring-2 ring-indigo-500 font-bold text-indigo-950' : 'hover:bg-stone-100 bg-stone-50 border border-stone-200'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
              <span className="break-words">類型 C：Celimax A醇 (週四)</span>
            </button>
            <button
              onClick={() => setFilterType(filterType === 'D' ? 'all' : 'D')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all text-xs ${
                filterType === 'D' ? 'bg-rose-100 ring-2 ring-rose-500 font-bold text-rose-950' : 'hover:bg-stone-100 bg-stone-50 border border-stone-200'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
              <span className="break-words">類型 D：週末深度面膜 (週日)</span>
            </button>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-purple-50 text-purple-900 border border-purple-200 font-bold text-xs">
              <Zap className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span className="break-words">⚡ 離子儀：週三導出 · 偶週六導入</span>
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
              <span className="break-words">{hdr.title}</span>
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
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${wInfo.weekNum % 2 === 1 ? 'bg-rose-500' : 'bg-emerald-600'}`} />
                  <span className="break-words">{wInfo.title}</span>
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed break-words">
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
                      className={`rounded-2xl p-3.5 border transition-all cursor-pointer flex flex-col justify-between group relative select-none ${
                        day.typeColor.bg
                      } ${day.typeColor.border} ${
                        isFilteredOut ? 'opacity-30' : 'hover:shadow-lg hover:border-stone-400 hover:-translate-y-0.5'
                      } ${
                        isToday 
                          ? 'ring-3 ring-rose-500 shadow-md shadow-rose-500/20' 
                          : isCompleted 
                          ? 'ring-2 ring-emerald-500' 
                          : ''
                      }`}
                    >
                      <div className="space-y-2.5">
                        {/* Day Number, Today Badge and Checkbox */}
                        <div className="flex items-center justify-between gap-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-black text-xs font-mono text-stone-900">
                              DAY {day.dayNumber}
                            </span>
                            {isToday && (
                              <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-rose-600 text-white animate-pulse">
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
                            className="text-stone-400 hover:text-emerald-600 p-0.5 transition-colors shrink-0"
                            title={isCompleted ? '標記為未完成' : '標記此日已完成'}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-50" />
                            ) : (
                              <Circle className="w-4 h-4 hover:text-stone-600" />
                            )}
                          </button>
                        </div>

                        {/* Type Badge - Auto wraps properly without being cut off */}
                        <div>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-lg inline-block break-words whitespace-normal leading-snug tracking-tight ${day.typeColor.badgeBg} ${day.typeColor.badgeText}`}>
                            {day.typeName}
                          </span>
                        </div>

                        {/* Card Title - Clean without useless numbers */}
                        <h4 className="text-xs sm:text-sm font-black text-stone-900 leading-snug break-words">
                          {day.title}
                        </h4>

                        {/* Device Badge if applicable */}
                        {day.deviceUsage && (
                          <div>
                            <span className="text-[10.5px] font-extrabold px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-200 inline-flex items-center gap-1 leading-snug break-words">
                              <Zap className="w-3 h-3 text-purple-700 shrink-0" />
                              <span>⚡ 離子儀({day.deviceUsage.mode})</span>
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card Footer: Clear action hint */}
                      <div className="mt-3.5 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] font-bold text-stone-500 group-hover:text-rose-600 transition-colors">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>查看完整 SOP</span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Day SOP Drawer / Modal with Next/Prev Navigation */}
      {selectedDayDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header with Prev / Next day switcher */}
            <div className="px-6 py-5 bg-stone-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-base font-black px-3 py-1 rounded-xl bg-rose-500 text-white font-mono shrink-0">
                  DAY {selectedDayDetail.dayNumber}
                </span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-stone-300">
                      第 {selectedDayDetail.weekNumber} 週 · {selectedDayDetail.weekType === 'odd' ? '奇數週' : '偶數週'}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${selectedDayDetail.typeColor.badgeBg} ${selectedDayDetail.typeColor.badgeText}`}>
                      {selectedDayDetail.typeName}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-white mt-0.5 break-words">
                    {selectedDayDetail.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {/* Prev day */}
                <button
                  type="button"
                  onClick={handlePrevDay}
                  className="p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  title="查看上一天"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                {/* Next day */}
                <button
                  type="button"
                  onClick={handleNextDay}
                  className="p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  title="查看下一天"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
                {/* Close */}
                <button
                  onClick={() => setSelectedDayDetail(null)}
                  className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors ml-1"
                  title="關閉"
                >
                  ✕
                </button>
              </div>
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
                    <span className="px-2.5 py-1 rounded-full bg-purple-600 text-white font-extrabold text-xs shadow-xs shrink-0">
                      離子儀({selectedDayDetail.deviceUsage.mode})
                    </span>
                  </div>

                  <div className="p-3 bg-white/80 rounded-xl border border-purple-200 text-xs text-stone-700 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-purple-900">
                      <span>🧴 搭配品項：</span>
                      <span className="text-rose-600">{selectedDayDetail.deviceUsage.pairingProduct}</span>
                    </div>
                    <p className="leading-relaxed break-words">
                      <strong>手法指引：</strong>{selectedDayDetail.deviceUsage.instructions}
                    </p>
                    <p className="text-amber-800 font-medium text-[11px] bg-amber-50 p-2 rounded-lg border border-amber-200 break-words">
                      💡 <strong>注意提醒：</strong>{selectedDayDetail.deviceUsage.tips}
                    </p>
                  </div>
                </div>
              )}

              {/* Strategy Banner */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-1.5">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                  今日完整保養 SOP 策略
                </span>
                <p className="text-stone-800 font-medium leading-relaxed break-words">
                  {selectedDayDetail.summary}
                </p>
              </div>

              {/* Product sequence list - Clean category labels, NO useless numbers or # tags */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-stone-700 tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  今日指定保養品與美容儀清單（依序使用，點擊可查產品詳情）：
                </span>

                <div className="space-y-2">
                  {selectedDayDetail.productNumbers.map((num) => {
                    const p = getProduct(num);
                    if (!p) return null;
                    const isDevice = num === '32';

                    // Clean category label without numbers
                    const categoryLabel = isDevice 
                      ? '美容儀' 
                      : p.categoryType === 'cleansing' 
                      ? '洗卸' 
                      : p.categoryType === 'toner' 
                      ? '化妝水/噴霧' 
                      : p.categoryType === 'serum' 
                      ? '精華液' 
                      : p.categoryType === 'cream' 
                      ? '面霜/乳液' 
                      : p.categoryType === 'eye' 
                      ? '眼霜' 
                      : p.categoryType === 'mask' 
                      ? '面膜' 
                      : '保養品';

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
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-lg shrink-0 ${
                            isDevice ? 'bg-purple-700 text-white' : 'bg-stone-800 text-stone-100'
                          }`}>
                            {categoryLabel}
                          </span>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-xs sm:text-sm font-bold text-stone-900">
                                {p.brand} {p.name}
                              </span>
                            </div>
                            <span className="text-[11px] text-stone-500 block mt-0.5">
                              {p.role} · 適用部位：{
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
                  今日內服保健品與處方用藥精準時段提醒：
                </span>
                <ul className="text-xs text-amber-950/80 space-y-1 list-disc list-inside">
                  <li><strong>早餐後：</strong> 普樂彼錠 3顆 ＋ 癲鍵錠 1顆 ＋ BHK's 奢光錠</li>
                  <li><strong>早餐後 1 小時：</strong> Thorne B 群 1 粒（與處方藥錯開）</li>
                  <li><strong>午/晚餐隨餐：</strong> 維生素 D3 (2錠) ＋ 魚油 (1粒) ＋ 蔓越莓膠囊</li>
                  <li><strong>睡前：</strong> 瑞安癲必停 0.5 顆 ＋ 易靜錠 1 顆</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer with Quick Next/Prev and Action Buttons */}
            <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevDay}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl transition-colors flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>上一天</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextDay}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl transition-colors flex items-center gap-1"
                >
                  <span>下一天</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onSelectDayRoutine(selectedDayDetail.dayOfWeek, selectedDayDetail.weekType);
                    setSelectedDayDetail(null);
                  }}
                  className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span>前往今日打卡執行</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setSelectedDayDetail(null)}
                  className="px-3 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-200/60 rounded-xl transition-colors"
                >
                  關閉
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
