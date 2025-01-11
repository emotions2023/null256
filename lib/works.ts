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
    type: 'video';
    videoUrl: string;    // MP4ファイルのパス
    poster?: string;     // サムネイル画像のパス（オプショナル）
    title: string;       // 動画タイトル
  };
  // 新しく追加するQRコードのオプション
  qrCode?: {
    type: 'line';  // 将来的に他のプラットフォームも追加できるように
    url: string;   // LINE友達追加のURL
    image: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    title?: string;      // 例: "LINE公式アカウント"
    description?: string; // 例: "LINEで今すぐ試してみる"
  };
}

export const works: Work[] = [
  {
    id: '1',
    slug: 'portfolio-chatbot',
    title: 'AI Chat Assistant',
    description: '個人の経験や知識を組み込んだAIチャットボット。24時間対応の自然な対話を実現。', // カード用に簡潔に
    thumbnail: {
      src: '/img/works/demo-01.png',
      alt: 'AI Chat Assistant thumbnail showing conversation interface',
      width: 1280,
      height: 720
    },
    period: {
      start: '2024-11',
      end: '2024-12'
    },
    primaryTechStack: [
      { name: 'Next.js'},
      { name: 'Claude API'},
      { name: 'TypeScript'}
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
      type: 'video',
      videoUrl: '/videos/demo-01.mp4',
      poster: '/img/works/poster-01.png',
      title: 'AI Recipe Assistant Demo'
    }
  },
  {
    id: '2',
    slug: 'dify-gas-line-recipe-bot',
    title: 'AI食材活用アシスタント',
    description: '余り食材でレシピを提案するLINEボット。和食・中華・洋食の料理提案が可能。',
    thumbnail: {
      src: '/img/works/demo-02.png',
      alt: 'AI Recipe Assistant showing LINE chat interface',
      width: 1280,
      height: 720
    },
    period: {
      start: '2024-01',
      end: '2024-01'
    },
    primaryTechStack: [
      { name: 'Google Apps Script' },
      { name: 'Dify API' },
      { name: 'LINE Messaging API' }
    ],
    fullDescription: `
      冷蔵庫の余り食材を無駄にしないように、AIが料理のレシピを提案するLINEボット。
      食材を入力するだけで、和食・中華・洋食など様々なジャンルの料理を提案。
      会話の文脈を保持しながら、食材の組み合わせや調理方法についても詳しくアドバイスします。
      1日の利用制限や自動リセット機能により、サービスの安定性を確保しています。
    `,
    features: [
      {
        title: 'AIレシピ提案',
        description: '入力された食材だけ活用した料理レシピをAIが提案',
        icon: 'chef-hat'
      },
      {
        title: 'ジャンル別提案',
        description: '和食・中華・洋食など、ジャンルを指定したレシピ提案が可能',
        icon: 'utensils'
      },
      {
        title: '会話管理',
        description: '文脈を理解した継続的な対話でレシピの詳細を提案',
        icon: 'message-circle'
      },
      {
        title: '利用制限',
        description: '1日10回までの利用制限と24時間後の自動リセット機能',
        icon: 'clock'
      }
    ],
    techStack: [
      {
        category: 'Backend',
        items: [
          { name: 'Google Apps Script' },
          { name: 'Properties Service' }
        ]
      },
      {
        category: 'AI/API',
        items: [
          { name: 'Dify API' },
          { name: 'LINE Messaging API' }
        ]
      }
    ],
    highlights: [
      {
        title: 'クイックリプライ機能',
        description: 'ワンタップで次のアクションを選択できる直感的なUI設計'
      },
      {
        title: '継続的な会話',
        description: '会話履歴を保持し、文脈を理解した自然な対話を実現'
      },
      {
        title: 'スマートな制限管理',
        description: '利用回数制限と自動リセット機能による安定したサービス提供'
      }
    ],
    demo: {
      type: 'video',
      videoUrl: '/videos/demo-02.mp4',
      poster: '/img/works/poster-02.png',
      title: 'AI 料理ボット'
    },
    qrCode: {
      type: 'line',
      url: 'https://lin.ee/your-bot-id',
      image: {
        src: '/img/works/demo-02-QR.png',
        alt: 'LINE Bot QR Code',
        width: 200,
        height: 200
      },
      title: 'LINE公式アカウント',
      description: '実際にこちらからお試しできます！'
    }    
  }
];