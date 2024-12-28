export default function ProfileSection() {
  return (
    <section className="max-w-4xl mx-auto mt-32 px-4 sm:px-8">
      <h2 className="text-xl text-center mb-16">PROFILE</h2>
      
      <div className="space-y-16">
        <div>
          <div className="flex items-start gap-2 mb-8">
            <div className="w-1 h-4 bg-white"></div>
            <h3 className="text-sm">経歴</h3>
          </div>
          
          <div className="text-xs space-y-4 text-left max-w-2xl">
            <div className="flex gap-4">
              <span className="min-w-[3rem] sm:min-w-[4rem] text-gray-400">2017</span>
              <p>高校卒業後、IT系専門学校に入学。</p>
            </div>
            <div className="flex gap-4">
              <span className="min-w-[3rem] sm:min-w-[4rem] text-gray-400">2018</span>
              <p>教師からのパワハラ、過労で歩行困難になり休学。</p>
            </div>
            <div className="flex gap-4">
              <span className="min-w-[3rem] sm:min-w-[4rem] text-gray-400">2019</span>
              <p>体調回復後、某テーマパークでプロダンサーとして活動。</p>
            </div>
            <div className="flex gap-4">
              <span className="min-w-[3rem] sm:min-w-[4rem] text-gray-400">2021</span>
              <p>夜間学校へ編入し、市内の会社で社内SEとして勤務。</p>
            </div>
            <div className="flex gap-4">
              <span className="min-w-[3rem] sm:min-w-[4rem] text-gray-400">2023</span>
              <p>都内IT会社にフロントエンドエンジニアとして就職。</p>
            </div>
            <div className="flex gap-4">
              <span className="min-w-[3rem] sm:min-w-[4rem] text-gray-400">2024</span>
              <p>AI開発/研究の部署へ移動。</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-start gap-2 mb-8">
            <div className="w-1 h-4 bg-white"></div>
            <h3 className="text-sm">資格</h3>
          </div>
          
          <div className="text-xs space-y-4 text-left max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <p>基本情報技術者試験</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <p>文部科学省後援　情報検定　情報システム試験 プログラマ認定</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <p>文部科学省後援　情報検定　情報活用試験　1級</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}