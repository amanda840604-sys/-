import React, { useState } from 'react';
import { X, Bell, Volume2, Calendar, Check, Download, Info, ShieldCheck } from 'lucide-react';
import { ReminderConfig } from '../types/routine';
import { playChime, playSuccessChime } from '../utils/audio';
import { downloadIcsFile } from '../utils/calendarExport';

interface ReminderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ReminderConfig;
  onSaveConfig: (newConfig: ReminderConfig) => void;
}

export const ReminderSettingsModal: React.FC<ReminderSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [localConfig, setLocalConfig] = useState<ReminderConfig>(config);
  const [notificationStatus, setNotificationStatus] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );
  const [isSavedToast, setIsSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleRequestNotificationPermission = async () => {
    if (typeof Notification === 'undefined') {
      alert('您的瀏覽器不支援 Web Notifications');
      return;
    }
    const perm = await Notification.requestPermission();
    setNotificationStatus(perm);
    if (perm === 'granted') {
      playSuccessChime();
      new Notification('🔔 GlowSync 提醒已開啟', {
        body: '每日保養、用藥與保健品時間將準時送達提醒通知！',
        icon: '/favicon.ico'
      });
    }
  };

  const handleTestSound = () => {
    playChime(659.25, 880);
  };

  const handleSave = () => {
    onSaveConfig(localConfig);
    playSuccessChime();
    setIsSavedToast(true);
    setTimeout(() => {
      setIsSavedToast(false);
      onClose();
    }, 900);
  };

  const handleExportCalendar = () => {
    downloadIcsFile(localConfig);
    playSuccessChime();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/20 text-amber-300 rounded-xl">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">個人化時段與提醒設定</h3>
              <p className="text-xs text-stone-300">客製專屬作息時程、瀏覽器推播與手機行事曆同步</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Notification & Sound Toggles */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-stone-800 block">瀏覽器網頁推播通知</span>
                <span className="text-xs text-stone-600">到時段主動彈出提示（免遺漏關鍵服藥間隔）</span>
              </div>
              {notificationStatus === 'granted' ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" /> 已授權
                </span>
              ) : (
                <button
                  onClick={handleRequestNotificationPermission}
                  className="px-3 py-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors shadow-xs"
                >
                  點擊開啟授權
                </button>
              )}
            </div>

            <hr className="border-stone-200" />

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-stone-800 block">清脆提示音效</span>
                <span className="text-xs text-stone-600">打卡、計時器結束與提醒時播放溫和音效</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTestSound}
                  className="p-1.5 text-stone-500 hover:text-stone-800 border border-stone-200 rounded-lg hover:bg-white transition-colors text-xs flex items-center gap-1"
                  title="測試音效"
                >
                  <Volume2 className="w-3.5 h-3.5" /> 試聽
                </button>
                <input
                  type="checkbox"
                  checked={localConfig.soundEnabled}
                  onChange={(e) => setLocalConfig({ ...localConfig, soundEnabled: e.target.checked })}
                  className="w-4 h-4 text-rose-600 rounded-md focus:ring-rose-500 accent-rose-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Time Customization Inputs */}
          <div className="space-y-4">
            <h4 className="font-bold text-stone-800 flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              每日關鍵時段自訂
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-white p-3 rounded-2xl border border-stone-200">
                <label className="text-xs font-semibold text-stone-600 block mb-1">
                  ☀️ 早餐用藥時段
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={localConfig.times.breakfast}
                    onChange={(e) =>
                      setLocalConfig({
                        ...localConfig,
                        times: { ...localConfig.times, breakfast: e.target.value }
                      })
                    }
                    className="w-full text-base font-semibold border border-stone-300 rounded-xl px-2.5 py-1.5 focus:border-rose-500 focus:outline-hidden"
                  />
                </div>
                <span className="text-[11px] text-stone-600 mt-1 block">PTU 3顆 + 癲鍵錠 1顆 + BHK's</span>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-stone-200">
                <label className="text-xs font-semibold text-stone-600 block mb-1">
                  ⚡ B 群間隔時間
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={localConfig.times.bComplexOffset}
                    onChange={(e) =>
                      setLocalConfig({
                        ...localConfig,
                        times: { ...localConfig.times, bComplexOffset: Number(e.target.value) }
                      })
                    }
                    className="w-full text-base font-semibold border border-stone-300 rounded-xl px-2.5 py-1.5 focus:border-rose-500 focus:outline-hidden bg-white"
                  >
                    <option value={45}>早餐後 45 分鐘</option>
                    <option value={60}>早餐後 60 分鐘 (黃金推薦)</option>
                    <option value={90}>早餐後 90 分鐘</option>
                  </select>
                </div>
                <span className="text-[11px] text-stone-600 mt-1 block">徹底避開早晨處方藥物干擾</span>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-stone-200">
                <label className="text-xs font-semibold text-stone-600 block mb-1">
                  🥗 午間/晚間隨餐營養
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={localConfig.times.lunch}
                    onChange={(e) =>
                      setLocalConfig({
                        ...localConfig,
                        times: { ...localConfig.times, lunch: e.target.value }
                      })
                    }
                    className="w-full text-base font-semibold border border-stone-300 rounded-xl px-2.5 py-1.5 focus:border-rose-500 focus:outline-hidden"
                  />
                </div>
                <span className="text-[11px] text-stone-600 mt-1 block">D3 (2錠) + 魚油 (1粒) + 蔓越莓</span>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-stone-200">
                <label className="text-xs font-semibold text-stone-600 block mb-1">
                  🌙 晚間分區主題保養
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={localConfig.times.nightSkincare}
                    onChange={(e) =>
                      setLocalConfig({
                        ...localConfig,
                        times: { ...localConfig.times, nightSkincare: e.target.value }
                      })
                    }
                    className="w-full text-base font-semibold border border-stone-300 rounded-xl px-2.5 py-1.5 focus:border-rose-500 focus:outline-hidden"
                  />
                </div>
                <span className="text-[11px] text-stone-600 mt-1 block">依今日星期執行洗卸與奇偶週主題</span>
              </div>

              <div className="bg-white p-3 rounded-2xl border border-stone-200 sm:col-span-2">
                <label className="text-xs font-semibold text-stone-600 block mb-1">
                  💤 睡前處方安定用藥
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={localConfig.times.bedtime}
                    onChange={(e) =>
                      setLocalConfig({
                        ...localConfig,
                        times: { ...localConfig.times, bedtime: e.target.value }
                      })
                    }
                    className="w-full sm:w-1/2 text-base font-semibold border border-stone-300 rounded-xl px-2.5 py-1.5 focus:border-rose-500 focus:outline-hidden"
                  />
                </div>
                <span className="text-[11px] text-stone-600 mt-1 block">瑞安癲必停 0.5 顆 + 易靜錠 1 顆（不疊加保健品）</span>
              </div>
            </div>
          </div>

          {/* Calendar Export Section */}
          <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h5 className="font-bold text-indigo-950 flex items-center gap-1.5 text-sm">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  匯出至手機行事曆 (.ics)
                </h5>
                <p className="text-xs text-indigo-800/80 mt-1 leading-relaxed">
                  一鍵生成標準 iCalendar 格式，支援 iPhone 內建行事曆、Google 日曆與 Outlook。會依您設定的自訂時段每天自動發送鬧鐘與注意事項提醒！
                </p>
              </div>
              <button
                type="button"
                onClick={handleExportCalendar}
                className="shrink-0 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" /> 下載日曆
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1 text-xs text-stone-600">
            <Info className="w-3.5 h-3.5 text-stone-600" />
            <span>設定將保存在此瀏覽器</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-200/60 rounded-xl transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs transition-colors flex items-center gap-1"
            >
              {isSavedToast ? (
                <>
                  <Check className="w-4 h-4" /> 已儲存
                </>
              ) : (
                '儲存設定'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
