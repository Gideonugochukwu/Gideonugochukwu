// Chinese language-coverage data for /zh/languages (非洲语言翻译语言列表).
// Mirrors lib/language-coverage.ts: the same 16 African specialist languages
// and the same regional lists, with Chinese names, regions, approximate
// speaker counts (first + second language), and the services available.

export const ZH_SERVICE_TAGS = [
  "翻译",
  "机器翻译后编辑（MTPE）",
  "AI 数据标注",
  "MarketReady™ 文化验证",
  "字幕制作",
];

export type ZhAfricanLanguage = {
  name: string;
  keyword?: string; // the Baidu long-tail target for this language, if any
  countries: string;
  speakers: string;
  script: string;
};

export const africanLanguagesZh: ZhAfricanLanguage[] = [
  { name: "豪萨语", keyword: "豪萨语翻译", countries: "尼日利亚、尼日尔、加纳、喀麦隆", speakers: "8,000 万+", script: "拉丁字母" },
  { name: "约鲁巴语", keyword: "约鲁巴语翻译", countries: "尼日利亚、贝宁、多哥", speakers: "4,700 万+", script: "拉丁字母" },
  { name: "伊博语", keyword: "伊博语翻译", countries: "尼日利亚", speakers: "4,500 万+", script: "拉丁字母" },
  { name: "沃洛夫语", keyword: "沃洛夫语翻译", countries: "塞内加尔、冈比亚、毛里塔尼亚", speakers: "1,200 万+", script: "拉丁字母" },
  { name: "阿姆哈拉语", keyword: "阿姆哈拉语翻译", countries: "埃塞俄比亚", speakers: "5,700 万+", script: "吉兹字母" },
  { name: "斯瓦希里语", keyword: "斯瓦希里语翻译", countries: "肯尼亚、坦桑尼亚、乌干达、刚果（金）", speakers: "2 亿+", script: "拉丁字母" },
  { name: "索马里语", keyword: "索马里语翻译", countries: "索马里、吉布提、埃塞俄比亚、肯尼亚", speakers: "2,200 万+", script: "拉丁字母" },
  { name: "祖鲁语", keyword: "祖鲁语翻译", countries: "南非、莱索托", speakers: "2,700 万+", script: "拉丁字母" },
  { name: "绍纳语", countries: "津巴布韦、莫桑比克", speakers: "1,200 万+", script: "拉丁字母" },
  { name: "契维语", countries: "加纳", speakers: "1,800 万+", script: "拉丁字母" },
  { name: "富拉语（富尔富尔德语）", countries: "西非多国", speakers: "4,000 万+", script: "拉丁字母 / 阿德拉姆字母" },
  { name: "提格利尼亚语", countries: "厄立特里亚、埃塞俄比亚", speakers: "900 万+", script: "吉兹字母" },
  { name: "奥罗莫语", countries: "埃塞俄比亚、肯尼亚", speakers: "3,700 万+", script: "拉丁字母" },
  { name: "基尼亚卢旺达语", countries: "卢旺达、刚果（金）", speakers: "1,200 万+", script: "拉丁字母" },
  { name: "林加拉语", countries: "刚果（金）、刚果（布）", speakers: "2,500 万+", script: "拉丁字母" },
  { name: "马达加斯加语", countries: "马达加斯加", speakers: "2,500 万+", script: "拉丁字母" },
];

export type ZhLanguageRow = { name: string; regions: string; speakers: string };

export type ZhLanguageGroup = {
  region: string;
  blurb: string;
  languages: ZhLanguageRow[];
};

