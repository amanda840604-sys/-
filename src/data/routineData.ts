import { 
  PrescriptionItem, 
  SupplementItem, 
  SkincareProduct, 
  DayRoutine 
} from '../types/routine';

export const PRESCRIPTION_MEDS: PrescriptionItem[] = [
  {
    id: 'rx-1',
    name: '"汎生" 普樂彼錠 50 毫克',
    genericName: 'Propylthiouracil / PTU',
    dosage: '早餐飯後 3 顆',
    timeSlot: 'breakfast',
    category: '抗甲狀腺製劑',
    instructions: '早餐後隨餐或飯後立即溫水吞服 3 顆。',
    safetyNotes: '請配合定期回診抽血追蹤甲狀腺指數；與 Thorne B 群需間隔 1 小時服用。'
  },
  {
    id: 'rx-2',
    name: '"信東" 癲鍵錠 50 毫克',
    genericName: 'Topiramate',
    dosage: '早餐飯後 1 顆',
    timeSlot: 'breakfast',
    category: '抗痙攣/情緒穩定劑',
    instructions: '早餐後隨餐或飯後立即溫水吞服 1 顆。',
    safetyNotes: '請維持充足水分攝取以預防結石；與 Thorne B 群需間隔 1 小時服用。'
  },
  {
    id: 'rx-3',
    name: '"瑞安" 癲必停持續性藥效膜衣錠 500 毫克',
    genericName: 'Levetiracetam ER',
    dosage: '晚上睡前 0.5 顆',
    timeSlot: 'bedtime',
    category: '水溶性抗痙攣劑',
    instructions: '睡前 30 分鐘搭配開水吞服 0.5 顆。膜衣錠請依醫師指示對半剝服，勿磨碎。',
    safetyNotes: '睡前單純服用，切勿在此時服用 BHK\'s 奢光錠或高劑量維生素。'
  },
  {
    id: 'rx-4',
    name: '易靜錠 2 毫克',
    genericName: 'Flunitrazepam / 羅眠樂',
    dosage: '睡前 1 顆',
    timeSlot: 'bedtime',
    category: '精神治療藥(鎮靜安眠)',
    instructions: '睡前 15~30 分鐘服用 1 顆，服藥後立即就寢，避免從事需警覺性之活動。',
    safetyNotes: '嚴禁與酒精併用；夜間完全避免與保健品同服，以維持純淨神經放鬆狀態。'
  }
];

export const ORAL_SUPPLEMENTS: SupplementItem[] = [
  {
    id: 'sup-1',
    number: '01',
    name: "BHK's 奢光錠",
    brand: "BHK's",
    specification: '瓶裝 / 訴求亮白與抗氧化',
    recommendedDose: '每日 1-2 錠（依外包裝建議）',
    timing: '白天的餐後（隨早餐或午餐飯後立即吃）',
    timeSlot: 'breakfast',
    isLipophilic: false,
    benefits: ['全身抗氧化', '提亮膚色', '維持肌膚透亮光澤', '協同私密防護'],
    safetyNotes: '【重大調整】遵照最新安全優化，已全面取消夜間服用！改至白天隨餐，徹底與夜間精神科安眠藥分開，避免干擾入眠。',
    whyThisTime: '白天隨餐吸收更好，且完全避開夜間安眠與抗痙攣藥物代謝路徑。'
  },
  {
    id: 'sup-2',
    number: '02',
    name: 'Kirkland 科克蘭 維生素 D3',
    brand: 'Kirkland Signature',
    specification: '單顆標示 350 IU（每份 2 錠共 700 IU）',
    recommendedDose: '每日 2 錠（總計 700 IU）',
    timing: '午餐或晚餐後（隨餐或飯後立即）',
    timeSlot: 'lunch_or_dinner',
    isLipophilic: true,
    benefits: ['支援免疫機能', '強化肌膚屏障健康', '協助鈣質吸收與骨骼健康'],
    safetyNotes: '維生素 D3 為「脂溶性維生素」，空腹吸收極差，必須與含有油脂的午餐或晚餐食物一同消化。',
    whyThisTime: '正餐含肉類或油脂，能大幅提升脂溶性維生素 D3 的腸道乳化與吸收率。'
  },
  {
    id: 'sup-3',
    number: '03',
    name: 'Thorne 基本維生素 B 複合物',
    brand: 'Thorne Research',
    specification: '總容量 60 粒膠囊（高品質活性型 B 群，無多餘人工添加）',
    recommendedDose: '每日 1 粒',
    timing: '早晨早餐後「間隔 1 小時」服用（約 09:00 - 09:30）',
    timeSlot: 'post_breakfast_1hr',
    isLipophilic: false,
    benefits: ['促進能量正常代謝', '提振精神緩解疲勞', '支援皮膚與黏膜健康'],
    safetyNotes: '【核心交互禁忌】必須與早晨處方藥物（PTU 與癲鍵錠）間隔 1 小時！避免高活性 B 群干擾中樞藥物代謝或產生吸收競爭。尿液呈現鮮黃色為正常 B2 代謝現象。',
    whyThisTime: '間隔 1 小時能保障早晨處方藥先完整入血吸收，隨後發揮 B 群一整天的活力代謝效果。'
  },
  {
    id: 'sup-4',
    number: '04',
    name: 'Sports Research 阿拉斯加 Omega-3 頂級魚油',
    brand: 'Sports Research',
    specification: '總容量 90 粒軟膠囊（高濃度三酸甘油酯型 EPA & DHA）',
    recommendedDose: '每日 1 粒（日常保養黃金劑量）',
    timing: '午餐或晚餐隨餐或飯後立即吞服',
    timeSlot: 'lunch_or_dinner',
    isLipophilic: true,
    benefits: ['強效抗發炎（內在調理下巴粉刺痘痘發炎反應）', '潤澤乾燥肌膚與屏障', '維護心血管與思緒靈活'],
    safetyNotes: '隨餐服用吸收最佳，且能有效預防打嗝產生魚腥味。',
    whyThisTime: '正餐油脂刺激膽汁分泌，幫助高濃度 Omega-3 軟膠囊乳化吸收。'
  },
  {
    id: 'sup-5',
    number: '05',
    name: 'Webber Naturals 蔓越莓濃縮精華膠囊',
    brand: 'Webber Naturals',
    specification: '500 mg，36:1 倍濃縮萃取，總容量 250 粒膠囊',
    recommendedDose: '每日 1～2 粒',
    timing: '午餐或晚餐隨餐/餐後，搭配充足開水',
    timeSlot: 'lunch_or_dinner',
    isLipophilic: false,
    benefits: ['強效前花青素（PACs）高濃度守護', '私密處健康防禦', '全身抗自由基與抗氧化'],
    safetyNotes: '服用蔓越莓精華期間，建議每日維持 1800~2000 ml 溫開水攝取，更能發揮雙重淨化代謝效果。',
    whyThisTime: '隨餐不易刺激腸胃，且白天多喝水能讓有效成分充分沖刷循環。'
  }
];

