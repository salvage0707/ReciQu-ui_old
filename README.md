# ReciQu

## 開発方針
### コード
- 可読性向上のため、import時のパスは、`@/xxx/xxx`の形式で定義すること。
- 可読性向上のため、Vueコンポーネントのメソッド定義は以下の順で記載する。
    - data
    - computed
    - methods
    - watch

#### Vuex
- storeの値の取得はgetterメソッドを必ず使用すること。
