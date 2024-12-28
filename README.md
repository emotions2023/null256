# sb1-5jsemw

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/emotions2023/sb1-5jsemw)


# Directory Structure

```src/
├── app/                # Next.js app directory
│   ├── layout.tsx     # Root layout
│   ├── page.tsx       # Home page
│   │── about/         # About page
│   │   └── page.tsx
│   ├── works/              # 新規：作品詳細ページ用
│   │   └── [slug]/        # 新規：動的ルーティング
│   │       └── page.tsx   # 新規：個別作品の詳細ページ
│
├── components/
│   ├── common/        # Common components used across features
│   │   ├── Navigation/
│   │   ├── LoadingScreen/
│   │   └── Footer/
│   │
│   ├── features/      # Feature-specific components
│   │   ├── Chatbot.tsx/      # Chat related components
│   │   └── NeuralNetwork3D.tsx/    # Neural network related components
│   │
│   ├── MainLayout.tsx/        # Layout components
│   │
│   └── sections/      # Page sections
│       ├── Hero/
│       ├── About/
│       ├── AboutMe/
│       ├── Portfolio/
│       ├── Profile/
│       ├── Specialty/
│       ├── Training/
│       └── Skills/
│   └── works/             # 新規：作品関連コンポーネント
│       ├── WorkCard.tsx   # 新規：HOMEでの作品カード
│       └── WorkDetail.tsx # 新規：詳細ページのレイアウト
└── lib/
    └── works.ts           # 新規：作品データの定義