export const regionalGroupsZh: ZhLanguageGroup[] = [
  {
    region: "欧洲语言",
    blurb: "全面覆盖西欧、北欧、中欧、东欧及高加索地区。",
    languages: [
      { name: "法语", regions: "法国、比利时、瑞士、加拿大、西非与中非", speakers: "约 3 亿" },
      { name: "德语", regions: "德国、奥地利、瑞士", speakers: "约 1.3 亿" },
      { name: "西班牙语", regions: "西班牙、拉丁美洲、美国", speakers: "约 5.6 亿" },
      { name: "葡萄牙语", regions: "葡萄牙、巴西、安哥拉、莫桑比克", speakers: "约 2.6 亿" },
      { name: "意大利语", regions: "意大利、瑞士", speakers: "约 6,800 万" },
      { name: "荷兰语", regions: "荷兰、比利时", speakers: "约 2,500 万" },
      { name: "丹麦语", regions: "丹麦", speakers: "约 600 万" },
      { name: "瑞典语", regions: "瑞典、芬兰", speakers: "约 1,300 万" },
      { name: "挪威语", regions: "挪威", speakers: "约 500 万" },
      { name: "芬兰语", regions: "芬兰", speakers: "约 550 万" },
      { name: "波兰语", regions: "波兰", speakers: "约 4,000 万" },
      { name: "罗马尼亚语", regions: "罗马尼亚、摩尔多瓦", speakers: "约 2,400 万" },
      { name: "俄语", regions: "俄罗斯、中亚、东欧", speakers: "约 2.5 亿" },
      { name: "乌克兰语", regions: "乌克兰", speakers: "约 3,500 万" },
      { name: "希腊语", regions: "希腊、塞浦路斯", speakers: "约 1,300 万" },
      { name: "捷克语", regions: "捷克", speakers: "约 1,100 万" },
      { name: "匈牙利语", regions: "匈牙利", speakers: "约 1,300 万" },
      { name: "克罗地亚语", regions: "克罗地亚、波黑", speakers: "约 550 万" },
      { name: "塞尔维亚语", regions: "塞尔维亚、波黑、黑山", speakers: "约 1,000 万" },
      { name: "保加利亚语", regions: "保加利亚", speakers: "约 800 万" },
      { name: "斯洛伐克语", regions: "斯洛伐克", speakers: "约 500 万" },
      { name: "斯洛文尼亚语", regions: "斯洛文尼亚", speakers: "约 250 万" },
      { name: "立陶宛语", regions: "立陶宛", speakers: "约 300 万" },
      { name: "拉脱维亚语", regions: "拉脱维亚", speakers: "约 200 万" },
      { name: "爱沙尼亚语", regions: "爱沙尼亚", speakers: "约 110 万" },
      { name: "亚美尼亚语", regions: "亚美尼亚", speakers: "约 600 万" },
      { name: "格鲁吉亚语", regions: "格鲁吉亚", speakers: "约 400 万" },
      { name: "加泰罗尼亚语", regions: "西班牙加泰罗尼亚、安道尔", speakers: "约 1,000 万" },
      { name: "巴斯克语", regions: "西班牙、法国巴斯克地区", speakers: "约 75 万" },
      { name: "加利西亚语", regions: "西班牙加利西亚", speakers: "约 240 万" },
      { name: "冰岛语", regions: "冰岛", speakers: "约 35 万" },
      { name: "爱尔兰语", regions: "爱尔兰", speakers: "约 170 万" },
      { name: "威尔士语", regions: "英国威尔士", speakers: "约 90 万" },
      { name: "马耳他语", regions: "马耳他", speakers: "约 52 万" },
    ],
  },
  {
    region: "亚洲语言",
    blurb: "覆盖东亚、南亚和东南亚，从中日韩语言到印度与东盟主要语言。",
    languages: [
      { name: "日语", regions: "日本", speakers: "约 1.2 亿" },
      { name: "韩语", regions: "韩国、朝鲜", speakers: "约 8,000 万" },
      { name: "简体中文", regions: "中国大陆、新加坡、马来西亚", speakers: "约 11 亿" },
      { name: "繁体中文", regions: "中国台湾、中国香港、中国澳门", speakers: "约 3,000 万" },
      { name: "印地语", regions: "印度", speakers: "约 6 亿" },
      { name: "乌尔都语", regions: "巴基斯坦、印度", speakers: "约 2.3 亿" },
      { name: "孟加拉语", regions: "孟加拉国、印度", speakers: "约 2.7 亿" },
      { name: "泰米尔语", regions: "印度、斯里兰卡、新加坡", speakers: "约 8,500 万" },
      { name: "泰卢固语", regions: "印度", speakers: "约 9,500 万" },
      { name: "马拉地语", regions: "印度", speakers: "约 9,900 万" },
      { name: "古吉拉特语", regions: "印度", speakers: "约 6,000 万" },
      { name: "卡纳达语", regions: "印度", speakers: "约 5,900 万" },
      { name: "马拉雅拉姆语", regions: "印度", speakers: "约 3,800 万" },
      { name: "旁遮普语", regions: "巴基斯坦、印度", speakers: "约 1.5 亿" },
      { name: "泰语", regions: "泰国", speakers: "约 7,000 万" },
      { name: "越南语", regions: "越南", speakers: "约 8,500 万" },
      { name: "印度尼西亚语", regions: "印度尼西亚", speakers: "约 2.5 亿" },
      { name: "马来语", regions: "马来西亚、文莱、新加坡", speakers: "约 3,000 万" },
      { name: "他加禄语", regions: "菲律宾", speakers: "约 8,000 万" },
      { name: "蒙古语", regions: "蒙古国", speakers: "约 520 万" },
      { name: "缅甸语", regions: "缅甸", speakers: "约 4,300 万" },
      { name: "高棉语", regions: "柬埔寨", speakers: "约 1,800 万" },
      { name: "老挝语", regions: "老挝", speakers: "约 3,000 万" },
      { name: "尼泊尔语", regions: "尼泊尔、印度", speakers: "约 3,200 万" },
      { name: "僧伽罗语", regions: "斯里兰卡", speakers: "约 1,700 万" },
    ],
  },
  {
    region: "中东语言",
    blurb: "现代标准阿拉伯语及各地方言，以及该地区的其他主要语言。",
    languages: [
      { name: "阿拉伯语（现代标准阿拉伯语及方言）", regions: "中东、北非", speakers: "约 3.7 亿" },
      { name: "希伯来语", regions: "以色列", speakers: "约 900 万" },
      { name: "波斯语（法尔西语）", regions: "伊朗、阿富汗、塔吉克斯坦", speakers: "约 1.1 亿" },
      { name: "土耳其语", regions: "土耳其、塞浦路斯", speakers: "约 8,800 万" },
      { name: "库尔德语", regions: "伊拉克、土耳其、伊朗、叙利亚", speakers: "约 3,000 万" },
      { name: "普什图语", regions: "阿富汗、巴基斯坦", speakers: "约 4,500 万" },
      { name: "达里语", regions: "阿富汗", speakers: "约 2,000 万" },
    ],
  },
  {
    region: "中亚与高加索语言",
    blurb: "覆盖中亚和高加索地区的突厥语族与波斯语族语言。",
    languages: [
      { name: "哈萨克语", regions: "哈萨克斯坦", speakers: "约 1,600 万" },
      { name: "乌兹别克语", regions: "乌兹别克斯坦", speakers: "约 4,400 万" },
      { name: "塔吉克语", regions: "塔吉克斯坦", speakers: "约 900 万" },
      { name: "吉尔吉斯语", regions: "吉尔吉斯斯坦", speakers: "约 500 万" },
      { name: "土库曼语", regions: "土库曼斯坦", speakers: "约 700 万" },
      { name: "阿塞拜疆语", regions: "阿塞拜疆、伊朗", speakers: "约 2,400 万" },
    ],
  },
];

export const allLanguageNamesZh: string[] = Array.from(
  new Set([
    ...africanLanguagesZh.map((l) => l.name),
    ...regionalGroupsZh.flatMap((g) => g.languages.map((l) => l.name)),
  ])
);

export const servicesEveryLanguageZh: string[] = [
  "翻译",
  "机器翻译后编辑（MTPE）",
  "AI 数据标注",
  "MarketReady™ 文化验证",
  "游戏本地化",
  "字幕制作",
  "转录",
];
