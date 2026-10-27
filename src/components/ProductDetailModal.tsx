import React from 'react';
import { X, ShieldAlert, CheckCircle2, Clock, Sparkles, MapPin, Layers, AlertTriangle } from 'lucide-react';
import { SkincareProduct } from '../types/routine';

interface ProductDetailModalProps {
  product: SkincareProduct | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-black px-2.5 py-1 rounded-xl bg-rose-500 text-white font-mono">
              #{product.number}
            </span>
            <div>
              <span className="text-xs text-stone-300 font-semibold block">{product.brand}</span>
              <h3 className="font-bold text-base sm:text-lg leading-tight text-white">{product.name}</h3>
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
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm">
          {/* Quick Badges */}
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-xl bg-stone-100 text-stone-700 font-semibold text-xs">
              分類：{product.category}
            </span>
            <span className={`px-2.5 py-1 rounded-xl font-bold text-xs ${
              product.applicableWeeks === 'odd' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
              product.applicableWeeks === 'even' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
              'bg-blue-50 text-blue-700 border border-blue-200'
            }`}>
              週次：{
                product.applicableWeeks === 'odd' ? '奇數週限定' :
                product.applicableWeeks === 'even' ? '偶數週限定' :
                '奇偶週皆適用'
              }
            </span>
            <span className={`px-2.5 py-1 rounded-xl font-bold text-xs ${
              product.targetZone === 'cheeks' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
              product.targetZone === 'chin' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
              product.targetZone === 'eyes' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
              'bg-stone-100 text-stone-700'
            }`}>
              部位：{
                product.targetZone === 'cheeks' ? '兩頰乾燥區' :
                product.targetZone === 'chin' ? '下巴粉刺區' :
                product.targetZone === 'eyes' ? '眼周細紋區' :
                '全臉'
              }
            </span>
          </div>

          {/* Role */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1">
              專屬定位與任務
            </span>
            <p className="text-stone-800 font-bold text-sm">
              {product.role}
            </p>
          </div>

          {/* Usage Timing */}
          {product.usageTiming && (
            <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-700" />
                建議最佳使用時機
              </span>
              <p className="text-amber-950 font-bold text-sm">
                {product.usageTiming}
              </p>
            </div>
          )}

          {/* Usage Instructions */}
          <div>
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2">
              📖 詳細用法與關鍵手法
            </span>
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-stone-700 leading-relaxed whitespace-pre-line text-xs sm:text-sm">
              {product.usageInstructions}
            </div>
          </div>

          {/* Cautions */}
          {product.cautions && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs sm:text-sm text-rose-950 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-rose-700">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                重要安全提醒與禁忌
              </span>
              <p className="leading-relaxed">
                {product.cautions}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold bg-stone-900 hover:bg-stone-800 text-white rounded-xl transition-colors"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
};
