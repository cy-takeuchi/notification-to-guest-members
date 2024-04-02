## cypn-dev-plugin-template

### cypn-dev-plugin-template の利用方法

#### 開発リポジトリの作成（初回のみ実施）

GitHub の [cypn-dev-plugin-template](https://github.com/cy-cypn/cypn-dev-plugin-template) ページで右上の `Use this template` からテンプレートを利用し開発リポジトリを作成する。

#### 秘密鍵の作成（初回のみ実施）

plugin を bundle するための秘密鍵を作成する。

```
npm run generate-plugin-private-key
```

#### package.json の更新（初回のみ実施）

下記の `cypn-dev-plugin-template` をリポジトリ名に変更する。（3 箇所）

```json
  "name": "cypn-dev-plugin-template",
  "scripts": {
    "pack": "kintone-plugin-packer --ppk ./key/private.ppk --out dist/cypn-dev-plugin-template.zip plugin",
    "upload": ". ./.env && kintone-plugin-uploader dist/cypn-dev-plugin-template.zip",
```

#### ビルド

##### 開発環境用

```
npm run build
```

```
npm run build-watch
```

##### 本番環境用

```
npm run build-prod
```

#### アップロード

##### 開発環境用

.env ファイルを作成する。

```
KINTONE_BASE_URL=https://mypage-test.cybozu.com
KINTONE_USERNAME={username}
KINTONE_PASSWORD={password}
HTTP_PROXY=http://dc-ty3-squid-1.cb.local:3128
```

```
npm run upload
```

##### 本番環境用

手動でアップロードする。

> [!NOTE]
> GitHub Codespaces の場合は `npm run upload` は利用できない。  
> そのため、手動でアップロードする。
