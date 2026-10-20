import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Bell, CheckCircle2, Clock } from 'lucide-react';
import { playChime, playSuccessChime } from '../utils/audio';

interface RoutineTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'bha' | 'mask' | 'bcomplex';
}

export const RoutineTimerModal: React.FC<RoutineTimerModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'bha'
}) => {
  const [mode, setMode] = useState<'bha' | 'mask' | 'bcomplex'>(initialMode);
  const [durationMinutes, setDurationMinutes] = useState<number>(mode === 'bha' ? 4 : mode === 'mask' ? 12 : 60);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(durationMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    setMode(initialMode);
    const mins = initialMode === 'bha' ? 4 : initialMode === 'mask' ? 12 : 60;
    setDurationMinutes(mins);
    setTimeLeftSeconds(mins * 60);
    setIsRunning(false);
    setIsCompleted(false);
  }, [initialMode, isOpen]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            playSuccessChime();
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('⏰ GlowSync 計時完成！', {
                body: mode === 'bha' ? '水楊酸 3-5 分鐘已到，可以接續進行黛珂小紫瓶與後續保養囉！' :
                      mode === 'mask' ? '面膜 10-15 分鐘已到，請取下面膜輕拍並立刻封層鎖水！' :
                      '早餐後 1 小時已到，可以安心服用 Thorne 基本維生素 B 複合物囉！',
                icon: '/favicon.ico'
              });
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeftSeconds, mode]);

  if (!isOpen) return null;

  const handleSelectMode = (newMode: 'bha' | 'mask' | 'bcomplex') => {
    setMode(newMode);
    const mins = newMode === 'bha' ? 4 : newMode === 'mask' ? 12 : 60;
    setDurationMinutes(mins);
    setTimeLeftSeconds(mins * 60);
    setIsRunning(false);
    setIsCompleted(false);
  };

  const handleSetPresetMins = (mins: number) => {
    setDurationMinutes(mins);
    setTimeLeftSeconds(mins * 60);
    setIsRunning(false);
    setIsCompleted(false);
  };

  const toggleRun = () => {
    if (isCompleted) {
      setTimeLeftSeconds(durationMinutes * 60);
      setIsCompleted(false);
    }
    if (!isRunning) {
      playChime(659.25, 880);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setTimeLeftSeconds(durationMinutes * 60);
  };

  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const progressPercent = ((durationMinutes * 60 - timeLeftSeconds) / (durationMinutes * 60)) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-500/20 text-rose-300 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">專屬保養與用藥計時器</h3>
              <p className="text-xs text-stone-300">精準掌控酸類、面膜與 B 群黃金時段</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-3 gap-2 bg-stone-100 p-1.5 rounded-2xl text-xs font-semibold">
            <button
              onClick={() => handleSelectMode('bha')}
              className={`py-2 px-3 rounded-xl transition-all ${
                mode === 'bha' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              🧪 水楊酸煥膚
            </button>
            <button
              onClick={() => handleSelectMode('mask')}
              className={`py-2 px-3 rounded-xl transition-all ${
                mode === 'mask' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              🧖 面膜敷臉
            </button>
            <button
              onClick={() => handleSelectMode('bcomplex')}
              className={`py-2 px-3 rounded-xl transition-all ${
                mode === 'bcomplex' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              ⚡ B 群 1hr 間隔
            </button>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>常用時長預設：</span>
            <div className="flex gap-1.5">
              {mode === 'bha' && (
                <>
                  <button 
                    onClick={() => handleSetPresetMins(3)}
                    className={`px-2.5 py-1 rounded-lg border text-xs ${durationMinutes === 3 ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold' : 'bg-white border-stone-200'}`}
                  >
                    3 分鐘 (敏感)
                  </button>
                  <button 
                    onClick={() => handleSetPresetMins(5)}
                    className={`px-2.5 py-1 rounded-lg border text-xs ${durationMinutes === 5 ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold' : 'bg-white border-stone-200'}`}
                  >
                    5 分鐘 (標準)
                  </button>
                </>
              )}
              {mode === 'mask' && (
                <>
                  <button 
                    onClick={() => handleSetPresetMins(10)}
                    className={`px-2.5 py-1 rounded-lg border text-xs ${durationMinutes === 10 ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold' : 'bg-white border-stone-200'}`}
                  >
                    10 分鐘
                  </button>
                  <button 
                    onClick={() => handleSetPresetMins(15)}
                    className={`px-2.5 py-1 rounded-lg border text-xs ${durationMinutes === 15 ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold' : 'bg-white border-stone-200'}`}
                  >
                    15 分鐘 (深度)
                  </button>
                </>
              )}
              {mode === 'bcomplex' && (
                <>
                  <button 
                    onClick={() => handleSetPresetMins(45)}
                    className={`px-2.5 py-1 rounded-lg border text-xs ${durationMinutes === 45 ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold' : 'bg-white border-stone-200'}`}
                  >
                    45 分鐘
                  </button>
                  <button 
                    onClick={() => handleSetPresetMins(60)}
                    className={`px-2.5 py-1 rounded-lg border text-xs ${durationMinutes === 60 ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold' : 'bg-white border-stone-200'}`}
                  >
                    60 分鐘 (黃金標準)
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Circular Visual / Big Timer Display */}
          <div className="relative flex flex-col items-center justify-center py-6">
            <div className="w-52 h-52 rounded-full border-8 border-stone-100 flex flex-col items-center justify-center relative overflow-hidden bg-radial from-rose-50/50 to-white shadow-inner">
              <div 
                className="absolute inset-0 border-8 border-rose-500 rounded-full transition-all duration-1000 ease-linear"
                style={{
                  clipPath: `inset(0 0 ${100 - progressPercent}% 0)`
                }}
              />
              
              <div className="relative z-10 flex flex-col items-center">
                {isCompleted ? (
                  <div className="flex flex-col items-center text-emerald-600 animate-bounce">
                    <CheckCircle2 className="w-12 h-12 mb-1" />
                    <span className="text-sm font-bold">時間到！</span>
                  </div>
                ) : (
                  <>
                    <span className="text-4xl font-extrabold tracking-tight font-mono text-stone-900">
                      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-stone-600 mt-1 font-medium">
                      {isRunning ? '⏱️ 倒數計時中...' : '點擊開始'}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Instructions note for active mode */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900">
            <div className="font-semibold flex items-center gap-1.5 mb-1">
              <Bell className="w-3.5 h-3.5 text-amber-600" />
              <span>
                {mode === 'bha' && '寶拉 2% 水楊酸停留提示：'}
                {mode === 'mask' && '敷面膜黃金守則：'}
                {mode === 'bcomplex' && 'Thorne B 群服用守則：'}
              </span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              {mode === 'bha' && '塗於下巴與鼻翼粉刺區後靜置 3~5 分鐘，讓脂溶性酸深入毛孔。時間到後接續以手溫輕拍黛珂小紫瓶，絕不用化妝棉擦拭。'}
              {mode === 'mask' && '敷 10~15 分鐘即可取下！面膜不可敷到乾裂，取下後輕拍精華並立刻以兩頰乳霜封層鎖住水分。'}
              {mode === 'bcomplex' && '早餐吃完 PTU (3顆) 與癲鍵錠 (1顆) 後，間隔 60 分鐘再吃 Thorne B 群，避免與處方藥競爭吸收。'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={toggleRun}
              className={`flex-1 py-3 px-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-sm transition-all ${
                isRunning 
                  ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                  : 'bg-rose-600 hover:bg-rose-700 text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" /> 暫停
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> {isCompleted ? '重新開始' : '開始倒數'}
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="py-3 px-4 rounded-2xl font-bold border border-stone-200 text-stone-600 hover:bg-stone-50 flex items-center justify-center transition-colors"
              title="重設"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