export const SKINCARE_PRODUCTS: SkincareProduct[] = [
  {
    id: 'p-01',
    number: '01',
    brand: 'MUJI 無印良品',
    name: '溫和卸妝油',
    category: '卸妝與清潔',
    categoryType: 'cleansing',
    role: '主力卸妝油',
    applicableWeeks: 'both',
    targetZone: 'all',
    usageInstructions: '全妝日或功能夜（水楊酸、A醇、微針）的主力卸妝。乾手乾臉輕柔按摩全臉，下巴局部加強打圈，加水充分乳化後溫水沖淨。',
    cautions: '必須徹底乳化沖淨，不可殘留。'
  },
  {
    id: 'p-02',
    number: '02',
    brand: 'Cetaphil 舒特膚',
    name: '胜肽緊緻賦活潔膚水',
    category: '卸妝與清潔',
    categoryType: 'cleansing',
    role: '深層導出專用潔膚水',
    applicableWeeks: 'both',
    applicableDays: [3, 0], // 週三導出夜、週日
    targetZone: 'all',
    usageInstructions: '【深層導出潔膚夜】每週三搭配 CHECK2CHECK 離子淨膚儀（導出模式）使用，浸潤化妝棉溫和導出毛孔殘妝與多餘皮脂。',
    cautions: '導出時輕輕滑動即可，切勿用力拉扯肌膚。'
  },
  {
    id: 'p-03',
    number: '03',
    brand: 'Capsule Serum',
    name: '維他命 C 去角質護理卸妝潔面凝膠',
    category: '卸妝與清潔',
    categoryType: 'cleansing',
    role: '極簡日常卸洗凝膠',
    applicableWeeks: 'both',
    applicableDays: [1, 5], // 週一、週五日常修護夜
    targetZone: 'all',
    usageInstructions: '【上班日極簡卸妝】僅擦防曬或淡妝時的溫和潔面卸妝（每週最多 1～2 次）。',
    cautions: '因含微去角質配方，嚴禁與水楊酸夜（週二）或微針夜（週日）同晚使用！'
  },
  {
    id: 'p-04',
    number: '04',
    brand: 'innisfree / 綠茶系列',
    name: '綠茶保濕胺基酸潔面乳',
    category: '卸妝與清潔',
    categoryType: 'cleansing',
    role: '日常主力溫和潔面乳',
    applicableWeeks: 'both',
    targetZone: 'all',
    usageInstructions: '早晚日常與所有功能夜（水楊酸、A醇、微針後）的唯一主力洗面乳。起泡綿密，溫和洗淨不緊繃。'
  },
  {
    id: 'p-05',
    number: '05',
    brand: 'SEXYLOOK 西西露',
    name: '綠番茄奶油洗面乳',
    category: '卸妝與清潔',
    categoryType: 'cleansing',
    role: '局部深層毛孔清潔',
    applicableWeeks: 'both',
    applicableDays: [3], // 週三
    targetZone: 'chin',
    usageInstructions: '【修護夜局部清潔】局部清潔 T 字與下巴反覆粉刺區（每週最多 1 次，如週三導出後局部使用）。',
    cautions: '僅局部用於下巴與鼻翼，兩頰乾肌請避開。若洗後感覺乾燥需暫停。'
  },
  {
    id: 'p-06',
    number: '06',
    brand: 'Kanebo suisai',
    name: '酵素洗顏粉（藍色經典版）',
    category: '卸妝與清潔',
    categoryType: 'cleansing',
    role: '溫和酵素去角質',
    applicableWeeks: 'odd',
    applicableDays: [6], // 奇數週六
    targetZone: 'all',
    usageInstructions: '【奇數週週末去角質夜】每週僅 1 次，加水充分起泡後按摩全臉，溫和代謝老廢角質與下巴粉刺。',
    cautions: '當晚嚴格暫停水楊酸與 A 醇等高活性酸類產品。'
  },
  {
    id: 'p-07',
    number: '07',
    brand: 'ORIGINS 品木宣言',
    name: '青春無敵健康光潤機能水（靈芝水）',
    category: '化妝水與噴霧',
    categoryType: 'toner',
    role: '奇數週修護化妝水',
    applicableWeeks: 'odd',
    targetZone: 'all',
    usageInstructions: '【奇數週專屬】修護夜日常補水，倒在手心溫和輕拍全臉，舒緩泛紅與平衡水油。與 #08 MUJI 化妝水奇偶週交替。'
  },
  {
    id: 'p-08',
    number: '08',
    brand: 'MUJI 無印良品',
    name: '敏感肌化妝水（滋潤型）',
    category: '化妝水與噴霧',
    categoryType: 'toner',
    role: '偶數週修護與功能夜化妝水',
    applicableWeeks: 'even',
    targetZone: 'all',
    usageInstructions: '【偶數週專屬】早晨、水楊酸夜（週二）與 A 醇夜（週四）的溫和基礎補水搭檔。成分單純安全，不干擾活性成分。'
  },
  {
    id: 'p-09',
    number: '09',
    brand: 'BIO HEAL BOH',
    name: '維他命 B5 積雪草保濕修護潤澤噴霧',
    category: '化妝水與噴霧',
    categoryType: 'toner',
    role: '奇數週專屬保濕噴霧',
    applicableWeeks: 'odd',
    targetZone: 'all',
    usageInstructions: '【奇數週專屬】晨間妝前輕噴、辦公室乾燥或日間隨時補水、面膜後加強潤澤。與 #10 奇偶週交替。'
  },
  {
    id: 'p-10',
    number: '10',
    brand: 'Ongredients',
    name: '屏障鎮靜水光噴霧',
    category: '化妝水與噴霧',
    categoryType: 'toner',
    role: '偶數週專屬鎮靜噴霧',
    applicableWeeks: 'even',
    targetZone: 'all',
    usageInstructions: '【偶數週專屬】妝前輕薄補水、夜間精華前後加強保濕，舒緩兩頰乾燥。與 #09 奇偶週交替。'
  },
  {
    id: 'p-11',
    number: '11',
    brand: 'COSME DECORTE 黛珂',
    name: '超微導全能修護精粹（小紫瓶）',
    category: '精華與功能型',
    categoryType: 'serum',
    role: '洗臉後第一步前導主力',
    applicableWeeks: 'both',
    targetZone: 'all',
    usageInstructions: '【洗臉後第一步黃金前導】早晚洗完臉後立即按壓 1~2 下於掌心，雙手溫熱後「由內向外輕輕按拍全臉與眼下」。',
    cautions: '【關鍵手勢】絕對不用化妝棉擦拭！純靠手溫輕壓按拍，使微脂囊深入滲透。'
  },
  {
    id: 'p-12',
    number: '12',
    brand: 'Medicube',
    name: 'PDRN 粉紅胜肽補水安瓶',
    category: '精華與功能型',
    categoryType: 'serum',
    role: '深層補水與修護安瓶',
    applicableWeeks: 'even',
    applicableDays: [6], // 偶數週六導入模式搭配
    targetZone: 'all',
    usageInstructions: '偶數週日間精華步驟使用；或偶數週六夜搭配 CHECK2CHECK 離子儀「保濕導入模式」輕柔滑動導入。'
  },
  {
    id: 'p-13',
    number: '13',
    brand: 'ANUA',
    name: '70% 桃子菸鹼醯胺精華',
    category: '精華與功能型',
    categoryType: 'serum',
    role: '奇數週日間提亮精華',
    applicableWeeks: 'odd',
    targetZone: 'all',
    usageInstructions: '【奇數週白天】或肌膚穩定時的白天精華步驟，取 2~3 滴均勻塗抹全臉，提供透亮光澤與溫和提亮。'
  },
  {
    id: 'p-14',
    number: '14',
    brand: 'The Ordinary',
    name: '10% 菸鹼醯胺＋1% 鋅精華',
    category: '精華與功能型',
    categoryType: 'serum',
    role: '下巴專用高濃度控油精華',
    applicableWeeks: 'even',
    applicableDays: [5], // 偶數週五
    targetZone: 'chin',
    usageInstructions: '【偶數週修護夜】每週 1~2 次，「僅局部點塗於下巴粉刺痘痘區」控油調理。',
    cautions: '【分區鐵則】絕不塗抹全臉或乾燥兩頰！且嚴禁與水楊酸夜同晚重疊。'
  },
  {
    id: 'p-15',
    number: '15',
    brand: "Paula's Choice 寶拉珍選",
    name: '2% 水楊酸精華液',
    category: '精華與功能型',
    categoryType: 'serum',
    role: '局部毛孔角質煥膚主力',
    applicableWeeks: 'both',
    applicableDays: [2], // 每週二固定
    targetZone: 'chin',
    isHighActive: true,
    usageInstructions: '【每週二固定水楊酸夜】洗臉擦乾後，取少量「僅塗抹於下巴與鼻翼粉刺區」，靜置 3~5 分鐘讓脂溶性酸類疏通毛孔後，再接續後續保濕。',
    cautions: '兩頰乾肌請避開！靜置 3~5 分鐘後接續小紫瓶，勿與 A 醇或微針同晚使用。'
  },
  {
    id: 'p-16',
    number: '16',
    brand: 'VT COSMETICS',
    name: 'Reedle Shot 300 微晶精華',
    category: '精華與功能型',
    categoryType: 'serum',
    role: '高強度微晶促滲夜間精華',
    applicableWeeks: 'even',
    applicableDays: [0], // 偶數週日夜
    targetZone: 'all',
    isHighActive: true,
    usageInstructions: '【偶數週日夜】夜間洗臉徹底擦乾後使用，按壓適量於全臉「輕柔垂直按壓」，讓天然微針接觸角質層。',
    cautions: '【手法警告】千萬不要水平用力搓揉！會有天然刺感，隨後加強純補水安瓶與契爾氏冰河霜厚敷封層。當晚不疊加其他酸類。'
  },
  {
    id: 'p-17',
    number: '17',
    brand: 'Celimax',
    name: 'A 醇微晶抗老精華',
    category: '精華與功能型',
    categoryType: 'serum',
    role: '抗老撫紋與角質代謝',
    applicableWeeks: 'both',
    applicableDays: [4], // 每週四固定
    targetZone: 'all',
    isHighActive: true,
    usageInstructions: '【每週四固定 A 醇微晶夜】洗臉打底化妝水並擦妥眼霜隔離後，取「豌豆大小」均勻按壓於全臉。',
    cautions: '避開眼周與下唇邊緣；兩頰後續以保濕霜修護封層，下巴僅擦米糠乳。若有微脫屑屬正常，隔日加強防曬。'
  },
  {
    id: 'p-18',
    number: '18',
    brand: 'MUJI 無印良品',
    name: '米糠發酵乳液',
    category: '乳液與面霜',
    categoryType: 'cream',
    role: '下巴專屬清爽鎖水主力',
    applicableWeeks: 'both',
    targetZone: 'chin',
    usageInstructions: '【每日早晚下巴固定】下巴粉刺痘痘區專屬清爽鎖水乳液。質地輕盈不堵塞毛孔，奇偶週每晚下巴鎖水唯一主力。',
    cautions: '【分區鐵則】下巴只塗此款米糠乳液，嚴禁塗抹契爾氏冰河霜、橘子霜或滋潤型厚霜！'
  },
  {
    id: 'p-19',
    number: '19',
    brand: 'ORIGINS 品木宣言',
    name: '靈芝乳液 2.0（青春無敵健康光潤乳液）',
    category: '乳液與面霜',
    categoryType: 'cream',
    role: '奇數週全臉/兩頰保濕乳液',
    applicableWeeks: 'odd',
    targetZone: 'cheeks',
    usageInstructions: '【奇數週日間/夜間兩頰】薄擦於兩頰乾燥處，舒緩肌膚並提供清爽保濕。與 #20 偶數週 AQ 乳液交替。'
  },
  {
    id: 'p-20',
    number: '20',
    brand: 'COSME DECORTE 黛珂',
    name: 'AQ 煥妍柔膚乳 III（滋潤型）',
    category: '乳液與面霜',
    categoryType: 'cream',
    role: '偶數週兩頰專用滋潤乳',
    applicableWeeks: 'even',
    targetZone: 'cheeks',
    usageInstructions: '【偶數週日間兩頰】兩頰乾燥區專用「先乳後水」或妝前潤澤乳，深層柔軟兩頰角質。',
    cautions: '【分區鐵則】請避開易長粉刺的下巴區域。'
  },
  {
    id: 'p-21',
    number: '21',
    brand: 'S.NATURE',
    name: '水庫角鯊烷保濕面霜',
    category: '乳液與面霜',
    categoryType: 'cream',
    role: '兩頰日常乾燥鎖水主力',
    applicableWeeks: 'odd',
    targetZone: 'cheeks',
    usageInstructions: '奇數週修護夜與日間兩頰日常乾燥鎖水主力。植物角鯊烷能深層修復乾肌皮脂膜，吸收快速不黏膩。'
  },
  {
    id: 'p-22',
    number: '22',
    brand: 'Dr. Reju-All',
    name: 'PDRN 高效深層修復霜',
    category: '乳液與面霜',
    categoryType: 'cream',
    role: '局部脫皮泛紅急救封層',
    applicableWeeks: 'odd',
    applicableDays: [0, 1], // 奇數週日藍膜後、奇數週一
    targetZone: 'cheeks',
    usageInstructions: '局部脫皮、泛紅或奇數週日敷完 AZ100 痘痘藍膜後，針對兩頰乾燥處加強封層急救。'
  },
  {
    id: 'p-23',
    number: '23',
    brand: "Kiehl's 契爾氏",
    name: '冰河醣蛋白保濕霜',
    category: '乳液與面霜',
    categoryType: 'cream',
    role: '偶數週主力鎖水面霜',
    applicableWeeks: 'even',
    targetZone: 'cheeks',
    usageInstructions: '【偶數週主力面霜】偶數週兩頰長效保濕、秋冬乾冷、水楊酸夜或微針夜後兩頰強力長效封層。',
    cautions: '【分區鐵則】質地滋潤，絕對避開下巴粉刺痘痘區！'
  },
  {
    id: 'p-24',
    number: '24',
    brand: 'BOBBI BROWN 芭比波朗',
    name: '維他命完美乳霜（橘子霜）',
    category: '乳液與面霜',
    categoryType: 'cream',
    role: '底妝日前置保濕打底',
    applicableWeeks: 'both',
    targetZone: 'cheeks',
    usageInstructions: '【完整底妝日專用】上粉底前的兩頰妝前保濕打底，撫平乾燥起皮，使底妝服貼不脫妝。',
    cautions: '避開下巴區域，下巴依舊使用 #18 米糠乳液打底。'
  },
  {
    id: 'p-25',
    number: '25',
    brand: 'Estée Lauder 雅詩蘭黛',
    name: '特潤全能修護亮眼霜（小棕眼霜）',
    category: '眼周護理',
    categoryType: 'eye',
    role: '夜間眼周修護與 A 醇前隔離',
    applicableWeeks: 'both',
    targetZone: 'eyes',
    usageInstructions: '夜間日常眼周抗老保濕；特別在週四 A 醇夜前，先塗抹此眼霜建立「眼周安全隔離屏障」，預防 A 醇擴散刺激眼皮。'
  },
  {
    id: 'p-26',
    number: '26',
    brand: "L'Oréal Paris 巴黎萊雅",
    name: '玻尿酸眼霜級撫紋精華霜（紫熨斗 MAX）',
    category: '眼周護理',
    categoryType: 'eye',
    role: '晨間與修護夜撫紋眼霜',
    applicableWeeks: 'both',
    targetZone: 'eyes',
    usageInstructions: '早晨素顏日或夜間修護夜使用。輕點於眼下細紋與眼尾，以無名指腹輕柔按壓撫平乾紋。'
  },
  {
    id: 'p-27',
    number: '27',
    brand: 'BOBBI BROWN 芭比波朗',
    name: '維他命完美眼霜',
    category: '眼周護理',
    categoryType: 'eye',
    role: '底妝日眼下專用妝前打底',
    applicableWeeks: 'both',
    targetZone: 'eyes',
    usageInstructions: '【完整底妝日專用】上遮瑕膏前的眼下專用妝前打底，提供即時滋潤，徹底預防遮瑕膏卡細紋積線。'
  },
  {
    id: 'p-28',
    number: '28',
    brand: "d'Alba 黛爾泊",
    name: '水潤粉光校色提亮防曬霜',
    category: '防曬與妝前',
    categoryType: 'sunscreen',
    role: '上班日主力潤色防曬',
    applicableWeeks: 'both',
    targetZone: 'all',
    usageInstructions: '【上班日防曬主力】日常素顏出門首選！取足量均勻塗抹全臉與頸部，自帶自然粉潤水光好氣色，不需額外疊加粉底。'
  },
  {
    id: 'p-29',
    number: '29',
    brand: 'Mentholatum 曼秀雷敦',
    name: '水潤肌高濃度玻尿酸防曬精華',
    category: '防曬與妝前',
    categoryType: 'sunscreen',
    role: '底妝日透明高保濕防曬',
    applicableWeeks: 'both',
    targetZone: 'all',
    usageInstructions: '【完整底妝日的主力透明防曬】水感質地不泛白、不黏膩，為後續彩妝打好高保濕防護基底。'
  },
  {
    id: 'p-30',
    number: '30',
    brand: 'Quality 1st',
    name: 'Derma Laser AZ100 藍瓶面膜（高滲透壬二酸）',
    category: '面膜與急救',
    categoryType: 'mask',
    role: '奇數週日控油抗痘面膜',
    applicableWeeks: 'odd',
    applicableDays: [0], // 奇數週日夜
    targetZone: 'all',
    usageInstructions: '【奇數週日夜專屬】高滲透壬二酸衍生物配方，敷貼 10~15 分鐘。舒緩下巴反覆痘痘、收斂毛孔並平衡全臉油脂分泌。',
    cautions: '敷完取下後輕拍吸收，噴上 #09 BOH 噴霧，立刻用 #22 Dr. Reju-All 修復霜在兩頰鎖水。'
  },
  {
    id: 'p-31',
    number: '31',
    brand: 'shu uemura 植村秀',
    name: '無極限保濕妝前乳（紫色／膚色）',
    category: '防曬與妝前',
    categoryType: 'sunscreen',
    role: '底妝日局部校色潤飾',
    applicableWeeks: 'both',
    targetZone: 'all',
    usageInstructions: '【完整底妝日專用】在防曬之後局部點塗於嘴角蠟黃、眼下暗沉或泛紅處，修飾膚色不均。'
  },
  {
    id: 'p-32',
    number: '32',
    brand: 'CHECK2CHECK',
    name: '真空溫感離子淨膚儀',
    category: '美容儀器',
    categoryType: 'device',
    role: '深層毛孔導出 ＆ 精華深層導入儀',
    applicableWeeks: 'both',
    applicableDays: [3, 6], // 週三導出、偶數週六導入
    targetZone: 'all',
    usageInstructions: '【雙模式切換美容儀】：\n1.「深層導出模式」：每週三搭配 #02 舒特膚潔膚水浸濕化妝棉，由內向外順毛孔導出殘妝皮脂。\n2.「保濕導入模式」：偶數週六搭配 #12 Medicube 安瓶，溫感震動促進高純度胜肽深度吸收。'
  },
  {
    id: 'p-33',
    number: '33',
    brand: '日常嚴選系列',
    name: '一般溫和修護保濕面膜',
    category: '面膜與急救',
    categoryType: 'mask',
    role: '深層潤澤保濕補水面膜',
    applicableWeeks: 'even',
    applicableDays: [3, 0], // 偶數週三(導出後加強)、偶數週日
    targetZone: 'all',
    usageInstructions: '【偶數週三夜（離子導出後加強補水）】與【偶數週日夜（AZ100 的交替週）】敷貼 10~15 分鐘，給乾肌最純粹的玻尿酸補水，取下後立刻以契爾氏冰河霜封層！'
  }
];

