import { Articles } from "@/components/Articles";
import { Wizard } from "@/components/Wizard";
import { SITE } from "@/config/site";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4">
      <section className="pt-8 pb-4">
        <p className="text-sm font-bold text-accent">無料・登録不要・約3分</p>
        <h1 className="mt-1 text-2xl leading-snug font-bold text-balance text-ink sm:text-3xl">
          家計のムダ削減から、ポイ活・ふるさと納税・新NISAまで。
          <br className="hidden sm:block" />
          あなたの家計を5ステップでまるっと診断
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-2">
          質問に答えていくだけで、毎月生み出せるお金と、それを積み立てたときの将来の資産がわかります。
          入力した内容はこのブラウザに自動で保存され、どこにも送信されません。
        </p>
      </section>

      <Wizard />
      <Articles />

      <p className="mt-10 text-xs text-muted">情報の確認日：{SITE.updated}。税金や制度、各社のサービス内容は変わることがあります。</p>
    </div>
  );
}
