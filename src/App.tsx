import React, { useState, useEffect, useMemo } from 'react';
import { WeekType, SkincareProduct, ReminderConfig } from './types/routine';
import { getWeekType, getDateKey, formatChineseDate } from './utils/dateUtils';
import { Header } from './components/Header';
import { TodayTimeline } from './components/TodayTimeline';
import { WeeklyScheduleView } from './components/WeeklyScheduleView';
import { SupplementsView } from './components/SupplementsView';
import { SkincareCatalogView } from './components/SkincareCatalogView';
import { SafetyGuideView } from './components/SafetyGuideView';
import { MonthlyCalendarView } from './components/MonthlyCalendarView';
import { MakeupAndCleansingView } from './components/MakeupAndCleansingView';
import { RadarAnalysisView } from './components/RadarAnalysisView';
import { RoutineTimerModal } from './components/RoutineTimerModal';
import { ReminderSettingsModal } from './components/ReminderSettingsModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { playChime, playSuccessChime } from './utils/audio';

const DEFAULT_REMINDER_CONFIG: ReminderConfig = {
  enabled: true,
  soundEnabled: true,
  times: {
    breakfast: '08:00',
    bComplexOffset: 60,
    lunch: '12:30',
    nightSkincare: '21:00',
    bedtime: '23:00'
  }
};

