import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  Check, 
  AlertCircle, 
  Layers, 
  Info,
  ChevronRight,
  Filter,
  Droplets,
  Heart
} from 'lucide-react';
import { SkincareProduct, BodyLotionItem } from '../types/routine';
import { SKINCARE_PRODUCTS, BODY_LOTIONS } from '../data/routineData';

interface SkincareCatalogViewProps {
  onSelectProduct: (product: SkincareProduct) => void;
}

export const SkincareCatalogView: React.FC<SkincareCatalogViewProps> = ({ onSelectProduct }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedWeek, setSelectedWeek] = useState<'all' | 'odd' | 'even' | 'both'>('all');
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedBodyLotion, setSelectedBodyLotion] = useState<BodyLotionItem | null>(null);

  const categories = [
    { key: 'all', label: `全部 (${SKINCARE_PRODUCTS.length + BODY_LOTIONS.length})` },
    { key: 'cleansing', label: '🫧 卸妝與清潔' },
    { key: 'toner', label: '💧 化妝水/噴霧/棉片' },
    { key: 'serum', label: '🧪 精華與功能型' },
    { key: 'cream', label: '🧴 乳液與面霜' },
    { key: 'spot', label: '🎯 局部痘痘藥' },
    { key: 'eye', label: '👁️ 眼周護理/眼膜' },
    { key: 'sunscreen', label: '☀️ 防曬與妝前' },
    { key: 'mask', label: '🧖‍♀️ 面膜與急救' },
    { key: 'device', label: '⚡ 美容儀器' },
    { key: 'body_lotion', label: `🛁 身體乳液 (${BODY_LOTIONS.length})` },
  ];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'body_lotion') {
      return [];
    }

    return SKINCARE_PRODUCTS.filter((p) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchRole = p.role.toLowerCase().includes(q);
        const matchInstructions = p.usageInstructions.toLowerCase().includes(q);
        const matchNumber = p.number.includes(q);
        const matchTiming = p.usageTiming ? p.usageTiming.toLowerCase().includes(q) : false;
        if (!matchName && !matchBrand && !matchRole && !matchInstructions && !matchNumber && !matchTiming) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'toner') {
          if (p.categoryType !== 'toner' && p.category !== '棉片與急救') return false;
        } else if (selectedCategory === 'eye') {
          if (p.categoryType !== 'eye' && p.category !== '眼膜與局部') return false;
        } else if (p.categoryType !== selectedCategory) {
          return false;
        }
      }

      // Week
      if (selectedWeek !== 'all') {
        if (selectedWeek === 'both' && p.applicableWeeks !== 'both') return false;
        if (selectedWeek === 'odd' && p.applicableWeeks === 'even') return false;
        if (selectedWeek === 'even' && p.applicableWeeks === 'odd') return false;
      }

      // Zone
      if (selectedZone !== 'all') {
        if (p.targetZone !== selectedZone) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedWeek, selectedZone]);

  const filteredBodyLotions = useMemo(() => {
    if (selectedCategory !== 'all' && selectedCategory !== 'body_lotion') {
      return [];
    }

    if (selectedWeek !== 'all' || selectedZone !== 'all') {
      if (selectedCategory !== 'body_lotion') return [];
    }

    return BODY_LOTIONS.filter((b) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = b.name.toLowerCase().includes(q);
        const matchBrand = b.brand.toLowerCase().includes(q);
        const matchRole = b.role.toLowerCase().includes(q);
        const matchTexture = b.textureAndIngredients.toLowerCase().includes(q);
        const matchPos = b.positioningAndUsage.toLowerCase().includes(q);
        const matchCode = b.code.toLowerCase().includes(q);
        return matchName || matchBrand || matchRole || matchTexture || matchPos || matchCode;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedWeek, selectedZone]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Intro Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-rose-500/10 text-rose-700 rounded-xl">
                <SlidersHorizontal className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">
                全庫存產品清單（41 項外用保養品 ＋ 6 款身體乳 ＋ 美容儀）
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl leading-relaxed">
              點擊任一臉部保養品或身體乳，即可查看詳細專屬定位、奇偶週分流策略、分區用法與安全注意事項。
            </p>
          </div>

          <div className="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1.5 rounded-xl self-start md:self-center">
            共篩選出 {filteredProducts.length + filteredBodyLotions.length} 項品項
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="搜尋品牌、品名、功效或成分（如：寶拉、小紫瓶、Torriden、A醇、契爾氏、果酸身體乳...）"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-hidden focus:border-rose-400 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-xs text-stone-400 hover:text-stone-700 font-bold"
              >
                清除
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === c.key
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Sub Filters: Week & Zone (only for facial skincare) */}
          {selectedCategory !== 'body_lotion' && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-stone-600 font-semibold flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> 週次分流：
              </span>
              <div className="flex gap-1">
                {[
                  { key: 'all', label: '全部週' },
                  { key: 'odd', label: '奇數週專屬' },
                  { key: 'even', label: '偶數週專屬' },
                  { key: 'both', label: '雙週通用' },
                ].map((w) => (
                  <button
                    key={w.key}
                    onClick={() => setSelectedWeek(w.key as 'all' | 'odd' | 'even' | 'both')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      selectedWeek === w.key
                        ? 'bg-rose-50 border border-rose-300 text-rose-700 font-bold'
                        : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>

              <span className="text-stone-600 font-semibold ml-2">部位篩選：</span>
              <div className="flex gap-1">
                {[
                  { key: 'all', label: '全部部位' },
                  { key: 'cheeks', label: '兩頰專用' },
                  { key: 'chin', label: '下巴專用' },
                  { key: 'eyes', label: '眼周專用' },
                ].map((z) => (
                  <button
                    key={z.key}
                    onClick={() => setSelectedZone(z.key)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      selectedZone === z.key
                        ? 'bg-amber-50 border border-amber-300 text-amber-800 font-bold'
                        : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {z.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Skincare Product Grid */}
      {filteredProducts.length > 0 && (
        <div className="space-y-3">
          {selectedCategory === 'all' && (
            <h3 className="text-sm font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              外用臉部保養品、局部藥膏與美容儀 ({filteredProducts.length})
            </h3>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-xs hover:border-rose-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Card top badges */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-stone-900 text-white font-mono">
                        #{p.number}
                      </span>
                      <span className="text-[11px] font-semibold text-stone-500">
                        {p.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {p.applicableWeeks === 'odd' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                          奇數週
                        </span>
                      )}
                      {p.applicableWeeks === 'even' && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                          偶數週
                        </span>
                      )}
                      {p.applicableWeeks === 'both' && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                          雙週皆用
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Brand */}
                  <div>
                    <span className="text-xs font-bold text-rose-600 block">
                      {p.brand}
                    </span>
                    <h4 className="font-extrabold text-stone-900 text-base leading-snug mt-0.5 group-hover:text-rose-600 transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-xs text-stone-500 font-medium mt-1">
                      {p.role}
                    </p>
                  </div>

                  {/* Target zone & Timing pills */}
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md inline-flex items-center gap-1 ${
                      p.targetZone === 'cheeks' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      p.targetZone === 'chin' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      p.targetZone === 'eyes' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                      'bg-stone-100 text-stone-600'
                    }`}>
                      📍 {
                        p.targetZone === 'cheeks' ? '兩頰乾燥區專屬' :
                        p.targetZone === 'chin' ? '下巴粉刺區專用' :
                        p.targetZone === 'eyes' ? '眼周細紋防禦' :
                        '全臉適用'
                      }
                    </span>
                    {p.usageTiming && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 inline-flex items-center gap-1">
                        ⏰ {p.usageTiming}
                      </span>
                    )}
                  </div>

                  {/* Snippet */}
                  <p className="text-xs text-stone-600 leading-relaxed mt-2.5 line-clamp-2">
                    {p.usageInstructions}
                  </p>
                </div>

                {/* Bottom details link */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-rose-600 font-bold">
                  <span>查看詳細指南</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Body Lotions Section */}
      {filteredBodyLotions.length > 0 && (
        <div className="space-y-3 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              🛁 6 款身體乳液／身體霜分類與全身保養建議 ({filteredBodyLotions.length})
            </h3>
            <span className="text-xs text-stone-500">依膚況四肢乾燥、背胸粉刺或提亮分流</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredBodyLotions.map((b) => (
              <div
                key={b.id}
                onClick={() => setSelectedBodyLotion(b)}
                className="bg-white rounded-3xl p-5 border border-indigo-100 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-indigo-900 text-white font-mono">
                      {b.code}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {b.role}
                    </span>
                  </div>

                  {/* Brand & Name */}
                  <span className="text-xs font-bold text-indigo-600 block">
                    {b.brand}
                  </span>
                  <h4 className="font-extrabold text-stone-900 text-base leading-snug mt-0.5 group-hover:text-indigo-600 transition-colors">
                    {b.name}
                  </h4>

                  {/* Ingredients */}
                  <div className="mt-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600">
                    <span className="font-bold text-stone-700 block mb-0.5">質地與核心成分：</span>
                    {b.textureAndIngredients}
                  </div>

                  {/* Positioning */}
                  <p className="text-xs text-stone-700 leading-relaxed mt-2.5">
                    {b.positioningAndUsage}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-indigo-50 flex items-center justify-between text-xs text-indigo-600 font-bold">
                  <span>查看全身保養指引</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Body Lotion Detail Modal */}
      {selectedBodyLotion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 bg-indigo-950 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-black px-2.5 py-1 rounded-xl bg-indigo-500 text-white font-mono">
                  {selectedBodyLotion.code}
                </span>
                <div>
                  <span className="text-xs text-indigo-200 font-semibold block">{selectedBodyLotion.brand}</span>
                  <h3 className="font-bold text-base sm:text-lg leading-tight text-white">{selectedBodyLotion.name}</h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedBodyLotion(null)}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-200">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                  專屬保養定位
                </span>
                <p className="text-stone-800 font-bold text-sm">
                  {selectedBodyLotion.role}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                  🧪 質地與核心成分
                </span>
                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-stone-700 leading-relaxed">
                  {selectedBodyLotion.textureAndIngredients}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                  📖 使用部位與分流建議
                </span>
                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-stone-700 leading-relaxed whitespace-pre-line">
                  {selectedBodyLotion.positioningAndUsage}
                </div>
              </div>

              {selectedBodyLotion.cautions && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-950 text-xs">
                  <span className="font-bold block mb-1 text-amber-800">⚠️ 注意事項：</span>
                  {selectedBodyLotion.cautions}
                </div>
              )}
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedBodyLotion(null)}
                className="px-5 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredProducts.length === 0 && filteredBodyLotions.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
          <p className="text-stone-400 text-sm">找不到符合條件的品項</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedWeek('all');
              setSelectedZone('all');
            }}
            className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold"
          >
            重設篩選條件
          </button>
        </div>
      )}
    </div>
  );
};