export const WEEKLY_NIGHT_ROUTINES: DayRoutine[] = [
  {
    dayOfWeek: 1, // 週一
    dayName: '週一',
    themeTitle: '日常修護夜',
    themeIcon: '💧',
    oddWeekDetails: {
      cleansing: '【極簡卸洗】#03 維 C 卸妝凝膠（或 #02 舒特膚潔膚水）➔ #04 綠茶保濕胺基酸洗面乳洗淨擦乾。',
      steps: [
        { step: 1, label: '前導打底', productNumbers: ['11'], details: '黛珂小紫瓶 1~2 下，以手溫按拍全臉，絕不用化妝棉擦拭。', zone: '全臉' },
        { step: 2, label: '修護補水', productNumbers: ['07'], details: '品木宣言靈芝水倒在手心溫和輕拍。', zone: '全臉' },
        { step: 3, label: '鎮靜噴霧', productNumbers: ['09'], details: 'BOH B5 積雪草保濕潤澤噴霧全臉輕噴一層。', zone: '全臉' },
        { step: 4, label: '眼周防禦', productNumbers: ['25'], details: '雅詩蘭黛特潤全能眼霜，以無名指腹輕柔按摩眼下。', zone: '眼周' },
        { step: 5, label: '兩頰鎖水', productNumbers: ['21', '22'], details: '【兩頰乾燥區】擦 S.NATURE 水庫角鯊烷面霜（脫皮泛紅處加 #22 修復霜急救）。', zone: '兩頰' },
        { step: 6, label: '下巴清爽', productNumbers: ['18'], details: '【下巴粉刺區】薄擦 MUJI 米糠發酵乳液，維持油水平衡，絕不上厚霜。', zone: '下巴' }
      ],
      notes: '週一以溫和舒緩修護為主，讓肌膚從週末狀態平穩過渡，兩頰補水、下巴維持呼吸感。'
    },
    evenWeekDetails: {
      cleansing: '【極簡卸洗】#03 維 C 卸妝凝膠（或 #02 舒特膚潔膚水）➔ #04 綠茶保濕胺基酸洗面乳。',
      steps: [
        { step: 1, label: '前導打底', productNumbers: ['11'], details: '黛珂小紫瓶 1~2 下，手溫輕拍按壓。', zone: '全臉' },
        { step: 2, label: '基礎化妝水', productNumbers: ['08'], details: 'MUJI 敏感肌化妝水（滋潤型）輕拍打底。', zone: '全臉' },
        { step: 3, label: '水光噴霧', productNumbers: ['10'], details: 'Ongredients 屏障鎮靜水光噴霧全臉補水。', zone: '全臉' },
        { step: 4, label: '眼周修護', productNumbers: ['25'], details: '雅詩蘭黛眼霜保養眼下細紋。', zone: '眼周' },
        { step: 5, label: '兩頰長效封層', productNumbers: ['23'], details: '【兩頰專屬】契爾氏冰河醣蛋白保濕霜，強效滋潤鎖水。', zone: '兩頰' },
        { step: 6, label: '下巴控油鎖水', productNumbers: ['18'], details: '【下巴專屬】薄擦 MUJI 米糠發酵乳液，避開厚重面霜。', zone: '下巴' }
      ],
      notes: '偶數週使用單純溫和的 MUJI 化妝水與契爾氏冰河霜，為兩頰乾肌補足潤澤。'
    }
  },
  {
    dayOfWeek: 2, // 週二
    dayName: '週二',
    themeTitle: '水楊酸煥膚夜',
    themeIcon: '🧪',
    oddWeekDetails: {
      cleansing: '【深層洗卸】#01 MUJI 卸妝油乾手乾臉按摩（下巴加強打圈，充分乳化）➔ #04 綠茶洗面乳徹底洗淨並擦乾。',
      steps: [
        { step: 1, label: '局部酸類煥膚', productNumbers: ['15'], details: '寶拉 2% 水楊酸：僅局部塗抹於下巴與鼻翼粉刺區，靜置等待 3～5 分鐘！兩頰乾肌嚴禁塗抹。', zone: '下巴' },
        { step: 2, label: '前導安撫', productNumbers: ['11'], details: '等待 3~5 分鐘後，按壓黛珂小紫瓶以手溫輕拍全臉。', zone: '全臉' },
        { step: 3, label: '補水化妝水', productNumbers: ['08'], details: 'MUJI 敏感肌化妝水輕拍全臉緩解酸後乾燥感。', zone: '全臉' },
        { step: 4, label: '眼周防護', productNumbers: ['25'], details: '雅詩蘭黛眼霜呵護眼周。', zone: '眼周' },
        { step: 5, label: '兩頰保濕封層', productNumbers: ['21'], details: '【兩頰】擦 S.NATURE 水庫保濕霜修復皮脂膜。', zone: '兩頰' },
        { step: 6, label: '下巴舒緩鎖水', productNumbers: ['18'], details: '【下巴】水楊酸吸收後，僅薄擦 MUJI 米糠乳液，嚴禁塗厚霜以免悶痘。', zone: '下巴' }
      ],
      notes: '【重要提醒】週二固定水楊酸夜，脂溶性水楊酸深入毛孔溶解多餘油脂，務必靜置 3-5 分鐘。當晚嚴禁疊加 A 醇或磨砂去角質。'
    },
    evenWeekDetails: {
      cleansing: '【深層洗卸】#01 MUJI 卸妝油（乳化徹底）➔ #04 綠茶洗面乳溫和洗淨擦乾。',
      steps: [
        { step: 1, label: '局部水楊酸煥膚', productNumbers: ['15'], details: '寶拉 2% 水楊酸：局部點塗下巴與鼻翼，靜置 3～5 分鐘。', zone: '下巴' },
        { step: 2, label: '微脂囊前導', productNumbers: ['11'], details: '黛珂小紫瓶掌心按拍吸收。', zone: '全臉' },
        { step: 3, label: '溫和補水', productNumbers: ['08'], details: 'MUJI 敏感肌化妝水按拍。', zone: '全臉' },
        { step: 4, label: '眼周修護', productNumbers: ['25'], details: '雅詩蘭黛眼霜保濕。', zone: '眼周' },
        { step: 5, label: '兩頰高效鎖水', productNumbers: ['23'], details: '【兩頰】厚塗契爾氏冰河醣蛋白保濕霜，強效阻擋水分散失。', zone: '兩頰' },
        { step: 6, label: '下巴清爽防禦', productNumbers: ['18'], details: '【下巴】MUJI 米糠發酵乳液單純保濕。', zone: '下巴' }
      ],
      notes: '水楊酸只點下巴與鼻翼，兩頰靠契爾氏冰河霜加強滋潤鎖水，落實極致分區保養。'
    }
  },
  {
    dayOfWeek: 3, // 週三
    dayName: '週三',
    themeTitle: '週三離子儀(導出)淨膚夜',
    themeIcon: '🌿✨',
    oddWeekDetails: {
      cleansing: '【離子儀(導出)】#02 舒特膚潔膚水浸透化妝棉 ＋ #32 CHECK2CHECK 離子儀(導出模式) 溫和導出毛孔殘妝 ➔ #04 綠茶洗面乳（T字下巴可局部加用少量 #05 綠番茄洗面乳）。',
      steps: [
        { step: 1, label: '前導深入', productNumbers: ['11'], details: '黛珂小紫瓶 1~2 下，以手溫按拍剛導出完的清透肌膚。', zone: '全臉' },
        { step: 2, label: '積雪草噴霧', productNumbers: ['09'], details: 'BIO HEAL BOH 保濕潤澤噴霧全臉輕噴。', zone: '全臉' },
        { step: 3, label: '透亮精華', productNumbers: ['13'], details: '【奇數週三專屬】薄擦 ANUA 桃子菸鹼醯胺精華，提亮整日暗沉。', zone: '全臉' },
        { step: 4, label: '兩頰鎖水', productNumbers: ['21'], details: '【兩頰】擦 S.NATURE 水庫角鯊烷保濕霜。', zone: '兩頰' },
        { step: 5, label: '下巴呼吸鎖水', productNumbers: ['18'], details: '【下巴】薄擦 MUJI 米糠乳液，享受導出後的無負擔暢通感。', zone: '下巴' }
      ],
      notes: '離子儀(導出)利用電荷吸附彩妝殘留與角質髒污，動作保持輕柔順滑即可。'
    },
    evenWeekDetails: {
      cleansing: '【離子儀(導出)＋清潔】#02 舒特膚潔膚水 ＋ #32 離子儀(導出) ➔ #04 綠茶洗面乳（下巴局部搭配 #05 綠番茄洗面乳洗淨）。',
      steps: [
        { step: 1, label: '前導導入', productNumbers: ['11'], details: '黛珂小紫瓶掌心按拍打底。', zone: '全臉' },
        { step: 2, label: '加強保濕面膜', productNumbers: ['33'], details: '【偶數週三・面膜加強夜】導出清潔後，敷上一片【#33 一般日常保濕面膜】10～15 分鐘！深層注水。', zone: '全臉' },
        { step: 3, label: '取下輕拍＋噴霧', productNumbers: ['10'], details: '取下面膜後輕拍精華至吸收，噴上 Ongredients 鎮靜水光噴霧。', zone: '全臉' },
        { step: 4, label: '兩頰強力封層', productNumbers: ['23'], details: '【兩頰】立刻使用契爾氏冰河醣蛋白保濕霜鎖緊水分！', zone: '兩頰' },
        { step: 5, label: '下巴清爽鎖水', productNumbers: ['18'], details: '【下巴】薄擦 MUJI 米糠乳液收尾。', zone: '下巴' }
      ],
      notes: '【偶數週亮點】導出後毛孔潔淨暢通，立刻敷上一般溫和保濕面膜，給乾燥肌膚注入滿滿水份，兩頰冰河霜封層極度水嫩！'
    }
  },
  {
    dayOfWeek: 4, // 週四
    dayName: '週四',
    themeTitle: 'A 醇微晶抗老夜',
    themeIcon: '🌙',
    oddWeekDetails: {
      cleansing: '【溫和深層洗卸】#01 MUJI 卸妝油按摩乳化 ➔ #04 綠茶洗面乳洗淨，毛巾輕印至「全臉肌膚完全乾燥」。',
      steps: [
        { step: 1, label: '前導打底', productNumbers: ['11'], details: '黛珂小紫瓶 1~2 下，手溫輕拍打底修護。', zone: '全臉' },
        { step: 2, label: '水相緩衝', productNumbers: ['08'], details: 'MUJI 敏感肌化妝水滋潤型打底，建立溫和保濕緩衝層。', zone: '全臉' },
        { step: 3, label: '眼周屏障隔離', productNumbers: ['25'], details: '【先擦眼霜】以雅詩蘭黛特潤亮眼霜塗抹眼周，建立隔離屏障，防止 A 醇擴散刺激細嫩眼周！', zone: '眼周' },
        { step: 4, label: 'A 醇微晶抗老', productNumbers: ['17'], details: '【關鍵步驟】取 Celimax A 醇微晶精華「豌豆大小」，均勻點在額頭、兩頰與下巴並輕柔按壓吸收，嚴格避開眼周與唇緣。', zone: '全臉' },
        { step: 5, label: '兩頰修護封層', productNumbers: ['21'], details: '【兩頰】擦 S.NATURE 角鯊烷保濕霜，緩解 A 醇可能帶來的乾燥。', zone: '兩頰' },
        { step: 6, label: '下巴保護鎖水', productNumbers: ['18'], details: '【下巴】薄擦 MUJI 米糠乳液鎖水。', zone: '下巴' }
      ],
      notes: '【A 醇微晶守則】用量只需豌豆大小！先擦雅詩蘭黛眼霜隔離保護眼部。當晚若有輕微溫熱刺感屬正常，安心入睡，隔日白天務必防曬。'
    },
    evenWeekDetails: {
      cleansing: '【深層溫和潔淨】#01 MUJI 卸妝油乳化洗淨 ➔ #04 綠茶洗面乳，確保臉部完全乾燥。',
      steps: [
        { step: 1, label: '微脂囊打底', productNumbers: ['11'], details: '黛珂小紫瓶掌心按拍。', zone: '全臉' },
        { step: 2, label: '溫和保濕', productNumbers: ['08'], details: 'MUJI 化妝水滋潤型打底緩衝。', zone: '全臉' },
        { step: 3, label: '眼霜防護層', productNumbers: ['25'], details: '雅詩蘭黛眼霜先行封好眼周安全範圍。', zone: '眼周' },
        { step: 4, label: 'A 醇微晶精華', productNumbers: ['17'], details: 'Celimax A 醇精華（豌豆大小）避開眼周全臉輕壓。', zone: '全臉' },
        { step: 5, label: '兩頰強效舒緩', productNumbers: ['23'], details: '【兩頰】厚敷契爾氏冰河醣蛋白霜，深層鎖水抗燥。', zone: '兩頰' },
        { step: 6, label: '下巴米糠保濕', productNumbers: ['18'], details: '【下巴】MUJI 米糠發酵乳液。', zone: '下巴' }
      ],
      notes: '週四固定 A 醇微晶夜，調理角質與細紋。睡前吃癲必停與易靜錠安心入眠。'
    }
  },
  {
    dayOfWeek: 5, // 週五
    dayName: '週五',
    themeTitle: '日常修護夜',
    themeIcon: '💧',
    oddWeekDetails: {
      cleansing: '【舒緩卸洗】#03 維 C 卸妝凝膠 ➔ #04 綠茶保濕胺基酸洗面乳。',
      steps: [
        { step: 1, label: '前導修復', productNumbers: ['11'], details: '黛珂小紫瓶手溫輕壓按拍。', zone: '全臉' },
        { step: 2, label: '靈芝水舒緩', productNumbers: ['07'], details: '品木宣言靈芝水倒在手心溫和輕拍，平撫整週肌膚疲勞。', zone: '全臉' },
        { step: 3, label: '眼周滋養', productNumbers: ['25'], details: '雅詩蘭黛亮眼霜輕按眼周。', zone: '眼周' },
        { step: 4, label: '兩頰角鯊烷', productNumbers: ['21'], details: '【兩頰】S.NATURE 水庫角鯊烷面霜滋潤。', zone: '兩頰' },
        { step: 5, label: '下巴清透保濕', productNumbers: ['18'], details: '【下巴】MUJI 米糠乳液薄擦。', zone: '下巴' }
      ],
      notes: '週五迎來小週末，修復在週四 A 醇作用後的角質，維持穩定的屏障狀態。'
    },
    evenWeekDetails: {
      cleansing: '【舒緩卸洗】#03 維 C 卸妝凝膠 ➔ #04 綠茶洗面乳。',
      steps: [
        { step: 1, label: '前導補水', productNumbers: ['11'], details: '黛珂小紫瓶手溫輕壓按拍。', zone: '全臉' },
        { step: 2, label: '滋潤化妝水', productNumbers: ['08'], details: 'MUJI 敏感肌滋潤化妝水輕拍打底。', zone: '全臉' },
        { step: 3, label: '下巴局部控油', productNumbers: ['14'], details: '【偶數週五亮點】取少量 The Ordinary 10% 菸鹼醯胺＋1% 鋅精華，「僅局部點塗於下巴粉刺區」加強收斂控油！絕不塗全臉。', zone: '下巴' },
        { step: 4, label: '眼霜保養', productNumbers: ['25'], details: '雅詩蘭黛眼霜保濕。', zone: '眼周' },
        { step: 5, label: '兩頰冰河霜', productNumbers: ['23'], details: '【兩頰】契爾氏冰河霜深層鎖水。', zone: '兩頰' },
        { step: 6, label: '下巴鎖水封層', productNumbers: ['18'], details: '【下巴】MUJI 米糠發酵乳液。', zone: '下巴' }
      ],
      notes: 'The Ordinary 菸鹼醯胺+鋅具有很強的控油效果，僅限偶數週五局部點在下巴，乾肌兩頰千萬不要碰。'
    }
  },
  {
    dayOfWeek: 6, // 週六
    dayName: '週六',
    themeTitle: '週末去角質與淨膚夜',
    themeIcon: '🌟',
    oddWeekDetails: {
      cleansing: '【酵素洗顏去角質】#01 MUJI 卸妝油 ➔ #06 Kanebo suisai 酵素洗顏粉（藍色），搓出豐盈泡沫後輕柔按摩全臉與下巴粉刺處，溫和代謝老廢角質。',
      steps: [
        { step: 1, label: '前導滲透', productNumbers: ['11'], details: '角質代謝後第一步：黛珂小紫瓶 1~2 下，以手溫按拍促進微脂囊直達基底。', zone: '全臉' },
        { step: 2, label: '靈芝水安撫', productNumbers: ['07'], details: '品木宣言靈芝水充分輕拍，迅速舒緩肌膚。', zone: '全臉' },
        { step: 3, label: '眼霜滋潤', productNumbers: ['25'], details: '雅詩蘭黛眼霜呵護眼下細紋。', zone: '眼周' },
        { step: 4, label: '兩頰深層潤澤', productNumbers: ['21'], details: '【兩頰】擦 S.NATURE 水庫角鯊烷保濕霜。', zone: '兩頰' },
        { step: 5, label: '下巴溫和鎖水', productNumbers: ['18'], details: '【下巴】MUJI 米糠發酵乳液薄擦。', zone: '下巴' }
      ],
      notes: '【奇數週六專屬】suisai 酵素洗顏粉能溫和分解多餘蛋白質角質，當晚嚴禁使用水楊酸或 A 醇，單純修護補水即可。'
    },
    evenWeekDetails: {
      cleansing: '【主力清潔】#01 MUJI 卸妝油按摩乳化沖淨 ➔ #04 綠茶保濕胺基酸洗面乳洗淨擦乾。',
      steps: [
        { step: 1, label: '前導打底', productNumbers: ['11'], details: '黛珂小紫瓶按拍全臉。', zone: '全臉' },
        { step: 2, label: '儀器深層導入', productNumbers: ['12', '32'], details: '【偶數週六專屬】全臉均勻滴上 #12 Medicube PDRN 粉紅胜肽補水安瓶，啟動 #32 CHECK2CHECK 淨膚儀「保濕導入模式」，溫感輕柔滑動按摩全臉促進深層吸收！', zone: '全臉' },
        { step: 3, label: '眼霜呵護', productNumbers: ['25'], details: '雅詩蘭黛眼霜保濕。', zone: '眼周' },
        { step: 4, label: '兩頰冰河霜封存', productNumbers: ['23'], details: '【兩頰】契爾氏冰河醣蛋白霜，將導入的胜肽精華牢牢鎖在肌膚裡。', zone: '兩頰' },
        { step: 5, label: '下巴呼吸清爽', productNumbers: ['18'], details: '【下巴】MUJI 米糠乳液薄擦。', zone: '下巴' }
      ],
      notes: '【偶數週六亮點】享受居家的離子儀保濕導入護膚沙龍，深層補充胜肽水分，肌膚柔嫩發光！'
    }
  },
  {
    dayOfWeek: 0, // 週日
    dayName: '週日',
    themeTitle: '週日深度保養與面膜夜',
    themeIcon: '🌿🌙',
    oddWeekDetails: {
      cleansing: '【溫和潔顏】#02 舒特膚潔膚水溫和擦拭 ➔ #04 綠茶保濕洗面乳洗淨擦乾。',
      steps: [
        { step: 1, label: '前導小紫瓶', productNumbers: ['11'], details: '黛珂小紫瓶打底，打開後續吸收通道。', zone: '全臉' },
        { step: 2, label: 'AZ100 痘痘藍膜', productNumbers: ['30'], details: '【奇數週日專屬】敷上 Quality 1st AZ100（藍瓶壬二酸護理面膜）10～15 分鐘！高滲透壬二酸衍生物調理下巴反覆痘痘與出油。', zone: '全臉' },
        { step: 3, label: '取下輕拍＋噴霧', productNumbers: ['09'], details: '取下面膜後輕拍精華至吸收，噴上 #09 BOH B5 潤澤噴霧增加屏障防護。', zone: '全臉' },
        { step: 4, label: '兩頰 PDRN 修復霜', productNumbers: ['22'], details: '【兩頰】立刻使用 Dr. Reju-All PDRN 高效修復霜，將水分與活性緊緊鎖住。', zone: '兩頰' },
        { step: 5, label: '下巴米糠乳', productNumbers: ['18'], details: '【下巴】薄擦 MUJI 米糠乳液，保持清爽。', zone: '下巴' }
      ],
      notes: '【奇數週日亮點】AZ100 壬二酸藍膜是下巴粉刺痘痘的急救守護星，搭配 Dr. Reju-All 修復霜在兩頰修護屏障。'
    },
    evenWeekDetails: {
      cleansing: '【溫和潔顏】#02 舒特膚潔膚水 ➔ #04 綠茶保濕洗面乳洗淨擦乾。',
      steps: [
        { step: 1, label: '前導打底', productNumbers: ['11'], details: '黛珂小紫瓶 1~2 下，以手溫按拍全臉打開通道。', zone: '全臉' },
        { step: 2, label: '一般保濕面膜', productNumbers: ['33'], details: '【偶數週日・保濕面膜日】敷一般保濕修護面膜（10-15分鐘），深層補水鎮靜。', zone: '全臉' },
        { step: 3, label: '取下輕拍＋噴霧', productNumbers: ['10'], details: '取下面膜輕拍吸收後，噴上 #10 Ongredients 屏障鎮靜水光噴霧。', zone: '全臉' },
        { step: 4, label: '兩頰冰河霜強力封層', productNumbers: ['23'], details: '【兩頰】立刻用 #23 契爾氏冰河醣蛋白霜強力封層，給乾肌深層鎖水！', zone: '兩頰' },
        { step: 5, label: '下巴清透保濕', productNumbers: ['18'], details: '【下巴】薄擦 #18 MUJI 米糠發酵乳液。', zone: '下巴' }
      ],
      notes: '【偶數週日保濕面膜日】舒特膚潔膚水溫和洗卸後敷純保濕修護面膜，取下後兩頰契爾氏冰河霜強力封層、下巴薄擦米糠乳，安心放鬆入眠。'
    }
  }
];

