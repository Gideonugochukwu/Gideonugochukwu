import type { Review } from "./reviews";

// Simplified Chinese copy of each review, keyed by the reviewer's name.
// Quotes are translated (site copy on /zh); people's names and company names
// keep their original spelling.
type ZhReviewFields = Pick<Review, "quote" | "role" | "industry" | "country">;

export const reviewsZh: Record<string, ZhReviewFields> = {
  "Amara Okafor": {
    quote:
      "GlobalAnnotate 在不到三周的时间里把我们的患者应用本地化成 14 种语言。文化细节把握得非常到位，项目管理也是我合作过的团队中最好的。",
    role: "本地化负责人",
    industry: "医疗科技",
    country: "尼日利亚",
  },
  "Daniel Park": {
    quote:
      "我们对比测试了四家数据标注供应商。GlobalAnnotate 交付的数据最干净、周期最短，质量保证报告也是业内一流。",
    role: "机器学习负责人",
    industry: "AI / 大语言模型",
    country: "韩国",
  },
  "Sophie Martin": {
    quote:
      "他们的 Meta 广告策略让我们第一季度的广告支出回报率翻了两番。报告透明，团队真正懂直面消费者品牌。",
    role: "创始人",
    industry: "美妆与直面消费者品牌",
    country: "法国",
  },
  "Rafael Mendoza": {
    quote:
      "我们在拉丁美洲上线时，他们的字幕制作与配音本地化非常扎实。交付周期有过一两次小波折，但质量很出色。",
    role: "内容负责人",
    industry: "媒体与娱乐",
    country: "墨西哥",
  },
  "Priya Raghavan": {
    quote:
      "我们需要覆盖 8 种印度语言、意图标签要求非常细的自然语言处理训练数据。GlobalAnnotate 认真梳理了项目范围，并提前完成交付。",
    role: "AI 总监",
    industry: "教育科技",
    country: "印度",
  },
  "Lina Haddad": {
    quote:
      "从阿拉伯语广告创意到达人营销策略，他们对待我们的品牌就像对待自己的品牌一样用心。两个月内我们的广告支出回报率翻了一番。",
    role: "增长负责人",
    industry: "美妆与化妆品",
    country: "阿联酋",
  },
};

export function localizeReview(r: Review, locale: string): Review {
  if (locale !== "zh") return r;
  const zh = reviewsZh[r.name];
  return zh ? { ...r, ...zh } : r;
}
