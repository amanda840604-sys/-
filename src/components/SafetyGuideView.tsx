import React from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  Pill, 
  Sparkles, 
  Clock, 
  MapPin, 
  CheckCircle2,
  Droplets
} from 'lucide-react';
import { CORE_SAFETY_RULES } from '../data/routineData';

export const SafetyGuideView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/10 text-rose-600 rounded-2xl">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">
              用藥安全、成分交互禁忌 ＆ 分區護膚守則
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 leading-relaxed">
              徹底防範藥物與高活性成分間的代謝干擾，落實臨床醫學級的安全排程。
            </p>
          </div>
        </div>
      </div>

      {/* Core Rules Cards */}
      <div className="space-y-4">
        {CORE_SAFETY_RULES.map((rule) => (
          <div
            key={rule.id}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  rule.severity === 'critical' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                  rule.severity === 'high' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                  'bg-blue-100 text-blue-800 border border-blue-200'
                }`}>
                  {rule.badge}
                </span>
                <h3 className="font-extrabold text-stone-900 text-base sm:text-lg">
                  {rule.title}
                </h3>
              </div>

              <span className="text-xs text-stone-600 font-semibold">
                {rule.severity === 'critical' && '🚨 關鍵藥物安全'}
                {rule.severity === 'high' && '⚠️ 重要保養鐵則'}
                {rule.severity === 'medium' && '💡 最佳吸收搭配'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs sm:text-sm font-bold text-stone-800">
              {rule.summary}
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {rule.details}
            </p>
          </div>
        ))}
      </div>

      {/* Visual Component Spacing Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs space-y-4">
        <h3 className="font-extrabold text-stone-900 text-base flex items-center gap-2">
          <Clock className="w-5 h-5 text-rose-600" />
          每週高活性成分錯開週期表（避免屏障過載）
        </h3>
        <p className="text-xs text-stone-500 leading-relaxed">
          水楊酸 (BHA)、A 醇 (Retinol) 與微晶微針 (Reedle Shot 300) 嚴禁在同一晚併用。以下為一週精準錯開安排：
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2 text-center text-xs">
          <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="font-bold text-stone-500 block">週一</span>
            <span className="text-base my-1 block">💧</span>
            <span className="font-bold text-stone-700">日常修護</span>
            <span className="text-[10px] text-stone-600 block mt-1">溫和舒緩</span>
          </div>

          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-300">
            <span className="font-bold text-rose-800 block">週二</span>
            <span className="text-base my-1 block">🧪</span>
            <span className="font-bold text-rose-700">2% 水楊酸</span>
            <span className="text-[10px] text-rose-600 block mt-1">下巴局部煥膚</span>
          </div>

          <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200">
            <span className="font-bold text-purple-800 block">週三</span>
            <span className="text-base my-1 block">🌿</span>
            <span className="font-bold text-purple-700">離子儀(導出)</span>
            <span className="text-[10px] text-purple-600 block mt-1">舒特膚潔膚水</span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300">
            <span className="font-bold text-amber-900 block">週四</span>
            <span className="text-base my-1 block">🌙</span>
            <span className="font-bold text-amber-700">A 醇微晶精華</span>
            <span className="text-[10px] text-amber-600 block mt-1">抗老撫紋</span>
          </div>

          <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="font-bold text-stone-500 block">週五</span>
            <span className="text-base my-1 block">💧</span>
            <span className="font-bold text-stone-700">日常修護</span>
            <span className="text-[10px] text-stone-600 block mt-1">偶週下巴點塗鋅</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="font-bold text-emerald-800 block">週六</span>
            <span className="text-base my-1 block">🌟</span>
            <span className="font-bold text-emerald-700">去角質 / 導入</span>
            <span className="text-[10px] text-emerald-600 block mt-1">酵素洗顏 / 离儀</span>
          </div>

          <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200">
            <span className="font-bold text-indigo-900 block">週日</span>
            <span className="text-base my-1 block">✨</span>
            <span className="font-bold text-indigo-700">深度面膜 / 微針</span>
            <span className="text-[10px] text-indigo-600 block mt-1">奇AZ100/偶VT300</span>
          </div>
        </div>
      </div>

      {/* Zoning Philosophy Diagram */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
        <h3 className="font-extrabold text-base sm:text-lg flex items-center gap-2">
          <MapPin className="w-5 h-5 text-rose-400" />
          全方位「分區保養」極致心法（乾肌 ＋ 下巴反覆粉刺）
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400" />
              <h4 className="font-black text-rose-300 text-base">兩頰乾燥肌膚（注重滋潤修護）</h4>
            </div>
            <p className="text-stone-300 leading-relaxed text-xs">
              皮脂腺較少，缺乏天然皮脂膜保護，遇冷風或洗卸後易緊繃乾癢。
            </p>
            <div className="bg-black/20 p-2.5 rounded-xl text-xs space-y-1">
              <div className="text-emerald-300 font-bold">✅ 專屬命定品項：</div>
              <p className="text-stone-200">
                S.NATURE 角鯊烷霜 (#21)、契爾氏冰河醣蛋白保濕霜 (#23)、黛珂 AQ 煥妍柔膚乳 (#20)、品木宣言靈芝乳液 (#19)、Dr. Reju-All 修復霜 (#22)
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <h4 className="font-black text-amber-300 text-base">下巴與鼻翼（粉刺痘痘易發區）</h4>
            </div>
            <p className="text-stone-300 leading-relaxed text-xs">
              皮脂腺分泌旺盛且毛孔易角化阻塞，一旦覆蓋高封閉性乳霜易悶發閉口痘痘。
            </p>
            <div className="bg-black/20 p-2.5 rounded-xl text-xs space-y-1">
              <div className="text-rose-300 font-bold">🛑 嚴格禁忌：</div>
              <p className="text-stone-200">
                嚴禁厚重面霜！每日早晚下巴唯一鎖水鎖油主力為「MUJI 米糠發酵乳液 (#18)」，水楊酸 (#15) 與 The Ordinary 鋅 (#14) 僅局部點塗。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
