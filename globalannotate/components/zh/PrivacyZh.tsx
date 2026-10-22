import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import LegalNotice from "./LegalNotice";
import { site } from "@/lib/site";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { zhLd, ZH_HOME } from "@/lib/zh";

const PRIVACY_EMAIL = "privacy@globalannotate.com";
const LAST_UPDATED = "2026年10月18日";

export const ZH_META = {
  title: "隐私政策 | GlobalAnnotate",
  description:
    "GlobalAnnotate 如何收集、使用、共享和保护个人数据与客户内容，涵盖欧盟及英国《通用数据保护条例》、尼日利亚《2023 年数据保护法》以及美国加州消费者隐私法规。",
  keywords: ["隐私政策", "数据保护", "翻译保密", "个人信息保护", "GlobalAnnotate 翻译"],
};

// /zh/privacy — full Chinese translation of the Privacy Policy.
export default function PrivacyZh() {
  const url = `${site.url}/zh/privacy`;
  return (
    <>
      <JsonLd
        data={zhLd([
          webPageSchema({ name: "隐私政策 — GlobalAnnotate", description: ZH_META.description, url }),
          breadcrumbSchema([
            { name: ZH_HOME, url: `${site.url}/zh` },
            { name: "隐私政策", url },
          ]),
        ])}
      />
      <Section className="pt-16 pb-24">
        <div className="max-w-3xl">
          <Breadcrumbs
            items={[
              { name: ZH_HOME, href: "/" },
              { name: "隐私政策", href: "/privacy" },
            ]}
            tone="light"
            className="mb-6"
          />
          <span className="badge">法律信息</span>
          <h1 className="page-h1 mt-5">隐私政策</h1>
          <LegalNotice />
          <p className="mt-4 text-sm text-ink-500">最后更新：{LAST_UPDATED}</p>

          <div className="prose-section">
            <h2>1. 我们是谁</h2>
            <p>
              {site.name}（以下简称“{site.shortName}”“我们”或“我们的”）是一家语言服务与 AI 数据公司，提供覆盖 100+ 种语言的翻译、本地化、机器翻译后编辑（MTPE）、字幕制作、转录、语言质量保证（LQA）、游戏本地化、AI 数据标注以及人类反馈强化学习（RLHF）服务。我们运营
              <a href={site.url}>{site.domain}</a>
              网站，并通过内部团队以及分布在 30+ 个国家和地区、经过审核的语言专家网络，为全球客户提供服务。
            </p>
            <p>
              本政策说明我们收集哪些个人数据、收集的原因、如何保护这些数据，以及您享有的权利。本政策适用于我们的网站、联系与报价表单、自由译者与语言专家申请，以及我们代表客户处理的客户项目内容中所包含的个人数据。
            </p>
            <p>
              <strong>数据控制者：</strong>
              {site.name}，注册地址待确认。<em>［注册地址：待补充］</em>
            </p>
            <p>
              <strong>隐私事务联系方式：</strong>
              <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
            </p>

            <h2>2. 我们收集的信息</h2>
            <p>我们收集以下类别的信息：</p>
            <ul>
              <li>
                <strong>网站访客。</strong>汇总的、基本匿名化的分析数据（浏览的页面、大致地区、设备与浏览器类型）以及 Cookie 数据。非必要的分析类 Cookie 仅在您同意后才会设置，详见下文“Cookie”一节。
              </li>
              <li>
                <strong>联系与报价表单。</strong>当您申请报价或联系我们时提供的姓名、企业邮箱、公司（选填）、项目描述、预算和时间要求。
              </li>
              <li>
                <strong>客户项目文件与内容。</strong>客户发送给我们进行翻译、本地化、标注或验证的文档、字符串、音频、视频、图片和其他资料。这些资料可能包含属于客户自身用户或员工的个人数据（在部分项目中还可能包含健康数据等特殊类别数据）。对于此类内容，我们通常作为<strong>数据处理者</strong>，按照客户的指示进行处理。
              </li>
              <li>
                <strong>自由译者与语言专家申请。</strong>姓名、联系方式、国家、语言对、专业领域、费率、工作经验、简历或作品集链接，以及（对于已合作的语言专家）向您付款所需的支付和税务信息。
              </li>
              <li>
                <strong>AI 数据项目内容。</strong>为标注、评估或人类反馈强化学习而提供的文本、提示词、回复、图片、音频或其他数据，其中可能包含客户提供的个人数据。
              </li>
              <li>
                <strong>评价提交。</strong>当您选择发表评价时提供的姓名、公司、国家、评分和评价内容。
              </li>
              <li>
                <strong>电子邮件往来。</strong>您发送给我们的邮件内容。
              </li>
            </ul>

            <h2>3. 合法依据及数据用途</h2>
            <p>在适用欧盟《通用数据保护条例》、英国《通用数据保护条例》或尼日利亚《2023 年数据保护法》的情况下，我们依据以下一项或多项合法依据处理数据：</p>
            <ul>
              <li>
                <strong>履行合同</strong>：用于准备方案、交付服务并开具发票，以及管理我们与客户和语言专家之间的关系。
              </li>
              <li>
                <strong>同意</strong>：用于非必要 Cookie 和可选的营销信息，您可随时撤回同意。
              </li>
              <li>
                <strong>正当利益</strong>：用于运营、保护和改进我们的网站与服务，防范欺诈并回复咨询，同时兼顾您的权利。
              </li>
              <li>
                <strong>法定义务</strong>：用于满足税务、会计及其他法律要求。
              </li>
            </ul>
            <p>
              <strong>客户内容仅用于交付其所对应的项目。</strong>
              除非客户书面同意，否则我们不会使用客户内容或其中包含的数据来训练我们自己或任何第三方的 AI 模型。
            </p>

            <h2>4. 保密与安全</h2>
            <ul>
              <li>每一位内部团队成员和网络语言专家在接触任何客户资料之前，都已签署保密协议。</li>
              <li>项目文件的访问遵循最小权限原则：只有被指派到该项目的语言专家和项目负责人才能访问其内容。</li>
              <li>文件通过加密连接（TLS）传输和存储，访问我们的系统需经过身份验证控制。</li>
              <li>
                <strong>项目文件的保留与删除：</strong>
                我们仅在交付和支持项目所需的期限内保留客户项目文件。除非合同、工作说明书或法定义务要求不同的期限，项目结束后，项目文件将被删除或匿名化。
              </li>
              <li>
                <strong>敏感数据</strong>，包括医疗及其他健康信息（含受保护健康信息）、法律资料以及个人身份信息，将交由经过审核的专业人员处理，适用相关合同和保密协议，并受到更严格的访问和保留控制。详情请参阅我们的
                <Link href="/security">安全与保密</Link>
                页面。
              </li>
            </ul>

            <h2>5. 子处理者与跨境传输</h2>
            <p>
              我们使用少量经过审核的子处理者来运营业务和交付服务，例如网站托管、表单递送、电子邮件和安全文件传输服务商；我们的语言专家网络也分布在许多国家。这意味着个人数据可能会在您居住国以外的地方传输和处理，包括欧洲经济区、英国或尼日利亚以外的地区。
            </p>
            <p>
              发生此类传输时，我们依赖适当的保障措施，包括欧盟委员会的标准合同条款（以及在适用时的英国国际数据传输附录），并在与子处理者和语言专家的协议中纳入保密与数据保护条款。客户可通过
              <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
              索取最新的子处理者名单。
            </p>

            <h2>6. 您的权利</h2>
            <p>
              根据您所在地区，您可能有权访问、更正、删除、限制处理或反对处理您的个人数据，有权获得数据可携带性，并有权撤回同意。根据欧盟及英国《通用数据保护条例》和尼日利亚《2023 年数据保护法》，您还有权向您所在地的监管机构投诉（在尼日利亚为尼日利亚数据保护委员会）。
            </p>
            <p>
              <strong>美国加州居民：</strong>
              根据加州消费者隐私相关法律，您有权了解我们收集了哪些个人信息，有权要求删除、更正不准确的信息，并有权选择退出任何对个人信息的“出售”或“共享”。我们不会出售或共享上述法律所定义的个人信息，也不会因您行使权利而歧视您。
            </p>
            <p>
              如需行使任何权利，请发送邮件至
              <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
              。对于我们作为数据处理者代表客户处理的个人数据，我们会将您的请求转交给该客户（数据控制者），并协助其作出回应。我们将在适用法律规定的时限内回复。
            </p>

            <h2>7. Cookie</h2>
            <p>
              我们只使用最少量的 Cookie 及类似技术。严格必要的 Cookie（用于网站核心功能以及您的主题和同意偏好）始终开启。包括任何分析类 Cookie 在内的非必要 Cookie，只有在您通过 Cookie 横幅表示同意后才会设置。您可以随时通过页脚的
              <strong>Cookie 设置</strong>
              更改您的选择。目前，未经您同意，我们不会加载第三方分析或广告 Cookie。
            </p>

            <h2>8. 儿童数据</h2>
            <p>
              我们的网站和服务面向企业和专业人士，并非针对儿童。我们不会在知情的情况下收集 18 岁以下人士的个人数据。如果您认为有未成年人向我们提供了个人数据，请联系我们，我们将予以删除。
            </p>

            <h2>9. 本政策的变更</h2>
            <p>我们可能会不时更新本政策。重大变更将发布在本页面，并标注新的“最后更新”日期。</p>

            <h2>10. 联系我们</h2>
            <p>
              对隐私有任何疑问、请求或投诉？请发送邮件至
              <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>
              。一般咨询请发送至
              <a href={`mailto:${site.email}`}>{site.email}</a>
              ，或使用我们的
              <Link href="/contact">联系页面</Link>
              。
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
