import { 
  PrescriptionItem, 
  SupplementItem, 
  SkincareProduct, 
  DayRoutine,
  BodyLotionItem
} from '../types/routine';

export const PRESCRIPTION_MEDS: PrescriptionItem[] = [
  {
    id: 'rx-1',
    name: '"汎生" 普樂彼錠 50 毫克',
    genericName: 'Propylthiouracil / PTU',
    dosage: '早餐飯後 3 顆',
    timeSlot: 'breakfast',
    category: '抗甲狀腺製劑',
    efficacy: '治療甲狀腺機能亢進症：抑制甲狀腺素合成，並抑制周邊組織將 T4 轉化為活性 T3，幫助甲狀腺荷爾蒙數值回復正常平衡。',
    instructions: '早餐後隨餐或飯後立即溫水吞服 3 顆。',
    safetyNotes: '請配合定期回診抽血追蹤甲狀腺指數；與 Thorne B 群及 8VC 維生素 C 需間隔 1 小時服用。'
  },
  {
    id: 'rx-2',
    name: '"信東" 癲鍵錠 50 毫克',
    genericName: 'Topiramate',
    dosage: '早餐飯後 1 顆',
    timeSlot: 'breakfast',
    category: '抗痙攣/情緒穩定劑',
    efficacy: '神經調節與抗痙攣：阻斷鈉離子與鈣離子通道、增強 GABA 抑制神經元興奮，常用於偏頭痛預防、神經性疼痛調節或情緒穩定。',
    instructions: '早餐後隨餐或飯後立即溫水吞服 1 顆。',
    safetyNotes: '請維持充足水分攝取以預防結石；與 Thorne B 群及 8VC 維生素 C 需間隔 1 小時服用。'
  },
  {
    id: 'rx-3',
    name: '"瑞安" 癲必停持續性藥效膜衣錠 500 毫克',
    genericName: 'Levetiracetam ER',
    dosage: '晚上睡前 0.5 顆',
    timeSlot: 'bedtime',
    category: '水溶性抗痙攣劑',
    efficacy: '新型抗癲癇與神經穩定劑：結合神經突觸小泡蛋白 SV2A，調節神經傳導物質釋放，預防異常腦電波放電與神經抽搐痙攣。',
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
    efficacy: '鎮靜安眠與放鬆：結合中樞 GABA-A 受體促使神經抑制，具肌肉鬆弛、緩解焦慮、快速誘導深層睡眠之功效。',
    instructions: '睡前 15~30 分鐘服用 1 顆，服藥後立即就寢，避免從事需警覺性之活動。',
    safetyNotes: '嚴禁與酒精併用；夜間完全避免與保健品同服，以維持純淨神經放鬆狀態。'
  }
];

export const ORAL_SUPPLEMENTS: SupplementItem[] = [
  {
    id: 'sup-1',
    number: '01',
    name: '8VC 2200mg 日本 8 效維生素 C 粉',
    brand: '8VC',
    specification: '60包入 / 每份含純維生素C、微脂囊維C、長效釋放維C等 8 種型態共 2200mg',
    recommendedDose: '每日 1～2 包（可直接口服或配水）',
    timing: '白天的餐後（隨早餐或與早餐/午餐飯後 1 小時）',
    timeSlot: 'breakfast',
    isLipophilic: false,
    benefits: ['頂級抗氧化與黑色素抑制', '8重釋放型維生素 C 協同淡斑', '提升膠原蛋白合成', '全身抗自由基'],
    safetyNotes: '多重型態高純度維生素 C，避開睡前服用；建議與早晨處方藥（PTU 與癲鍵錠）間隔約 1 小時。',
    whyThisTime: '白天抗氧化防禦紫外線自由基，隨餐或飯後吸收更好。'
  },
  {
    id: 'sup-2',
    number: '02',
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
    id: 'sup-3',
    number: '03',
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
    id: 'sup-4',
    number: '04',
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
    id: 'sup-5',
    number: '05',
    name: 'Sports Research 阿拉斯加 Omega-3 魚油',
    brand: 'Sports Research',
    specification: '總容量 90 粒軟膠囊（高濃度三酸甘油酯型 EPA & DHA）',
    recommendedDose: '每日 1 粒（日常保養黃金劑量）',
    timing: '午餐或晚餐「隨餐」或「飯後立即」服用',
    timeSlot: 'lunch_or_dinner',
    isLipophilic: true,
    benefits: ['強效抗發炎（內在調節下巴粉刺痘痘發炎反應）', '潤澤乾燥肌膚與屏障', '維護心血管與思緒靈活'],
    safetyNotes: '隨餐服用吸收最佳，且能有效預防打嗝產生魚腥味。',
    whyThisTime: '正餐油脂刺激膽汁分泌，幫助高濃度 Omega-3 軟膠囊乳化吸收。'
  },
  {
    id: 'sup-6',
    number: '06',
    name: 'Webber Naturals 蔓越莓濃縮精華膠囊',
    brand: 'Webber Naturals',
    specification: '500 mg，36:1 倍濃縮萃取，總容量 250 粒膠囊',
    recommendedDose: '每日 1～2 粒',
    timing: '隨餐或餐後服用（建議午餐或晚餐開水吞服）',
    timeSlot: 'lunch_or_dinner',
    isLipophilic: false,
    benefits: ['強效前花青素（PACs）高濃度守護', '私密處健康防禦', '全身抗自由基與抗氧化'],
    safetyNotes: '服用蔓越莓精華期間，建議每日維持 1800~2000 ml 溫開水攝取，更能發揮雙重淨化代謝效果。',
    whyThisTime: '隨餐不易刺激腸胃，且白天多喝水能讓有效成分充分沖刷循環。'
  }
];

export const BODY_LOTIONS: BodyLotionItem[] = [
  {
    id: 'body-01',
    code: 'B-01',
    brand: "Paula's Choice 寶拉珍選",
    name: '10% 水楊酸果酸身體乳',
    textureAndIngredients: '含 10% AHA（果酸）與抗氧化複合成分。',
    positioningAndUsage: '【身體煥膚與角質代謝專用】適合用於手臂毛孔角化（雞皮膚）、背部／臀部粗糙顆粒。每週使用 1～2 次，白天務必做好防曬（避免與身體美白乳液同日大面積混擦）。',
    role: '身體刷酸與角質代謝',
    cautions: '含高濃度果酸，避免大面積密集塗抹或混擦美白乳；日間需防曬。'
  },
  {
    id: 'body-02',
    code: 'B-02',
    brand: 'NIVEA 妮維雅',
    name: '亮白極致嫩膚乳液',
    textureAndIngredients: '清爽透潤水乳，含高純度維他命 C 與 99% 純度菸鹼醯胺。',
    positioningAndUsage: '【全身美白提亮主力】適合用於四肢暗沉、日曬後均勻膚色。建議於日間或一般日洗澡後使用，賦予全身透亮光澤。',
    role: '全身提亮與美白'
  },
  {
    id: 'body-03',
    code: 'B-03',
    brand: 'Vaseline 凡士林',
    name: '專業修護潤膚露 (Fragrance Free)',
    textureAndIngredients: '無香低敏配方、含凡士林經典修護微因子與屏障保濕成分。',
    positioningAndUsage: '【敏感期／極乾燥急救主力】質地溫和無香，適合在皮膚敏感、換季乾燥、或身體雷射／去角質後做為深層修護保濕。',
    role: '敏感急救與深層修復'
  },
  {
    id: 'body-04',
    code: 'B-04',
    brand: 'Aveeno 艾惟諾',
    name: '燕麥優格身體乳 (杏桃與蜂蜜香氛)',
    textureAndIngredients: '濃郁絲滑乳霜感，含滋養燕麥萃取 ＋ 希臘優格成分。',
    positioningAndUsage: '【日常療癒香氛保濕】質地潤澤且帶有舒服的甜美香氣，適合一般日洗澡後全身塗抹，享受放鬆的保濕體驗。',
    role: '滋養潤膚與舒壓香氛'
  },
  {
    id: 'body-05',
    code: 'B-05',
    brand: '一日茶道 TEAORY',
    name: '蜜柑紅茶全效潤膚乳',
    textureAndIngredients: '茶葉萃取、清酒粕、海洋深層水萃取與琉璃苣油。',
    positioningAndUsage: '【日常清爽保濕與抗氧化】質地輕盈好吸收，具備優異的植物抗氧化與保濕力，適合春夏或日常辦公室乾燥時塗抹。',
    role: '植萃抗氧與水感保濕'
  },
  {
    id: 'body-06',
    code: 'B-06',
    brand: 'innisfree',
    name: '#002 WARM AND FUZZIES 身體乳',
    textureAndIngredients: '水潤輕透質地，帶有溫暖質感木質調香氣。',
    positioningAndUsage: '【日常舒壓香氛乳液】適合日常隨時滋潤雙手或身體，賦予愉悅香氣與輕盈保濕。',
    role: '隨身香氛與日常滋潤'
  }
];

