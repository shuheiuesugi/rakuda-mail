# RAKUDAメール LP — 引き継ぎドキュメント

最終更新: 2026-03-24

---

## 1. プロジェクト概要

| 項目 | 内容 |
|------|------|
| サービス名 | RAKUDAメール（AIメール自動生成） |
| 技術スタック | Next.js 15 + React 19 + TypeScript |
| ホスティング | GitHub Pages（静的エクスポート） |
| リポジトリ | https://github.com/shuheiuesugi/rakuda-mail |
| 本番URL | https://shuheiuesugi.github.io/rakuda-mail/ |
| basePath | `/rakuda-mail` |

---

## 2. 公開URL一覧

### メインページ
| ページ | URL | ソースコード |
|--------|-----|-------------|
| メインLP | https://shuheiuesugi.github.io/rakuda-mail/ | `src/app/page.tsx` |
| コストLP | https://shuheiuesugi.github.io/rakuda-mail/lp/cost | `src/app/lp/cost/page.tsx` |
| Easy LP | https://shuheiuesugi.github.io/rakuda-mail/lp/easy | `src/app/lp/easy/page.tsx` |
| サインアップ | https://shuheiuesugi.github.io/rakuda-mail/signup | `src/app/signup/page.tsx` |
| 導入相談 | https://shuheiuesugi.github.io/rakuda-mail/book-call | `src/app/book-call/page.tsx` |

### 法的ページ
| ページ | URL | ソースコード |
|--------|-----|-------------|
| 利用規約 | https://shuheiuesugi.github.io/rakuda-mail/terms | `src/app/terms/page.tsx` |
| プライバシーポリシー | https://shuheiuesugi.github.io/rakuda-mail/privacy | `src/app/privacy/page.tsx` |
| 特定商取引法 | https://shuheiuesugi.github.io/rakuda-mail/tokushoho | `src/app/tokushoho/page.tsx` |
| セキュリティ | https://shuheiuesugi.github.io/rakuda-mail/security | `src/app/security/page.tsx` |

### LP用途
- **メインLP**: SEOオーガニック流入用（robots: index）
- **コストLP** (`/lp/cost`): コスト削減訴求。管理職・経営層向け広告用（robots: noindex）
- **Easy LP** (`/lp/easy`): かんたん訴求。非技術者向け広告用（robots: noindex）

---

## 3. ディレクトリ構造

```
rakuda-mail/
├── public/
│   ├── favicon.svg          # RAKUDAロゴ（波マーク）
│   └── robots.txt           # クロール制御
├── src/app/
│   ├── layout.tsx           # 共通レイアウト（GA4, Clarity, OGP）
│   ├── globals.css          # 全ページ共通CSS（3100行超）
│   ├── page.tsx             # メインLP（Hero, Features, Tone, Pricing, FAQ, CTA）
│   ├── signup/page.tsx      # サインアップ（インラインCSS、自己完結）
│   ├── book-call/page.tsx   # 導入相談フォーム
│   ├── terms/page.tsx       # 利用規約
│   ├── privacy/page.tsx     # プライバシーポリシー
│   ├── tokushoho/page.tsx   # 特定商取引法
│   ├── security/page.tsx    # セキュリティ
│   └── lp/
│       ├── cost/
│       │   ├── layout.tsx   # meta設定（noindex）
│       │   └── page.tsx     # コスト訴求LP
│       └── easy/
│           ├── layout.tsx   # meta設定（noindex）
│           └── page.tsx     # かんたんLP
├── next.config.ts           # output: "export", basePath: "/rakuda-mail"
├── package.json             # Next.js 15, React 19
└── out/                     # ビルド成果物（gh-pagesにデプロイ）
```

---

## 4. デザインシステム

### ブランド統一仕様（Reception/Hub/Mail共通）
- **ヘッダー**: 透明背景 → スクロールで白半透明。ロゴSVG（RAKUDAメール）白→ネイビー切替
- **CTA**: 2ボタン構成（`btn-dark` 無料相談 + `btn-cta-call` アンバー 無料で始める）
- **フッター**: RAKUDA AIロゴ + 2列グリッド（サポート / リンク）+ コピーライト
- **ファビコン**: 波マークSVG（`/public/favicon.svg`）

### カラーパレット
| 変数 | 値 | 用途 |
|------|----|------|
| --accent | #3B82F6 | メインアクセント（青） |
| --navy | #1E3A5F | テキスト・ロゴ |
| btn-cta-call | #F59E0B → #D97706 | CTAボタン（アンバー） |
| btn-dark | rgba(255,255,255,0.07) | セカンダリCTA |

### 料金プラン（全ページ統一済み）
| プラン | 月額 | 年額 | 備考 |
|--------|------|------|------|
| Free | ¥0 | - | 月20通、クレカ不要 |
| Pro | ¥2,980 | ¥2,480/月 | 無制限、全トーン、4言語 |
| Team | ¥9,800 | - | 3名〜、管理者ダッシュボード |
| Enterprise | 要見積もり | - | SSO/SAML、専任サポート |

---

## 5. 広告運用対応状況

### 実装済み
| 項目 | 状態 | 備考 |
|------|------|------|
| GA4 gtag | ✅ プレースホルダー設置済み | `layout.tsx` — `G-XXXXXXXXXX` を実IDに差替 |
| Microsoft Clarity | ✅ プレースホルダー設置済み | `layout.tsx` — `CLARITY_ID` を実IDに差替 |
| コンバージョン追跡 | ✅ 実装済み | signup: `sign_up`イベント、book-call: `generate_lead`イベント |
| OGP / Twitter Card | ✅ 設定済み | `layout.tsx` の metadata |
| robots.txt | ✅ 設置済み | `/public/robots.txt` |
| LP noindex | ✅ 設定済み | `/lp/cost`, `/lp/easy` は `robots: noindex` |
| LP URL分離 | ✅ 対応済み | 広告ごとに異なるURLでGA4レポート可能 |

