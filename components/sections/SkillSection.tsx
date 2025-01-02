import { Slider } from "@/components/ui/slider";

export default function SkillSection() {
  const skills = {
    'フロントエンド開発': {
      title: 'Front-end development',
      skills: {
        'HTML': 5,
        'CSS': 4.5,
        'JavaScript': 3.5,
        'React': 2,
        'Vue.js': 3.75
      }
    },
    'バックエンド開発': {
      title: 'Backend development',
      skills: {
        'PHP': 2.5,
        'Laravel': 2.5,
        'Node.js': 2,
        'Python': 3
      }
    },
    'データベース': {
      title: 'Database',
      skills: {
        'SQL': 4.5,
        'PostgreSQL': 3,
        'Firebase': 1
      }
    },
    'クラウドサービスとデプロイメント': {
      title: 'Cloud service and deployment',
      skills: {
        'Vercel': 1,
        'GCS': 1,
        'Render':1
      }
    },
    'AI/機械学習': {
      title: 'AI and machine learning',
      skills: {
        'ChatGPT API': 2,
        'Claude API': 1.5,
        'v0': 0.5,
        'bolt': 0.5,
        'Create': 0.5,
        'Napkin': 0.5,
      }
    },
    '開発ツールとバージョン管理': {
      title: 'Development tools and version control',
      skills: {
        'Docker': 2.5,
        'Git': 2.5,
        'SourceTree': 2.5,
        'VS Code': 5,
        'Cursor':1,
        'GitHub Copilot':1,
        'Postman': 1,
        'GitHub': 2.5
      }
    }
  };

  return (
<section id="skill-set" className="max-w-4xl mx-auto mt-32 px-4 sm:px-8">
      <h2 className="text-xl text-center mb-16">SKILL SET</h2>
      
      <div className="space-y-16">
        {Object.entries(skills).map(([category, { title, skills }]) => (
          <div key={category}>
            <div className="flex items-start gap-2 mb-8">
              <div className="w-1 h-4 bg-white"></div>
              <div className="flex flex-col">
                <h3 className="text-sm">{category}</h3>
                <p className="text-xs mt-2 text-gray-400">{title}</p>
              </div>
            </div>
            <div className="space-y-6">
              {Object.entries(skills).map(([skill, value]) => (
                <div key={skill} className="flex items-center justify-between gap-4 sm:gap-8">
                  <p className="text-xs w-20 sm:w-24 tracking-[2px]">{skill}</p>
                  <Slider
                    defaultValue={[value]}
                    max={5}
                    step={0.25}
                    className="flex-1 max-w-[12rem]"
                    disabled
                  />
                  <p className="text-xs tracking-[2px] min-w-[3rem] text-right">
                    {value} <span className="hidden sm:inline">years</span><span className="inline sm:hidden">Y</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}