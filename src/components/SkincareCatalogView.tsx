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
  Filter
} from 'lucide-react';
import { SkincareProduct, Category } from '../types/routine';
import { SKINCARE_PRODUCTS } from '../data/routineData';

interface SkincareCatalogViewProps {
  onSelectProduct: (product: SkincareProduct) => void;
}

export const SkincareCatalogView: React.FC<SkincareCatalogViewProps> = ({ onSelectProduct }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedWeek, setSelectedWeek] = useState<'all' | 'odd' | 'even' | 'both'>('all');
  const [selectedZone, setSelectedZone] = useState<string>('all');

  const categories = [
    { key: 'all', label: '全部 (33)' },
    { key: 'cleansing', label: '🫧 卸妝與清潔 (6)' },
    { key: 'toner', label: '💧 化妝水與噴霧 (4)' },
    { key: 'serum', label: '🧪 精華與功能型 (7)' },
    { key: 'cream', label: '🧴 乳液與面霜 (7)' },
    { key: 'eye', label: '👁️ 眼周護理 (3)' },
    { key: 'sunscreen', label: '☀️ 防曬與妝前 (4)' },
    { key: 'mask', label: '🧖‍♀️ 面膜與急救 (2)' },
    { key: 'device', label: '⚡ 美容儀器 (1)' },
  ];

  const filteredProducts = useMemo(() => {
    return SKINCARE_PRODUCTS.filter((p) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchRole = p.role.toLowerCase().includes(q);
        const matchInstructions = p.usageInstructions.toLowerCase().includes(q);
        const matchNumber = p.number.includes(q);
        if (!matchName && !matchBrand && !matchRole && !matchInstructions && !matchNumber) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'all' && p.categoryType !== selectedCategory) {
        return false;
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
                31 項外用保養品與美容儀全庫存清單（編號 #01 ~ #33）
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl leading-relaxed">
              點擊任一產品即可查看詳細專屬定位、奇偶週分流策略、分區用法與安全注意事項。
            </p>
          </div>

          <div className="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1.5 rounded-xl self-start md:self-center">
            共篩選出 {filteredProducts.length} 項品項
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="搜尋品牌、品名、功效或成分（如：寶拉、小紫瓶、A醇、契爾氏、米糠...）"
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

          {/* Sub Filters: Week & Zone */}
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
        </div>
      </div>

      {/* Product Grid */}
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

              {/* Target zone pill */}
              <div className="mt-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md inline-flex items-center gap-1 ${
                  p.targetZone === 'cheeks' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                  p.targetZone === 'chin' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                  p.targetZone === 'eyes' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                  'bg-stone-100 text-stone-600'
                }`}>
                  📍 部位：{
                    p.targetZone === 'cheeks' ? '兩頰乾燥區專屬' :
                    p.targetZone === 'chin' ? '下巴粉刺區專用' :
                    p.targetZone === 'eyes' ? '眼周細紋防禦' :
                    '全臉適用'
                  }
                </span>
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

      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
          <p className="text-stone-400 text-sm">找不到符合條件的保養品項</p>
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
