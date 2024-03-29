## はじめに
ご覧いただきありがとうございます。  
今年2月から未経験でプログラミングを学び始め、ポートフォリオとしてRails × Next.jsのアプリケーションを個人開発し、AWS Fargateにデプロイしました。  
そのアプリケーション「映画なんでもベスト」の紹介です。  

## アプリケーション概要
- アプリ名
  - 映画なんでもベスト
- 概要
  - 自由なお題で映画のミニランキングを作れるアプリ
- URL
  - https://best-eiga.com

## 使用した技術（言語・フレームワークetc）
### 開発
- Docker 20.10.16
- docker-compose 1.29.2
- バックエンド
  - Ruby 3.1.2
  - Ruby on Rails 6.1.6
  - MySQL 8.0.28
  - RSpec 3.11.0
  - Rubocop 1.31.0
- フロントエンド
  - React 18.2.0
  - Next.js 12.1.6
  - Jest 28.1.1
  - Typescript 4.7.4
  - Tailwindcss 3.1.4
### CI
- CircleCI 2.1
### インフラ
- AWS
  - ECS(Fargate)
  - ECR
  - RDS
  - ALB
  - Route53
  - IAM
  - Certificate Manager
- インフラ構成
<img width="400" alt="インフラ図" src="https://user-images.githubusercontent.com/98593352/186574905-8d3b7741-2a56-4d4a-b8cd-8cf5d349463a.svg">

## 制作理由  
#### 💡シェアできて、自由なお題を作れて、もっと映画が好きになるアプリを作ろう！
映画を観るのが好きで、SNSでの「**〇〇映画ベストテン**」系のハッシュタグが面白いと思ったのがきっかけです。  
いろんなランキングがあれば普段話題に上らない隠れた名作を知ることができたり、  
知っている映画でもどんなリストに入っているかによって、新しい魅力に気付くことができると考えました。  

また、ランキングといっても絶対的な優劣ではなく、  
「**この観点でいったらこれに1位あげちゃう**」とか「**自分の中ではこれが最高**」といった、多様な楽しみ方をサポートしたいと思いました。  

そこから、マイベストをシェアできて、自由なお題を作れて、もっと映画が好きになるようなアプリを作ることに決めました。

## 使い方
- ユーザー登録 or ゲストログインします 　
- お題を新しく作成🖋　 
<img width="500" alt="お題作成のデモ動画" src="https://user-images.githubusercontent.com/98593352/186572971-0966f338-b7e7-4949-9ab9-5d1c0135eea0.gif">  

- 映画を入力してベストを作成🎉　 
  - セレクトボックスライブラリ`react-select`を用いて、自動で外部APIから映画情報を取得し入力をサジェストします。  
<img width="500" alt="ベスト作成のデモ動画" src="https://user-images.githubusercontent.com/98593352/186572739-ce5260d6-896b-4804-8064-d31a5fae76a3.gif"> 

- 作成後、画面のツイートボタンからシェア　 
<img width="500" alt="twitterに投稿する画面" src="https://user-images.githubusercontent.com/98593352/186573110-7cc49564-ae69-45be-8111-c87e977a6e6b.png">

- 他のユーザーが投稿したお題を使うことができます
<img width="500" alt="既存のお題を選択する画面" src="https://user-images.githubusercontent.com/98593352/186580205-6a77cef5-0d6a-4ba1-aff3-a17fa56f617b.png">


## 機能一覧
- お題作成
- お題一覧表示
- お題を使ってベストランキング作成・編集・削除
- ユーザー登録・編集・削除
- ゲストログイン
- twitter投稿ボタン
- レスポンシブ対応

### ER図
<img width="３00" alt="ER図" src="https://user-images.githubusercontent.com/98593352/186574758-8d07a655-cc2c-48ab-ab55-cce74fed1645.svg">

## こだわりポイント
既存の映画関連サービスの「リスト作成機能」と差別化するため、  
- 同じお題を共有する**ソーシャル性** 
- 画像を見て楽しめる　**ビジュアル性**  
- ミニランキングだからこその**気軽さ**  

上記３点をポイントとして制作しました。　  

具体的には以下の取り組みを行いました。　　

- ソーシャル
  - アプリ内のお題をTwitterのハッシュタグとして使える
  - （ビジュアルと繋がりますが）シェアしたくなるような見た目の楽しさ
- ビジュアル
  - 映画入力フォームのビジュアル的・直感的UI/UX  
  - 投稿後も、選んだ映画の画像が綺麗に並べられて満足感がある
- 気軽さ
  - ユーザビリティを意識して導線を工夫　
    
映画好きとして自分も利用したくなるサービスを目指しました。

以上です!<br>
お目通しいただき誠にありがとうございました。  
  
---
映画なんでもベスト -  https://best-eiga.com
