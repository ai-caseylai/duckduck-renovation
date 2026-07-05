# 手機網站快速開發技巧

從 DuckDuck 裝修系統實戰中總結的技巧。

---

## 1. 單檔案架構（Single-File Worker）

Cloudflare Worker + D1 一個 `index.js` 吃全部，省去路由框架：

```js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    if (path === '/') return dashboard(env);
    if (path === '/orders') return ordersPage(env, url);
    if (path === '/calendar') return calendarPage(env, url);
    // ... 每個頁面一個 async function
  }
};
```

**優點**：零依賴、部署快、一個檔案全搞定。

---

## 2. SSR（Server-Side Rendering）直接輸出 HTML

不用 React/Vue，Worker 直接 return HTML string：

```js
function dashboard(env) {
  const body = `<div class="page-header">
    <h1>📊 儀表板</h1>
    <p>共 ${count} 張工單</p>
  </div>`;
  return html('儀表板', body, 'dashboard');
}
```

**優點**：首屏秒開、SEO 友好、不需要前端框架。

---

## 3. CSS 內聯模板字串（Template Literal）

所有 CSS 寫在一個 `` ` `` 字串裡，直接在 `<style>` 輸出：

```js
const CSS = `
:root{--bg:#f5f7fa;--primary:#2563eb}
body{font-family:system-ui;background:var(--bg)}
.card{background:#fff;border-radius:12px;padding:20px}

@media(max-width:768px){
  .card{padding:12px}
  .sidebar{width:100%}
}
`;
```

**關鍵**：
- CSS 變數（`--bg`、`--primary`）統一管理顏色
- `@media(max-width:768px)` 做手機適配
- 所有規則壓縮成一行節省流量

---

## 4. 手機優先的 RWD 模式

```css
/* 桌面版（預設） */
.sidebar{width:220px}
.main{margin-left:220px}
.card{padding:20px}

/* 手機版覆寫 */
@media(max-width:768px){
  .sidebar{width:100%;height:60px;position:fixed;bottom:0}  /* 底部導航 */
  .main{margin-left:0;width:100%}
  .card{padding:10px}
}
```

**模式**：
- 桌面版先寫（width/height 大）
- `@media(max-width:768px)` 覆蓋成手機版
- 側欄 → 底部 tab bar
- 表格 → 卡片佈局（見第 7 點）

---

## 5. 獨立 `<style>` 標籤避開 CSS 解析錯誤

當主 CSS 有難以定位的解析錯誤時，把關鍵 CSS 放到 `<body>` 底部的第二個 `<style>` 標籤，加 `!important`：

```html
<!-- head 裡的主 CSS（可能有語法錯誤） -->
<style>${CSS}</style>

<!-- body 底部：獨立樣式表，不受主 CSS 影響 -->
<style>
.calendar-grid{display:grid!important}
.calendar-day{border:1px solid #cbd5e1!important}
</style>
```

**適用場景**：CSS brace 不平衡、parser 中斷導致後半段樣式失效。

---

## 6. 調試面板模式

快速定位 CSS 問題：在頁面底部注入調試 `<script>`，輸出 computed styles：

```js
(function(){
  var el = document.querySelector('.calendar-day');
  var cs = getComputedStyle(el);
  console.log('border:', cs.borderWidth, cs.borderStyle, cs.borderColor);
  console.log('display:', cs.display);
})();
```

**檢查清單**：
- `computedStyle` → 看實際生效的樣式
- `document.styleSheets[i].cssRules` → 看 CSS 規則是否被 parser 讀取
- `getBoundingClientRect()` → 看元素實際尺寸
- `window.matchMedia('(max-width:768px)')` → 確認手機/桌面

---

## 7. 表格 → 手機卡片轉換

手機上表格太寬？一行 CSS 轉卡片：

```css
@media(max-width:768px){
  table, thead, tbody, tr, td{display:block;width:100%}
  thead{display:none}                          /* 隱藏表頭 */
  tr{border:1px solid #e2e8f0;border-radius:8px;padding:12px;margin-bottom:8px;background:#fff}
  td{display:flex;gap:8px;padding:4px 0}
  td:before{content:attr(data-label);font-weight:600;color:#64748b;min-width:60px}  /* 用 data-label 顯示欄名 */
}
```

**HTML 配合**：
```html
<td data-label="姓名">郭小姐</td>
<td data-label="電話">90333920</td>
```

---

## 8. Chatbot Function Calling 意圖偵測

不需要複雜的 AI function calling，用 regex 匹配關鍵詞直接查 DB：

```js
// 意圖偵測
if (msg.includes('未收') || msg.includes('欠')) {
  const result = await db.prepare("SELECT * FROM work_orders WHERE payment_status='未付'").all();
  extraContext = JSON.stringify(result);
}

// 注入結果到 AI prompt
const context = `數據：${extraContext}\n請回答用戶：${message}`;
const reply = await env.AI.run('@cf/meta/llama-3.2-3b-instruct', {
  messages: [
    { role: 'system', content: context },
    { role: 'user', content: message }
  ]
});
```

**模式**：regex 偵測意圖 → 查 DB → 結果注入 prompt → AI 格式化回答

**優點**：不需要 model 輸出結構化 JSON、不會被 reasoning token 吃掉、100% 可靠。

---

## 9. 常見踩坑

| 問題 | 原因 | 解決 |
|---|---|---|
| CSS 不生效 | HTML 有兩個 `class=""` | 合併成一個：`class="card date-sidebar"` |
| `\n` 在 template literal 被轉成換行 | 構建時 esbuild 解析了 `\n` | 用 `\\n`（雙反斜線） |
| AI 回覆 `content: null` | reasoning model 吃光 tokens | 換非 reasoning model（llama-3.2） |
| `const body` 無法 `+=` | const 不能 reassign | 改用 `let body` |
| D1 數據與本地不同 | Worker D1 是獨立實例 | 需要 sync 或透過 API 寫入 |

---

## 10. 開發流程

```
1. 寫 HTML → 寫 CSS → curl 測試
2. 手機模擬 → F12 DevTools 設 400px 寬度
3. 加調試面板 → 看 computed styles
4. 有問題 → 加第二個 <style> + !important
5. 確認 OK → 移除調試 → commit → deploy
```

**一句話總結**：SSR + 內聯 CSS + `@media` 手機覆寫 + 獨立 `<style>` fallback + 意圖偵測 function call = 一天搞定全端手機網站。
