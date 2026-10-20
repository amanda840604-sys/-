import React from 'react';
import { Sparkles, Droplets, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { SkincareProduct } from '../types/routine';
import { SKINCARE_PRODUCTS } from '../data/routineData';

interface MakeupAndCleansingViewProps {
  onSelectProduct: (product: SkincareProduct) => void;
}

export const MakeupAndCleansingView: React.FC<MakeupAndCleansingViewProps> = ({ onSelectProduct }) => {
  const getProduct = (num: string) => SKINCARE_PRODUCTS.find(p => p.number === num);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* SECTION 1: 週末上妝搭配 */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/10 text-rose-600 rounded-2xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">
              週末完整底妝前置搭配（服貼不卡紋）
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              針對兩頰乾肌、眼下細紋與下巴粉刺的底妝專屬打底程序
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Makeup step 1: Eyes */}
          <div 
            onClick={() => {
              const p = getProduct('27');
              if (p) onSelectProduct(p);
            }}
            className="p-4 rounded-2xl border border-stone-200 hover:border-rose-400 bg-stone-50/50 hover:bg-white transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-stone-200 text-stone-800">
                  步驟 1：眼下妝前打底
                </span>
                <span className="text-xs font-black font-mono text-rose-600">#27</span>
              </div>
              <h4 className="font-extrabold text-stone-900 text-sm">
                BOBBI BROWN 維他命完美眼霜
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                在遮瑕膏前先薄擦於眼下，深層滋潤撫平細紋，徹底預防遮瑕膏乾裂卡粉與結塊。
              </p>
            </div>
            <div className="mt-3 text-[11px] font-bold text-rose-600 flex items-center gap-1">
              <span>查看產品細節</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Makeup step 2: Cheeks */}
          <div 
            onClick={() => {
              const p = getProduct('24');
              if (p) onSelectProduct(p);
            }}
            className="p-4 rounded-2xl border border-stone-200 hover:border-rose-400 bg-stone-50/50 hover:bg-white transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-stone-200 text-stone-800">
                  步驟 2：兩頰潤澤打底
                </span>
                <span className="text-xs font-black font-mono text-rose-600">#24</span>
              </div>
              <h4 className="font-extrabold text-stone-900 text-sm">
                BOBBI BROWN 維他命完美乳霜（橘子霜）
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                塗抹於乾燥兩頰，撫平乾皮起屑使粉底高附著。
              </p>
              <div className="mt-2 text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-1 rounded-md">
                ⚠️ 分區提醒：避開下巴！下巴維持擦 #18 米糠乳液控油
              </div>
            </div>
            <div className="mt-3 text-[11px] font-bold text-rose-600 flex items-center gap-1">
              <span>查看產品細節</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Makeup step 3: Sunscreen */}
          <div 
            onClick={() => {
              const p = getProduct('29');
              if (p) onSelectProduct(p);
            }}
            className="p-4 rounded-2xl border border-stone-200 hover:border-rose-400 bg-stone-50/50 hover:bg-white transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-stone-200 text-stone-800">
                  步驟 3：高保濕防曬
                </span>
                <span className="text-xs font-black font-mono text-rose-600">#29</span>
              </div>
              <h4 className="font-extrabold text-stone-900 text-sm">
                曼秀雷敦 水潤肌高濃度玻尿酸防曬精華
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                水感透明無粉感，為全臉均勻補水抗 UV，與後續粉底不起屑打架。
              </p>
            </div>
            <div className="mt-3 text-[11px] font-bold text-rose-600 flex items-center gap-1">
              <span>查看產品細節</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Makeup step 4: Color Correction */}
          <div 
            onClick={() => {
              const p = getProduct('31');
              if (p) onSelectProduct(p);
            }}
            className="p-4 rounded-2xl border border-stone-200 hover:border-rose-400 bg-stone-50/50 hover:bg-white transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-stone-200 text-stone-800">
                  步驟 4：局部提亮校色
                </span>
                <span className="text-xs font-black font-mono text-rose-600">#31</span>
              </div>
              <h4 className="font-extrabold text-stone-900 text-sm">
                植村秀 無極限保濕妝前乳（紫色／膚色）
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                局部點塗於嘴角蠟黃暗沉處、下巴或眼下微暗處，提亮膚色均勻度。
              </p>
            </div>
            <div className="mt-3 text-[11px] font-bold text-rose-600 flex items-center gap-1">
              <span>查看產品細節</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: 洗卸全配對表 */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/10 text-cyan-700 rounded-2xl">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">
              6 款卸洗品項情境配對指南
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              依當日妝容厚度與夜間功能主題（酸類/A醇/微針）精準選用，預防過度清潔或殘留
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              num: '01',
              name: 'MUJI 溫和卸妝油',
              scenario: '全妝日 ＆ 功能夜（週二水楊酸、週四A醇、偶週日微針）主力卸妝',
              guide: '乾手乾臉輕柔按摩，下巴粉刺加強打圈，加水乳化沖淨。'
            },
            {
              num: '02',
              name: 'Cetaphil 舒特膚 胜肽潔膚水',
              scenario: '【深層導出潔膚夜】每週三 ＋ #32 CHECK2CHECK 離子淨膚儀',
              guide: '浸潤化妝棉搭配離子儀深層導出毛孔髒污與殘妝。'
            },
            {
              num: '03',
              name: 'Capsule Serum 維他命 C 去角質卸洗凝膠',
              scenario: '【上班日極簡卸妝】僅擦防曬或淡妝日（每週最多 1～2 次）',
              guide: '溫和潔面卸妝，但【嚴禁】與水楊酸夜或微針夜同晚使用！'
            },
            {
              num: '04',
              name: '綠茶保濕胺基酸潔面乳',
              scenario: '每日早晚日常 ＆ 所有功能夜的唯一主力洗面乳',
              guide: '起泡溫和洗淨不緊繃，維持皮脂膜健康。'
            },
            {
              num: '05',
              name: 'SEXYLOOK 西西露 綠番茄奶油洗面乳',
              scenario: '【局部深層毛孔清潔】每週最多 1 次，如週三導出後局部使用',
              guide: '僅局部用於 T 字與下巴粉刺區，兩頰乾肌請避開。'
            },
            {
              num: '06',
              name: 'Kanebo suisai 酵素洗顏粉（藍色）',
              scenario: '【奇數週週末去角質夜】每週僅 1 次，溫和分解老廢角質',
              guide: '當晚嚴格暫停水楊酸與 A 醇等高活性酸類產品。'
            }
          ].map((item) => {
            const p = getProduct(item.num);
            return (
              <div
                key={item.num}
                onClick={() => {
                  if (p) onSelectProduct(p);
                }}
                className="p-4 rounded-2xl border border-stone-200 hover:border-cyan-400 bg-stone-50/40 hover:bg-white transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-stone-900 text-white font-mono shrink-0">
                    #{item.num}
                  </span>
                  <div>
                    <h4 className="font-extrabold text-stone-900 text-sm">
                      {item.name}
                    </h4>
                    <span className="text-xs font-semibold text-cyan-800 block mt-0.5">
                      適用：{item.scenario}
                    </span>
                    <p className="text-xs text-stone-500 mt-1">
                      {item.guide}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-xs font-bold text-cyan-700 flex items-center gap-1">
                  <span>品項詳情</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
