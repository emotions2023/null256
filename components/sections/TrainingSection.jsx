// src/components/TrainingSection.jsx
const TrainingSection = () => {
    const trainings = {
      ai: {
        title: "AI・機械学習関連",
        items: [
          {
            title: "Deep Learning基礎【大阪】",
            description: "ディープラーニングの基礎とトレンドを実務的な視点について学ぶ",
            date: "2023年"
          },
          {
            title: "大規模言語AI",
            description: "AI活用の実務に関するソフトスキルと開発プロセスの理解について学ぶ",
            status: "受講内容完了",
            date: "2023年"
          }
        ]
      },
      events: {
        title: "技術イベント",
        items: [
          {
            title: "AI活用レベルアップセミナー",
            description: "最新のAI活用事例とAI活用についての考察をまとめたオープン形式",
            date: "2023年"
          },
          {
            title: "ChatGPT活用",
            description: "ビジネスコーディングと業務のAI活用の検討と考えるワークショップ",
            date: "2023年"
          }
        ]
      }
    };
  
    const TrainingItem = ({ item }) => {
      return (
        <div className="border-l-2 border-gray-700 pl-4">
          <p className="text-sm mb-2">{item.title}</p>
          <p className="text-xs mb-1">概要：{item.description}</p>
          {item.status && <p className="text-xs text-blue-400">{item.status}</p>}
          <p className="text-xs text-gray-400">受講日：【{item.date}】</p>
        </div>
      );
    };
  
    return (
      <section id="training" className="min-h-screen flex flex-col items-center justify-center px-4">
        <h2 className="text-xl mb-16">TRAINING</h2>
        <div className="max-w-2xl w-full space-y-16">
          {Object.entries(trainings).map(([key, category]) => (
            <div key={key}>
              <h3 className="text-lg mb-8">{category.title}</h3>
              <div className="space-y-8">
                {category.items.map((item, index) => (
                  <TrainingItem key={index} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default TrainingSection;