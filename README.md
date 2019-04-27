# ngs

ngs : ImageFlux alternative

> NOTE: これは実験的なプロジェクトです。自己責任でご利用ください。


## 機能

* `Accept` ヘッダーに応じて、 WebP エンコードされた画像もしくはオリジナルの画像を配信します。
* 無料で誰でも使うことが出来ます。
* パラメータの指定方式が ImageFlux と互換性があります。


## 例

### 配信

初めに、以下のマークアップを HTML ファイルに記述します。

```html
<img src="https://ngs.mochizuki.moe/anna.png" />
```

閲覧に使用しているブラウザーが WebP をサポートしている場合、 ngs は WebP にエンコードされた画像を配信します。
サポートしていない場合は、エンコードしていないオリジナルの画像を配信します。





## Special Thanks

* **n**ew **g**eneration**s** by THE IDOLM@STER CINDERELLA GIRLS


