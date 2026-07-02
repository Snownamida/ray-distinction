// 中文文案（原始语言）。函数式插值以适配多语言语序。
export default {
  lang: "zh",
  htmlLang: "zh-CN",
  siteUrl: "https://ray.snownamida.top/",

  appTitle: "鳐魟鲼分辨器",
  question: "观察体型和尾巴，这是哪一种？",
  imgAlt: "待分辨的鳐、魟或鲼",
  bestTitle: "历史最高连击",
  correctTitle: "本次答对数",
  scoreBar: (c, t, a) => `本次成绩 ${c}/${t} · 准确率 ${a}%`,
  kofi: "☕ 请我喝咖啡",

  correct: "回答正确！",
  wrong: "很遗憾，答错了",
  share: "晒战绩",
  why: (name) => `为什么是「${name}」？`,
  next: "下一题",
  celebrateBig: "蒸 蚌！",
  celebrateSmall: "ZHEN BANG!",

  copied: "战绩已复制到剪贴板！",
  copyFail: "复制失败，请手动分享 😢",
  shareTitle: "鳐魟鲼分辨大挑战",
  shareText: (c, t, a, best) =>
    `我在「鳐魟鲼分辨大挑战」答对了 ${c}/${t} 题（准确率 ${a}%），最高连击 ${best} 次！你也来分辨鳐、魟、鲼吧 🐟`,

  species: {
    skate: {
      name: "鳐 (Skate)",
      simpleName: "鳐",
      desc: "身体多呈菱形或心形。尾巴较粗、多肉且无毒刺，尾部靠近末端通常有两个小背鳍——这是鳐最关键的识别点。背部常有棘刺，繁殖方式为卵生（产下方形卵鞘）。",
    },
    stingray: {
      name: "魟 (Stingray)",
      simpleName: "魟",
      desc: "身体呈圆盘状或圆润的菱形，边缘平滑。尾巴细长如鞭，通常带一根有毒的尾刺，背鳍退化或缺失。为卵胎生，常伏在海底沙中。",
    },
    eagleray: {
      name: "鲼 (Eagle Ray)",
      simpleName: "鲼",
      desc: "头部与身体分界明显，口两侧有“头鳍（角状头叶）”。胸鳍尖长如鸟翼，在水层中“飞行”游动而非趴海底。多数鲼类尾部带毒刺。（近亲蝠鲼 manta 属另一科 Mobulidae，滤食浮游生物、无毒刺。）",
    },
  },
};
