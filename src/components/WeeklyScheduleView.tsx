import React, { useState } from 'react';
import { Layers, Sparkles, CheckCircle2, ChevronRight, AlertCircle, Calendar } from 'lucide-react';
import { WeekType, SkincareProduct } from '../types/routine';
import { WEEKLY_NIGHT_ROUTINES, SKINCARE_PRODUCTS } from '../data/routineData';

interface WeeklyScheduleViewProps {
  currentWeekType: WeekType;
  onSelectDay: (dayOfWeek: number) => void;
  onSelectProduct: (product: SkincareProduct) => void;
}

export const WeeklyScheduleView: React.FC<WeeklyScheduleViewProps> = ({
  currentWeekType,
  onSelectDay,
  onSelectProduct
}) => {
  const [activeTabWeek, setActiveTabWeek] = useState<WeekType>(currentWeekType);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const getProduct = (num: string) => SKINCARE_PRODUCTS.find(p => p.number === num);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Intro Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-purple-500/10 text-purple-700 rounded-xl">
                <Calendar className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">
                每週夜間主題與奇偶週輪替全覽
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl leading-relaxed">
              31 項外用品項以「每週主題」＋「奇偶週輪替」精密分流，避免高活性成分連續疊加，同時照顧兩頰保濕與下巴淨膚。
            </p>
          </div>

          {/* Week Toggle */}
          <div className="flex items-center bg-stone-100 p-1.5 rounded-2xl border border-stone-200 shrink-0">
            <button
              onClick={() => setActiveTabWeek('odd')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTabWeek === 'odd'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              奇數週排程 (Odd)
            </button>
            <button
              onClick={() => setActiveTabWeek('even')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTabWeek === 'even'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              偶數週排程 (Even)
            </button>
          </div>
        </div>

        {/* Highlight Banner of Differences */}
        <div className="mt-5 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-700 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
            <div>
              <strong>固定功能夜：</strong>
              <p className="text-stone-500">週二固定水楊酸、週四固定 A 醇微晶（兩週維持不變）</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0" />
            <div>
              <strong>週末交替亮點：</strong>
              <p className="text-stone-500">奇週六酵素洗顏／偶週六離子儀胜肽導入；奇週日AZ100藍膜／偶週日VT300微針</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
            <div>
              <strong>保濕封層交替：</strong>
              <p className="text-stone-500">奇數週兩頰主力 S.NATURE / 偶數週兩頰契爾氏冰河霜</p>
            </div>
          </div>
        </div>
      </div>

      {/* 7 Days Matrix Cards */}
      <div className="space-y-4">
        {WEEKLY_NIGHT_ROUTINES.map((day) => {
          const details = activeTabWeek === 'odd' ? day.oddWeekDetails : day.evenWeekDetails;
          const isExpanded = expandedDay === day.dayOfWeek;

          return (
            <div 
              key={day.dayOfWeek}
              className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden transition-all hover:border-stone-300"
            >
              {/* Day Header Row */}
              <div 
                onClick={() => setExpandedDay(isExpanded ? null : day.dayOfWeek)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-stone-50/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 bg-stone-100 rounded-2xl shrink-0">
                    {day.themeIcon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-stone-900 text-base">
                        {day.dayName}
                      </span>
                      <span className="text-stone-300">·</span>
                      <span className="font-bold text-stone-800 text-sm">
                        {day.themeTitle}
                      </span>
                      {(day.dayOfWeek === 2 || day.dayOfWeek === 4) && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          高活性夜
                        </span>
                      )}
                      {(day.dayOfWeek === 0 && activeTabWeek === 'even') && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                          微針激活夜
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">
                      {details.cleansing}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDay(day.dayOfWeek);
                    }}
                    className="px-3 py-1.5 text-xs font-bold text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 hover:border-rose-600 rounded-xl transition-all flex items-center gap-1"
                  >
                    <span>載入此日打卡</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs text-stone-400 font-semibold px-2 py-1">
                    {isExpanded ? '收合' : '展開步驟'}
                  </span>
                </div>
              </div>

              {/* Expanded Steps */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-stone-100 space-y-4 bg-stone-50/40">
                  <div className="bg-white p-3.5 rounded-2xl border border-stone-200 text-xs">
                    <span className="font-bold text-stone-700 block mb-1">洗卸步驟：</span>
                    <span className="text-stone-600">{details.cleansing}</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-stone-700 block">保養程序：</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {details.steps.map((st, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-2xl border border-stone-200 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1.5">
                              <span className="text-[11px] font-bold text-stone-800">
                                {st.step}. {st.label}
                              </span>
                              {st.zone && (
                                <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-md ${
                                  st.zone === '兩頰' ? 'bg-rose-50 text-rose-700' :
                                  st.zone === '下巴' ? 'bg-amber-50 text-amber-700' :
                                  st.zone === '眼周' ? 'bg-purple-50 text-purple-700' :
                                  'bg-stone-100 text-stone-600'
                                }`}>
                                  {st.zone}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-stone-600 leading-relaxed">
                              {st.details}
                            </p>
                          </div>

                          <div className="mt-2 flex flex-wrap gap-1">
                            {st.productNumbers.map((num) => {
                              const p = getProduct(num);
                              if (!p) return null;
                              return (
                                <button
                                  key={num}
                                  type="button"
                                  onClick={() => onSelectProduct(p)}
                                  className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center gap-1 transition-colors"
                                >
                                  <span>#{p.number}</span>
                                  <span className="truncate max-w-[140px]">{p.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-3 text-xs text-rose-950 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{details.notes}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
