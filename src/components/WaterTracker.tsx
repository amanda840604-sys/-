import React from 'react';
import { Droplets, Plus, RotateCcw, Sparkles } from 'lucide-react';
import { playChime, playSuccessChime } from '../utils/audio';

interface WaterTrackerProps {
  currentMl: number;
  onUpdate: (newMl: number) => void;
  targetMl?: number;
}

export const WaterTracker: React.FC<WaterTrackerProps> = ({
  currentMl,
  onUpdate,
  targetMl = 2000
}) => {
  const percent = Math.min(100, Math.round((currentMl / targetMl) * 100));

  const addCup = (amount: number = 250) => {
    const updated = currentMl + amount;
    onUpdate(updated);
    if (updated >= targetMl && currentMl < targetMl) {
      playSuccessChime();
    } else {
      playChime(784, 988);
    }
  };

  const handleReset = () => {
    onUpdate(0);
  };

  return (
    <div className="bg-linear-to-br from-cyan-50/80 to-blue-50/70 border border-cyan-200/80 rounded-3xl p-5 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-cyan-500/10 text-cyan-700 rounded-xl">
            <Droplets className="w-5 h-5 text-cyan-600" />
          </div>
          <div>
            <h4 className="font-bold text-stone-800 text-sm">每日水分打卡（蔓越莓＆處方代謝加速）</h4>
            <p className="text-xs text-stone-600">助益 PACs 前花青素泌尿防禦與 Topiramate 水分循環</p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="p-1.5 text-stone-400 hover:text-stone-600 rounded-lg hover:bg-white/50 transition-colors"
          title="重設今日喝水量"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {/* Progress Display */}
        <div className="flex items-baseline justify-between text-xs">
          <span className="font-bold text-stone-800 text-lg">
            {currentMl} <span className="text-xs font-normal text-stone-600">/ {targetMl} ml</span>
          </span>
          <span className="font-semibold text-cyan-700">{percent}% 達成</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-cyan-100/70 h-3 rounded-full overflow-hidden p-0.5">
          <div
            className="bg-linear-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Quick Add buttons */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex gap-2">
            <button
              onClick={() => addCup(250)}
              className="px-3 py-1.5 bg-white border border-cyan-200 hover:border-cyan-400 text-cyan-800 rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs transition-all hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" /> 250 ml (一杯水)
            </button>
            <button
              onClick={() => addCup(500)}
              className="px-3 py-1.5 bg-white border border-cyan-200 hover:border-cyan-400 text-cyan-800 rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs transition-all hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" /> 500 ml (保溫瓶)
            </button>
          </div>

          {percent >= 100 && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full animate-bounce">
              <Sparkles className="w-3 h-3 text-emerald-600" /> 今日水分已達標！
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