export const SKINCARE_PRODUCTS: SkincareProduct[] = [
  {
    id: 'p-01',
    number: '01',
    brand: 'ilso',
    name: '溫和粉刺溶解露',
    category: '卸妝與清潔',
    categoryType: 'cleansing',
    role: '每週粉刺大掃除夜專用',
    applicableWeeks: 'both',
    applicableDays: [2],
    targetZone: 'chin',
    usageInstructions: '【每週粉刺大掃除夜專用】濕敷／局部按摩下巴與鼻翼，溫和融化固態硬化油脂，協同水楊酸打造無痛清粉刺組合。',
    cautions: '溫和濕敷即可，請勿強力按壓或用力夾擠。'
  },
  {
    id: 'p-02',
    number: '02',
    brand: 'MUJI 無印良品',
    name: '溫和卸妝油',
    category: '卸妝與清潔',
    categoryType: 'cleansing',
    role: '全妝日與功能夜主力卸妝',
    applicableWeeks: 'both',
    targetZone: 'all',
    usageInstructions: '全妝日或功能夜（水楊酸、A醇、微針）的主力卸妝（乾手乾臉按摩，下巴加強打圈，乳化沖淨）。',
    cautions: '必須徹底乳化沖淨，不可殘留。'
  },
  {
    id: 'p-03',
    number: '03',
    brand: 'Cetaphil 舒特膚',
    name: '胜肽緊緻賦活潔膚水',
    category: '卸妝與清潔',
    categoryType: 'cleansing',
    role: '深層導出潔膚夜專用潔膚水',
    applicableWeeks: 'both',
    applicableDays: [3, 0],
    targetZone: 'all',
    usageInstructions: '【深層導出潔膚夜】每週三搭配離子淨膚儀導出殘妝。',
    cautions: '導出時輕輕滑動即可，切勿用力拉扯肌膚。'
  },
  {
    id: 'p-04',
    number: '04',
    brand: 'Capsule Serum',
    name: '維他命 C 去角質護理卸妝潔面凝膠',
    category: '卸妝與清潔',
    categoryType: 'cleansing',
    role: '上班日極簡卸妝潔面凝膠',
    applicableWeeks: 'both',
    applicableDays: [1, 5],
    targetZone: 'all',
    usageInstructions: '【上班日極簡卸妝組】僅擦防曬時的溫和潔面卸妝（每週最多 1～2 次，嚴禁與酸類或微針同晚使用）。',
    cautions: '因含微去角質成分，嚴禁與水楊酸夜（週二）或微針夜同晚使用！'
  },
  {
    id: 'p-05',
    number: '05',
    brand: 'Relove',
    name: 'Relove Nrf2 Ultimate Future 胺基酸潔面乳',
    category: '卸妝與清潔',
    categoryType: 'cleansing',
    role: '高階溫和修護潔面乳',
    applicableWeeks: 'both',
    targetZone: 'all',
    usageInstructions: '【高階溫和洗面乳】質地奢華溫和，可與綠茶潔面乳交替作為日常早晚清潔。'
  },
  {
    id: 'p-06',
    number: '06',
    brand: 'innisfree / 綠茶系列',
    name: '綠茶保濕胺基酸潔面乳',
    category: '卸妝與清潔',
    categoryType: 'cleansing',
    role: '早晚日常主力潔面乳',
    applicableWeeks: 'both',
    targetZone: 'all',
    usageInstructions: '早晚日常與所有功能夜的主力洗面乳（溫和不緊繃）。'
  },
  {
    id: 'p-07',
    number: '07',
    brand: 'SEXYLOOK 西西露',
    name: '綠番茄奶油洗面乳',
    category: '卸妝與清潔',
    categoryType: 'cleansing',
    role: '修護夜局部深層清潔乳',
    applicableWeeks: 'both',
    applicableDays: [3],
    targetZone: 'chin',
    usageInstructions: '【修護夜局部清潔】局部清潔 T 字與下巴粉刺區（每週最多 1 次，洗後若乾澀需停用）。'
  },
  {
    id: 'p-08',
    number: '08',
    brand: 'Kanebo suisai',
    name: '酵素洗顏粉（藍色）',
    category: '卸妝與清潔',
    categoryType: 'cleansing',
    role: '奇數週週末去角質夜洗顏粉',
    applicableWeeks: 'odd',
    applicableDays: [6],
    targetZone: 'all',
    usageInstructions: '【奇數週週末去角質夜】每週 1 次（溫和代謝老廢角質與下巴粉刺，當晚暫停水楊酸與 A 醇）。'
  },
  {
    id: 'p-09',
    number: '09',
    brand: '小林製藥',
    name: '小林製藥 EAUDE MUGE 藥用抗痘化妝水',
    category: '化妝水與噴霧',
    categoryType: 'toner',
    role: '下巴粉刺區局部擦拭／濕敷抑菌',
    applicableWeeks: 'both',
    applicableDays: [1, 5],
    targetZone: 'chin',
    usageInstructions: '【下巴粉刺區局部擦拭／濕敷專用】含抗炎與殺菌成分，適合在潔面後局部輕拍或針對下巴反覆痘痘做溫和二次清潔與抑菌（兩頰乾燥區避開）。',
    cautions: '⚠️ 僅針對下巴粉刺痘痘區，乾燥兩頰避開！'
  },
  {
    id: 'p-10',
    number: '10',
    brand: 'ORIGINS 品木宣言',
    name: '品木宣言 靈芝水',
    category: '化妝水與噴霧',
    categoryType: 'toner',
    role: '奇數週修護夜化妝水',
    applicableWeeks: 'odd',
    applicableDays: [1, 5, 6],
    targetZone: 'all',
    usageInstructions: '【奇數週修護夜化妝水】修護夜日常補水（與 #11 單雙週交替）。'
  },
  {
    id: 'p-11',
    number: '11',
    brand: 'MUJI 無印良品',
    name: 'MUJI 無印良品 化妝水（清爽型 / Light）',
    category: '化妝水與噴霧',
    categoryType: 'toner',
    role: '偶數週修護夜與功能夜化妝水',
    applicableWeeks: 'both',
    targetZone: 'all',
    usageInstructions: '【偶數週修護夜與功能夜化妝水】早晨、水楊酸夜與 A 醇夜的基礎補水搭檔（質地清爽，極適合下巴與外油內乾區）。'
  },
  {
    id: 'p-12',
    number: '12',
    brand: 'BIO HEAL BOH',
    name: 'BOH 維他命 B5 積雪草保濕修護潤澤噴霧',
    category: '化妝水與噴霧',
    categoryType: 'toner',
    role: '奇數週專屬噴霧',
    applicableWeeks: 'odd',
    targetZone: 'all',
    usageInstructions: '【奇數週專屬噴霧】晨間妝前輕噴、辦公室乾燥或日間隨時補水（與 #13 奇偶週交替）。'
  },
  {
    id: 'p-13',
    number: '13',
    brand: 'Ongredients',
    name: 'Ongredients 屏障鎮靜水光噴霧',
    category: '化妝水與噴霧',
    categoryType: 'toner',
    role: '偶數週專屬噴霧',
    applicableWeeks: 'even',
    targetZone: 'all',
    usageInstructions: '【偶數週專屬噴霧】妝前輕薄補水、夜間精華前後加強保濕（與 #12 奇偶週交替）。'
  },
  {
    id: 'p-14',
    number: '14',
    brand: 'COSME DECORTE 黛珂',
    name: 'COSME DECORTE 黛珂 小紫瓶',
    category: '精華與功能型',
    categoryType: 'serum',
    role: '洗臉後第一步前導保濕主力',
    applicableWeeks: 'both',
    targetZone: 'all',
    usageInstructions: '洗臉後第一步前導保濕主力（早晚皆可打底；嚴格使用手溫輕壓按拍，絕對不用化妝棉擦拭）。',
    cautions: '嚴格使用手溫按拍，切勿用化妝棉摩擦拉扯！'
  },
  {
    id: 'p-15',
    number: '15',
    brand: 'DECORTE 黛珂',
    name: 'DECORTE 黛珂瑩潤粹白 極光煥采精粹(1.8X)60mL',
    category: '精華與功能型',
    categoryType: 'serum',
    role: '高效美白與提亮精華（極光精粹 60mL）',
    applicableWeeks: 'both',
    usageTiming: '早晨美白提亮 ＋ 週一/週三/週五修護夜淡斑（小紫瓶後全臉勻拍）',
    targetZone: 'cheeks',
    usageInstructions: '【使用時機與手法】\n• 早晨或修護夜使用：於潔面及 #14 黛珂小紫瓶前導吸收後，按壓 1～2 下於掌心。\n• 手法：利用手溫由內向外均勻按壓輕拍於全臉與兩頰斑點暗沉處，加速高滲透微脂囊極光成分吸收。\n• 白天使用後務必疊加防曬（如 #38 或 #39），夜間可接續保濕乳液/面霜封層。',
    cautions: '日間使用後務必塗足防曬；避免與高濃度水楊酸或強效酸類同一步驟搓揉，下巴紅腫發炎痘痘處避開。'
  },
  {
    id: 'p-16',
    number: '16',
    brand: 'Torriden',
    name: 'Torriden DIVE-IN 玻尿酸保濕精華',
    category: '精華與功能型',
    categoryType: 'serum',
    role: '高機能深層補水精華',
    applicableWeeks: 'both',
    targetZone: 'all',
    usageInstructions: '【高機能深層補水精華】含有 5D 複合低分子玻尿酸、泛醇與尿囊素，適合作為日常或水楊酸/A醇後的無負擔補水救急。'
  },
  {
    id: 'p-17',
    number: '17',
    brand: 'Medicube',
    name: 'Medicube PDRN 粉紅胜肽安瓶',
    category: '精華與功能型',
    categoryType: 'serum',
    role: '修護夜或微針夜後續補水安瓶',
    applicableWeeks: 'both',
    applicableDays: [6],
    targetZone: 'all',
    usageInstructions: '修護夜或微針夜後續的單純補水安瓶（偶數週加強使用，偶數週六搭配離子儀導入）。'
  },
  {
    id: 'p-18',
    number: '18',
    brand: 'All-in-One 系列',
    name: '高濃度 All-in-One 全效精華液',
    category: '精華與功能型',
    categoryType: 'serum',
    role: '修護夜全效修復精華',
    applicableWeeks: 'both',
    targetZone: 'all',
    usageInstructions: '【修護夜精華】修護夜加強保濕與全效修護（與小紫瓶或安瓶交替）。'
  },
  {
    id: 'p-19',
    number: '19',
    brand: 'ANUA',
    name: 'ANUA 桃子菸鹼醯胺精華',
    category: '精華與功能型',
    categoryType: 'serum',
    role: '奇數週日間提亮精華',
    applicableWeeks: 'odd',
    targetZone: 'all',
    usageInstructions: '【奇數週日間】或肌膚穩定時的白天精華步驟（全臉提亮）。'
  },
  {
    id: 'p-20',
    number: '20',
    brand: 'The Ordinary',
    name: 'The Ordinary 菸鹼醯胺＋鋅精華',
    category: '精華與功能型',
    categoryType: 'serum',
    role: '偶數週修護夜下巴局部控油精華',
    applicableWeeks: 'even',
    applicableDays: [5],
    targetZone: 'chin',
    usageInstructions: '【偶數週修護夜】每週 1-2 次，僅局部點塗於下巴粉刺區控油（絕不全臉塗抹，不與水楊酸同晚）。',
    cautions: '⚠️ 僅局部點塗於下巴粉刺區控油，絕不全臉塗抹，乾肌兩頰千萬避開。'
  },
  {
    id: 'p-21',
    number: '21',
    brand: "Paula's Choice 寶拉珍選",
    name: 'Paula’s Choice 寶拉 2% 水楊酸',
    category: '精華與功能型',
    categoryType: 'serum',
    role: '每週二固定下巴鼻翼粉刺煥膚精華',
    applicableWeeks: 'both',
    applicableDays: [2],
    targetZone: 'chin',
    isHighActive: true,
    usageInstructions: '【每週二固定】下巴與鼻翼粉刺區局部煥膚（靜置 3-5 分鐘）。',
    cautions: '⚠️ 脂溶性水楊酸只塗下巴鼻翼，靜置 3-5 分鐘！乾肌兩頰嚴禁沾染。'
  },
  {
    id: 'p-22',
    number: '22',
    brand: 'VT Cosmetics',
    name: 'VT Reedle Shot 300 微晶精華',
    category: '精華與功能型',
    categoryType: 'serum',
    role: '夜間強效激活微針精華',
    applicableWeeks: 'even',
    applicableDays: [0],
    isHighActive: true,
    targetZone: 'all',
    usageInstructions: '【偶數週日夜】夜間強效激活微針（乾臉按壓不搓揉）。',
    cautions: '微針精華請乾手乾臉以按壓手法導入，絕不摩擦搓揉！'
  },
  {
    id: 'p-23',
    number: '23',
    brand: 'Celimax',
    name: 'Celimax A 醇微晶精華',
    category: '精華與功能型',
    categoryType: 'serum',
    role: '每週四固定抗老細紋微晶調理精華',
    applicableWeeks: 'both',
    applicableDays: [4],
    isHighActive: true,
    targetZone: 'all',
    usageInstructions: '【每週四固定】抗老細紋與整體膚質調理（豌豆大小，避開眼周）。',
    cautions: '用量只需豌豆大小！先擦雅詩蘭黛眼霜隔離保護眼部。當晚若有輕微溫熱刺感屬正常。'
  },
  {
    id: 'p-24',
    number: '24',
    brand: 'Acclear (아크클리어)',
    name: 'Acclear Cream 局部痘痘藥',
    category: '局部痘痘藥',
    categoryType: 'spot',
    role: '突發紅腫痘／膿包專用藥膏',
    applicableWeeks: 'both',
    targetZone: 'chin',
    usageInstructions: '【突發紅腫痘／膿包專用】含 Ibuprofen Piconol 與 Isopropylmethylphenol，於夜間保養最後一步局部點塗於紅腫發炎痘痘上（不與水楊酸或A醇同點同一顆痘）。',
    cautions: '僅局部點塗於紅腫發炎痘，不全臉大面積擦拭。'
  },
  {
    id: 'p-25',
    number: '25',
    brand: 'MUJI 無印良品',
    name: 'MUJI 無印良品 米糠發酵乳液',
    category: '乳液與面霜',
    categoryType: 'cream',
    role: '下巴粉刺區專用清爽保濕乳液',
    applicableWeeks: 'both',
    targetZone: 'chin',
    usageInstructions: '下巴粉刺區專用清爽保濕乳液（奇偶週每晚下巴鎖水主力，絕不塗厚霜）。',
    cautions: '下巴永遠維持薄擦米糠乳，絕不上任何厚霜以防悶生粉刺痘痘。'
  },
  {
    id: 'p-26',
    number: '26',
    brand: 'ORIGINS 品木宣言',
    name: 'ORIGINS 品木宣言 靈芝乳液 2.0',
    category: '乳液與面霜',
    categoryType: 'cream',
    role: '奇數週保濕乳液',
    applicableWeeks: 'odd',
    targetZone: 'all',
    usageInstructions: '【奇數週保濕乳液】奇數週全臉或兩頰鎖水（與 #27 交替）。'
  },
  {
    id: 'p-27',
    number: '27',
    brand: 'COSME DECORTE 黛珂',
    name: 'COSME DECORTE 黛珂 AQ 煥妍柔膚乳 III',
    category: '乳液與面霜',
    categoryType: 'cream',
    role: '偶數週兩頰乾燥區專用滋潤乳',
    applicableWeeks: 'even',
    targetZone: 'cheeks',
    usageInstructions: '【偶數週保濕乳液】偶數週兩頰乾燥區專用「先乳後水」滋潤乳（避開下巴）。'
  },
  {
    id: 'p-28',
    number: '28',
    brand: 'S.NATURE',
    name: 'S.NATURE 水庫角鯊烷保濕霜',
    category: '乳液與面霜',
    categoryType: 'cream',
    role: '兩頰日常乾燥鎖水主力面霜',
    applicableWeeks: 'odd',
    targetZone: 'cheeks',
    usageInstructions: '兩頰日常乾燥鎖水主力（奇數週修護夜與微針夜封層）。'
  },
  {
    id: 'p-29',
    number: '29',
    brand: 'Dr. Reju-All',
    name: 'Dr. Reju-All PDRN 高效修復霜',
    category: '乳液與面霜',
    categoryType: 'cream',
    role: '局部脫皮泛紅加強封層霜',
    applicableWeeks: 'odd',
    targetZone: 'cheeks',
    usageInstructions: '局部脫皮、泛紅處加強封層（奇數週修護夜／面膜夜收尾）。'
  },
  {
    id: 'p-30',
    number: '30',
    brand: 'DECORTE 黛珂',
    name: 'DECORTE 黛珂超微導全能修護霜50ml-全新賦活精華霜',
    category: '乳液與面霜',
    categoryType: 'cream',
    role: '全新賦活精華霜（黛珂小紫霜 50ml）',
    applicableWeeks: 'both',
    usageTiming: '偶數週四【A醇微晶夜】兩頰封層 ＋ 換季/兩頰極乾燥深層修護',
    targetZone: 'cheeks',
    usageInstructions: '【使用時機與手法】\n• 偶數週四【A 醇微晶夜】：於 #23 Celimax A 醇微晶精華後，取珍珠大小於掌心勻開，溫柔按壓於兩頰乾燥區做高機能賦活封層，舒緩 A 醇微晶的活性刺激。\n• 修護夜 / 換季乾燥期：當兩頰感到緊繃缺水時，於精華液後取代一般乳霜，提供超微導微脂囊長效賦活潤澤。\n• 晨間乾肌急救：若早晨兩頰嚴重脫皮，可於素顏日兩頰薄擦一層做為深層滋養鎖水。',
    cautions: '⚠️ 專為乾肌兩頰深層潤澤設計，質地濃郁滋潤；下巴粉刺痘痘區請嚴格避開厚擦（下巴請固定使用 #25 MUJI 米糠乳液）。'
  },
  {
    id: 'p-31',
    number: '31',
    brand: "Kiehl's 契爾氏",
    name: '契爾氏 冰河醣蛋白保濕霜',
    category: '乳液與面霜',
    categoryType: 'cream',
    role: '偶數週兩頰主力面霜',
    applicableWeeks: 'even',
    targetZone: 'cheeks',
    usageInstructions: '【偶數週主力面霜】偶數週兩頰長效保濕、秋冬乾燥或功能夜後強力封層（避開下巴）。',
    cautions: '避開下巴粉刺區，專攻乾性兩頰。'
  },
  {
    id: 'p-32',
    number: '32',
    brand: 'NIVEA 妮維雅',
    name: 'NIVEA 妮維雅 Luminous 630 雙效淡斑煥白修護晚霜',
    category: '乳液與面霜',
    categoryType: 'cream',
    role: '偶數週修護夜兩頰加強淡斑晚霜',
    applicableWeeks: 'even',
    applicableDays: [5],
    targetZone: 'cheeks',
    usageInstructions: '【偶數週修護夜兩頰加強淡斑晚霜】用於兩頰乾燥與需要均勻膚色處，絕對不可厚敷在下巴粉刺區（避開粉刺區，下巴維持清爽乳液）。',
    cautions: '僅限兩頰斑點區，下巴容易致痘粉刺區嚴禁厚敷。'
  },
  {
    id: 'p-33',
    number: '33',
    brand: 'BOBBI BROWN',
    name: 'BOBBI BROWN 維他命完美面霜（橘子霜）',
    category: '乳液與面霜',
    categoryType: 'cream',
    role: '完整底妝日的兩頰妝前保濕打底',
    applicableWeeks: 'both',
    targetZone: 'cheeks',
    usageInstructions: '完整底妝日的兩頰妝前保濕打底與妝前保濕步驟（避開下巴）。',
    cautions: '下巴粉刺區嚴格避開橘子霜，改擦清爽米糠乳液預防悶痘！'
  },
  {
    id: 'p-34',
    number: '34',
    brand: 'Estée Lauder 雅詩蘭黛',
    name: '雅詩蘭黛 特潤全能修護亮眼霜',
    category: '眼周護理',
    categoryType: 'eye',
    role: '夜間日常眼霜及 A 醇前隔離防護',
    applicableWeeks: 'both',
    targetZone: 'eyes',
    usageInstructions: '夜間日常眼霜，及 A 醇夜前的眼周隔離保護。'
  },
  {
    id: 'p-35',
    number: '35',
    brand: "L'Oréal Paris 巴黎萊雅",
    name: '巴黎萊雅 紫熨斗 MAX',
    category: '眼周護理',
    categoryType: 'eye',
    role: '早晨素顏日或修護夜眼下細紋保濕',
    applicableWeeks: 'both',
    targetZone: 'eyes',
    usageInstructions: '早晨素顏日或修護夜的眼下細紋保濕（與 #34 擇一交替）。'
  },
  {
    id: 'p-36',
    number: '36',
    brand: 'BRINGGREEN / Neogene',
    name: 'BRINGGREEN 超級檸檬谷胱甘肽眼霜 ＋ Neogene 海洋水動能亮眼霜',
    category: '眼周護理',
    categoryType: 'eye',
    role: '早間／修護夜亮白保濕眼周輪替',
    applicableWeeks: 'both',
    targetZone: 'eyes',
    usageInstructions: '【早間／修護夜眼周輪替】提亮暗沉與高效保濕眼下細紋。'
  },
  {
    id: 'p-37',
    number: '37',
    brand: 'BOBBI BROWN',
    name: 'BOBBI BROWN 維他命完美眼霜',
    category: '眼周護理',
    categoryType: 'eye',
    role: '完整底妝日的眼下妝前保濕打底眼霜',
    applicableWeeks: 'both',
    targetZone: 'eyes',
    usageInstructions: '完整底妝日的眼下妝前保濕與打底（預防遮瑕卡紋）。'
  },
  {
    id: 'p-38',
    number: '38',
    brand: "d'Alba 黛爾泊",
    name: 'd’Alba 黛爾泊水潤粉光校色提亮防曬霜',
    category: '防曬與妝前',
    categoryType: 'sunscreen',
    role: '上班日防曬主力',
    applicableWeeks: 'both',
    targetZone: 'all',
    usageInstructions: '上班日防曬主力（直接完工，具好氣色）。'
  },
  {
    id: 'p-39',
    number: '39',
    brand: 'Mentholatum 曼秀雷敦',
    name: '曼秀雷敦 水潤肌高濃度玻尿酸防曬精華',
    category: '防曬與妝前',
    categoryType: 'sunscreen',
    role: '完整底妝日的主力透明防曬',
    applicableWeeks: 'both',
    targetZone: 'all',
    usageInstructions: '完整底妝日的主力透明防曬。'
  },
  {
    id: 'p-40',
    number: '40',
    brand: 'Goodal 俱佳',
    name: 'Goodal 綠橘子維他命 C 淡斑眼膜',
    category: '眼膜與局部',
    categoryType: 'mask',
    role: '修護夜／妝前眼周 SPA 眼膜',
    applicableWeeks: 'both',
    targetZone: 'eyes',
    usageInstructions: '【修護夜／妝前眼周 SPA】每次 10-15 分鐘，敷後務必擦眼霜鎖水。'
  },
  {
    id: 'p-41',
    number: '41',
    brand: 'Medicube',
    name: 'Medicube PDRN 粉紅胜肽膠原化妝水棉片',
    category: '棉片與急救',
    categoryType: 'toner',
    role: '修護夜局部濕敷或妝前急救棉片',
    applicableWeeks: 'both',
    targetZone: 'cheeks',
    usageInstructions: '【修護夜局部濕敷或妝前急救】兩頰或眼下局部濕敷 5-10 分鐘，後續正常鎖水。'
  },
  {
    id: 'p-device',
    number: '美容儀',
    brand: 'CHECK2CHECK',
    name: 'CHECK2CHECK 離子淨膚儀',
    category: '美容儀器',
    categoryType: 'device',
    role: '深層毛孔導出 ＆ 精華深層導入儀',
    applicableWeeks: 'both',
    applicableDays: [3, 6],
    targetZone: 'all',
    usageInstructions: '具備「深層導出模式（每週三搭配 #03 舒特膚潔膚水）」與「保濕導入模式（偶數週六搭配 #17 Medicube 安瓶）」。'
  },
  {
    id: 'p-mask-az100',
    number: '面膜',
    brand: 'Quality 1st',
    name: 'Quality 1st AZ100（藍瓶痘痘護理面膜）',
    category: '面膜與急救',
    categoryType: 'mask',
    role: '奇數週日抗痘消炎面膜',
    applicableWeeks: 'odd',
    applicableDays: [0],
    targetZone: 'all',
    usageInstructions: '【奇數週日夜專屬】高滲透壬二酸配方，敷貼 10~15 分鐘。舒緩下巴反覆痘痘、收斂毛孔並平衡全臉油脂分泌。敷完取下後輕拍吸收，噴上 #12 BOH 噴霧，兩頰以 #29 Dr. Reju-All 修復霜鎖水。'
  },
  {
    id: 'p-mask-hydrating',
    number: '面膜',
    brand: '日常嚴選系列',
    name: '一般日常保濕面膜',
    category: '面膜與急救',
    categoryType: 'mask',
    role: '深層純保濕補水面膜',
    applicableWeeks: 'even',
    applicableDays: [3, 0],
    targetZone: 'all',
    usageInstructions: '【偶數週三夜（離子導出後加強補水）】與【偶數週日夜（AZ100 的交替週）】敷貼 10~15 分鐘，給乾肌最純粹的玻尿酸補水，取下後兩頰立刻以 #31 契爾氏冰河霜強力封層！'
  },
  {
    id: 'p-makeup-base',
    number: '妝前',
    brand: 'shu uemura 植村秀',
    name: '植村秀 紫色／膚色潤色妝前乳',
    category: '防曬與妝前',
    categoryType: 'sunscreen',
    role: '完整底妝日局部校色修飾乳',
    applicableWeeks: 'both',
    targetZone: 'all',
    usageInstructions: '完整底妝日局部修飾蠟黃暗沉與膚色不均。'
  }
];

