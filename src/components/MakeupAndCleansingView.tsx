import React from 'react';
import { Sparkles, Droplets, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { SkincareProduct } from '../types/routine';
import { SKINCARE_PRODUCTS } from '../data/routineData';

interface MakeupAndCleansingViewProps {
  onSelectProduct: (product: SkincareProduct) => void;
}

export const MakeupAndCleansingView: React.FC<MakeupAndCleansingViewProps> = ({ onSelectProduct }) => {
  const getProduct = (num: string) => SKINCARE_PRODUCTS.find(p => p.number === num || p.id === num || p.id === `p-${num}`);

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
              完整全妝保濕與妝前打底步驟（防起屑減法版）
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              前導減法避免搓泥起屑，兩頰加強貼妝打底、眼下防卡紋、下巴清爽控油
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Makeup step 1: Eyes */}
          <div 
            onClick={() => {
              const p = getProduct('37');
              if (p) onSelectProduct(p);
            }}
            className="p-4 rounded-2xl border border-stone-200 hover:border-rose-400 bg-stone-50/50 hover:bg-white transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-stone-200 text-stone-800">
                  步驟 1：眼下妝前打底
                </span>
                <span className="text-xs font-black font-mono text-rose-600">#37</span>
              </div>
              <h4 className="font-extrabold text-stone-900 text-sm">
                BOBBI BROWN 維他命完美眼霜
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                取米粒大小於眼下輕按推勻，等待 1 分鐘完全貼合成膜，阻絕後續遮瑕膏卡紋與結塊。
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
              const p = getProduct('33');
              if (p) onSelectProduct(p);
            }}
            className="p-4 rounded-2xl border border-stone-200 hover:border-rose-400 bg-stone-50/50 hover:bg-white transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-stone-200 text-stone-800">
                  步驟 2：兩頰潤澤打底
                </span>
                <span className="text-xs font-black font-mono text-rose-600">#33</span>
              </div>
              <h4 className="font-extrabold text-stone-900 text-sm">
                BOBBI BROWN 維他命完美面霜（橘子霜）
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                塗抹於乾燥兩頰，撫平乾皮起屑打造完美平滑貼妝感，提升粉底服貼持久度。
              </p>
              <div className="mt-2 text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-1 rounded-md">
                ⚠️ 分區提醒：下巴粉刺區嚴格避開橘子霜！改擦清爽的 #25 MUJI 米糠乳液預防悶痘
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
              const p = getProduct('39');
              if (p) onSelectProduct(p);
            }}
            className="p-4 rounded-2xl border border-stone-200 hover:border-rose-400 bg-stone-50/50 hover:bg-white transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-stone-200 text-stone-800">
                  步驟 3：透明高保濕防曬
                </span>
                <span className="text-xs font-black font-mono text-rose-600">#39</span>
              </div>
              <h4 className="font-extrabold text-stone-900 text-sm">
                曼秀雷敦 水潤肌高濃度玻尿酸防曬精華
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                水感透明無粉感，為全臉均勻補水抗 UV，靜置 3~5 分鐘成膜後與後續彩妝極佳融合。
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
              const p = getProduct('p-makeup-base') || getProduct('妝前');
              if (p) onSelectProduct(p);
            }}
            className="p-4 rounded-2xl border border-stone-200 hover:border-rose-400 bg-stone-50/50 hover:bg-white transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-stone-200 text-stone-800">
                  步驟 4：局部提亮校色
                </span>
                <span className="text-xs font-black font-mono text-rose-600">妝前乳</span>
              </div>
              <h4 className="font-extrabold text-stone-900 text-sm">
                植村秀 無極限保濕妝前乳（紫色／膚色）
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                局部點塗於嘴角蠟黃暗沉處、下巴或眼下微暗處，修飾膚色不均後再上粉底。
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
              8 款卸洗與毛孔清潔品項情境配對指南
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
              name: 'ilso 溫和粉刺溶解露',
              scenario: '【每週粉刺大掃除夜專用】',
              guide: '濕敷／局部按摩下巴與鼻翼 10-15 分鐘，溫和融化固態硬化角栓，協同水楊酸打造無痛清粉刺組合。'
            },
            {
              num: '02',
              name: 'MUJI 無印良品 卸妝油',
              scenario: '全妝日或功能夜（水楊酸、A醇、微針）的主力卸妝',
              guide: '乾手乾臉輕柔按摩，下巴加強打圈，加水充分乳化後沖淨。'
            },
            {
              num: '03',
              name: 'Cetaphil 舒特膚 胜肽緊緻賦活潔膚水',
              scenario: '【深層導出潔膚夜】每週三 ＋ 離子淨膚儀',
              guide: '浸潤化妝棉夾於探頭，開啟導出模式由內向外滑動導出毛孔殘妝與多餘皮脂。'
            },
            {
              num: '04',
              name: 'Capsule Serum 維他命 C 去角質護理卸妝潔面凝膠',
              scenario: '【上班日極簡卸妝組】僅擦防曬時的溫和潔面卸妝（每週最多 1～2 次）',
              guide: '溫和潔面卸妝，【嚴禁】與酸類夜（週二）或微針夜同晚使用！'
            },
            {
              num: '05',
              name: 'Relove Nrf2 Ultimate Future 胺基酸潔面乳',
              scenario: '【高階溫和洗面乳】早晚修護洗臉',
              guide: '奢華溫和，可與綠茶潔面乳交替作為日常早晚清潔，維持皮脂膜健康。'
            },
            {
              num: '06',
              name: '綠茶保濕胺基酸潔面乳',
              scenario: '早晚日常與所有功能夜的唯一主力洗面乳',
              guide: '溫和起泡洗淨不緊繃，所有酸類與 A 醇夜後的溫和潔顏首選。'
            },
            {
              num: '07',
              name: 'SEXYLOOK 西西露 綠番茄奶油洗面乳',
              scenario: '【修護夜局部清潔】局部清潔 T 字與下巴粉刺區（每週最多 1 次）',
              guide: '僅局部清潔 T 字與下巴，洗後若乾澀需停用，兩頰乾肌請避開。'
            },
            {
              num: '08',
              name: 'Kanebo suisai 酵素洗顏粉（藍色）',
              scenario: '【奇數週週末去角質夜】每週 1 次',
              guide: '溫和分解老廢角質與下巴粉刺，當晚暫停水楊酸與 A 醇。'
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
