# TwitterIconAutoUpdater

Twitterアイコンを毎日変える奴。

アイコン用のgitリポジトリ作って、twitterディレクトリの中に設定したいアイコンを入れておくと毎日変わる。

## USAGE

アイコン用リポジトリを用意
```
$ mkdir -p icons/twitter
# 画像をicons/twitterに配置
$ cp /path/to/images/tekitou_na_gazou.png icons/twitter/

$ cd icons

# いい感じにリポジトリ作っておく
$ git init
$ git remote add origin https://github.com/xxx/xxxxx.git
$ git push origin master
```


TwitterIconAutoUpdaterを起動
```
$ git clone https://github.com/ryoctrl/TwitterIconAutoUpdater.git
$ cd TwitterIconAutoUpdater
$ cp ecosystem.config.js.sample ecosystem.config.js

# envの中身を変更する
$ vi ecosystem.config.js

$ pm2 start ecosystem.config.js
```

## 環境変数

|キー|説明|
|--|--|
|CONSUMER_KEY|TwitterAPIのコンシューマキー|
|CONSUMER_SECRET|TwitterAPIのコンシューマシークレット|
|ACCESS_TOKEN|TwitterAPIのアクセストークン|
|ACCESS_TOKEN_SECRET|TwitterAPIのアクセストークンシークレット|
|ICON_REPOSITORY|アイコン用のリポジトリアドレス|
|ICON_REPOSITORY_DIR|アイコンリポジトリをcloneするディレクトリ||