### ローンチ前TODO
| 項目 | 優先度 | 詳細 |
|------|--------|------|
| GA4 ID設定 | 🔴 必須 | `layout.tsx` の `G-XXXXXXXXXX` を実際のMeasurement IDに差替 |
| Clarity ID設定 | 🔴 必須 | `layout.tsx` の `CLARITY_ID` を実際のProject IDに差替 |
| Meta Pixel追加 | 🟡 推奨 | Facebook/Instagram広告を使う場合はPixelコードを `layout.tsx` に追加 |
| OGP画像作成 | 🟡 推奨 | `og:image` 用の1200x630画像を作成・設定 |
| Google Ads CV設定 | 🟡 推奨 | Google広告用のコンバージョンタグを追加 |
| UTMパラメータ引継ぎ | 🟢 改善 | URLのUTMパラメータをsignupフォームに引き継ぐJS実装 |
| A/Bテストツール | 🟢 改善 | 動的A/Bテストが必要なら Statsig / VWO 等を導入 |

---

## 6. 既知の課題・制限

### 注意: CSSアニメーションとインタラクティブ要素の共存
- `fade-in` / `animate-on-scroll` 等の `opacity: 0` → `visible` で `opacity: 1` にするCSSクラスを、React stateで動的にclassNameが変わる要素（FAQ等）に付けると、状態更新時に `visible` が外れて要素が消えるバグが発生する
- **対策**: FAQ等のインタラクティブ要素には `fade-in` / `animate-on-scroll` を絶対に付けないこと（修正済み）

### フォームのバックエンド未接続
- `signup/page.tsx` と `book-call/page.tsx` のフォーム送信は現在**フロントエンドのみ**（`setSubmitted(true)` でUI切替するだけ）
- 実際のデータ送信には Formspree / Google Forms / Supabase 等のバックエンド統合が必要
- 本番サービス（`mail.rakuda-ai.com`）への接続時に対応予定

### モバイルメニュー
- ハンバーガーボタンは表示されるが、タップしてもナビゲーションは開かない（onClickハンドラ未実装）
- モバイルでは直接スクロールでセクションに到達する想定

### ソーシャルプルーフ（現在非表示）
- メインLPの導入企業ロゴセクションは現在 `return null` で非表示
- 実際の導入企業ロゴが確保でき次第、`page.tsx` の `SocialProofStrip` コンポーネントを復活させる

### コンポーネント重複
- Header / Footer / FAQ / Pricing 等のコンポーネントが3ファイル（page.tsx, cost, easy）で重複
- 今後の改修効率のため `src/components/` への切り出しを推奨

---

## 7. 開発・デプロイ手順

### ローカル開発
```bash
cd ${OUTPUT_BASE}/memo/rakuda-redesign/rakuda-mail
npm install
npm run dev        # http://localhost:3000/rakuda-mail/
```

### ビルド
```bash
npm run build      # → out/ に静的ファイル生成
```

### デプロイ（GitHub Pages）
```bash
# 1. ソースコードをpush
git add -A && git commit -m "変更内容" && git push origin master

# 2. gh-pagesブランチにデプロイ
TMPDIR=$(mktemp -d) && cp -r out/* "$TMPDIR/" && touch "$TMPDIR/.nojekyll" && \
cd "$TMPDIR" && git init && git checkout -b gh-pages && git add -A && \
git commit -m "deploy" && git remote add origin https://github.com/shuheiuesugi/rakuda-mail.git && \
git push -f origin gh-pages
```

### リンクパスのルール
| ページ階層 | 兄弟ページへのリンク | 例 |
|-----------|-------------------|-----|
| ルート直下（/signup, /terms等） | `./` | `href="./signup"` |
| LP配下（/lp/cost, /lp/easy） | `../` | `href="../signup"` |
| 外部URL | 絶対パス | `href="https://..."` |

---

## 8. 関連リソース

| リソース | URL |
|---------|-----|
| 引き継ぎマニュアル | https://drive.google.com/open?id=1A_5rXOXcYDGcInN6gvHkkuxyXt6qaqbM&usp=drive_fs |
| 本番サービス（参考） | https://mail.rakuda-ai.com/ |
| 本番リポジトリ（参考） | https://github.com/takahirohonda-ag/rakuda-mail |
| RAKUDA Reception LP | https://shuheiuesugi.github.io/rakuda-reception/ |
| RAKUDA Hub LP | https://shuheiuesugi.github.io/rakuda-hub/ |

---

## 9. 広告運用クイックスタート

### Step 1: トラッキング設定（所要: 15分）
1. [Google Analytics](https://analytics.google.com/) でプロパティ作成 → Measurement ID取得
2. [Microsoft Clarity](https://clarity.microsoft.com/) でプロジェクト作成 → Project ID取得
3. `src/app/layout.tsx` の `G-XXXXXXXXXX` と `CLARITY_ID` を差替
4. ビルド → デプロイ

### Step 2: 広告出稿
- **Google広告**: メインLP（`/rakuda-mail/`）またはコストLP（`/rakuda-mail/lp/cost`）に誘導
- **Facebook/Instagram**: Easy LP（`/rakuda-mail/lp/easy`）に誘導（非技術者向け）
- **UTM例**: `?utm_source=google&utm_medium=cpc&utm_campaign=mail_launch`

### Step 3: 効果測定
- GA4: ページビュー、コンバージョン（sign_up / generate_lead）
- Clarity: ヒートマップ、セッション録画、スクロール深度
- LP別比較: URL単位でGA4レポートをフィルタ