export default function App() {
  const [currentDate] = useState<Date>(() => new Date());
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<number>(() => new Date().getDay());
  
  // Week computation
  const autoCalculatedWeekType = useMemo(() => getWeekType(currentDate), [currentDate]);
  const [weekType, setWeekType] = useState<WeekType>(autoCalculatedWeekType);
  const [isAutoWeek, setIsAutoWeek] = useState<boolean>(true);

  // Tabs
  const [activeTab, setActiveTab] = useState<'today' | 'calendar' | 'weekly' | 'supplements' | 'makeup_cleansing' | 'radar' | 'skincare' | 'safety'>('calendar');

  // Completed Day Numbers in 4-Week Cycle
  const [completedDayNumbers, setCompletedDayNumbers] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('glowsync_completed_cycle_days');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Daily Log Persistence
  const dateKey = useMemo(() => getDateKey(currentDate), [currentDate]);
  const [completedItemIds, setCompletedItemIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`glowsync_log_${dateKey}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [waterIntakeMl, setWaterIntakeMl] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`glowsync_water_${dateKey}`);
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  // Reminder settings
  const [reminderConfig, setReminderConfig] = useState<ReminderConfig>(() => {
    try {
      const saved = localStorage.getItem('glowsync_reminder_config');
      return saved ? JSON.parse(saved) : DEFAULT_REMINDER_CONFIG;
    } catch {
      return DEFAULT_REMINDER_CONFIG;
    }
  });

  // Modals
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [timerMode, setTimerMode] = useState<'bha' | 'mask' | 'bcomplex'>('bha');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<SkincareProduct | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`glowsync_log_${dateKey}`, JSON.stringify(completedItemIds));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [completedItemIds, dateKey]);

  useEffect(() => {
    try {
      localStorage.setItem(`glowsync_water_${dateKey}`, String(waterIntakeMl));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [waterIntakeMl, dateKey]);

  // Makeup Day State (Natural vs Full Makeup)
  const [isMakeupDay, setIsMakeupDay] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(`glowsync_makeup_day_${dateKey}`);
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const handleToggleMakeupDay = (val?: boolean) => {
    setIsMakeupDay((prev) => {
      const next = typeof val === 'boolean' ? val : !prev;
      try {
        localStorage.setItem(`glowsync_makeup_day_${dateKey}`, JSON.stringify(next));
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }
      return next;
    });
    if (reminderConfig.soundEnabled) {
      playChime(520, 680);
    }
  };

  const handleSaveReminderConfig = (newConfig: ReminderConfig) => {
    setReminderConfig(newConfig);
    try {
      localStorage.setItem('glowsync_reminder_config', JSON.stringify(newConfig));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  };

  const handleToggleItem = (id: string) => {
    setCompletedItemIds((prev) => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleWeekType = () => {
    setIsAutoWeek(false);
    setWeekType(prev => prev === 'odd' ? 'even' : 'odd');
    if (reminderConfig.soundEnabled) {
      playChime(660, 880);
    }
  };

  const handleResetAutoWeek = () => {
    setIsAutoWeek(true);
    setWeekType(autoCalculatedWeekType);
  };

  const handleOpenTimerWithMode = (mode: 'bha' | 'mask' | 'bcomplex') => {
    setTimerMode(mode);
    setIsTimerOpen(true);
  };

  // Completion calculation for header indicator
  const todayCompletionRate = useMemo(() => {
    // Basic weight estimate
    const totalExpected = 18;
    return Math.min(100, Math.round((completedItemIds.length / totalExpected) * 100));
  }, [completedItemIds]);

  const handleToggleDayCompleted = (dayNumber: number) => {
    setCompletedDayNumbers((prev) => {
      const updated = prev.includes(dayNumber) 
        ? prev.filter(d => d !== dayNumber) 
        : [...prev, dayNumber];
      try {
        localStorage.setItem('glowsync_completed_cycle_days', JSON.stringify(updated));
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }
      return updated;
    });
    if (reminderConfig.soundEnabled) {
      playSuccessChime();
    }
  };

  const handleSelectDayRoutine = (dayOfWeek: number, weekTypeSelected: WeekType) => {
    setSelectedDayOfWeek(dayOfWeek);
    setWeekType(weekTypeSelected);
    setIsAutoWeek(false);
    setActiveTab('today');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans selection:bg-rose-100 selection:text-rose-900">
      {/* Top Header */}
      <Header
        currentDate={currentDate}
        selectedDayOfWeek={selectedDayOfWeek}
        onSelectDayOfWeek={setSelectedDayOfWeek}
        weekType={weekType}
        onToggleWeekType={handleToggleWeekType}
        isAutoWeek={isAutoWeek}
        onResetAutoWeek={handleResetAutoWeek}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenTimer={() => {
          setTimerMode('bha');
          setIsTimerOpen(true);
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
        soundEnabled={reminderConfig.soundEnabled}
        onToggleSound={() => {
          const updated = !reminderConfig.soundEnabled;
          const next = { ...reminderConfig, soundEnabled: updated };
          setReminderConfig(next);
          localStorage.setItem('glowsync_reminder_config', JSON.stringify(next));
          if (updated) playChime(660, 880);
        }}
        todayCompletionRate={todayCompletionRate}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'today' && (
          <TodayTimeline
            selectedDayOfWeek={selectedDayOfWeek}
            weekType={weekType}
            completedItemIds={completedItemIds}
            onToggleItem={handleToggleItem}
            waterIntakeMl={waterIntakeMl}
            onUpdateWater={setWaterIntakeMl}
            onOpenTimerWithMode={handleOpenTimerWithMode}
            onSelectProduct={setSelectedProduct}
            isMakeupDay={isMakeupDay}
            onToggleMakeupDay={handleToggleMakeupDay}
          />
        )}

        {activeTab === 'calendar' && (
          <MonthlyCalendarView
            onSelectDayRoutine={handleSelectDayRoutine}
            onSelectProduct={setSelectedProduct}
            completedDayNumbers={completedDayNumbers}
            onToggleDayCompleted={handleToggleDayCompleted}
            currentDate={currentDate}
            currentWeekType={weekType}
            onOpenTimerWithMode={handleOpenTimerWithMode}
          />
        )}

        {activeTab === 'weekly' && (
          <WeeklyScheduleView
            currentWeekType={weekType}
            onSelectDay={(day) => {
              setSelectedDayOfWeek(day);
              setActiveTab('today');
            }}
            onSelectProduct={setSelectedProduct}
          />
        )}

        {activeTab === 'supplements' && (
          <SupplementsView />
        )}

        {activeTab === 'makeup_cleansing' && (
          <MakeupAndCleansingView
            onSelectProduct={setSelectedProduct}
          />
        )}

        {activeTab === 'radar' && (
          <RadarAnalysisView />
        )}

        {activeTab === 'skincare' && (
          <SkincareCatalogView
            onSelectProduct={setSelectedProduct}
          />
        )}

        {activeTab === 'safety' && (
          <SafetyGuideView />
        )}
      </main>

      {/* Routine Timer Modal */}
      <RoutineTimerModal
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
        initialMode={timerMode}
      />

      {/* Reminder & Calendar Settings Modal */}
      <ReminderSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={reminderConfig}
        onSaveConfig={handleSaveReminderConfig}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-stone-700">
            GlowSync 日常保養品與保健品全方位指南 · 專屬安全優化版
          </p>
          <p className="text-[11px] text-stone-400">
            分區精準保養（兩頰潤澤・下巴清爽） · 奇偶週輪替 · 處方用藥與保健品間隔安全排程
          </p>
        </div>
      </footer>
    </div>
  );
}