export const MORNING_ROUTINE = {
  title: '每日早晨保養與內服營養搭配程序（素顏防曬日）',
  medsAndSupplements: [
    {
      time: '07:30 - 08:30',
      title: '早餐後隨餐用藥與亮白抗氧化',
      items: [
        { name: '"汎生" 普樂彼錠 50 毫克 (PTU)', dose: '3 顆', note: '抗甲狀腺製劑' },
        { name: '"信東" 癲鍵錠 50 毫克 (Topiramate)', dose: '1 顆', note: '抗痙攣/情緒穩定劑' },
        { name: "BHK's 奢光錠", dose: '1~2 錠', note: '隨早餐或午餐飯後吃，已從夜間全面移至白天，避開安眠藥' }
      ]
    },
    {
      time: '09:00 - 09:30',
      title: '早餐後「間隔 1 小時」補充活力 B 群',
      items: [
        { name: 'Thorne 基本維生素 B 複合物', dose: '1 粒', note: '【黃金法則】與早餐處方藥間隔 1 小時，避免影響代謝吸收，支援全日能量' }
      ]
    },
    {
      time: '12:30 - 13:30',
      title: '午餐或晚餐隨餐補充（脂溶性營養 ＆ 私密防禦）',
      items: [
        { name: 'Kirkland 科克蘭 維生素 D3', dose: '2 錠 (700 IU)', note: '脂溶性，必須隨正餐肉類好油脂吸收' },
        { name: 'Sports Research 阿拉斯加魚油', dose: '1 粒', note: '隨餐服用，高濃度 Omega-3 體內抗發炎滋潤肌膚' },
        { name: 'Webber Naturals 蔓越莓濃縮精華', dose: '1~2 粒', note: '高濃度 PACs 前花青素，搭配多喝水' }
      ]
    }
  ],
  skincareSteps: [
    {
      step: 1,
      title: '晨間清潔',
      products: ['04'],
      details: '清水洗臉即可；若夜間下巴或 T 字出油較多，可使用少量 #04 綠茶保濕胺基酸潔面乳溫和清潔。'
    },
    {
      step: 2,
      title: '前導補水',
      products: ['11'],
      details: '按壓 #11 黛珂小紫瓶 1~2 下於掌心，雙手溫熱後「由內向外輕輕按拍全臉與眼下」。（嚴格用手溫按拍，絕對不用化妝棉擦拭！）'
    },
    {
      step: 3,
      title: '晨間噴霧交錯',
      oddProducts: ['09'],
      evenProducts: ['10'],
      details: '【奇數週】噴上 #09 BOH B5 積雪草噴霧 / 【偶數週】噴上 #10 Ongredients 屏障鎮靜水光噴霧，全臉輕潤補水。'
    },
    {
      step: 4,
      title: '日間精華分流',
      oddProducts: ['13'],
      evenProducts: ['12'],
      details: '【奇數週日間】薄擦 #13 ANUA 桃子菸鹼醯胺精華全臉提亮 / 【偶數週日間】使用 #12 Medicube 粉紅胜肽安瓶舒緩補水。'
    },
    {
      step: 5,
      title: '眼周呵護',
      products: ['26', '25'],
      details: '交替使用 #26 巴黎萊雅紫熨斗 MAX 或 #25 雅詩蘭黛亮眼霜，輕點眼下預防乾紋與卡粉。'
    },
    {
      step: 6,
      title: '分區精準保濕（兩頰 vs 下巴）',
      oddProducts: ['19', '21'],
      evenProducts: ['20'],
      fixedChinProduct: '18',
      details: '【兩頰】：奇數週薄擦 #19 靈芝乳液 2.0（或 #21 S.NATURE 霜）；偶數週使用 #20 AQ 煥妍柔膚乳 III。\n【下巴每日固定】：薄擦 #18 MUJI 米糠發酵乳液（清爽控油，絕不擦厚霜）。'
    },
    {
      step: 7,
      title: '日間防曬核心',
      products: ['28'],
      makeupProducts: ['29', '31', '24', '27'],
      details: '【日常上班防曬主力】：均勻塗抹足量 #28 d’Alba 黛爾泊粉光校色提亮防曬霜，直接完成透亮好氣色，不需疊粉底。\n（若是完整底妝日：改用 #29 曼秀雷敦防曬 + #31 植村秀妝前乳 + #24 橘子霜打底兩頰 + #27 眼霜打底眼周）。'
    }
  ]
};

