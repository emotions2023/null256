// lib/works.ts
export interface Work {
  // 必須項目（カード表示用）
  id: string;
  slug: string;
  title: string;
  description: string;    // カード用の短い説明
  thumbnail: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  period: {
    start: string;
    end?: string;
  };
  primaryTechStack: {    // カード表示用のメイン技術
    name: string;
    icon?: string;
  }[];

  // 詳細ページ用の必須項目
  fullDescription: string;  // 詳細な説明
  features: {              // 主要な機能・特徴
    title: string;
    description: string;
    icon?: string;
  }[];
  techStack: {            // 詳細な技術スタック
    category: string;
    items: {
      name: string;
      version?: string;
      icon?: string;
    }[];
  }[];

  // オプション項目
  highlights?: {          // 開発での工夫点・成果
    title: string;
    description: string;
  }[];
  links?: {              // 関連リンク
    github?: string;
    live?: string;
    article?: string;
  };
  demo?: {
    type: 'youtube';
    videoId: string;    // YouTubeの動画ID
    title: string;      // 動画タイトル
  };
}

export const works: Work[] = [
  {
    id: '1',
    slug: 'portfolio-chatbot',
    title: 'AI Chat Assistant',
    description: '個人の経験や知識を組み込んだAIチャットボット。24時間対応の自然な対話を実現。', // カード用に簡潔に
    thumbnail: {
      src: '/img/works/chatbot-thumbnail.jpg',
      alt: 'AI Chat Assistant thumbnail showing conversation interface',
      width: 1280,
      height: 720
    },
    period: {
      start: '2024-11',
      end: '2024-12'
    },
    primaryTechStack: [
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Claude API', icon: 'ai' },
      { name: 'TypeScript', icon: 'typescript' }
    ],
    // 詳細ページ用の情報
    fullDescription: `
      個人の経験や知識を組み込んだAIチャットボット。訪問者との自然な対話を実現し、24時間対応可能な窓口として機能しています。
      タイプライター効果による人間らしい応答表示や、プロンプトエンジニアリングによる的確な応答を実現しました。
    `,
    features: [
      {
        title: '自然な対話',
        description: 'タイプライター効果による人間らしい応答を実装',
        icon: 'message-circle'
      },
      {
        title: 'プロンプトエンジニアリング',
        description: '的確な応答のための緻密なプロンプト設計',
        icon: 'brain'
      },
      {
        title: '制限',
        description: '1時間に5回まで対話できるよう制限',
        icon: 'limit'
      },
      {
        title: '操作性',
        description: 'チャットアイコンをクリックすることで自動的に入力状態へ',
        icon: 'operation'
      }
    ],
    techStack: [
      {
        category: 'Frontend',
        items: [
          { name: 'Next.js', version: '14.0' },
          { name: 'TypeScript', version: '5.0' },
          { name: 'Tailwind CSS', version: '3.0' }
        ]
      },
      {
        category: 'AI/API',
        items: [
          { name: 'Claude API' },
          { name: 'Anthropic SDK' }
        ]
      }
    ],
    highlights: [
      {
        title: '自然な会話の実現',
        description: 'チャットの文脈を保持しながら、プロンプトエンジニアリングによる的確な応答を実現'
      },
      {
        title: 'レスポンシブ対応',
        description: 'モバイルファーストのデザインアプローチにより、様々なデバイスで最適な表示を実現'
      },
      {
        title: '24時間対応',
        description: 'AIによる自動応答システムにより、いつでも問い合わせ可能な窓口として機能'
      }
    ],
    demo: {
      type: 'youtube',
      videoId: 'YDu_EOzztHw',  // YouTubeの動画ID
      title: 'AI Chat Assistant Demo - Portfolio'
    }
  }
];