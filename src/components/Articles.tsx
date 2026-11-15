// =============================================
// ツールの下に表示する読み物とよくある質問（検索エンジン向けの構造化データつき）
// =============================================
import { AdBanner } from "./AdBanner";

const FAQ = [
  {
    q: "入力した年収や支出は、どこかに送信されますか？",
    a: "送信されません。入力した内容は、お使いのブラウザの中（LocalStorage）だけに保存され、次に開いたときに続きから見られます。「最初からやり直す」を押すと消えます。",
  },
  {
    q: "家計の黄金比どおりにしないといけませんか？",
    a: "いいえ。黄金比はあくまで目安です。住んでいる地域や家族の事情で、住居費や教育費が多くなるのは自然なことです。「どの費目が目安より多いか」を知るきっかけとして使ってください。",
  },
  {
    q: "ポイ活の経済圏は、1つにしぼったほうがいいですか？",
    a: "ポイントは1つにまとめるほどたまりやすく、使い道も選びやすくなります。ただし、よく使うお店によって得になる経済圏は変わるので、ランキングを参考に、無理なく続けられるものを選びましょう。",
  },
  {
    q: "ふるさと納税の上限額はどれくらい正確ですか？",
    a: "独身または配偶者控除のみの会社員として計算した目安です。住宅ローン控除や医療費控除、iDeCoを使っている人や、高校生以上の子どもを扶養している人は上限が変わります。寄付の前に、各ふるさと納税サイトのシミュレーターで確認してください。",
  },
  {
    q: "新NISAとiDeCoは、どちらを先に始めればいいですか？",
    a: "いつでも引き出せる新NISAから始めるのが一般的です。老後の資金を税金を減らしながら準備したい人は、生活に余裕のある範囲でiDeCoも組み合わせましょう。iDeCoは原則60歳まで引き出せません。",
  },
  {
    q: "想定利回りは何%で考えればいいですか？",
    a: "決まった答えはありません。投資の利回りは保証されないので、3%・5%・7%など、いくつかの数字でシミュレーションして、幅をもって考えるのがおすすめです。",
  },
];

export function Articles() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <article className="mt-14 flex flex-col gap-10 text-ink">
      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-ink">家計黄金比の考え方</h2>
        <p className="leading-relaxed">
          家計黄金比とは、手取りの収入に対して、住居費・食費・通信費などをどれくらいの割合にすると無理なく貯められるかを示した目安です。
          当サイトでは、独身・夫婦・子どものいる家庭の3つに分けて、貯蓄・投資にまわす割合を22〜31%に設定しています。
        </p>
        <p className="leading-relaxed">
          大切なのは、全部の費目をぴったり合わせることではありません。目安より多い費目を見つけて、
          そこから少しずつ見直すことで、毎月の貯蓄・投資にまわせるお金を増やしていくことです。
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-ink">固定費から見直すと効果が大きい理由</h2>
        <p className="leading-relaxed">
          食費のように毎日がまんする節約は、続けるのが大変です。いっぽう、スマホのプランや使っていないサブスク、保険などの固定費は、
          <b>一度見直せば、その後は何もしなくても毎月節約が続きます</b>。
          たとえば月5,000円の見直しでも、1年で6万円、10年で60万円になります。
        </p>
      </section>

      <AdBanner slotName="inArticle" />

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-ink">新NISAとポイ活を組み合わせるメリット</h2>
        <p className="leading-relaxed">
          ふだんの買い物で使うカードと、新NISAで積み立てる証券口座を同じ「経済圏」にそろえると、
          <b>買い物でたまったポイントで投資ができ、クレジットカードでの積立でもポイントがもらえます</b>。
          節約で生まれたお金とポイントを、そのまま非課税の新NISAで育てられるのが大きなメリットです。
        </p>
        <h3 className="mt-2 font-bold text-ink">クレカ積立の上限</h3>
        <p className="leading-relaxed">
          クレジットカードで投資信託を積み立てられる金額は、月10万円までと決まっています。還元率はカードの種類や証券会社によって変わります。
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-bold text-ink">ふるさと納税の上限額の決まり方</h2>
        <p className="leading-relaxed">
          ふるさと納税で自己負担が2,000円ですむ金額の上限は、住民税の「所得割」の約2割をもとに決まります。
          年収が高いほど、また扶養している家族が少ないほど、上限額は大きくなります。
          上限をこえて寄付した分は、税金が減らない「ただの寄付」になるので注意しましょう。
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-ink">よくある質問</h2>
        <div className="flex flex-col gap-3">
          {FAQ.map((f) => (
            <div key={f.q} className="rounded-2xl border border-line p-4">
              <p className="flex gap-2 font-bold text-ink"><span className="text-accent">Q.</span>{f.q}</p>
              <p className="mt-2 flex gap-2 leading-relaxed"><span className="font-bold text-muted">A.</span>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
