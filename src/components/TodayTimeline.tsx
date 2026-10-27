import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  Timer, 
  Eye, 
  Info, 
  Droplet, 
  Sun, 
  Flame, 
  Moon, 
  ChevronDown, 
  ChevronUp,
  Zap,
  ArrowRight
} from 'lucide-react';
import { WeekType, SkincareProduct } from '../types/routine';
import { 
  PRESCRIPTION_MEDS, 
  ORAL_SUPPLEMENTS, 
  SKINCARE_PRODUCTS, 
  WEEKLY_NIGHT_ROUTINES, 
  MORNING_ROUTINE 
} from '../data/routineData';
import { WaterTracker } from './WaterTracker';
import { playChime, playSuccessChime } from '../utils/audio';

interface TodayTimelineProps {
  selectedDayOfWeek: number;
  weekType: WeekType;
  completedItemIds: string[];
  onToggleItem: (id: string) => void;
  waterIntakeMl: number;
  onUpdateWater: (ml: number) => void;
  onOpenTimerWithMode: (mode: 'bha' | 'mask' | 'bcomplex') => void;
  onSelectProduct: (product: SkincareProduct) => void;
  isMakeupDay?: boolean;
  onToggleMakeupDay?: (val?: boolean) => void;
}

export const TodayTimeline: React.FC<TodayTimelineProps> = ({
  selectedDayOfWeek,
  weekType,
  completedItemIds,
  onToggleItem,
  waterIntakeMl,
  onUpdateWater,
  onOpenTimerWithMode,
  onSelectProduct,
  isMakeupDay = false,
  onToggleMakeupDay
}) => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    morningMeds: true,
    morningSkincare: true,
    bComplex: true,
    lunchSupplements: true,
    nightSkincare: true,
    bedtimeMeds: true
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const dayRoutine = WEEKLY_NIGHT_ROUTINES.find(r => r.dayOfWeek === selectedDayOfWeek) || WEEKLY_NIGHT_ROUTINES[1];
  const currentNightDetails = weekType === 'odd' ? dayRoutine.oddWeekDetails : dayRoutine.evenWeekDetails;

  const getProductByNum = (num: string): SkincareProduct | undefined => {
    return SKINCARE_PRODUCTS.find(p => 
      p.number === num || 
      p.id === num || 
      p.id === `p-${num}` || 
      (num === 'mask-az100' && p.id === 'p-mask-az100') ||
      (num === 'mask-hydrating' && p.id === 'p-mask-hydrating') ||
      (num.includes('mask') && p.categoryType === 'mask') || 
      (num === 'device' && p.categoryType === 'device') ||
      (num === 'makeup-base' && p.id === 'p-makeup-base')
    );
  };

  const handleCheckboxClick = (id: string) => {
    const isCompleted = completedItemIds.includes(id);
    if (!isCompleted) {
      playSuccessChime();
    } else {
      playChime(520, 650);
    }
    onToggleItem(id);
  };

  // Collect all today IDs for progress calculation
  const morningMedIds = ['rx-1', 'rx-2', 'sup-1', 'sup-2'];
  const morningSkincareIds = ['am-step-1', 'am-step-2', 'am-step-3', 'am-step-4', 'am-step-5', 'am-step-6', 'am-step-7'];
  const bComplexIds = ['sup-4'];
  const lunchSupplementIds = ['sup-3', 'sup-5', 'sup-6'];
  const nightSkincareIds = currentNightDetails.steps.map((_, idx) => `pm-step-${selectedDayOfWeek}-${weekType}-${idx}`);
  const bedtimeMedIds = ['rx-3', 'rx-4'];

  const allTodayItemIds = [
    ...morningMedIds,
    ...morningSkincareIds,
    ...bComplexIds,
    ...lunchSupplementIds,
    ...nightSkincareIds,
    ...bedtimeMedIds
  ];

  const totalItems = allTodayItemIds.length;
  const completedCount = allTodayItemIds.filter(id => completedItemIds.includes(id)).length;
  const progressPercent = Math.round((completedCount / totalItems) * 100);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Banner: Day Focus & Skin Strategy */}
      <div className="bg-linear-to-r from-stone-900 via-stone-800 to-stone-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-stone-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <span className="text-2xl">{dayRoutine.themeIcon}</span>
              <span className="text-xl sm:text-2xl font-black tracking-tight">
                {dayRoutine.dayName}：{dayRoutine.themeTitle}
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                weekType === 'odd' ? 'bg-rose-500 text-white' : 'bg-emerald-600 text-white'
              }`}>
                {weekType === 'odd' ? '奇數週排程' : '偶數週排程'}
              </span>
            </div>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              {currentNightDetails.notes}
            </p>

            {/* Skin Strategy & Makeup Mode Dual Indicator */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="bg-white/10 text-stone-200 px-3 py-1 rounded-xl backdrop-blur-xs flex items-center gap-1.5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                <strong>兩頰乾肌：</strong> 加強角鯊烷／冰河霜保濕封層
              </span>
              <span className="bg-white/10 text-stone-200 px-3 py-1 rounded-xl backdrop-blur-xs flex items-center gap-1.5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <strong>下巴粉刺：</strong> 僅薄擦 #23 米糠乳液，嚴禁厚霜
              </span>
            </div>

            {/* Makeup Mode Interactive Switcher in Hero */}
            <div className="mt-4 pt-3.5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-semibold text-stone-400">今日晨間路線：</span>
                <span className={`text-xs font-extrabold px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-xs ${
                  isMakeupDay
                    ? 'bg-rose-500/90 text-white border border-rose-400/40'
                    : 'bg-emerald-600/90 text-white border border-emerald-400/40'
                }`}>
                  {isMakeupDay ? '💄 路線 B · 全妝日模式（精準打底・防卡粉起屑）' : '🌿 路線 A · 素顏日模式（自然水光・快速出門）'}
                </span>
                <span className="text-[11px] text-stone-300 hidden md:inline">
                  {isMakeupDay ? '（#34 Bobbi Brown眼霜 ➔ #30 橘子霜兩頰貼妝 ➔ #36 透明防曬 ➔ 妝前乳）' : '（兩頰充足鎖水 ➔ 下巴 #23 米糠乳 ➔ #35 黛爾泊粉光防曬直接出門）'}
                </span>
              </div>

              {onToggleMakeupDay && (
                <button
                  type="button"
                  onClick={() => onToggleMakeupDay(!isMakeupDay)}
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
                    isMakeupDay
                      ? 'bg-stone-800 hover:bg-stone-700 text-emerald-300 border-emerald-500/50 hover:border-emerald-400'
                      : 'bg-stone-800 hover:bg-stone-700 text-rose-300 border-rose-500/50 hover:border-rose-400'
                  }`}
                >
                  <span>切換為{isMakeupDay ? '素顏日模式 🌿' : '全妝日模式 💄'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Today's completion circular progress / tracker */}
          <div className="shrink-0 flex items-center md:flex-col justify-between md:justify-center bg-white/10 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/15">
            <div className="text-left md:text-center">
              <span className="text-[11px] font-semibold text-stone-300 uppercase tracking-wider block">今日完成度</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-white">{completedCount}</span>
                <span className="text-xs text-stone-400">/ {totalItems} 項</span>
              </div>
            </div>
            <div className="flex items-center gap-2 md:mt-2">
              <div className="w-14 h-14 relative flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/20"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-rose-400 transition-all duration-700 ease-out"
                    strokeDasharray={`${progressPercent}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-bold text-white">{progressPercent}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 今日重點摘要 (Today's Key Focus Summary & Special Procedures) */}
      <section className="bg-white rounded-3xl border border-stone-200/90 shadow-xs p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-500/10 text-rose-600 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
                <span>今日重點摘要 ＆ 特殊程序</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  {dayRoutine.dayName} · {weekType === 'odd' ? '奇數週' : '偶數週'}
                </span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                系統已自動抓取當日必須執行的特殊程序（儀器操作、酸類/A醇、面膜或關鍵服藥間隔）
              </p>
            </div>
          </div>

          <div className="text-xs font-semibold text-stone-500 flex items-center gap-1.5 self-start sm:self-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>自動偵測排程</span>
          </div>
        </div>

        {/* Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {/* Card 1: 晚間核心特殊程序 (水楊酸 / 離子導出 / A醇 / 酵素洗顏 / 离儀導入 / 面膜) */}
          <div className="rounded-2xl p-4 border border-purple-200/90 bg-gradient-to-br from-purple-50/70 via-indigo-50/30 to-white flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-300 flex items-center gap-1">
                  {selectedDayOfWeek === 3 && <Zap className="w-3 h-3 text-purple-700 animate-bounce" />}
                  {selectedDayOfWeek === 6 && weekType === 'even' && <Zap className="w-3 h-3 text-purple-700 animate-bounce" />}
                  {selectedDayOfWeek === 2 && <Flame className="w-3 h-3 text-amber-600" />}
                  {selectedDayOfWeek === 4 && <Moon className="w-3 h-3 text-indigo-600" />}
                  {(selectedDayOfWeek === 0 || (selectedDayOfWeek === 3 && weekType === 'even')) && <Droplet className="w-3 h-3 text-rose-600" />}
                  <span>
                    {selectedDayOfWeek === 2 && '🧪 核心酸類煥膚'}
                    {selectedDayOfWeek === 3 && '⚡ 離子儀(導出)'}
                    {selectedDayOfWeek === 4 && '🌙 高活性 A 醇微晶'}
                    {selectedDayOfWeek === 5 && (weekType === 'even' ? '🎯 下巴局部收斂控油' : '💧 舒緩日常修護')}
                    {selectedDayOfWeek === 6 && (weekType === 'odd' ? '🫧 每週 1 次去角質' : '⚡ 美容儀溫感導入')}
                    {selectedDayOfWeek === 0 && (weekType === 'odd' ? '🧖 週末抗痘藍膜' : '🧖 週末深層保濕面膜')}
                    {selectedDayOfWeek === 1 && '💧 週一平衡修護'}
                  </span>
                </span>
                <span className="text-[11px] font-bold text-purple-800">晚間夜間主題</span>
              </div>

              <div>
                <h4 className="font-extrabold text-stone-900 text-sm leading-snug">
                  {selectedDayOfWeek === 2 && '寶拉 2% 水楊酸局部粉刺煥膚 (可搭 ilso 溶解露)'}
                  {selectedDayOfWeek === 3 && (weekType === 'odd' ? '離子儀(導出) ＋ ANUA 提亮 ＋ Torriden 補水' : '離子儀(導出) ＋ 加敷保濕面膜')}
                  {selectedDayOfWeek === 4 && 'Celimax A 醇微晶精華撫紋抗老'}
                  {selectedDayOfWeek === 5 && (weekType === 'even' ? 'The Ordinary 菸鹼醯胺＋鋅下巴局部控油' : '靈芝水 ＋ 角鯊烷霜溫和屏障修護')}
                  {selectedDayOfWeek === 6 && (weekType === 'odd' ? 'Kanebo suisai 酵素洗顏粉代謝角質' : '離子儀保濕導入 ＋ Medicube 胜肽安瓶')}
                  {selectedDayOfWeek === 0 && (weekType === 'odd' ? 'Quality 1st AZ100 壬二酸痘痘藍膜' : '一般日常深層保濕修護面膜')}
                  {selectedDayOfWeek === 1 && '極簡洗卸 ＋ 小紫瓶 ＋ Torriden 玻尿酸補水 ＋ 兩頰深層潤澤'}
                </h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {selectedDayOfWeek === 2 && '僅局部點塗下巴與鼻翼粉刺區，靜置等待 3～5 分鐘溶解毛孔角栓。若安排粉刺大掃除夜，可先以 #01 ilso 溶解露局部濕敷 10-15 分鐘。兩頰乾肌嚴格避開酸類！'}
                  {selectedDayOfWeek === 3 && (weekType === 'odd'
                    ? '#03 舒特膚潔膚水浸透化妝棉夾於探頭，開啟導出模式由內向外滑動導出殘妝 3~5 分鐘；隨後洗淨並塗抹 #15 黛珂極光精粹、#16 Torriden 與 #19 ANUA 桃子精華提亮。'
                    : '#03 舒特膚潔膚水導出殘妝 3~5 分鐘後洗淨，立刻敷上【一般保濕面膜】10-15 分鐘，兩頰 #31 契爾氏冰河霜強力封層！')}
                  {selectedDayOfWeek === 4 && '洗臉徹底乾燥後，先擦 #34 雅詩蘭黛亮眼霜保護眼周！取豌豆大小 #23 A 醇微晶精華均勻輕按全臉（避開眼周唇緣）。'}
                  {selectedDayOfWeek === 5 && (weekType === 'even'
                    ? '下巴出油粉刺區微量點塗 #20 TO 菸鹼醯胺控油收斂；紅腫痘可局部點塗 #24 Acclear 痘痘藥。兩頰擦 #32 妮維雅 630 淡斑霜！'
                    : '小林抗痘水下巴二次清潔，以靈芝水與 #29 Dr. Reju-All 修復霜平撫整週肌膚疲勞，強化肌膚屏障。')}
                  {selectedDayOfWeek === 6 && (weekType === 'odd'
                    ? '#08 suisai 酵素洗顏粉搓出豐盈泡沫溫和洗淨老廢角質與下巴粉刺。當晚嚴禁使用水楊酸或 A 醇！'
                    : '小紫瓶打底後滴上 #17 胜肽安瓶，開啟離子儀「保濕導入模式」按摩 5 分鐘，隨後兩頰厚塗 #31 契爾氏冰河霜封存！')}
                  {selectedDayOfWeek === 0 && (weekType === 'odd'
                    ? '敷 AZ100 藍膜 10～15 分鐘收斂控油與舒緩下巴反覆痘痘，取下後兩頰立刻以 #29 Dr. Reju-All 修復霜封層！'
                    : '敷一般純保濕面膜 10～15 分鐘為乾肌注水，取下後兩頰立刻厚塗 #31 契爾氏冰河霜強力封層鎖水！')}
                  {selectedDayOfWeek === 1 && '手溫按拍小紫瓶，塗抹 #15 黛珂極光精粹與 #16 Torriden 玻尿酸精華，化妝水輕拍打底，兩頰滋潤封層、下巴清爽薄擦米糠乳液。'}
                </p>
              </div>

              {/* Product Pills on Card 1 */}
              <div className="flex flex-wrap gap-1 pt-1">
                {selectedDayOfWeek === 2 && ['21', '02', '11', '01'].map((num) => {
                  const p = getProductByNum(num);
                  if (!p) return null;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => onSelectProduct(p)}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-white border border-amber-300 text-amber-900 hover:bg-amber-100"
                    >
                      #{p.number} {p.name}
                    </button>
                  );
                })}
                {selectedDayOfWeek === 3 && (weekType === 'odd' ? ['03', 'device', '14', '15', '16', '12', '19', '28'] : ['03', 'device', 'p-mask-hydrating', '13', '14', '31']).map((num) => {
                  const p = getProductByNum(num);
                  if (!p) return null;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => onSelectProduct(p)}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-white border border-purple-300 text-purple-900 hover:bg-purple-100"
                    >
                      #{p.number} {p.name}
                    </button>
                  );
                })}
                {selectedDayOfWeek === 4 && ['23', '34', '11', '28', '30'].map((num) => {
                  const p = getProductByNum(num);
                  if (!p) return null;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => onSelectProduct(p)}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-white border border-indigo-300 text-indigo-900 hover:bg-indigo-100"
                    >
                      #{p.number} {p.name}
                    </button>
                  );
                })}
                {selectedDayOfWeek === 5 && (weekType === 'odd' ? ['04', '09', '14', '15', '16', '10', '29', '25'] : ['04', '09', '14', '15', '16', '11', '32', '20', '25']).map((num) => {
                  const p = getProductByNum(num);
                  if (!p) return null;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => onSelectProduct(p)}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-white border border-rose-300 text-rose-900 hover:bg-rose-100"
                    >
                      #{p.number} {p.name}
                    </button>
                  );
                })}
                {selectedDayOfWeek === 6 && (weekType === 'odd' ? ['02', '08', '14', '10', '28', '25'] : ['02', '14', '17', 'device', '31', '25']).map((num) => {
                  const p = getProductByNum(num);
                  if (!p) return null;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => onSelectProduct(p)}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-white border border-cyan-300 text-cyan-900 hover:bg-cyan-100"
                    >
                      #{p.number} {p.name}
                    </button>
                  );
                })}
                {selectedDayOfWeek === 0 && (weekType === 'odd' ? ['03', 'p-mask-az100', '12', '29', '25'] : ['03', 'p-mask-hydrating', '13', '31', '25']).map((num) => {
                  const p = getProductByNum(num);
                  if (!p) return null;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => onSelectProduct(p)}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-white border border-rose-300 text-rose-900 hover:bg-rose-100"
                    >
                      #{p.number} {p.name}
                    </button>
                  );
                })}
                {selectedDayOfWeek === 1 && ['02', '09', '14', '15', '16', '28', '31', '25'].map((num) => {
                  const p = getProductByNum(num);
                  if (!p) return null;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => onSelectProduct(p)}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-white border border-blue-300 text-blue-900 hover:bg-blue-100"
                    >
                      #{p.number} {p.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Timer Launcher on Card 1 */}
            <div className="pt-3 mt-3 border-t border-purple-200/60">
              {selectedDayOfWeek === 2 && (
                <button
                  type="button"
                  onClick={() => onOpenTimerWithMode('bha')}
                  className="w-full py-2 px-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all hover:scale-[1.02]"
                >
                  <Timer className="w-4 h-4" /> 啟動水楊酸 3~5 分鐘倒數
                </button>
              )}
              {selectedDayOfWeek === 3 && (
                <div className="flex gap-2">
                  {weekType === 'even' ? (
                    <button
                      type="button"
                      onClick={() => onOpenTimerWithMode('mask')}
                      className="w-full py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all hover:scale-[1.02]"
                    >
                      <Timer className="w-4 h-4" /> 啟動保濕面膜 10~15 分鐘計時
                    </button>
                  ) : (
                    <div className="text-[11px] font-bold text-purple-900 bg-purple-100/70 px-2.5 py-1.5 rounded-xl w-full text-center">
                      ⚡ 離子導出建議滑動 3 ～ 5 分鐘
                    </div>
                  )}
                </div>
              )}
              {selectedDayOfWeek === 0 && (
                <button
                  type="button"
                  onClick={() => onOpenTimerWithMode('mask')}
                  className="w-full py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all hover:scale-[1.02]"
                >
                  <Timer className="w-4 h-4" /> 啟動面膜 10~15 分鐘倒數
                </button>
              )}
              {selectedDayOfWeek === 4 && (
                <div className="text-[11px] font-bold text-indigo-900 bg-indigo-100/70 px-2.5 py-1.5 rounded-xl text-center">
                  ⚠️ 關鍵鐵則：眼霜先擦隔離，豌豆大小避開眼周
                </div>
              )}
              {selectedDayOfWeek === 6 && (
                <div className="text-[11px] font-bold text-stone-700 bg-stone-100 px-2.5 py-1.5 rounded-xl text-center">
                  {weekType === 'odd' ? '🫧 酵素洗顏代謝角質，當晚暫停酸類' : '⚡ 離子溫感導入胜肽安瓶 5 分鐘'}
                </div>
              )}
              {(selectedDayOfWeek === 1 || selectedDayOfWeek === 5) && (
                <div className="text-[11px] font-bold text-stone-700 bg-stone-100 px-2.5 py-1.5 rounded-xl text-center">
                  {selectedDayOfWeek === 5 && weekType === 'even' ? '🎯 下巴局部點塗鋅控油，兩頰不碰' : '💧 溫和舒緩修復，穩定屏障健康'}
                </div>
              )}
            </div>
          </div>

          {/* Card 2: 每日黃金安全間隔 (Thorne B 群 1 小時倒數) */}
          <div className="rounded-2xl p-4 border border-amber-200/90 bg-gradient-to-br from-amber-50/70 via-yellow-50/30 to-white flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow">
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-600" />
                  <span>每日早晨處方防禦</span>
                </span>
                <span className="text-[11px] font-bold text-amber-800">間隔 60 分鐘</span>
              </div>

              <div>
                <h4 className="font-extrabold text-stone-900 text-sm leading-snug">
                  Thorne 基本活性 B 群黃金服用間隔
                </h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  早餐飯後已隨餐吃 PTU 3顆 ＋ 癲鍵錠 1顆，必須**間隔 60 分鐘**再吃 Thorne B 群，避免高活性 B 群與早晨處方藥產生吸收競爭或代謝干擾！
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-100/60 border border-amber-200 text-amber-950 text-[11px] font-medium">
                <span>💡 叮嚀：B 群會使尿液呈現鮮黃色為正常 B2 代謝現象；多補充水分促進循環。</span>
              </div>
            </div>

            {/* Quick Timer for B-Complex */}
            <div className="pt-3 mt-3 border-t border-amber-200/60">
              <button
                type="button"
                onClick={() => onOpenTimerWithMode('bcomplex')}
                className="w-full py-2 px-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all hover:scale-[1.02]"
              >
                <Timer className="w-4 h-4" /> 啟動 B 群 60 分鐘間隔倒數
              </button>
            </div>
          </div>

          {/* Card 3: 分區鎖水與隨餐脂溶性營養提醒 */}
          <div className="rounded-2xl p-4 border border-rose-200/90 bg-gradient-to-br from-rose-50/70 via-stone-50 to-white flex flex-col justify-between shadow-2xs hover:shadow-xs transition-shadow sm:col-span-2 lg:col-span-1">
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-rose-600" />
                  <span>乾肌 vs 粉刺分流</span>
                </span>
                <span className="text-[11px] font-bold text-rose-800">分區鐵則</span>
              </div>

              <div>
                <h4 className="font-extrabold text-stone-900 text-sm leading-snug">
                  兩頰滋潤封層 ＆ 下巴清爽防痘
                </h4>
                <div className="mt-2 space-y-1.5 text-xs text-stone-700">
                  <div className="flex items-start gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0" />
                    <span>
                      <strong>兩頰乾肌：</strong>
                      {weekType === 'odd' ? '擦 #28 S.NATURE 角鯊烷霜補水鎖水' : '擦 #31 契爾氏冰河醣蛋白霜深層封層'}
                    </span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1 shrink-0" />
                    <span>
                      <strong>下巴粉刺：</strong>
                      擦 #25 MUJI 米糠乳液與 #09 小林抗痘水，嚴禁厚霜以免悶痘！
                    </span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
                    <span>
                      <strong>午餐營養：</strong>
                      D3 (2錠) ＋ 魚油 (1粒) ＋ 蔓越莓 (1-2粒) 隨餐好油脂高效吸收
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-rose-200/60 flex items-center justify-between text-[11px] text-stone-600">
              <span className="font-semibold">已登錄 41 項外用品與 6 款身體乳</span>
              <span className="font-mono font-bold text-rose-600">100% 依循攻略</span>
            </div>
          </div>
        </div>
      </section>

      {/* PHASE 1: ☀️ 早餐用藥與晨間保養 */}
      <section className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 bg-linear-to-r from-amber-50/70 via-rose-50/40 to-white border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500 text-white rounded-2xl shadow-sm shadow-amber-500/20">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                  時段：07:30 - 08:30
                </span>
                <h3 className="font-extrabold text-stone-900 text-base sm:text-lg">
                  早晨用藥 ＋ 晨間精準保養
                </h3>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                早餐飯後隨餐服用處方藥與 BHK's 奢光錠，接續完成日間素顏透亮保養
              </p>
            </div>
          </div>
          <button
            onClick={() => toggleSection('morningMeds')}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition-colors"
          >
            {expandedSections.morningMeds ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {expandedSections.morningMeds && (
          <div className="p-5 sm:p-6 space-y-5">
            {/* 處方藥 & 保健品卡片群 */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-stone-700 tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                第一步：早餐飯後隨餐用藥與亮白抗氧化（共 4 項）
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* PTU */}
                <div 
                  onClick={() => handleCheckboxClick('rx-1')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    completedItemIds.includes('rx-1')
                      ? 'bg-stone-50/80 border-stone-200 opacity-75'
                      : 'bg-white border-stone-200 hover:border-amber-400 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                      處方藥・抗甲狀腺
                    </span>
                    <button type="button" className="text-stone-400">
                      {completedItemIds.includes('rx-1') ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <div className="mt-2 space-y-1">
                    <h5 className="font-bold text-stone-900 text-sm">{PRESCRIPTION_MEDS[0].name}</h5>
                    <p className="text-xs font-semibold text-rose-600">{PRESCRIPTION_MEDS[0].dosage}</p>
                    <p className="text-[11px] text-stone-700 bg-rose-50/70 p-1.5 rounded-lg border border-rose-200/60 leading-tight">
                      <strong>功效：</strong>{PRESCRIPTION_MEDS[0].efficacy}
                    </p>
                    <p className="text-[11px] text-stone-500">{PRESCRIPTION_MEDS[0].instructions}</p>
                  </div>
                </div>

                {/* 癲鍵錠 */}
                <div 
                  onClick={() => handleCheckboxClick('rx-2')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    completedItemIds.includes('rx-2')
                      ? 'bg-stone-50/80 border-stone-200 opacity-75'
                      : 'bg-white border-stone-200 hover:border-amber-400 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      處方藥・情緒/抗痙攣
                    </span>
                    <button type="button" className="text-stone-400">
                      {completedItemIds.includes('rx-2') ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <div className="mt-2 space-y-1">
                    <h5 className="font-bold text-stone-900 text-sm">{PRESCRIPTION_MEDS[1].name}</h5>
                    <p className="text-xs font-semibold text-blue-600">{PRESCRIPTION_MEDS[1].dosage}</p>
                    <p className="text-[11px] text-stone-700 bg-blue-50/70 p-1.5 rounded-lg border border-blue-200/60 leading-tight">
                      <strong>功效：</strong>{PRESCRIPTION_MEDS[1].efficacy}
                    </p>
                    <p className="text-[11px] text-stone-500">{PRESCRIPTION_MEDS[1].instructions}</p>
                  </div>
                </div>

                {/* 8VC 維生素 C 粉 */}
                <div 
                  onClick={() => handleCheckboxClick('sup-1')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    completedItemIds.includes('sup-1')
                      ? 'bg-stone-50/80 border-stone-200 opacity-75'
                      : 'bg-yellow-50/40 border-yellow-200/80 hover:border-yellow-400 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                      #01 內服・頂級抗氧化
                    </span>
                    <button type="button" className="text-stone-400">
                      {completedItemIds.includes('sup-1') ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <div className="mt-2 space-y-1">
                    <h5 className="font-bold text-stone-900 text-sm">{ORAL_SUPPLEMENTS[0].name}</h5>
                    <p className="text-xs font-semibold text-yellow-700">{ORAL_SUPPLEMENTS[0].recommendedDose}</p>
                    <p className="text-[11px] text-yellow-900/80 font-medium leading-relaxed">
                      8 重釋放型高純度維生素 C，抗氧化淡斑與抑制黑色素。
                    </p>
                    <p className="text-[11px] text-stone-500">避開睡前；與早晨處方藥建議間隔 1 小時。</p>
                  </div>
                </div>

                {/* BHK's 奢光錠 */}
                <div 
                  onClick={() => handleCheckboxClick('sup-2')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    completedItemIds.includes('sup-2')
                      ? 'bg-stone-50/80 border-stone-200 opacity-75'
                      : 'bg-amber-50/40 border-amber-200/80 hover:border-amber-400 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      #02 內服・亮白抗氧化
                    </span>
                    <button type="button" className="text-stone-400">
                      {completedItemIds.includes('sup-2') ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <div className="mt-2 space-y-1">
                    <h5 className="font-bold text-stone-900 text-sm">{ORAL_SUPPLEMENTS[1].name}</h5>
                    <p className="text-xs font-semibold text-amber-700">{ORAL_SUPPLEMENTS[1].recommendedDose}</p>
                    <p className="text-[11px] text-amber-900/80 font-medium leading-relaxed">
                      已移至白天隨餐吃！徹底遠離夜間安眠藥物。
                    </p>
                    <p className="text-[11px] text-stone-500">隨餐吸收更佳，協同抗氧化亮白。</p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-stone-100" />

            {/* 💄 / 🌿 晨間路線切換看板 (素顏日 vs 全妝日) */}
            <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200/90 space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-stone-500">
                      今日晨間上妝設定
                    </span>
                    <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                      isMakeupDay 
                        ? 'bg-rose-100 text-rose-800 border border-rose-300' 
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}>
                      {isMakeupDay ? '💄 全妝日啟動中' : '🌿 素顏日啟動中'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    系統已自動針對妳所選的模式，動態調整 Step 5-7 的眼霜打底、兩頰面霜、下巴分流與防曬校色！
                  </p>
                </div>

                {/* Top Quick Segmented Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-stone-200 self-start sm:self-auto shadow-2xs">
                  <button
                    type="button"
                    onClick={() => onToggleMakeupDay?.(false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      !isMakeupDay
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    <span>🌿 素顏快速日</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleMakeupDay?.(true)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isMakeupDay
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    <span>💄 週末全妝日</span>
                  </button>
                </div>
              </div>

              {/* Dual Visual Route Selection Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                {/* Route A: 素顏快速日 */}
                <div
                  onClick={() => onToggleMakeupDay?.(false)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    !isMakeupDay
                      ? 'bg-emerald-50/80 border-emerald-400 shadow-xs ring-2 ring-emerald-500/20'
                      : 'bg-white border-stone-200 hover:border-emerald-300 hover:bg-stone-50/50 opacity-80'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🌿</span>
                        <h4 className="font-extrabold text-stone-900 text-sm">
                          路線 A：素顏快速出門日
                        </h4>
                      </div>
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        !isMakeupDay
                          ? 'bg-emerald-600 text-white shadow-2xs'
                          : 'bg-stone-100 text-stone-500'
                      }`}>
                        {!isMakeupDay ? '✓ 正在套用' : '點擊啟用'}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      <strong>核心策略：</strong>自然透亮水光 ＋ 減法出門。眼周日常撫紋，兩頰充足鎖水，均勻塗抹 <strong>#38 d’Alba 黛爾泊粉光校色防曬霜</strong>，自帶水潤好氣色，不需疊加粉底！
                    </p>

                    <div className="pt-1 flex flex-wrap gap-1.5 text-[11px]">
                      <span className="bg-white/90 border border-emerald-200 text-emerald-800 px-2 py-0.5 rounded-md font-medium">
                        眼周：#35 紫熨斗 / #36 檸檬
                      </span>
                      <span className="bg-white/90 border border-emerald-200 text-emerald-800 px-2 py-0.5 rounded-md font-medium">
                        面霜：兩頰乳霜 / 下巴 #25 米糠乳
                      </span>
                      <span className="bg-white/90 border border-emerald-200 text-emerald-800 px-2 py-0.5 rounded-md font-medium">
                        防曬：#38 粉光防曬直接完工
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-emerald-200/60 flex items-center justify-between text-[11px] text-emerald-800 font-medium">
                    <span>適合：平日上班、居家辦公、日常採買</span>
                    <span className="font-bold">快速 5 分鐘出門</span>
                  </div>
                </div>

                {/* Route B: 週末全妝日 */}
                <div
                  onClick={() => onToggleMakeupDay?.(true)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    isMakeupDay
                      ? 'bg-rose-50/80 border-rose-400 shadow-xs ring-2 ring-rose-500/20'
                      : 'bg-white border-stone-200 hover:border-rose-300 hover:bg-stone-50/50 opacity-80'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">💄</span>
                        <h4 className="font-extrabold text-stone-900 text-sm">
                          路線 B：完整全妝保濕打底日（防起屑減法版）
                        </h4>
                      </div>
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        isMakeupDay
                          ? 'bg-rose-600 text-white shadow-2xs'
                          : 'bg-stone-100 text-stone-500'
                      }`}>
                        {isMakeupDay ? '✓ 正在套用' : '點擊啟用'}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      <strong>核心策略：</strong>前導減法防搓泥 ＋ 兩頰極致貼妝 ＋ 眼下防卡粉。使用 <strong>#37 BOBBI BROWN 眼霜</strong> 與 <strong>#33 橘子霜</strong> 打底，接續 <strong>#39 曼秀雷敦透明防曬</strong> 與妝前乳！
                    </p>

                    <div className="pt-1 flex flex-wrap gap-1.5 text-[11px]">
                      <span className="bg-white/90 border border-rose-200 text-rose-800 px-2 py-0.5 rounded-md font-medium">
                        眼下：#37 BOBBI BROWN 打底眼霜
                      </span>
                      <span className="bg-white/90 border border-rose-200 text-rose-800 px-2 py-0.5 rounded-md font-medium">
                        兩頰：#33 橘子霜貼妝
                      </span>
                      <span className="bg-amber-100 border border-amber-300 text-amber-900 px-2 py-0.5 rounded-md font-bold">
                        ⚠️ 下巴嚴禁橘子霜・改擦 #25
                      </span>
                      <span className="bg-white/90 border border-rose-200 text-rose-800 px-2 py-0.5 rounded-md font-medium">
                        防曬：#39 曼秀雷敦 ＋ 植村秀妝前
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-rose-200/60 flex items-center justify-between text-[11px] text-rose-800 font-medium">
                    <span>適合：約會聚會、正式場合、精緻全妝</span>
                    <span className="font-bold">全天服貼不脫妝</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 晨間保養 7 步驟清單 */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-stone-700 tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  第二步：晨間分區保養程序（已為妳客製化當前路線，點擊卡片完成打卡）
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md self-start sm:self-auto ${
                  isMakeupDay ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'
                }`}>
                  目前執行：{isMakeupDay ? '💄 全妝日保養清單' : '🌿 素顏日保養清單'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {MORNING_ROUTINE.skincareSteps.map((step) => {
                  const stepId = `am-step-${step.step}`;
                  const isDone = completedItemIds.includes(stepId);
                  
                  // Compute tailored info per step
                  let stepTitle = step.title;
                  let activeNums: string[] = [];
                  let displayDetails = step.details;
                  let specialTip: string | null = null;
                  let routeBadge: { text: string; bg: string } | null = null;

                  if (step.step === 1) {
                    stepTitle = '溫和胺基酸洗顏';
                    activeNums = ['06'];
                    displayDetails = '早晨以溫水配合溫和胺基酸洗面乳洗除睡眠皮脂，保留肌膚天然水分屏障，洗後以乾淨毛巾輕柔按乾。';
                  } else if (step.step === 2) {
                    stepTitle = '前導打底精華';
                    activeNums = ['14', '15'];
                    displayDetails = isMakeupDay
                      ? '黛珂小紫瓶 1 下，手溫輕按壓吸收即可。隨後搭配 #15 黛珂極光精粹按壓 1 泵勻亮暗沉。'
                      : '黛珂小紫瓶 1~2 下，以手溫按拍全臉深度喚醒肌膚角質吸收通道；接續 #15 黛珂極光煥采精粹 (1.8X) 勻亮暗沉與淡斑。';
                    specialTip = '⚠️ 嚴格用手溫輕壓按拍，絕對不用化妝棉擦拭！';
                  } else if (step.step === 3) {
                    stepTitle = '晨間舒緩水光噴霧';
                    activeNums = weekType === 'odd' ? ['12'] : ['13'];
                    displayDetails = weekType === 'odd'
                      ? '【奇數週】噴上 #12 BOH 維他命 B5 積雪草保濕修護潤澤噴霧，全臉輕潤補水、鎮靜舒緩。'
                      : '【偶數週】噴上 #13 Ongredients 屏障鎮靜水光噴霧，細緻水霧修護角質屏障。';
                  } else if (step.step === 4) {
                    stepTitle = '日間精華分流';
                    activeNums = weekType === 'odd' ? ['19', '16'] : ['16'];
                    displayDetails = weekType === 'odd'
                      ? '【奇數週日間】薄擦 #19 ANUA 桃子菸鹼醯胺精華 或 #16 Torriden 玻尿酸保濕精華補充水分。'
                      : '【偶數週日間】使用 #16 Torriden 玻尿酸保濕精華深層補水撫平乾燥。';
                  } else if (step.step === 5) {
                    if (isMakeupDay) {
                      stepTitle = '眼下妝前保濕打底（防遮瑕卡紋）';
                      activeNums = ['37'];
                      routeBadge = { text: '💄 全妝打底專用', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
                      displayDetails = '使用 #37 BOBBI BROWN 維他命完美眼霜，無名指取米粒大小於眼下輕按推勻，等待 1 分鐘完全貼合成膜，阻絕後續遮瑕膏卡紋與結塊！';
                      specialTip = '💡 妝前關鍵：眼下成膜後再上遮瑕，持妝整天不卡乾紋！';
                    } else {
                      stepTitle = '眼周日常撫紋抗痕保濕';
                      activeNums = ['35', '36', '34'];
                      routeBadge = { text: '🌿 素顏撫紋專用', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
                      displayDetails = '素顏日交替使用 #35 巴黎萊雅紫熨斗 MAX、#36 檸檬/Neogene 眼霜 或 #34 雅詩蘭黛眼霜，輕柔按摩撫平細紋，保濕潤澤不黏膩。';
                    }
                  } else if (step.step === 6) {
                    if (isMakeupDay) {
                      stepTitle = '兩頰妝前橘子霜打底 ＆ 下巴清爽防痘';
                      activeNums = ['33', '25'];
                      routeBadge = { text: '💄 全妝分區貼妝', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
                      displayDetails = '【兩頰乾肌】薄擦 #33 BOBBI BROWN 維他命完美面霜（橘子霜），撫平乾皮起屑打造極致平滑貼妝感！\n【下巴粉刺區】嚴格避開橘子霜，僅薄擦清爽的 #25 MUJI 米糠發酵乳液，維持油水平衡。';
                      specialTip = '📍 分區鐵則：下巴粉刺區嚴禁擦橘子霜或厚面霜，預防悶痘！';
                    } else {
                      stepTitle = '分區精準保濕（兩頰滋潤／下巴清爽）';
                      activeNums = weekType === 'odd' ? ['26', '25'] : ['30', '25'];
                      routeBadge = { text: '🌿 素顏分區鎖水', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
                      displayDetails = weekType === 'odd'
                        ? '【兩頰乾肌】薄擦 #26 品木宣言靈芝乳液 2.0（或 #28 S.NATURE 角鯊烷霜）長效鎖水。\n【下巴粉刺區】固定薄擦 #25 MUJI 米糠發酵乳液，維持清爽不泛油。'
                        : '【兩頰乾肌】薄擦 #30 黛珂超微導全能修護霜（或 #27 AQ 柔膚乳）柔軟角質、鎖住滋潤。\n【下巴粉刺區】薄擦 #25 MUJI 米糠乳液，嚴禁厚霜以免悶痘。';
                      specialTip = '📍 下巴僅擦 #25 米糠乳液，嚴禁任何厚霜以免悶痘！';
                    }
                  } else if (step.step === 7) {
                    if (isMakeupDay) {
                      stepTitle = '透明玻尿酸防曬 ＋ 局部校色打底';
                      activeNums = ['39'];
                      routeBadge = { text: '💄 全妝防曬底妝', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
                      displayDetails = '全臉均勻塗抹 #39 曼秀雷敦水潤肌高濃度玻尿酸防曬精華，水感透明無粉感；靜置 3～5 分鐘成膜後，於嘴角與暗沉蠟黃處局部點塗植村秀無極限妝前乳校色，接續粉底彩妝！';
                      specialTip = '✨ 曼秀雷敦透明水感成膜快，不與底妝打架、杜絕起屑搓泥！';
                    } else {
                      stepTitle = '自然水光校色提亮防曬（完工出門）';
                      activeNums = ['38'];
                      routeBadge = { text: '🌿 素顏好氣色', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
                      displayDetails = '均勻塗抹足量 #38 d’Alba 黛爾泊水潤粉光校色提亮防曬霜 (SPF50+ PA++++)，自帶透亮水光好氣色，不需疊加粉底即可自信出門！';
                      specialTip = '🌟 自然粉光提亮，兼具頂級防曬與水潤透光感！';
                    }
                  }

                  return (
                    <div
                      key={step.step}
                      onClick={() => handleCheckboxClick(stepId)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isDone
                          ? 'bg-stone-50/80 border-stone-200 opacity-75'
                          : routeBadge && isMakeupDay
                          ? 'bg-rose-50/30 border-rose-200 hover:border-rose-400 hover:shadow-xs'
                          : routeBadge && !isMakeupDay
                          ? 'bg-emerald-50/30 border-emerald-200 hover:border-emerald-400 hover:shadow-xs'
                          : 'bg-white border-stone-200 hover:border-stone-400 hover:shadow-xs'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                              步驟 {step.step}：{stepTitle}
                            </span>
                            {routeBadge && (
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${routeBadge.bg}`}>
                                {routeBadge.text}
                              </span>
                            )}
                          </div>
                          <button type="button" className="text-stone-400 shrink-0">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-50" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        {/* Product tags */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {activeNums.map((num) => {
                            const p = getProductByNum(num);
                            if (!p) return null;
                            return (
                              <button
                                key={num}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSelectProduct(p);
                                }}
                                className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 flex items-center gap-1"
                              >
                                <span>#{p.number}</span>
                                <span className="truncate max-w-[120px]">{p.name}</span>
                              </button>
                            );
                          })}
                          {step.step === 7 && isMakeupDay && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
                              植村秀保濕妝前乳
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-stone-600 leading-relaxed whitespace-pre-line">
                          {displayDetails}
                        </p>
                      </div>

                      {specialTip && (
                        <div className={`mt-2 text-[10px] font-bold px-2 py-1 rounded-lg ${
                          specialTip.includes('分區') || specialTip.includes('下巴')
                            ? 'text-amber-800 bg-amber-50 border border-amber-200'
                            : specialTip.includes('妝前') || specialTip.includes('杜絕')
                            ? 'text-rose-800 bg-rose-50 border border-rose-200'
                            : 'text-stone-700 bg-stone-100'
                        }`}>
                          {specialTip}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* PHASE 2: ⚡ 早餐後 1 小時 Thorne B 群 */}
      <section className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 bg-linear-to-r from-yellow-50/80 via-amber-50/40 to-white border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-yellow-500 text-white rounded-2xl shadow-sm shadow-yellow-500/20">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-yellow-100 text-yellow-900">
                  時段：09:00 - 09:30（早餐後 1 小時）
                </span>
                <h3 className="font-extrabold text-stone-900 text-base sm:text-lg">
                  活力補充：Thorne B 群（黃金間隔守則）
                </h3>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                已與早餐處方藥間隔 60 分鐘，安全避開吸收競爭與代謝交互作用
              </p>
            </div>
          </div>
          <button
            onClick={() => toggleSection('bComplex')}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition-colors"
          >
            {expandedSections.bComplex ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {expandedSections.bComplex && (
          <div className="p-5 sm:p-6">
            <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div 
                onClick={() => handleCheckboxClick('sup-4')}
                className="flex items-start gap-3 cursor-pointer flex-1"
              >
                <button type="button" className="text-stone-400 mt-0.5">
                  {completedItemIds.includes('sup-4') ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-50" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      #04 內服保健品
                    </span>
                    <h4 className="font-bold text-stone-900 text-base">{ORAL_SUPPLEMENTS[3].name}</h4>
                    <span className="text-xs font-bold text-amber-700">1 粒（每日一次）</span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    促進全日能量代謝、支援神經與皮膚黏膜健康。尿液變黃為正常 B2 代謝現象。
                  </p>
                  <p className="text-xs font-semibold text-rose-600 mt-1">
                    ⚠️ 嚴格與早晨 PTU 及癲鍵錠相隔 1 小時服用！
                  </p>
                </div>
              </div>

              {/* Quick action: Trigger 60-min timer */}
              <div className="shrink-0 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenTimerWithMode('bcomplex')}
                  className="px-3.5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Timer className="w-4 h-4" /> 啟動 60 分鐘倒數
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* PHASE 3: 🥗 午餐隨餐營養 ＋ 水分打卡 */}
      <section className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 bg-linear-to-r from-emerald-50/70 via-teal-50/40 to-white border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600 text-white rounded-2xl shadow-sm shadow-emerald-600/20">
              <Droplet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                  時段：12:30 - 13:30（午餐隨餐，或晚餐吃）
                </span>
                <h3 className="font-extrabold text-stone-900 text-base sm:text-lg">
                  隨餐營養：D3 ＋ 魚油 ＋ 蔓越莓
                </h3>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                脂溶性維生素搭配正餐好油脂高效吸收，體內抗發炎、抑制下巴痘痘並守護私密處
              </p>
            </div>
          </div>
          <button
            onClick={() => toggleSection('lunchSupplements')}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition-colors"
          >
            {expandedSections.lunchSupplements ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {expandedSections.lunchSupplements && (
          <div className="p-5 sm:p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* D3 */}
              <div 
                onClick={() => handleCheckboxClick('sup-3')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  completedItemIds.includes('sup-3')
                    ? 'bg-stone-50/80 border-stone-200 opacity-75'
                    : 'bg-white border-stone-200 hover:border-emerald-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      #03 脂溶性・屏障強化
                    </span>
                    <button type="button" className="text-stone-400">
                      {completedItemIds.includes('sup-3') ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <h5 className="font-bold text-stone-900 text-sm mt-2">{ORAL_SUPPLEMENTS[2].name}</h5>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">{ORAL_SUPPLEMENTS[2].recommendedDose}</p>
                  <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                    {ORAL_SUPPLEMENTS[2].whyThisTime}
                  </p>
                </div>
                <div className="mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
                  🥑 脂溶性：必須搭配午或晚餐肉類好油脂
                </div>
              </div>

              {/* 魚油 */}
              <div 
                onClick={() => handleCheckboxClick('sup-5')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  completedItemIds.includes('sup-5')
                    ? 'bg-stone-50/80 border-stone-200 opacity-75'
                    : 'bg-white border-stone-200 hover:border-emerald-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200">
                      #05 脂溶性・體內抗發炎
                    </span>
                    <button type="button" className="text-stone-400">
                      {completedItemIds.includes('sup-5') ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <h5 className="font-bold text-stone-900 text-sm mt-2">{ORAL_SUPPLEMENTS[4].name}</h5>
                  <p className="text-xs font-semibold text-cyan-700 mt-0.5">{ORAL_SUPPLEMENTS[4].recommendedDose}</p>
                  <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                    強效抗發炎，從體內調理下巴反覆痘痘，同時滋潤兩頰乾肌。
                  </p>
                </div>
                <div className="mt-2 text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2 py-1 rounded-lg">
                  🐟 隨餐吃吸收好且不易打嗝有魚腥味
                </div>
              </div>

              {/* 蔓越莓 */}
              <div 
                onClick={() => handleCheckboxClick('sup-6')}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  completedItemIds.includes('sup-6')
                    ? 'bg-stone-50/80 border-stone-200 opacity-75'
                    : 'bg-white border-stone-200 hover:border-emerald-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                      #06 私密處防護＆抗自由基
                    </span>
                    <button type="button" className="text-stone-400">
                      {completedItemIds.includes('sup-6') ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <h5 className="font-bold text-stone-900 text-sm mt-2">{ORAL_SUPPLEMENTS[5].name}</h5>
                  <p className="text-xs font-semibold text-rose-700 mt-0.5">{ORAL_SUPPLEMENTS[5].recommendedDose}</p>
                  <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                    36:1 濃縮 PACs 前花青素，協同對抗慢性發炎與提升身體防護力。
                  </p>
                </div>
                <div className="mt-2 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-1 rounded-lg">
                  💧 配合多喝溫開水加乘代謝循環
                </div>
              </div>
            </div>

            {/* Hydration tracker */}
            <WaterTracker currentMl={waterIntakeMl} onUpdate={onUpdateWater} />
          </div>
        )}
      </section>

      {/* PHASE 4: 🌙 晚間分區主題保養 (按星期與奇偶週動態帶出) */}
      <section className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 bg-linear-to-r from-purple-50/70 via-rose-50/40 to-white border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-600 text-white rounded-2xl shadow-sm shadow-purple-600/20">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">
                  時段：20:30 - 21:30
                </span>
                <h3 className="font-extrabold text-stone-900 text-base sm:text-lg">
                  晚間主題洗卸 ＆ 分區修護保養
                </h3>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                今日主題：{dayRoutine.dayName}【{dayRoutine.themeTitle}】({weekType === 'odd' ? '奇數週' : '偶數週'})
              </p>
            </div>
          </div>
          <button
            onClick={() => toggleSection('nightSkincare')}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition-colors"
          >
            {expandedSections.nightSkincare ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {expandedSections.nightSkincare && (
          <div className="p-5 sm:p-6 space-y-5">
            {/* 妝容對應洗卸指引 (素顏日 vs 全妝日) */}
            <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              isMakeupDay
                ? 'bg-rose-50/80 border-rose-300 text-rose-950 shadow-2xs'
                : 'bg-emerald-50/80 border-emerald-300 text-emerald-950 shadow-2xs'
            }`}>
              <div className="flex items-start sm:items-center gap-3">
                <div className={`p-2 rounded-xl text-white font-bold shrink-0 ${
                  isMakeupDay ? 'bg-rose-500' : 'bg-emerald-600'
                }`}>
                  {isMakeupDay ? '💄' : '🌿'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm">
                      {isMakeupDay ? '今日為全妝日：主力卸妝指定使用【#02 MUJI 溫和卸妝油】' : '今日為素顏日：溫和輕卸即可，守護角質屏障'}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isMakeupDay ? 'bg-rose-200 text-rose-800' : 'bg-emerald-200 text-emerald-800'
                    }`}>
                      {isMakeupDay ? '徹底乳化防殘留' : '輕柔洗淨無負擔'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {isMakeupDay
                      ? '乾手乾臉取適量卸妝油按摩全臉與眼周遮瑕處，加少量溫水徹底乳化至乳白色後沖淨，再接續 #06 綠茶胺基酸潔面乳二次清潔，確保毛孔完全潔淨不致痘！'
                      : '日間僅擦 #38 黛爾泊粉光防曬，夜間可使用 #04 維 C 去角質卸妝凝膠 或 #02 卸妝油輕卸，溫和洗除防曬即可，切勿大力搓揉過度清潔。'}
                  </p>
                </div>
              </div>

              {onToggleMakeupDay && (
                <button
                  type="button"
                  onClick={() => onToggleMakeupDay(!isMakeupDay)}
                  className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-stone-200 hover:border-stone-400 text-stone-800 transition-colors shadow-2xs"
                >
                  切換為{isMakeupDay ? '素顏日 🌿' : '全妝日 💄'}
                </button>
              )}
            </div>

            {/* 洗卸指引 Banner */}
            <div className="bg-stone-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                  今日指定洗卸搭配
                </span>
                <p className="text-sm font-medium text-stone-200 mt-0.5">
                  {currentNightDetails.cleansing}
                </p>
              </div>

              {/* Special quick timers based on day */}
              <div className="shrink-0 flex items-center gap-2">
                {selectedDayOfWeek === 2 && (
                  <button
                    type="button"
                    onClick={() => onOpenTimerWithMode('bha')}
                    className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition-colors"
                  >
                    <Timer className="w-3.5 h-3.5" /> 水楊酸 3-5分計時
                  </button>
                )}
                {(selectedDayOfWeek === 0 || (selectedDayOfWeek === 3 && weekType === 'even')) && (
                  <button
                    type="button"
                    onClick={() => onOpenTimerWithMode('mask')}
                    className="px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition-colors"
                  >
                    <Timer className="w-3.5 h-3.5" /> 面膜 10-15分計時
                  </button>
                )}
              </div>
            </div>

            {/* Steps timeline list */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-stone-700 tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                夜間依序保養步驟（點擊勾選）：
              </span>

              <div className="space-y-2.5">
                {currentNightDetails.steps.map((st, idx) => {
                  const stepId = `pm-step-${selectedDayOfWeek}-${weekType}-${idx}`;
                  const isDone = completedItemIds.includes(stepId);

                  return (
                    <div
                      key={idx}
                      onClick={() => handleCheckboxClick(stepId)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isDone
                          ? 'bg-stone-50/70 border-stone-200 opacity-75'
                          : 'bg-white border-stone-200 hover:border-purple-300 hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <button type="button" className="text-stone-400 mt-1 shrink-0">
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>

                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-black text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md">
                              步驟 {st.step}
                            </span>
                            <span className="font-bold text-stone-800 text-sm">
                              {st.label}
                            </span>
                            {st.zone && (
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                st.zone === '兩頰' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                                st.zone === '下巴' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                st.zone === '眼周' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                                'bg-stone-100 text-stone-700'
                              }`}>
                                部位：{st.zone}
                              </span>
                            )}
                          </div>

                          {/* Product pills */}
                          <div className="flex flex-wrap gap-1.5">
                            {st.productNumbers.map((num) => {
                              const p = getProductByNum(num);
                              if (!p) return null;
                              return (
                                <button
                                  key={num}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectProduct(p);
                                  }}
                                  className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100 flex items-center gap-1"
                                >
                                  <span>#{p.number}</span>
                                  <span>{p.brand} {p.name}</span>
                                </button>
                              );
                            })}
                          </div>

                          <p className="text-xs text-stone-600 leading-relaxed">
                            {st.details}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* PHASE 5: 💤 睡前處方安定用藥 */}
      <section className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 bg-linear-to-r from-indigo-50/70 via-slate-50/40 to-white border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-900 text-white rounded-2xl shadow-sm shadow-indigo-900/20">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-900">
                  時段：22:30 - 23:30（睡前 15~30 分鐘）
                </span>
                <h3 className="font-extrabold text-stone-900 text-base sm:text-lg">
                  睡前處方用藥（純淨入眠守則）
                </h3>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                單純服用精神安定與抗痙攣藥物，絕不再疊加任何保健品
              </p>
            </div>
          </div>
          <button
            onClick={() => toggleSection('bedtimeMeds')}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition-colors"
          >
            {expandedSections.bedtimeMeds ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {expandedSections.bedtimeMeds && (
          <div className="p-5 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* 癲必停 */}
              <div 
                onClick={() => handleCheckboxClick('rx-3')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  completedItemIds.includes('rx-3')
                    ? 'bg-stone-50/80 border-stone-200 opacity-75'
                    : 'bg-white border-stone-200 hover:border-indigo-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    處方藥・水溶性抗痙攣
                  </span>
                  <button type="button" className="text-stone-400">
                    {completedItemIds.includes('rx-3') ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="mt-2 space-y-1">
                  <h5 className="font-bold text-stone-900 text-sm">{PRESCRIPTION_MEDS[2].name}</h5>
                  <p className="text-xs font-semibold text-indigo-700">{PRESCRIPTION_MEDS[2].dosage}</p>
                  <p className="text-[11px] text-stone-700 bg-indigo-50/70 p-1.5 rounded-lg border border-indigo-200/60 leading-tight">
                    <strong>功效：</strong>{PRESCRIPTION_MEDS[2].efficacy}
                  </p>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    {PRESCRIPTION_MEDS[2].instructions}
                  </p>
                </div>
              </div>

              {/* 易靜錠 */}
              <div 
                onClick={() => handleCheckboxClick('rx-4')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  completedItemIds.includes('rx-4')
                    ? 'bg-stone-50/80 border-stone-200 opacity-75'
                    : 'bg-white border-stone-200 hover:border-indigo-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                    處方藥・鎮靜安眠
                  </span>
                  <button type="button" className="text-stone-400">
                    {completedItemIds.includes('rx-4') ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="mt-2 space-y-1">
                  <h5 className="font-bold text-stone-900 text-sm">{PRESCRIPTION_MEDS[3].name}</h5>
                  <p className="text-xs font-semibold text-slate-700">{PRESCRIPTION_MEDS[3].dosage}</p>
                  <p className="text-[11px] text-stone-700 bg-slate-50/80 p-1.5 rounded-lg border border-slate-200/60 leading-tight">
                    <strong>功效：</strong>{PRESCRIPTION_MEDS[3].efficacy}
                  </p>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    {PRESCRIPTION_MEDS[3].instructions}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50/50 border border-indigo-200/80 rounded-2xl p-3 text-xs text-indigo-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>
                <strong>安心守則：</strong> BHK's 奢光錠已完全移至白天餐後；睡前專注讓大腦神經放鬆，維持深層睡眠品質。
              </span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
