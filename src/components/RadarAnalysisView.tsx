import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  TrendingUp, 
  Droplets, 
  Sun, 
  HeartHandshake, 
  Flame, 
  Zap, 
  HelpCircle,
  Layers,
  Activity
} from 'lucide-react';

interface RadarDimension {
  key: string;
  label: string;
  score: number; // 0 - 100
  target: number; // 100
  status: 'excellent' | 'good' | 'optimal';
  strengths: string[];
  keyProducts: string[];
  gapAnalysis: string;
  recommendation: string;
}

export const RadarAnalysisView: React.FC = () => {
  const [activeChart, setActiveChart] = useState<'skincare' | 'supplements'>('skincare');
  const [hoveredDimension, setHoveredDimension] = useState<RadarDimension | null>(null);

  // Skincare 6 Dimensions
  const skincareDimensions: RadarDimension[] = [
    {
      key: 'barrier',
      label: '兩頰屏障修護與鎖水',
      score: 96,
      target: 100,
      status: 'excellent',
      strengths: [
        'S.NATURE 水庫角鯊烷面霜 (#21) 深層補脂修護',
        '契爾氏冰河醣蛋白霜 (#23) 秋冬兩頰長效強效封層',
        '黛珂小紫瓶 (#11) 微脂囊前導，直達基底修復屏障',
        'Dr. Reju-All PDRN 修復霜 (#22) 針對脫皮泛紅急救'
      ],
      keyProducts: ['#11', '#21', '#23', '#22', '#09'],
      gapAnalysis: '兩頰乾肌屏障保護極為完備，鎖水與補脂品項充足，換季抗乾燥能力達標。',
      recommendation: '秋冬季或吹冷氣時，若兩頰有緊繃感，可隨時以 #09 BOH 或 #10 Ongredients 噴霧輔助補水。'
    },
    {
      key: 'pore',
      label: '毛孔淨化與角質代謝',
      score: 92,
      target: 100,
      status: 'excellent',
      strengths: [
        '寶拉 2% 水楊酸 (#15) 每週二專門溶解下巴與鼻翼油脂角栓',
        'CHECK2CHECK 離子淨膚儀 (#32) 每週三搭配舒特膚潔膚水導出殘妝皮脂',
        'Kanebo suisai 酵素洗顏粉 (#06) 奇數週六溫和代謝蛋白質老廢角質',
        'SEXYLOOK 綠番茄奶油潔顏乳 (#05) T 字與下巴局部加強'
      ],
      keyProducts: ['#15', '#32', '#02', '#06', '#05'],
      gapAnalysis: '代謝節奏精密，物理導出與化學酸類分日交替，沒有連續疊加傷害屏障的風險。',
      recommendation: '嚴格遵守寶拉水楊酸只塗下巴鼻翼、靜置 3-5 分鐘的鐵則，兩頰乾肌切勿沾染。'
    },
    {
      key: 'antiaging',
      label: '抗老撫紋與細胞激活',
      score: 88,
      target: 100,
      status: 'good',
      strengths: [
        'Celimax A 醇微晶精華 (#17) 每週四固定刺激膠原新生與細緻角質',
        '雅詩蘭黛特潤眼霜 (#25) 建立眼周安全隔離障壁，預防乾紋',
        '巴黎萊雅紫熨斗 MAX (#26) 晨間或修護夜深層撫平眼下細紋',
        'Medicube PDRN 胜肽安瓶 (#12) 偶數週六離子儀溫感導入'
      ],
      keyProducts: ['#17', '#25', '#26', '#12', '#32'],
      gapAnalysis: 'A 醇與眼周專用撫紋產品配置精準，且有眼霜預先隔離的安全防護。',
      recommendation: 'A 醇使用量維持豌豆大小即可，切勿因急於求成增加頻率，維持每週四單次微晶抗老最安全。'
    },
    {
      key: 'chin_control',
      label: '下巴控油與抗炎舒緩',
      score: 94,
      target: 100,
      status: 'excellent',
      strengths: [
        'MUJI 米糠發酵乳液 (#18) 每日早晚下巴專屬清爽鎖水，不悶閉口',
        'The Ordinary 10% 菸鹼醯胺＋1% 鋅 (#14) 偶數週五局部點塗下巴控油',
        'Quality 1st AZ100 壬二酸藍瓶面膜 (#30) 奇數週日抗痘消炎',
        '徹底戒除厚霜塗抹下巴的習慣，避免毛孔悶塞'
      ],
      keyProducts: ['#18', '#14', '#30'],
      gapAnalysis: '分區保養落實徹底，下巴只給清爽水相與發酵米糠乳液，完美對抗反覆發炎痘痘。',
      recommendation: '下巴出油較多時可加強米糠乳液吸收，遇紅腫囊腫痘可局部以 AZ100 精華厚敷點塗。'
    },
    {
      key: 'photoprotect',
      label: '日間防曬與抗氧化提亮',
      score: 86,
      target: 100,
      status: 'good',
      strengths: [
        'd’Alba 黛爾泊粉光校色提亮防曬霜 (#28) 上班日單擦自帶透亮水光',
        '曼秀雷敦水潤肌玻尿酸防曬 (#29) 完整底妝日高保濕無粉感透明防護',
        'ANUA 70% 桃子菸鹼醯胺精華 (#13) 奇數週白天溫和抗氧化提亮',
        '植村秀無極限妝前乳 (#31) 局部修飾嘴角與暗沉蠟黃'
      ],
      keyProducts: ['#28', '#29', '#13', '#31'],
      gapAnalysis: '防曬質地兼顧素顏上班日與底妝日需求，晨間精華抗氧化搭配得宜。',
      recommendation: '【重點缺口】：戶外活動或靠窗工作超過 4 小時時，需注意防曬補塗；建議防曬塗抹範圍可延伸至頸部。'
    },
    {
      key: 'device_boost',
      label: '儀器深層促滲與導出',
      score: 90,
      target: 100,
      status: 'excellent',
      strengths: [
        'CHECK2CHECK 離子淨膚儀 (#32) 具備「深層導出」與「保濕導入」雙模式',
        '週三搭配舒特膚潔膚水 (#02) 電荷吸附毛孔殘留',
        '偶數週六搭配 Medicube PDRN 胜肽安瓶 (#12) 溫感導入促進吸收'
      ],
      keyProducts: ['#32', '#02', '#12'],
      gapAnalysis: '家用儀器與保養品項高度連動，週三深層清潔與週六深層導入分流清晰。',
      recommendation: '導出時化妝棉需保持充分濕潤，避免摩擦拉扯；儀器金屬探頭使用後需以乾淨棉片清潔消毒。'
    }
  ];

  // Supplements 5 Dimensions
  const supplementDimensions: RadarDimension[] = [
    {
      key: 'antioxidant',
      label: '全身抗氧化與提亮透光',
      score: 92,
      target: 100,
      status: 'excellent',
      strengths: [
        "BHK's 奢光錠 (#01) 含有高純度谷胱甘肽與維生素 C",
        '全面取消夜間服用，改為白天餐後吸收更佳',
        'Webber Naturals 蔓越莓 (#05) 高濃度前花青素協同抗自由基'
      ],
      keyProducts: ['BHK\'s 奢光錠', '蔓越莓濃縮膠囊'],
      gapAnalysis: '谷胱甘肽與花青素雙重抗氧化網絡完整，且避開了睡前精神科安眠藥物干擾。',
      recommendation: '白天配合充足水分與日曬防護，能讓體內抗自由基效益最大化。'
    },
    {
      key: 'anti_inflammatory',
      label: '體內抗發炎與皮脂調節',
      score: 90,
      target: 100,
      status: 'excellent',
      strengths: [
        'Sports Research 阿拉斯加 Omega-3 魚油 (#04) 高濃度 EPA/DHA',
        '從人體前列腺素代謝途徑抑制下巴粉刺與痘痘發炎連鎖反應',
        '潤澤乾性兩頰皮膚細胞膜，改善粗糙起屑'
      ],
      keyProducts: ['Sports Research 魚油'],
      gapAnalysis: '高品質高純度 TG 型魚油，隨餐服用能確保高達 80% 以上乳化吸收率。',
      recommendation: '務必隨午餐或晚餐含油脂食物吞服，既能強化吸收又不易產生打嗝魚腥味。'
    },
    {
      key: 'energy_metabolism',
      label: '細胞能量與神經黏膜修復',
      score: 94,
      target: 100,
      status: 'excellent',
      strengths: [
        'Thorne 基本維生素 B 複合物 (#03) 高活性甲基化葉酸與活性 B12',
        '嚴格落實早餐處方藥（PTU+癲鍵錠）後「間隔 1 小時」服用',
        '支援粒線體能量生成，維持肌膚角質細胞屏障合成'
      ],
      keyProducts: ['Thorne 基本維生素 B 複合物'],
      gapAnalysis: '活性型 B 群無人工添加，且嚴格隔開處方用藥，藥理代謝交互風險已降至最低。',
      recommendation: '維持早餐後 60 分鐘服用習慣；尿液變鮮黃色為正常 B2 排泄現象，無須擔憂。'
    },
    {
      key: 'barrier_immunity',
      label: '屏障健康與免疫支援',
      score: 86,
      target: 100,
      status: 'good',
      strengths: [
        'Kirkland 科克蘭 維生素 D3 (#02) 每日 2 錠 (700 IU)',
        '調控抗菌胜肽生成，輔助皮膚表皮抗菌屏障',
        '維持體內鈣質平衡與神經肌肉正常生理'
      ],
      keyProducts: ['Kirkland 維生素 D3'],
      gapAnalysis: '700 IU 為安全的日常防護劑量，符合亞洲女性日常缺乏之基礎補充。',
      recommendation: '【重點缺口】：維生素 D3 為脂溶性，若偶爾午餐僅吃清淡水煮餐，吸收率會顯著下降，建議搭配有油脂之主餐。'
    },
    {
      key: 'urinary_intimate',
      label: '私密健康與微生態防禦',
      score: 95,
      target: 100,
      status: 'excellent',
      strengths: [
        'Webber Naturals 蔓越莓濃縮精華 (#05) 500mg，36:1 高倍濃縮',
        '前花青素（PACs）天然防護，預防黏附',
        '植物多酚支援全身微循環抗氧化'
      ],
      keyProducts: ['Webber Naturals 蔓越莓膠囊'],
      gapAnalysis: '36:1 濃縮規格非常充足，每日 1-2 粒即可達到全日保護力。',
      recommendation: '【關鍵配合】：蔓越莓 PACs 必須仰賴尿液充分沖刷，每日開水請務必維持在 1800 ~ 2000 ml！'
    }
  ];

  const currentDimensions = activeChart === 'skincare' ? skincareDimensions : supplementDimensions;

  // SVG Radar Geometry calculations
  const size = 380;
  const center = size / 2;
  const radius = size * 0.38;
  const totalAxes = currentDimensions.length;

  const getCoordinates = (index: number, valuePercent: number) => {
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (valuePercent / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Build polygon points string for data
  const dataPoints = currentDimensions.map((d, i) => {
    const { x, y } = getCoordinates(i, d.score);
    return `${x},${y}`;
  }).join(' ');

  // Target points (100%)
  const targetPoints = currentDimensions.map((d, i) => {
    const { x, y } = getCoordinates(i, d.target);
    return `${x},${y}`;
  }).join(' ');

  // Average score
  const averageScore = Math.round(
    currentDimensions.reduce((acc, curr) => acc + curr.score, 0) / currentDimensions.length
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-indigo-500/10 text-indigo-700 rounded-xl">
                <Activity className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">
                全配方雷達圖分析 ＆ 潛在缺口洞察
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-3xl leading-relaxed">
              透過多維度數值化模型，深度評估您的 31 項外用品 ＋ 美容儀 ＋ 5 款保健品的覆蓋飽和度、屏障優勢與補強焦點。
            </p>
          </div>

          {/* Toggle between Skincare and Supplements */}
          <div className="flex items-center bg-stone-100 p-1.5 rounded-2xl border border-stone-200 shrink-0">
            <button
              onClick={() => {
                setActiveChart('skincare');
                setHoveredDimension(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeChart === 'skincare'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              🧴 外用保養 (6大維度)
            </button>
            <button
              onClick={() => {
                setActiveChart('supplements');
                setHoveredDimension(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeChart === 'supplements'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              💊 內服營養 (5大維度)
            </button>
          </div>
        </div>
      </div>

      {/* Main Radar Card & Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart Display (5 cols on desktop) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
                  {activeChart === 'skincare' ? '外用護膚屏障平衡' : '內在機能調理平衡'}
                </span>
                <h3 className="text-base font-extrabold text-stone-900 mt-0.5">
                  整體覆蓋成熟度：<span className="text-rose-600">{averageScore}%</span>
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black border border-emerald-200">
                黃金防禦級
              </span>
            </div>

            {/* Radar SVG Visualization */}
            <div className="relative flex items-center justify-center py-2">
              <svg width={size} height={size} className="overflow-visible select-none max-w-full">
                {/* Background Concentric Grid Rings */}
                {[20, 40, 60, 80, 100].map((level) => {
                  const levelPoints = currentDimensions.map((_, i) => {
                    const { x, y } = getCoordinates(i, level);
                    return `${x},${y}`;
                  }).join(' ');
                  return (
                    <polygon
                      key={level}
                      points={levelPoints}
                      fill={level === 100 ? '#fbfbfa' : 'none'}
                      stroke="#e7e5e4"
                      strokeWidth={level === 100 ? '1.5' : '1'}
                      strokeDasharray={level < 100 ? '3 3' : 'none'}
                    />
                  );
                })}

                {/* Axis lines from center */}
                {currentDimensions.map((_, i) => {
                  const { x, y } = getCoordinates(i, 100);
                  return (
                    <line
                      key={i}
                      x1={center}
                      y1={center}
                      x2={x}
                      y2={y}
                      stroke="#d6d3d1"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Target Outline (100%) */}
                <polygon
                  points={targetPoints}
                  fill="none"
                  stroke="#a8a29e"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />

                {/* Current Data Polygon Area */}
                <polygon
                  points={dataPoints}
                  fill={activeChart === 'skincare' ? 'rgba(244, 63, 94, 0.18)' : 'rgba(217, 119, 6, 0.18)'}
                  stroke={activeChart === 'skincare' ? '#f43f5e' : '#d97706'}
                  strokeWidth="2.5"
                  className="transition-all duration-700 ease-out"
                />

                {/* Data Points / Nodes */}
                {currentDimensions.map((d, i) => {
                  const { x, y } = getCoordinates(i, d.score);
                  const isHovered = hoveredDimension?.key === d.key;
                  return (
                    <g key={d.key}>
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? 7 : 5}
                        fill={activeChart === 'skincare' ? '#f43f5e' : '#d97706'}
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="cursor-pointer transition-all duration-200"
                        onMouseEnter={() => setHoveredDimension(d)}
                      />
                    </g>
                  );
                })}

                {/* Labels around the perimeter */}
                {currentDimensions.map((d, i) => {
                  const { x, y, angle } = getCoordinates(i, 118);
                  const isHovered = hoveredDimension?.key === d.key;
                  // Align text according to angle
                  const textAnchor = Math.cos(angle) > 0.3 ? 'start' : Math.cos(angle) < -0.3 ? 'end' : 'middle';
                  
                  return (
                    <text
                      key={d.key}
                      x={x}
                      y={y + (Math.sin(angle) > 0.5 ? 6 : -2)}
                      textAnchor={textAnchor}
                      className={`text-[11px] transition-all cursor-pointer select-none ${
                        isHovered 
                          ? 'font-black fill-rose-600 font-bold scale-105' 
                          : 'font-semibold fill-stone-700'
                      }`}
                      onClick={() => setHoveredDimension(d)}
                      onMouseEnter={() => setHoveredDimension(d)}
                    >
                      {d.label} ({d.score}%)
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Interactive Legend Footnote */}
          <div className="pt-4 mt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span>當前評分覆蓋</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 border-b-2 border-dashed border-stone-400 inline-block" />
              <span>100% 飽和指標</span>
            </div>
            <span className="text-[11px] text-stone-400">點擊節點查看維度</span>
          </div>
        </div>

        {/* Detailed Breakdown & Dimension Cards (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Active Highlight Banner if node hovered/clicked */}
          {hoveredDimension ? (
            <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-3xl p-5 shadow-md border border-stone-700 space-y-2 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-rose-500 text-white">
                  維度聚焦：{hoveredDimension.label}
                </span>
                <span className="text-sm font-black text-rose-400">
                  {hoveredDimension.score} / 100 分
                </span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {hoveredDimension.gapAnalysis}
              </p>
              <div className="text-[11px] text-amber-300 bg-black/30 p-2.5 rounded-xl border border-white/10">
                <strong>💡 強化提醒：</strong>{hoveredDimension.recommendation}
              </div>
            </div>
          ) : (
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
              <span>💡 提示：點擊或滑鼠懸停左側雷達圖的任一軸線節點，可即時聚焦該面向。</span>
              <span className="font-bold text-stone-700">共 {currentDimensions.length} 大維度</span>
            </div>
          )}

          {/* Dimension Cards List */}
          <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
            {currentDimensions.map((dim) => {
              const isSelected = hoveredDimension?.key === dim.key;
              return (
                <div
                  key={dim.key}
                  onClick={() => setHoveredDimension(dim)}
                  className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-rose-400 ring-2 ring-rose-400/20 shadow-sm'
                      : 'border-stone-200/90 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-stone-900 text-sm">
                        {dim.label}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-md bg-stone-100 text-stone-700">
                        成熟度 {dim.score}%
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {dim.keyProducts.map((p, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md bg-stone-100 text-stone-700 border border-stone-200"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Strengths list */}
                  <ul className="space-y-1 mb-2">
                    {dim.strengths.slice(0, 2).map((st, sIdx) => (
                      <li key={sIdx} className="text-xs text-stone-600 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{st}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Recommendation snippet */}
                  <div className="bg-stone-50 rounded-xl p-2.5 text-[11px] text-stone-600 leading-relaxed border border-stone-200/60">
                    <strong className="text-stone-800">缺口解析：</strong>
                    <span>{dim.recommendation}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 🛡️ Strategic Gap Analysis & Optimization Insights */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5">
          <span className="p-2 bg-rose-500/10 text-rose-600 rounded-xl">
            <TrendingUp className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-extrabold text-stone-900 text-base sm:text-lg">
              全方位四大關鍵缺口 ＆ 優化執行重點
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              依據臨床藥理、乾肌屏障生理與下巴粉刺成因進行整體診斷
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* Gap 1 */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-500 text-white rounded-lg">
                <Droplets className="w-4 h-4" />
              </span>
              <h4 className="font-black text-amber-950 text-sm">
                缺口 1：每日水分攝取量（蔓越莓 PACs 與處方代謝）
              </h4>
            </div>
            <p className="text-stone-600 text-xs leading-relaxed">
              <strong>診斷：</strong>Webber Naturals 蔓越莓濃縮物含有 36:1 倍前花青素（PACs），其預防泌尿黏附與抗慢性發炎的作用，高度依賴腎臟濾過與尿液持續沖刷；此外早餐處方藥 Topiramate 也需要充足水分預防沉積。
            </p>
            <div className="bg-white p-2.5 rounded-xl border border-amber-300 text-xs text-amber-900 font-bold">
              ✅ 執行重點：請務必搭配網站內建的「2000 ml 水分打卡」，分次於日間補充溫開水！
            </div>
          </div>

          {/* Gap 2 */}
          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-rose-500 text-white rounded-lg">
                <Sun className="w-4 h-4" />
              </span>
              <h4 className="font-black text-rose-950 text-sm">
                缺口 2：維生素 D3 脂溶性吸收條件
              </h4>
            </div>
            <p className="text-stone-600 text-xs leading-relaxed">
              <strong>診斷：</strong>Kirkland 科克蘭維生素 D3 (700 IU) 屬於純脂溶性維生素。若午餐或晚餐吃過於清淡（如純生菜、水煮蔬菜），小腸絨毛對 D3 的吸收率會陡降 50% 以上。
            </p>
            <div className="bg-white p-2.5 rounded-xl border border-rose-300 text-xs text-rose-900 font-bold">
              ✅ 執行重點：務必隨餐搭配肉類、蛋類或健康好油脂，與 Sports Research 魚油一同隨正餐服用！
            </div>
          </div>

          {/* Gap 3 */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-indigo-600 text-white rounded-lg">
                <Zap className="w-4 h-4" />
              </span>
              <h4 className="font-black text-indigo-950 text-sm">
                缺口 3：週三離子導出與週四 A 醇的屏障承載銜接
              </h4>
            </div>
            <p className="text-stone-600 text-xs leading-relaxed">
              <strong>診斷：</strong>週三夜間進行離子淨膚儀深層導出後，毛孔皮脂阻抗降低；週四夜間緊接著執行 Celimax A 醇微晶抗老。若兩頰在週三水分封存不足，週四容易感到乾燥微刺。
            </p>
            <div className="bg-white p-2.5 rounded-xl border border-indigo-300 text-xs text-indigo-900 font-bold">
              ✅ 執行重點：偶數週三導出後務必加敷 #33 保濕面膜，且週四擦 A 醇前嚴格先擦 #25 眼霜隔離眼周！
            </div>
          </div>

          {/* Gap 4 */}
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-emerald-600 text-white rounded-lg">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <h4 className="font-black text-emerald-950 text-sm">
                缺口 4：下巴粉刺痘痘的「終極零油膩防線」
              </h4>
            </div>
            <p className="text-stone-600 text-xs leading-relaxed">
              <strong>診斷：</strong>Amanda 屬於兩頰乾、下巴易長粉刺的典型分區膚質。兩頰需要高保濕霜（S.NATURE 或契爾氏冰河霜），但若手指殘留面霜順手抹到下巴，下巴便容易誘發閉口囊腫。
            </p>
            <div className="bg-white p-2.5 rounded-xl border border-emerald-300 text-xs text-emerald-900 font-bold">
              ✅ 執行重點：下巴永遠只擦 #18 MUJI 米糠乳液，塗抹兩頰面霜時務必避開下巴與人中周圍！
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
