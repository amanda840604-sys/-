import React from 'react';
import { 
  Sparkles, 
  Calendar as CalendarIcon, 
  Clock, 
  Settings, 
  Volume2, 
  VolumeX, 
  Layers, 
  Pill, 
  ShieldAlert, 
  SlidersHorizontal,
  Timer,
  Activity
} from 'lucide-react';
import { WeekType } from '../types/routine';
import { formatChineseDate, getISOWeekNumber } from '../utils/dateUtils';

interface HeaderProps {
  currentDate: Date;
  selectedDayOfWeek: number; // 0 = Sun, 1 = Mon ...
  onSelectDayOfWeek: (day: number) => void;
  weekType: WeekType;
  onToggleWeekType: () => void;
  isAutoWeek: boolean;
  onResetAutoWeek: () => void;
  activeTab: 'today' | 'calendar' | 'weekly' | 'supplements' | 'makeup_cleansing' | 'radar' | 'skincare' | 'safety';
  setActiveTab: (tab: 'today' | 'calendar' | 'weekly' | 'supplements' | 'makeup_cleansing' | 'radar' | 'skincare' | 'safety') => void;
  onOpenTimer: () => void;
  onOpenSettings: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  todayCompletionRate: number; // 0 ~ 100
}

export const Header: React.FC<HeaderProps> = ({
  currentDate,
  selectedDayOfWeek,
  onSelectDayOfWeek,
  weekType,
  onToggleWeekType,
  isAutoWeek,
  onResetAutoWeek,
  activeTab,
  setActiveTab,
  onOpenTimer,
  onOpenSettings,
  soundEnabled,
  onToggleSound,
  todayCompletionRate
}) => {
  const isoWeekNum = getISOWeekNumber(currentDate);
  const daysOfWeek = [
    { num: 1, label: '週一', icon: '💧' },
    { num: 2, label: '週二', icon: '🧪' },
    { num: 3, label: '週三', icon: '🌿' },
    { num: 4, label: '週四', icon: '🌙' },
    { num: 5, label: '週五', icon: '💧' },
    { num: 6, label: '週六', icon: '🌟' },
    { num: 0, label: '週日', icon: '✨' },
  ];

  return (
    <header className="bg-white border-b border-stone-200/80 sticky top-0 z-40 backdrop-blur-md bg-white/95">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Logo & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-stone-900 font-sans">
                GlowSync
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                Amanda 專屬完整攻略版
              </span>
            </div>
            <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-0.5">
              <span>31項外用品 ＋ 美容儀 ＋ 5款保健品 ＋ 4項處方用藥</span>
            </p>
          </div>
        </div>

        {/* Current Date, Odd/Even Switcher & Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Date & Week Indicator */}
          <div className="hidden sm:flex items-center gap-2 bg-stone-100/80 px-3 py-1.5 rounded-2xl text-xs font-medium text-stone-700 border border-stone-200">
            <CalendarIcon className="w-3.5 h-3.5 text-stone-500" />
            <span>{formatChineseDate(currentDate)}</span>
            <span className="text-stone-300">|</span>
            <span className="text-stone-500">第 {isoWeekNum} 週</span>
          </div>

          {/* Odd/Even Week Toggle */}
          <div className="flex items-center bg-stone-100 p-1 rounded-2xl border border-stone-200">
            <button
              onClick={onToggleWeekType}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                weekType === 'odd'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-emerald-600 text-white shadow-xs'
              }`}
              title="點擊切換 奇數週 / 偶數週 輪替模式"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{weekType === 'odd' ? '奇數週 (Odd)' : '偶數週 (Even)'}</span>
            </button>

            {!isAutoWeek && (
              <button
                onClick={onResetAutoWeek}
                className="text-[10px] text-stone-400 hover:text-stone-700 px-1.5 py-0.5 hover:underline"
                title="恢復為今日真實週次"
              >
                自動
              </button>
            )}
          </div>

          {/* Timer Launcher */}
          <button
            onClick={onOpenTimer}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-2xl text-xs font-bold transition-colors"
            title="開啟水楊酸/面膜/B群計時器"
          >
            <Timer className="w-3.5 h-3.5 text-rose-600" />
            <span className="hidden md:inline">計時器</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-2xl border text-xs transition-colors ${
              soundEnabled
                ? 'bg-amber-50 border-amber-200 text-amber-700'
                : 'bg-stone-50 border-stone-200 text-stone-400 hover:text-stone-600'
            }`}
            title={soundEnabled ? '音效已開啟（點擊靜音）' : '音效已靜音（點擊開啟）'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Settings & Reminder Modal */}
          <button
            onClick={onOpenSettings}
            className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-2xl border border-stone-200 transition-colors"
            title="設定每日時段與匯出日曆"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 py-2">
        {/* Main View Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'today'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>今日主頁</span>
            {todayCompletionRate > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === 'today' ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-700'
              }`}>
                {todayCompletionRate}%
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'calendar'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5 text-rose-500" />
            <span>4週月曆總覽</span>
          </button>

          <button
            onClick={() => setActiveTab('weekly')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'weekly'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>早晚主題矩陣</span>
          </button>

          <button
            onClick={() => setActiveTab('supplements')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'supplements'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Pill className="w-3.5 h-3.5 text-amber-500" />
            <span>處方藥與保健品</span>
          </button>

          <button
            onClick={() => setActiveTab('makeup_cleansing')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'makeup_cleansing'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>週末上妝與洗卸</span>
          </button>

          <button
            onClick={() => setActiveTab('radar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'radar'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
            <span>配方雷達與缺口</span>
          </button>

          <button
            onClick={() => setActiveTab('skincare')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'skincare'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>全庫存 (33+5+4)</span>
          </button>

          <button
            onClick={() => setActiveTab('safety')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'safety'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>安全交互禁忌</span>
          </button>
        </div>

        {/* Quick Day of Week Selector */}
        {activeTab === 'today' && (
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
            <span className="text-[11px] font-semibold text-stone-600 mr-1 hidden sm:inline">查看星期：</span>
            {daysOfWeek.map((d) => {
              const isSelected = selectedDayOfWeek === d.num;
              const isActualToday = currentDate.getDay() === d.num;
              return (
                <button
                  key={d.num}
                  onClick={() => onSelectDayOfWeek(d.num)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                    isSelected
                      ? 'bg-rose-600 text-white font-bold shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
                  }`}
                >
                  <span>{d.icon}</span>
                  <span>{d.label}</span>
                  {isActualToday && (
                    <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-rose-500'}`} />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