export const WEEKLY_NIGHT_ROUTINES: DayRoutine[] = [
  {
    dayOfWeek: 1, // 週一
    dayName: '週一',
    themeTitle: '日常修護夜',
    themeIcon: '💧',
    oddWeekDetails: {
      cleansing: '【極簡卸洗】#02 MUJI 卸妝油 ➔ #06 綠茶保濕胺基酸洗面乳。',
      steps: [
        { step: 1, label: '下巴抑菌', productNumbers: ['09'], details: '小林製藥抗痘化妝水，僅局部輕拍或擦拭下巴粉刺區二次清潔抑菌。', zone: '下巴' },
        { step: 2, label: '前導打底', productNumbers: ['14'], details: '黛珂小紫瓶 1~2 下，以手溫按拍全臉，絕不用化妝棉擦拭。', zone: '全臉' },
        { step: 3, label: '極光精粹', productNumbers: ['15'], details: '黛珂瑩潤粹白極光煥采精粹 (1.8X)，均勻輕拍全臉淡斑勻亮。', zone: '全臉' },
        { step: 4, label: '玻尿酸補水', productNumbers: ['16'], details: 'Torriden DIVE-IN 5D 玻尿酸保濕精華，深層滲透補水。', zone: '全臉' },
        { step: 5, label: '靈芝水舒緩', productNumbers: ['10'], details: '品木宣言靈芝水倒在手心溫和輕拍。', zone: '全臉' },
        { step: 6, label: '修護噴霧', productNumbers: ['12'], details: 'BOH 維他命 B5 積雪草保濕修護潤澤噴霧全臉輕噴一層。', zone: '全臉' },
        { step: 7, label: '眼周防禦', productNumbers: ['34'], details: '雅詩蘭黛特潤全能眼霜，以無名指腹輕柔按摩眼下細紋。', zone: '眼周' },
        { step: 8, label: '兩頰鎖水修復', productNumbers: ['28'], details: '【兩頰乾燥區】使用 S.NATURE 水庫角鯊烷保濕霜，深層鎖水修護。', zone: '兩頰' },
        { step: 9, label: '下巴清爽', productNumbers: ['25'], details: '【下巴粉刺區】薄擦 MUJI 米糠發酵乳液，維持油水平衡，絕不上厚霜。', zone: '下巴' },
        { step: 10, label: '痘痘急救', productNumbers: ['24'], details: '（若有紅腫發炎痘）夜間最後一步局部點塗 Acclear 痘痘藥消炎。', zone: '下巴' }
      ],
      notes: '週一以溫和舒緩修護為主，加入小林抗痘水下巴二次抑菌清潔，搭配 Torriden 玻尿酸精華與靈芝水，兩頰選用 S.NATURE 深度修護、下巴維持米糠乳呼吸感。'
    },
    evenWeekDetails: {
      cleansing: '【極簡卸洗】#02 MUJI 卸妝油 ➔ #06 綠茶洗面乳。',
      steps: [
        { step: 1, label: '下巴抑菌', productNumbers: ['09'], details: '小林製藥抗痘化妝水，僅局部輕拍或擦拭下巴粉刺區二次清潔抑菌。', zone: '下巴' },
        { step: 2, label: '前導打底', productNumbers: ['14'], details: '黛珂小紫瓶 1~2 下，手溫輕拍按壓。', zone: '全臉' },
        { step: 3, label: '極光精粹', productNumbers: ['15'], details: '黛珂瑩潤粹白極光煥采精粹 (1.8X)，勻亮暗沉與淡斑。', zone: '全臉' },
        { step: 4, label: '玻尿酸補水', productNumbers: ['16'], details: 'Torriden 玻尿酸保濕精華，深層注水。', zone: '全臉' },
        { step: 5, label: '清爽化妝水', productNumbers: ['11'], details: 'MUJI 化妝水（清爽型）輕拍打底。', zone: '全臉' },
        { step: 6, label: '水光噴霧', productNumbers: ['13'], details: 'Ongredients 屏障鎮靜水光噴霧全臉補水。', zone: '全臉' },
        { step: 7, label: '眼周修護', productNumbers: ['34'], details: '雅詩蘭黛亮眼霜保養眼下細紋。', zone: '眼周' },
        { step: 8, label: '兩頰長效封層', productNumbers: ['31'], details: '【兩頰專屬】使用 契爾氏冰河醣蛋白保濕霜 強效滋潤鎖水。', zone: '兩頰' },
        { step: 9, label: '下巴控油鎖水', productNumbers: ['25'], details: '【下巴專屬】薄擦 MUJI 米糠發酵乳液，避開厚重面霜。', zone: '下巴' },
        { step: 10, label: '痘痘急救', productNumbers: ['24'], details: '（若有紅腫發炎痘）局部點塗 Acclear 局部痘痘藥。', zone: '下巴' }
      ],
      notes: '偶數週使用清爽型 MUJI 化妝水與契爾氏冰河霜，為兩頰乾肌補足潤澤，下巴維持無負擔呼吸感。'
    }
  },
  {
    dayOfWeek: 2, // 週二
    dayName: '週二',
    themeTitle: '水楊酸夜 (粉刺大掃除)',
    themeIcon: '🧪',
    oddWeekDetails: {
      cleansing: '【深層洗卸】#02 MUJI 卸妝油乾手乾臉按摩（充分乳化沖淨）➔ #06 綠茶洗面乳徹底洗淨並擦乾。\n【選搭粉刺溶解露】：若安排粉刺大掃除，在洗淨擦乾後，取 #01 ilso 溶解露 局部濕敷下巴與鼻翼 10-15 分鐘，溫和融化角栓後沖淨擦乾，再擦水楊酸。',
      steps: [
        { step: 1, label: '局部水楊酸煥膚', productNumbers: ['21'], details: '寶拉 2% 水楊酸：僅局部塗抹於下巴與鼻翼粉刺區，靜置等待 3～5 分鐘！兩頰乾肌嚴禁塗抹。', zone: '下巴' },
        { step: 2, label: '前導安撫', productNumbers: ['14'], details: '等待 3~5 分鐘後，按壓黛珂小紫瓶以手溫輕拍全臉。', zone: '全臉' },
        { step: 3, label: '清爽補水', productNumbers: ['11'], details: 'MUJI 化妝水（清爽型）輕拍全臉緩解酸後乾燥感。', zone: '全臉' },
        { step: 4, label: '眼周防護', productNumbers: ['34'], details: '雅詩蘭黛眼霜呵護眼周細緻肌膚。', zone: '眼周' },
        { step: 5, label: '兩頰保濕封層', productNumbers: ['28'], details: '【兩頰】擦 S.NATURE 水庫角鯊烷保濕霜修復皮脂膜。', zone: '兩頰' },
        { step: 6, label: '下巴舒緩鎖水', productNumbers: ['25'], details: '【下巴】水楊酸吸收後，僅薄擦 MUJI 米糠乳液，嚴禁塗厚霜以免悶痘。', zone: '下巴' }
      ],
      notes: '【重要提醒】週二固定水楊酸夜，脂溶性水楊酸深入毛孔溶解角栓，務必靜置 3-5 分鐘。當晚嚴禁疊加 A 醇或磨砂去角質。'
    },
    evenWeekDetails: {
      cleansing: '【深層洗卸】#02 MUJI 卸妝油（乳化徹底）➔ #06 綠茶洗面乳溫和洗淨擦乾。\n【選搭粉刺溶解露】：若安排粉刺大掃除，用 #01 ilso 溶解露 局部濕敷下巴與鼻翼 10-15 分鐘，溫和排油後洗淨。',
      steps: [
        { step: 1, label: '局部水楊酸煥膚', productNumbers: ['21'], details: '寶拉 2% 水楊酸：局部點塗下巴與鼻翼粉刺區，靜置 3～5 分鐘。', zone: '下巴' },
        { step: 2, label: '微脂囊前導', productNumbers: ['14'], details: '黛珂小紫瓶掌心按拍吸收。', zone: '全臉' },
        { step: 3, label: '清爽補水', productNumbers: ['11'], details: 'MUJI 化妝水（清爽型）按拍。', zone: '全臉' },
        { step: 4, label: '眼周修護', productNumbers: ['34'], details: '雅詩蘭黛眼霜保濕。', zone: '眼周' },
        { step: 5, label: '兩頰高效鎖水', productNumbers: ['31'], details: '【兩頰】使用 契爾氏冰河醣蛋白保濕霜，強效阻擋水分散失。', zone: '兩頰' },
        { step: 6, label: '下巴清爽防禦', productNumbers: ['25'], details: '【下巴】MUJI 米糠發酵乳液單純保濕。', zone: '下巴' }
      ],
      notes: '水楊酸只點下巴與鼻翼，兩頰靠契爾氏冰河霜加強滋潤鎖水，落實極致分區保養。'
    }
  },
  {
    dayOfWeek: 3, // 週三
    dayName: '週三',
    themeTitle: '深層導出淨膚夜',
    themeIcon: '🌿✨',
    oddWeekDetails: {
      cleansing: '【離子儀(導出)】#03 舒特膚潔膚水浸透化妝棉 ＋ CHECK2CHECK 離子儀(導出模式) 溫和導出毛孔殘妝 ➔ #06 綠茶洗面乳。',
      steps: [
        { step: 1, label: '前導深入', productNumbers: ['14'], details: '黛珂小紫瓶 1~2 下，以手溫按拍剛導出完的清透肌膚。', zone: '全臉' },
        { step: 2, label: '極光精粹', productNumbers: ['15'], details: '黛珂瑩潤粹白極光煥采精粹 (1.8X)，淡斑勻亮。', zone: '全臉' },
        { step: 3, label: '深層注水', productNumbers: ['16'], details: 'Torriden 玻尿酸精華，加強剛導出後的深層補水通道。', zone: '全臉' },
        { step: 4, label: '積雪草噴霧', productNumbers: ['12'], details: 'BOH 維他命 B5 積雪草保濕修護潤澤噴霧全臉輕噴。', zone: '全臉' },
        { step: 5, label: '透亮精華', productNumbers: ['19'], details: '【奇數週三專屬】薄擦 ANUA 桃子菸鹼醯胺精華，全臉提亮抗暗沉。', zone: '全臉' },
        { step: 6, label: '眼周防禦', productNumbers: ['34'], details: '雅詩蘭黛亮眼霜輕按眼周。', zone: '眼周' },
        { step: 7, label: '兩頰鎖水', productNumbers: ['28'], details: '【兩頰】擦 S.NATURE 水庫角鯊烷保濕霜深層滋潤。', zone: '兩頰' },
        { step: 8, label: '下巴呼吸鎖水', productNumbers: ['25'], details: '【下巴】薄擦 MUJI 米糠乳液，享受導出後的無負擔暢通感。', zone: '下巴' }
      ],
      notes: '離子儀(導出)利用電荷吸附彩妝殘留與角質髒污，動作保持輕柔順滑即可。'
    },
    evenWeekDetails: {
      cleansing: '【離子儀(導出)＋清潔】#03 舒特膚潔膚水 ＋ CHECK2CHECK 離子儀(導出模式) ➔ #06 綠茶洗面乳。',
      steps: [
        { step: 1, label: '加強保濕面膜', productNumbers: ['p-mask-hydrating'], details: '【偶數週三・保濕面膜加強夜】導出清潔後，敷上一片【一般日常保濕面膜】10～15 分鐘！深層注水。', zone: '全臉' },
        { step: 2, label: '取下輕拍＋噴霧', productNumbers: ['13'], details: '取下面膜後輕拍精華至吸收，噴上 Ongredients 屏障鎮靜水光噴霧。', zone: '全臉' },
        { step: 3, label: '前導導入', productNumbers: ['14'], details: '黛珂小紫瓶掌心按拍打底。', zone: '全臉' },
        { step: 4, label: '眼霜修護', productNumbers: ['34'], details: '雅詩蘭黛亮眼霜保養眼下細紋。', zone: '眼周' },
        { step: 5, label: '兩頰強力封層', productNumbers: ['31'], details: '【兩頰】立刻使用 契爾氏冰河醣蛋白保濕霜 強力封層鎖水！', zone: '兩頰' },
        { step: 6, label: '下巴清爽鎖水', productNumbers: ['25'], details: '【下巴】薄擦 MUJI 米糠乳液收尾。', zone: '下巴' }
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
      cleansing: '【溫和深層洗卸】#02 MUJI 卸妝油按摩乳化 ➔ #06 綠茶洗面乳洗淨，毛巾輕印至「全臉肌膚完全乾燥」。',
      steps: [
        { step: 1, label: '前導打底', productNumbers: ['14'], details: '黛珂小紫瓶 1~2 下，手溫輕拍打底修護。', zone: '全臉' },
        { step: 2, label: '清爽緩衝', productNumbers: ['11'], details: 'MUJI 化妝水（清爽型）打底，建立溫和保濕緩衝層。', zone: '全臉' },
        { step: 3, label: '眼周屏障隔離', productNumbers: ['34'], details: '【先擦眼霜】以雅詩蘭黛特潤亮眼霜塗抹眼周，建立隔離屏障，防止 A 醇擴散刺激細嫩眼周！', zone: '眼周' },
        { step: 4, label: 'A 醇微晶抗老', productNumbers: ['23'], details: '【關鍵步驟】取 Celimax A 醇微晶精華「豌豆大小」，均勻點在額頭、兩頰與下巴並輕柔按壓吸收，嚴格避開眼周與唇緣。', zone: '全臉' },
        { step: 5, label: '眼霜修護', productNumbers: ['34'], details: '雅詩蘭黛亮眼霜保濕。', zone: '眼周' },
        { step: 6, label: '兩頰修護封層', productNumbers: ['28'], details: '【兩頰】擦 S.NATURE 水庫角鯊烷保濕霜，緩解 A 醇可能帶來的乾燥。', zone: '兩頰' },
        { step: 7, label: '下巴保護鎖水', productNumbers: ['25'], details: '【下巴】薄擦 MUJI 米糠乳液鎖水。', zone: '下巴' }
      ],
      notes: '【A 醇微晶守則】用量只需豌豆大小！先擦雅詩蘭黛眼霜隔離保護眼部。當晚若有輕微溫熱刺感屬正常，安心入睡，隔日白天務必防曬。'
    },
    evenWeekDetails: {
      cleansing: '【深層溫和潔淨】#02 MUJI 卸妝油乳化洗淨 ➔ #06 綠茶洗面乳，確保臉部完全乾燥。',
      steps: [
        { step: 1, label: '微脂囊打底', productNumbers: ['14'], details: '黛珂小紫瓶掌心按拍。', zone: '全臉' },
        { step: 2, label: '清爽打底', productNumbers: ['11'], details: 'MUJI 化妝水（清爽型）打底緩衝。', zone: '全臉' },
        { step: 3, label: '眼霜防護層', productNumbers: ['34'], details: '雅詩蘭黛眼霜先行封好眼周安全範圍。', zone: '眼周' },
        { step: 4, label: 'A 醇微晶精華', productNumbers: ['23'], details: 'Celimax A 醇精華（豌豆大小）避開眼周全臉輕壓。', zone: '全臉' },
        { step: 5, label: '眼周補水', productNumbers: ['34'], details: '雅詩蘭黛眼霜補足保濕。', zone: '眼周' },
        { step: 6, label: '兩頰強效舒緩', productNumbers: ['30'], details: '【兩頰】使用 DECORTE 黛珂超微導全能修護霜，深層微微微脂囊修護屏障抗燥。', zone: '兩頰' },
        { step: 7, label: '下巴米糠保濕', productNumbers: ['25'], details: '【下巴】薄擦 MUJI 米糠發酵乳液。', zone: '下巴' }
      ],
      notes: '週四固定 A 醇微晶夜，調理角質與細紋。睡前吃癲必停與易靜錠安心入眠。'
    }
  },
  {
    dayOfWeek: 5, // 週五
    dayName: '週五',
    themeTitle: '修護與淡斑夜',
    themeIcon: '💧',
    oddWeekDetails: {
      cleansing: '【舒緩卸洗】#04 維 C 卸妝凝膠 ➔ #06 綠茶保濕胺基酸洗面乳。',
      steps: [
        { step: 1, label: '下巴抑菌', productNumbers: ['09'], details: '小林製藥抗痘化妝水，僅下巴局部二次清潔抑菌。', zone: '下巴' },
        { step: 2, label: '前導修復', productNumbers: ['14'], details: '黛珂小紫瓶手溫輕壓按拍。', zone: '全臉' },
        { step: 3, label: '極光精粹', productNumbers: ['15'], details: '黛珂極光煥采精粹，淡斑提亮勻稱膚色。', zone: '全臉' },
        { step: 4, label: '深層玻尿酸', productNumbers: ['16'], details: 'Torriden 玻尿酸保濕精華深層注水。', zone: '全臉' },
        { step: 5, label: '靈芝水舒緩', productNumbers: ['10'], details: '品木宣言靈芝水倒在手心溫和輕拍，平撫整週肌膚疲勞。', zone: '全臉' },
        { step: 6, label: '修護噴霧', productNumbers: ['12'], details: 'BOH 噴霧全臉輕噴潤澤。', zone: '全臉' },
        { step: 7, label: '眼周滋養', productNumbers: ['34'], details: '雅詩蘭黛亮眼霜輕按眼周。', zone: '眼周' },
        { step: 8, label: '兩頰深層潤澤', productNumbers: ['29'], details: '【兩頰】使用 Dr. Reju-All PDRN 高效修復霜，修護屏障滋潤封層。', zone: '兩頰' },
        { step: 9, label: '下巴清透保濕', productNumbers: ['25'], details: '【下巴】MUJI 米糠乳液薄擦。', zone: '下巴' },
        { step: 10, label: '痘痘急救', productNumbers: ['24'], details: '（若有紅腫發炎痘）局部點塗 Acclear 局部痘痘藥。', zone: '下巴' }
      ],
      notes: '週五迎來小週末，修復在週四 A 醇作用後的角質，兩頰使用 Dr. Reju-All PDRN 高效修復霜，維持穩定的屏障狀態。'
    },
    evenWeekDetails: {
      cleansing: '【舒緩卸洗】#04 維 C 卸妝凝膠 ➔ #06 綠茶洗面乳。',
      steps: [
        { step: 1, label: '下巴抑菌', productNumbers: ['09'], details: '小林製藥抗痘化妝水，僅下巴局部二次清潔抑菌。', zone: '下巴' },
        { step: 2, label: '前導補水', productNumbers: ['14'], details: '黛珂小紫瓶手溫輕壓按拍。', zone: '全臉' },
        { step: 3, label: '極光精粹', productNumbers: ['15'], details: '黛珂極光煥采精粹，勻亮暗沉與淡斑。', zone: '全臉' },
        { step: 4, label: '深層玻尿酸', productNumbers: ['16'], details: 'Torriden 玻尿酸精華注入水份。', zone: '全臉' },
        { step: 5, label: '清爽化妝水', productNumbers: ['11'], details: 'MUJI 化妝水（清爽型）輕拍打底。', zone: '全臉' },
        { step: 6, label: '水光噴霧', productNumbers: ['13'], details: 'Ongredients 屏障鎮靜水光噴霧全臉噴霧。', zone: '全臉' },
        { step: 7, label: '眼霜保養', productNumbers: ['34'], details: '雅詩蘭黛眼霜保濕。', zone: '眼周' },
        { step: 8, label: '兩頰淡斑封層', productNumbers: ['32'], details: '【兩頰】使用 NIVEA 妮維雅 Luminous 630 雙效淡斑煥白修護晚霜，淡斑提亮（嚴格避開下巴）。', zone: '兩頰' },
        { step: 9, label: '下巴局部控油', productNumbers: ['20'], details: '【偶數週五亮點】取少量 The Ordinary 菸鹼醯胺＋鋅精華，「僅局部點塗於下巴粉刺區」加強收斂控油！絕不塗全臉。', zone: '下巴' },
        { step: 10, label: '下巴鎖水封層', productNumbers: ['25'], details: '【下巴】MUJI 米糠發酵乳液薄擦鎖水。', zone: '下巴' },
        { step: 11, label: '痘痘急救', productNumbers: ['24'], details: '（若有紅腫發炎痘）局部點塗 Acclear 痘痘藥。', zone: '下巴' }
      ],
      notes: 'The Ordinary 菸鹼醯胺+鋅具有很強的控油效果，僅限偶數週五局部點在下巴，乾肌兩頰擦妮維雅 630 淡斑晚霜。'
    }
  },
  {
    dayOfWeek: 6, // 週六
    dayName: '週六',
    themeTitle: '週末去角質與淨膚夜',
    themeIcon: '🌟',
    oddWeekDetails: {
      cleansing: '【酵素洗顏去角質】#02 MUJI 卸妝油 ➔ #08 Kanebo suisai 酵素洗顏粉（藍色），搓出豐盈泡沫後輕柔按摩全臉與下巴粉刺處，溫和代謝老廢角質。',
      steps: [
        { step: 1, label: '前導滲透', productNumbers: ['14'], details: '角質代謝後第一步：黛珂小紫瓶 1~2 下，以手溫按拍促進微脂囊直達基底。', zone: '全臉' },
        { step: 2, label: '靈芝水安撫', productNumbers: ['10'], details: '品木宣言靈芝水充分輕拍，迅速舒緩肌膚。', zone: '全臉' },
        { step: 3, label: '眼霜滋潤', productNumbers: ['34'], details: '雅詩蘭黛眼霜呵護眼下細紋。', zone: '眼周' },
        { step: 4, label: '兩頰深層潤澤', productNumbers: ['28'], details: '【兩頰】擦 S.NATURE 水庫角鯊烷保濕霜。', zone: '兩頰' },
        { step: 5, label: '下巴溫和鎖水', productNumbers: ['25'], details: '【下巴】MUJI 米糠發酵乳液薄擦。', zone: '下巴' }
      ],
      notes: '【奇數週六專屬】suisai 酵素洗顏粉能溫和分解多餘蛋白質角質，當晚嚴禁使用水楊酸或 A 醇，單純修護補水即可。'
    },
    evenWeekDetails: {
      cleansing: '【主力清潔】#02 MUJI 卸妝油按摩乳化沖淨 ➔ #06 綠茶保濕胺基酸洗面乳洗淨擦乾。',
      steps: [
        { step: 1, label: '前導打底', productNumbers: ['14'], details: '黛珂小紫瓶按拍全臉。', zone: '全臉' },
        { step: 2, label: '儀器深層導入', productNumbers: ['17', 'p-device'], details: '【偶數週六專屬】全臉均勻滴上 #17 Medicube PDRN 粉紅胜肽安瓶，啟動離子淨膚儀「保濕導入模式」，溫感輕柔滑動按摩全臉促進深層吸收！', zone: '全臉' },
        { step: 3, label: '眼霜呵護', productNumbers: ['34'], details: '雅詩蘭黛眼霜保濕。', zone: '眼周' },
        { step: 4, label: '兩頰冰河霜封存', productNumbers: ['31'], details: '【兩頰】契爾氏冰河醣蛋白保濕霜，將導入的胜肽精華牢牢鎖在肌膚裡。', zone: '兩頰' },
        { step: 5, label: '下巴呼吸清爽', productNumbers: ['25'], details: '【下巴】MUJI 米糠乳液薄擦。', zone: '下巴' }
      ],
      notes: '【偶數週六亮點】享受居家的離子儀保濕導入護膚沙龍，深層補充胜肽水分，肌膚柔嫩發光！'
    }
  },
  {
    dayOfWeek: 0, // 週日
    dayName: '週日',
    themeTitle: '深度保養與面膜夜',
    themeIcon: '🌿🌙',
    oddWeekDetails: {
      cleansing: '【溫和潔顏】#03 舒特膚潔膚水溫和擦拭 ➔ #06 綠茶保濕洗面乳洗淨擦乾。',
      steps: [
        { step: 1, label: '前導小紫瓶', productNumbers: ['14'], details: '黛珂小紫瓶打底，打開後續吸收通道。', zone: '全臉' },
        { step: 2, label: 'AZ100 痘痘藍膜', productNumbers: ['p-mask-az100'], details: '【奇數週日專屬】敷上 Quality 1st AZ100（藍瓶痘痘護理面膜）10～15 分鐘！調理下巴反覆痘痘與出油。', zone: '全臉' },
        { step: 3, label: '取下輕拍＋噴霧', productNumbers: ['12'], details: '取下面膜後輕拍精華至吸收，噴上 #12 BOH 維他命 B5 積雪草噴霧增加屏障防護。', zone: '全臉' },
        { step: 4, label: '眼霜呵護', productNumbers: ['34'], details: '雅詩蘭黛亮眼霜保濕。', zone: '眼周' },
        { step: 5, label: '兩頰 PDRN 修復霜', productNumbers: ['29'], details: '【兩頰】立刻使用 Dr. Reju-All PDRN 高效修復霜，強力封層修護屏障。', zone: '兩頰' },
        { step: 6, label: '下巴米糠乳', productNumbers: ['25'], details: '【下巴】薄擦 MUJI 米糠乳液，保持清爽。', zone: '下巴' }
      ],
      notes: '【奇數週日亮點】AZ100 痘痘藍膜調理下巴粉刺痘痘，取下後噴 BOH 噴霧，兩頰以 Dr. Reju-All 高效修復霜強力封層。'
    },
    evenWeekDetails: {
      cleansing: '【溫和潔顏】#03 舒特膚潔膚水 ➔ #06 綠茶保濕洗面乳洗淨擦乾。',
      steps: [
        { step: 1, label: '前導打底', productNumbers: ['14'], details: '黛珂小紫瓶 1~2 下，以手溫按拍全臉打開通道。', zone: '全臉' },
        { step: 2, label: '一般保濕面膜', productNumbers: ['p-mask-hydrating'], details: '【偶數週日・保濕面膜日】敷一般日常保濕面膜（10-15分鐘），深層補水鎮靜。', zone: '全臉' },
        { step: 3, label: '取下輕拍＋噴霧', productNumbers: ['13'], details: '取下面膜輕拍吸收後，噴上 #13 Ongredients 屏障鎮靜水光噴霧。', zone: '全臉' },
        { step: 4, label: '眼霜呵護', productNumbers: ['34'], details: '雅詩蘭黛亮眼霜保濕。', zone: '眼周' },
        { step: 5, label: '兩頰冰河霜強力封層', productNumbers: ['31'], details: '【兩頰】立刻用 #31 契爾氏冰河醣蛋白保濕霜 強力封層，給乾肌深層鎖水！', zone: '兩頰' },
        { step: 6, label: '下巴清透保濕', productNumbers: ['25'], details: '【下巴】薄擦 #25 MUJI 米糠發酵乳液。', zone: '下巴' }
      ],
      notes: '【偶數週日保濕面膜日】舒特膚潔膚水溫和洗卸後敷純保濕修護面膜，取下後兩頰契爾氏冰河霜強力封層、下巴薄擦米糠乳，安心放鬆入眠。'
    }
  }
];

export const MORNING_ROUTINE = {
  title: '每日早晨保養與完整妝前保濕程序（素顏日 vs 全妝保濕減法步驟）',
  medsAndSupplements: [
    {
      time: '07:30 - 08:30',
      title: '早餐後隨餐用藥與亮白抗氧化',
      items: [
        { name: '"汎生" 普樂彼錠 50 毫克 (PTU)', dose: '3 顆', note: '抗甲狀腺製劑' },
        { name: '"信東" 癲鍵錠 50 毫克 (Topiramate)', dose: '1 顆', note: '抗痙攣/情緒穩定劑' },
        { name: '8VC 2200mg 日本 8 效維生素 C 粉', dose: '1 包', note: '多重型態高純度維生素 C，抗氧化與黑色素抑制' },
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
        { name: 'Sports Research 阿拉斯加 Omega-3 魚油', dose: '1 粒', note: '隨餐服用，高濃度 Omega-3 體內抗發炎滋潤肌膚' },
        { name: 'Webber Naturals 蔓越莓濃縮精華膠囊', dose: '1~2 粒', note: '高濃度 PACs 前花青素，搭配多喝水' }
      ]
    }
  ],
  skincareSteps: [
    {
      step: 1,
      title: '晨間清潔',
      products: ['06', '05'],
      details: '清水洗臉即可；若夜間下巴或 T 字出油較多，可使用少量 #06 綠茶保濕胺基酸潔面乳 或 #05 Relove 胺基酸潔面乳溫和清潔。'
    },
    {
      step: 2,
      title: '前導保濕與美白提亮',
      products: ['14', '15'],
      details: '按壓 #14 黛珂小紫瓶 1~2 下於掌心，雙手溫熱後「由內向外輕輕按拍全臉與眼下」（嚴格用手溫按拍，絕對不用化妝棉擦拭！）；隨後搭配 #15 黛珂瑩潤粹白極光煥采精粹 (1.8X) 按壓 1 下，均勻輕拍於全臉或暗沉處加強透亮。'
    },
    {
      step: 3,
      title: '晨間噴霧交錯',
      oddProducts: ['12'],
      evenProducts: ['13'],
      details: '【奇數週】噴上 #12 BOH 維他命 B5 積雪草保濕潤澤噴霧 / 【偶數週】噴上 #13 Ongredients 屏障鎮靜水光噴霧，全臉輕潤補水。'
    },
    {
      step: 4,
      title: '晨間精華分流（素顏日 vs 底妝日）',
      oddProducts: ['19', '16'],
      evenProducts: ['16'],
      details: '【素顏／快速出門日】：薄擦 #19 ANUA 桃子菸鹼醯胺精華 或 #16 Torriden 玻尿酸保濕精華補充水分。\n【完整底妝日】：精華減量或僅用小紫瓶打底，避免高分子膠體過多導致後續底妝起屑搓泥。'
    },
    {
      step: 5,
      title: '眼周細紋呵護與妝前打底',
      products: ['35', '36', '34'],
      makeupProducts: ['37'],
      details: '【素顏日】：交替使用 #35 巴黎萊雅紫熨斗 MAX、#36 檸檬眼霜／Neogene 眼霜 或 #34 雅詩蘭黛亮眼霜預防乾紋。\n【全妝日專屬眼周打底】：使用 #37 BOBBI BROWN 維他命完美眼霜（米粒大小於眼下輕按推勻，等待 1 分鐘完全貼合成膜，阻絕後續遮瑕卡紋）。'
    },
    {
      step: 6,
      title: '兩頰與下巴保濕分流（素顏日 vs 完整底妝保濕步驟）',
      oddProducts: ['26'],
      evenProducts: ['30'],
      makeupCheekProducts: ['33'],
      fixedChinProduct: '25',
      details: '【路線 A：素顏／快速出門日】：兩頰薄擦 #26 品木宣言靈芝乳液 2.0（奇數週）或 #30 黛珂超微導全能修護霜（偶數週）。下巴固定薄擦 #25 MUJI 米糠發酵乳液清爽控油。\n【路線 B：完整全妝保濕與妝前打底（防起屑減法版）】：兩頰妝前保濕薄擦 #33 BOBBI BROWN 維他命完美面霜（橘子霜）打造平滑貼妝感；下巴粉刺區嚴格避開橘子霜，改擦清爽的 #25 MUJI 米糠發酵乳液預防悶痘。'
    },
    {
      step: 7,
      title: '防曬與完妝核心（素顏日 vs 全妝日）',
      products: ['38'],
      makeupProducts: ['39', 'makeup-base'],
      details: '【素顏日】：均勻塗抹足量的 #38 d’Alba 黛爾泊水潤粉光校色提亮防曬霜（直接完成好氣色，不需疊粉底）。\n【全妝日】：均勻塗抹 #39 曼秀雷敦水潤肌高濃度玻尿酸防曬精華，靜置 3～5 分鐘成膜後，依需求局部使用植村秀紫色／膚色妝前乳修飾蠟黃，接著上粉底。'
    }
  ]
};

export const CORE_SAFETY_RULES = [
  {
    id: 'rule-1',
    title: '早晨處方藥物與 Thorne B 群、8VC 維生素 C 間隔 1 小時',
    badge: '處方交互作用',
    severity: 'critical',
    summary: '早餐吃完 PTU (3顆) 與癲鍵錠 (1顆) 後，間隔 60 分鐘再吃 Thorne B 群與 8VC 維生素 C。',
    details: '高活性的甲基型 B 群與高純度維生素 C 參與肝臟與腸道代謝路徑。PTU (抗甲狀腺) 與癲鍵錠 (Topiramate，中樞抗痙攣) 需要穩定的胃腸道吸收與血中濃度。間隔 1 小時能避免吸收競爭與代謝干擾。'
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
    summary: '下巴永遠只擦 MUJI 米糠發酵乳液 (#25) 與小林抗痘水 (#09) 局部二次清潔，絕不碰契爾氏冰河霜、橘子霜或滋潤型厚霜！',
    details: 'Amanda 屬於「外油內乾／兩頰乾下巴易長粉刺」膚質。厚重礦物脂或封閉性油脂一旦塗抹在下巴毛孔密集的皮脂腺區，極易誘發反覆微粉刺與化膿痘痘。兩頰乾燥處則需角鯊烷、冰河醣蛋白等充足鎖水，分區精準才能達到全臉水嫩不致痘。'
  },
  {
    id: 'rule-4',
    title: '酸類與微針高活性成分：分日嚴格錯開，絕不連續疊加',
    badge: '活性成分防禦',
    severity: 'high',
    summary: '週二水楊酸 (#21)、週四 A 醇 (#23)、偶數週日 VT 300 微針 (#22) 各自獨立，絕不同晚疊擦！',
    details: '水楊酸為脂溶性 BHA（疏通毛孔角栓）、A 醇微晶促進真皮膠原活化、VT 300 微晶精華以天然微針打開角質微通道。三者皆具角質重塑刺激性，錯開使用與保養，每週安排週一、週三、週五日常修護日，保護皮脂膜不屏障受損。'
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
    summary: '在週四 A 醇精華前，先塗抹雅詩蘭黛特潤亮眼霜 (#34)，築起眼周天然防護牆。',
    details: '眼周皮膚厚度僅為臉頰的 1/3，皮脂腺極少。高活性 A 醇精華在臉上塗抹時容易經皮微擴散至眼眶邊緣，造成乾癢脫皮紅腫。先以滋潤型眼霜封好眼下，能徹底隔絕刺激。'
  },
  {
    id: 'rule-7',
    title: '身體乳液分流：果酸煥膚與美白香氛分區分日',
    badge: '身體護理守則',
    severity: 'low',
    summary: '寶拉 10% 水楊酸果酸身體乳每週 1-2 次專攻粗糙角化，不與美白乳大面積混擦，日間需防曬。',
    details: '四肢乾燥可每日洗澡後擦凡士林或燕麥優格乳液；針對手臂毛孔角化或背部顆粒，局部使用寶拉果酸身體乳，避免敏感與反黑。'
  }
];
