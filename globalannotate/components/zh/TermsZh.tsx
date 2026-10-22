import { Link } from "@/i18n/navigation";
import Section from "@/components/Section";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import LegalNotice from "./LegalNotice";
import { site } from "@/lib/site";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { zhLd, ZH_HOME } from "@/lib/zh";

const LAST_UPDATED = "2026年10月18日";

export const ZH_META = {
  title: "服务条款 | GlobalAnnotate",
  description:
    "规范 GlobalAnnotate 网站使用及一般服务的条款。如已签署客户合同、主服务协议或工作说明书，以已签署的协议为准。",
  keywords: ["服务条款", "翻译服务条款", "翻译合同", "服务协议", "GlobalAnnotate 翻译"],
};

// /zh/terms — full Chinese translation of the Terms of Service.
export default function TermsZh() {
  const url = `${site.url}/zh/terms`;
  return (
    <>
      <JsonLd
        data={zhLd([
          webPageSchema({ name: "服务条款 — GlobalAnnotate", description: ZH_META.description, url }),
          breadcrumbSchema([
            { name: ZH_HOME, url: `${site.url}/zh` },
            { name: "服务条款", url },
          ]),
        ])}
      />
      <Section className="pt-16 pb-24">
        <div className="max-w-3xl">
          <Breadcrumbs
            items={[
              { name: ZH_HOME, href: "/" },
              { name: "服务条款", href: "/terms" },
            ]}
            tone="light"
            className="mb-6"
          />
          <span className="badge">法律信息</span>
          <h1 className="page-h1 mt-5">服务条款</h1>
          <LegalNotice />
          <p className="mt-4 text-sm text-ink-500">最后更新：{LAST_UPDATED}</p>

          <div className="prose-section">
            <p>
              本条款规范您对 {site.name} 网站
              <a href={site.url}>{site.domain}</a>
              （以下简称“本网站”）的使用，并规定我们的一般服务条款。使用本网站或委托我们提供服务，即表示您同意本条款。
            </p>

            <h2>1. 已签署合同优先</h2>
            <p>
              如果您已与我们另行签署协议，例如主服务协议、工作说明书、数据处理协议或保密协议，则在与本条款存在冲突的范围内，
              <strong>以该已签署的协议为准</strong>
              。对于已签署协议未涵盖的事项，适用本条款。
            </p>

            <h2>2. 网站使用</h2>
            <p>
              您仅可出于合法目的使用本网站。您同意不滥用本网站，不干扰其运行或安全，不试图未经授权访问，不进行大规模抓取，也不利用本网站侵犯他人权利。
            </p>

            <h2>3. 知识产权</h2>
            <p>
              本网站及其内容，包括文字、设计、图形、标志以及“GlobalAnnotate”和“MarketReady™”标识，均归 {site.name} 或其许可方所有，并受知识产权法律保护。未经我们许可，您不得复制、转载本网站或基于本网站创作衍生作品。我们为客户制作的交付成果的相关权利，见第 6 条。
            </p>

            <h2>4. 可接受的使用</h2>
            <p>您同意不提交违法内容、恶意软件或您无权分享的内容，也不利用我们的服务制作违法或侵犯第三方权利的资料。</p>

            <h2>5. 报价、采购订单与工作说明书</h2>
            <p>
              我们提供的报价，是根据您描述的范围、工作量、语言对和交付周期所作的估算，在报价注明的有效期内有效（未注明的，有效期为 30 天）。工作在您接受报价、发出采购订单或签署工作说明书后开始。已接受的报价、采购订单或工作说明书中规定的范围、费用和进度，适用于该项目。
            </p>

            <h2>6. 付款、修订与权利</h2>
            <ul>
              <li>
                <strong>付款条款：</strong>
                除非已签署的协议或工作说明书另有约定，发票应在开票日起
                <em>［账期天数：待补充］</em>
                内以
                <em>［币种：待补充］</em>
                支付。对于新客户或大型项目，我们可能要求支付预付款。
              </li>
              <li>
                <strong>修订：</strong>
                每项交付成果均包含合理次数的修订，用于更正不符合约定需求或规格的工作。
              </li>
              <li>
                <strong>质量投诉期限：</strong>
                如对质量有任何疑虑，请在交付后
                <em>［投诉期限：待补充，例如 14 天］</em>
                内提出，以便我们调查；如疑虑成立，我们将免费更正。
              </li>
              <li>
                <strong>权利转让：</strong>
                在全额支付相关费用后，最终翻译或本地化交付成果的全部知识产权转让给您，但我们既有的资料、工具，以及为支持后续工作而保留的翻译记忆库或术语表除外（我们会许可您使用这些内容）。
              </li>
            </ul>

            <h2>7. 客户对最终使用的责任</h2>
            <p>
              我们提供专业的语言与数据服务。但
              <strong>翻译或本地化内容在您所在市场的最终审核、批准，以及监管与法律层面的使用，仍由您负责</strong>
              ，包括遵守适用于您的医疗、监管、法律、标签和广告要求。如有需要，您应在发布或提交前安排当地的法律或监管审核。
            </p>

            <h2>8. 保密</h2>
            <p>
              我们将客户资料视为机密，仅在知悉必要的范围内限制访问，并要求我们的团队和语言专家签署保密协议。详见我们的
              <Link href="/security">安全与保密</Link>
              页面。双方都将保护对方的机密信息，并仅为履行项目之目的使用这些信息。
            </p>

            <h2>9. 责任限制</h2>
            <p>
              在法律允许的最大范围内，{site.name} 不对间接、附带、特殊或后果性损失，或利润、收入或数据的损失承担责任。我们因项目产生或与之相关的累计责任总额，以引起索赔的具体服务所支付的费用为限。本条款中的任何内容均不限制依法不得限制的责任。
            </p>

            <h2>10. 保证与免责声明</h2>
            <p>我们依照质量流程，以合理的技能和谨慎提供服务。除明确说明的内容外，本网站和服务均按“现状”提供，不作任何其他形式的保证。</p>

            <h2>11. 不可抗力</h2>
            <p>因超出其合理控制范围的事件导致的延迟或未能履行，任何一方均不承担责任，包括自然灾害、战争、社会动乱、罢工、公用设施或电信故障以及政府行为。</p>

            <h2>12. 终止</h2>
            <p>
              任何一方均可按照适用的工作说明书或协议终止项目；如无相关约定，可在合理的书面通知后终止。您仍需支付截至终止生效日已完成的工作费用以及不可取消的承诺费用。依其性质应在终止后继续有效的条款（包括保密、知识产权和责任限制）在终止后继续有效。
            </p>

            <h2>13. 自由译者与供应商</h2>
            <p>
              如果您通过我们的
              <Link href="/freelancers">语言专家网络</Link>
              或供应商入驻流程提交申请，即表示您确认所提供的信息准确无误，并且您有权分享所提交的任何样稿或推荐信息。已合作的语言专家和供应商依据单独的协议和保密协议开展工作，这些协议规范保密、数据处理、知识产权转让和付款等事项，并在相关合作关系中优先于本条款适用。
            </p>

            <h2>14. 适用法律</h2>
            <p>
              除非已签署的协议另有约定，本条款受尼日利亚联邦共和国法律管辖，尼日利亚法院拥有管辖权。
              <em>［适用法律：待补充。我们计划设立欧盟（爱沙尼亚）实体，届时本条款将相应更新。］</em>
            </p>

            <h2>15. 本条款的变更</h2>
            <p>我们可能会不时更新本条款。发布在本页面并标注当前“最后更新”日期的版本，适用于您对本网站的使用。</p>

            <h2>16. 联系我们</h2>
            <p>
              对本条款有任何疑问？请发送邮件至
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