export const CORE_SAFETY_RULES = [
  {
    id: 'rule-1',
    title: '早晨處方藥物與 Thorne B 群間隔 1 小時',
    badge: '處方交互作用',
    severity: 'critical',
    summary: '早餐吃完 PTU (3顆) 與癲鍵錠 (1顆) 後，間隔 60 分鐘再吃 Thorne B 群。',
    details: '高活性的甲基型 B 群（特別是 B6、B12、葉酸）參與肝臟第一階與第二階代謝路徑。PTU (抗甲狀腺) 與癲鍵錠 (Topiramate，中樞抗痙攣) 需要穩定的胃腸道吸收與血中濃度。間隔 1 小時能避免吸收競爭與代謝干擾。'
  },
  {
    id: 'rule-2',
    title: "BHK's 奢光錠全面移至白天隨餐，遠離安眠藥",
    badge: '口服排程優化',
    severity: 'critical',
    summary: "BHK's 奢光錠取消夜間服用，改至早餐或午餐飯後吃，徹底與癲必停和易靜錠分開。",
    details: '谷胱甘肽與維生素 C、核酸等亮白抗氧化複合物，在日間搭配餐飲脂質與蛋白質具有較佳吸收效率。夜間睡前應讓大腦神經處於純淨放鬆狀態，讓易靜錠與癲必停專注發揮安眠與抗痙攣作用，互不干擾。'
  },
  {
    id: 'rule-3',
    title: '下巴反覆痘痘粉刺區：終極分區保養原則',
    badge: '分區保養鐵則',
    severity: 'high',
    summary: '下巴永遠只擦 MUJI 米糠發酵乳液 (#18)，絕不碰契爾氏冰河霜、橘子霜或滋潤型厚霜！',
    details: 'Amanda 屬於「外油內乾／兩頰乾下巴易長粉刺」膚質。厚重礦物脂或封閉性油脂一旦塗抹在下巴毛孔密集的皮脂腺區，極易誘發反覆微粉刺與化膿痘痘。兩頰乾燥處則需角鯊烷、冰河醣蛋白等充足鎖水，分區精準才能達到全臉水嫩不致痘。'
  },
  {
    id: 'rule-4',
    title: '酸類與微針高活性成分：分日嚴格錯開，絕不連續疊加',
    badge: '活性成分防禦',
    severity: 'high',
    summary: '週二水楊酸、週四 A 醇、偶數週日 VT 300 微針各自獨立，絕不同晚疊擦！',
    details: '水楊酸為脂溶性 BHA（疏通毛孔角栓）、A 醇微晶促進真皮膠原活化、VT 300 微晶精華以天然微針打開角質微通道。三者皆具角質重塑刺激性，錯開服用與保養，每週安排週一、週三、週五日常修護日，保護皮脂膜不屏障受損。'
  },
  {
    id: 'rule-5',
    title: '脂溶性維生素（D3 ＆ Omega-3 魚油）必須「隨餐」吃',
    badge: '吸收效率',
    severity: 'medium',
    summary: '維生素 D3 (700 IU) 與魚油 (1粒) 必須在午餐或晚餐「隨餐」或「飯後立即」服用。',
    details: '維生素 D3 與 Omega-3 脂肪酸 (EPA/DHA) 依賴膽汁酸乳化才能被小腸微絨毛吸收。若在空腹或無油脂時食用，吸收率下降超過 50%，且空腹吃魚油容易在胃中浮起打嗝產生魚腥味。'
  },
  {
    id: 'rule-6',
    title: 'A 醇夜與微晶夜：先擦眼霜隔離，保護眼周柔嫩黏膜',
    badge: '細節防禦',
    severity: 'medium',
    summary: '在週四 A 醇精華前，先塗抹雅詩蘭黛特潤亮眼霜，築起眼周天然防護牆。',
    details: '眼周皮膚厚度僅為臉頰的 1/3，皮脂腺極少。高活性 A 醇精華在臉上塗抹時容易經皮微擴散至眼眶邊緣，造成乾癢脫皮紅腫。先以滋潤型眼霜封好眼下，能徹底隔絕刺激。'
  }
];
