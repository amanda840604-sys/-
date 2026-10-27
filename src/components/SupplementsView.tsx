import React, { useState } from 'react';
import { 
  Pill, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Sparkles, 
  Droplet, 
  Sun, 
  Moon, 
  HelpCircle,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { PRESCRIPTION_MEDS, ORAL_SUPPLEMENTS } from '../data/routineData';

export const SupplementsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'rx' | 'supplements'>('all');
  const [testBreakfastTime, setTestBreakfastTime] = useState('08:00');

  // Compute 1 hour after breakfast
  const [bH, bM] = testBreakfastTime.split(':').map(Number);
  const totalBMinutes = bH * 60 + bM + 60;
  const bHour = Math.floor(totalBMinutes / 60) % 24;
  const bMinute = totalBMinutes % 60;
  const computedBTime = `${String(bHour).padStart(2, '0')}:${String(bMinute).padStart(2, '0')}`;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Intro Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-rose-500/10 text-rose-700 rounded-xl">
                <Pill className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">
                常規處方用藥 ＆ 6款內服保健品黃金指南
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl leading-relaxed">
              嚴格依據健保用藥紀錄與臨床藥理學規劃，確保處方藥效不受干擾、保健品吸收率最大化。
            </p>
          </div>

          <div className="flex items-center bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              全部 ({PRESCRIPTION_MEDS.length + ORAL_SUPPLEMENTS.length}項)
            </button>
            <button
              onClick={() => setSelectedCategory('rx')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'rx' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              🩺 處方用藥 ({PRESCRIPTION_MEDS.length}項)
            </button>
            <button
              onClick={() => setSelectedCategory('supplements')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'supplements' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              💊 保健食品 ({ORAL_SUPPLEMENTS.length}款)
            </button>
          </div>
        </div>

        {/* Dynamic Gap Calculator Widget */}
        <div className="mt-5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 text-white rounded-xl shadow-xs">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-950 block">Thorne B 群 1 小時黃金間隔快速換算</span>
              <span className="text-xs text-amber-800/80">避免早晨處方藥 (PTU+癲鍵錠) 與高活性 B 群產生吸收競爭</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-amber-300">
            <span className="text-xs text-stone-500">早餐服藥：</span>
            <input
              type="time"
              value={testBreakfastTime}
              onChange={(e) => setTestBreakfastTime(e.target.value)}
              className="font-bold text-xs text-stone-800 border-b border-stone-300 focus:outline-hidden"
            />
            <span className="text-xs text-stone-400">➔</span>
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
              建議 {computedBTime} 服用 B 群
            </span>
          </div>
        </div>
      </div>

      {/* 🩺 Section 1: 常規處方用藥 */}
      {(selectedCategory === 'all' || selectedCategory === 'rx') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-stone-800 text-base flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              一、常規處方用藥精準審視（共 4 款）
            </h3>
            <span className="text-xs text-stone-500">源自健保快易通（健康存摺）記錄</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRESCRIPTION_MEDS.map((med) => (
              <div 
                key={med.id}
                className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      med.timeSlot === 'breakfast' 
                        ? 'bg-amber-100 text-amber-900 border border-amber-200' 
                        : 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                    }`}>
                      {med.timeSlot === 'breakfast' ? '☀️ 早餐飯後' : '💤 晚上睡前'}
                    </span>
                    <span className="text-xs font-semibold text-stone-500">{med.category}</span>
                  </div>

                  <h4 className="font-extrabold text-stone-900 text-base">
                    {med.name}
                  </h4>
                  <p className="text-xs text-stone-400 font-mono mt-0.5">
                    {med.genericName}
                  </p>

                  <div className="mt-3 p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-stone-800">
                      <span>建議劑量：</span>
                      <span className="text-rose-600">{med.dosage}</span>
                    </div>
                    <p className="text-stone-600 mt-1 leading-relaxed">{med.instructions}</p>
                  </div>

                  {/* 藥物主要功效 */}
                  <div className="mt-2.5 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-amber-950 mb-0.5">
                      <span>🩺 藥物功效：</span>
                    </div>
                    <p className="text-amber-900/90 leading-relaxed font-medium">{med.efficacy}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-stone-100 text-[11px] text-stone-500 flex items-start gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{med.safetyNotes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 💊 Section 2: 6 款內服保健品 */}
      {(selectedCategory === 'all' || selectedCategory === 'supplements') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-stone-800 text-base flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              二、6 款內服保健品黃金服用指南
            </h3>
            <span className="text-xs text-stone-500">含原廠規格、吸收搭配與調整歷程</span>
          </div>

          <div className="space-y-4">
            {ORAL_SUPPLEMENTS.map((sup) => (
              <div
                key={sup.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-black px-2.5 py-1 rounded-xl bg-amber-100 text-amber-900 shrink-0">
                      #{sup.number}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-extrabold text-stone-900 text-base sm:text-lg">
                          {sup.name}
                        </h4>
                        <span className="text-xs text-stone-500">({sup.brand})</span>
                        {sup.isLipophilic && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                            🥑 脂溶性
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-400 mt-0.5">{sup.specification}</p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 inline-block">
                      {sup.recommendedDose}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
                    <span className="font-bold text-stone-800 block mb-1">⏰ 最佳服用時間與搭配方式：</span>
                    <p className="text-stone-600 leading-relaxed font-medium">{sup.timing}</p>
                    <p className="text-stone-500 mt-1 text-[11px]">{sup.whyThisTime}</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
                    <span className="font-bold text-stone-800 block mb-1">✨ 核心保養效益：</span>
                    <ul className="space-y-1">
                      {sup.benefits.map((b, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 text-stone-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {sup.safetyNotes && (
                  <div className="mt-3 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{sup.safetyNotes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Safety Summary Checklist */}
      <div className="bg-linear-to-r from-stone-900 to-stone-800 text-white rounded-3xl p-6 sm:p-7 shadow-lg">
        <h4 className="text-base font-black flex items-center gap-2 mb-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          藥理與營養吸收四大黃金守則總覽
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-stone-300">
          <div className="p-3 rounded-2xl bg-white/10 border border-white/10">
            <span className="font-bold text-white block mb-1">1. 早晨用藥與 B 群錯開 1 小時</span>
            PTU 與癲鍵錠在早餐隨餐服用，Thorne 活性 B 群於 1 小時後補充，保證早晨處方藥效不受代謝競爭干擾。
          </div>
          <div className="p-3 rounded-2xl bg-white/10 border border-white/10">
            <span className="font-bold text-white block mb-1">2. BHK's 奢光錠全面改在白天</span>
            取消夜間服用，移到早餐或午餐飯後隨餐吃。夜間中樞神經完全保留給抗痙攣與安眠藥物，睡眠更安穩。
          </div>
          <div className="p-3 rounded-2xl bg-white/10 border border-white/10">
            <span className="font-bold text-white block mb-1">3. 脂溶性營養（D3 + 魚油）隨餐吃</span>
            維生素 D3 與 Omega-3 必須依賴正餐食物中的油脂乳化才能被高效吸收，隨餐吃亦能避免魚油腥味打嗝。
          </div>
          <div className="p-3 rounded-2xl bg-white/10 border border-white/10">
            <span className="font-bold text-white block mb-1">4. 蔓越莓濃縮配合大量飲水</span>
            前花青素（PACs）能守護私密處健康並對抗慢性發炎，配合每天 1800~2000 ml 溫開水更能加乘代謝效益。
          </div>
        </div>
      </div>
    </div>
  );
};
