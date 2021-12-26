# Send SMS via Twilio Flex plugin

Flex プラグインの中から SMS を送信するプラグインです。
着信中、もしくは応答中の発信先に対して SMS を送信します。

## 構成

大きく 2 つのフォルダから構成されています。

- functions フォルダ：実際に SMS を送信するプログラム
- plugin-send-sms：Flex プラグイン

## インストール

### 事前準備

- Twilio CLI がインストールされていること
- Serverless プラグインがインストールされていること
- Flex プラグインがインストールされていること

<参考>  
[Twilio Flex の始め方（プラグイン準備編）](https://qiita.com/mobilebiz/items/eeca1ce20bb5b561b515)

### Function の準備

```sh
% git clone https://github.com/mobilebiz/flex-send-sms.git
% cd flex-send-sms/functions
% cp .env.example .env
```

`.env`を編集します。

```text
ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
SMS_FROM=+1xxxxxxxxxx
```

`ACCOUNT_SID`を、Flex プラグインプロジェクトの AccountSid で書き換えます（AC から始まる文字列）。  
`SMS_FROM`を、Flex プラグインプロジェクトで購入済みの US 番号（+1 から始まる電話番号）で書き換えます。
`.env`ファイルを保存します。

### Function のデプロイ

```sh
% npm run deploy
> send-sms@1.0.0 deploy
> npm version patch && twilio serverless:deploy

v1.0.1

Deploying functions & assets to the Twilio Runtime

Username        SK******************************
Password        ZYBh****************************
Service SID     ZS******************************
Environment     dev
Root Directory  /Users/xxxxxx/Documents/twilioFlex/flex-send-sms/functions
Dependencies
Env Variables   SMS_FROM
Runtime         default

✔ Serverless project successfully deployed

Deployment Details
Domain: send-sms-xxxx-dev.twil.io
Service:
   send-sms (ZS******************************)
Environment:
   dev (ZE******************************)
Build SID:
   ZB******************************
Runtime:
   node12
View Live Logs:
   https://www.twilio.com/console/functions/editor/ZS5******************************/environment/ZE******************************
Functions:
   https://send-sms-xxxx-dev.twil.io/send-sms
Assets:
```

以上で、Function のセットアップは終了です。  
最後に表示された Functions の URL（`https://send-sms-xxxx-dev.twil.io/send-sms`）を控えてください（xxxx の部分に数字が入ります）。

### Flex プラグインのセットアップ

```sh
% cd ../plugin-send-sms
% npm install
% cp .env.example .env
```

`.env`ファイルを編集します。

```text
FLEX_APP_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FLEX_APP_FUNCTION_URL=https://send-sms-XXXX-dev.twil.io/send-sms
```

`FLEX_APP_AUTH_TOKEN`を Flex プラグインプロジェクトの AUTH TOKEN で置き換えます。
`FLEX_APP_FUNCTION_URL`を先ほど控えておいた Function の URL で置き換えます。

### Flex プラグインのデプロイ

```sh
% npm run build && npm run deploy
```

途中以下のメッセージが出たら、`y`応答で先に進みます。

```sh
The React version 16.14.0 installed locally is incompatible with the React version ~16.13.1 installed on your Flex project.
Change your local React version or visit https://flex.twilio.com/admin/developers to change the React version installed on your Flex project.
? Do you still want to continue deploying? (y/N)
```

### Flex プラグインのリリース

Flex に管理者権限でログインします。
ダッシュボードの中にある**MANAGE PLUGINS**メニューから、デプロイ済みの`plugin-send-sms`をリリースしてください。
