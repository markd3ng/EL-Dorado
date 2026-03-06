# Kirari Hugo 终极进化路线图 (SPEC)

本文档定义了将原版 Astro Kirari 主题的高级交互与现代化特性移植到 Hugo 版本的优先级与实施规范。

## 📍 总体优先级视图 (Priority Overview)
根据**实现难度（低->高）**与**用户体验感知度（高->低）**，我们将改善计划划分为三个阶段：

| 阶段 | 任务代号 | 描述简介 | 优先级 | 复杂度 |
|---|---|---|---|---|
| **Phase 1** | `F-1` | **LLMs.txt** 支持 (AI SEO) | P0 (Must) | ⭐ |
| **Phase 1** | `F-2` | **图片灯箱** (PhotoSwipe) 沉浸交互 | ✅ Done | ⭐⭐ |
| **Phase 2** | `F-3` | **极客代码块** (Mac风格顶栏+复制+折叠) | ✅ Done | ⭐⭐⭐ |
| **Phase 2** | `F-4` | **GitHub 风格提示块** (Admonitions) | P1 (High) | ⭐⭐ |
| **Phase 3** | `F-5` | **全平台虚拟滚动条** (OverlayScrollbars) | ✅ Done | ⭐⭐ |
| **Phase 3** | `F-6` | **SPA 无缝转场转场** (Swup.js) | ✅ Done | ⭐⭐⭐⭐⭐ |

---

## 🛠️ 详细实施规范 (Implementation Details)

### Phase 1: 基础设施与视觉增强 (低成本，高收益)

#### [F-1] LLMs.txt 自动生成
*   **目标:** 为各大语言模型爬虫提供本站结构化纯文本内容，增强 AI 时代 SEO。
*   **Astro 对标:** `astro-llms-generate`。
*   **Hugo 实现机制:** 
    1. 在 `hugo.toml` 中注册自定义 `[outputFormats.LLMS]` 和相应的 `[mediaTypes]`。
    2. 创建 `layouts/index.llms.txt`。
    3. 利用 Go Template 遍历 `.Site.RegularPages` 输出标题、链接和 Description。
*   **影响文件:** `hugo.toml`, `layouts/index.llms.txt`

#### [F-2] 丝滑的图片灯箱 (PhotoSwipe)
*   **目标:** 点击文章正文的图片可全屏无极缩放，支持手势，配备暗色沉浸蒙版。
*   **Astro 对标:** 引入 `photoswipe`。
*   **Hugo 实现机制:** 
    1. 通过 CDN 在 `head.html` 或 `footer.html` 引入 PhotoSwipe Core JS & CSS。
    2. 创建 `assets/js/photoswipe-init.js`。
    3. (可选但推荐) 使用 Hugo 的 Markdown Render Hook `layouts/_default/_markup/render-image.html` 重写图片输出，使 HTML 附带原生 `width` 和 `height` 以优化解析速度，或让 JS 动态读取。
    4. JS 遍历 `.prose img`，点击触发 PhotoSwipe 实例。
*   **影响文件:** `layouts/_default/baseof.html` (或 head/footer), `layouts/_default/_markup/render-image.html`, `assets/js/...`

---

### Phase 2: Markdown 渲染深度扩展 (重构核心体验)

#### [F-3] 极客代码块扩展 (类似 Expressive Code)
*   **目标:** 让平平无奇的代码块拥有：红黄绿 Mac 按钮、文件名显示区域、一键复制按钮、超长代码渐变折叠。
*   **Astro 对标:** `@expressive-code/core`。
*   **Hugo 实现机制:** 
    1. 创建 `layouts/_default/_markup/render-codeblock.html` 拦截源码渲染。
    2. 通过提取 `{{ .Attributes }}` 甚至正则解析解析附带的文件名 (例如 ```ts title="main.ts" )。
    3. 注入外部 DOM 结构 (MAC 顶部菜单栏 SVG图标 + Copy button)。
    4. 结合 Tailwind CSS 和少量 Vanilla JS (`clipboard API`) 实现全套功能。
*   **影响文件:** `layouts/_default/_markup/render-codeblock.html`, `assets/css/main.css`, `assets/js/clipboard.js`

#### [F-4] GitHub 风格提示块 (Admonitions)
*   **目标:** 输入 `> [!NOTE]` 或类似标记时，自动转换为附带特殊颜色背景、左侧高亮边框和 Icon 的卡片。
*   **Astro 对标:** `remark-github-admonitions-to-directives`。
*   **Hugo 实现机制:** 
    1. 创建 `layouts/_default/_markup/render-blockquote.html`。
    2. 使用 `if` 和 `strings.HasPrefix` 判断块内容的第一行是否匹配 `[!NOTE]`, `[!WARNING]`, `[!TIP]`, `[!IMPORTANT]`。
    3. 若匹配，重组内部 HTML，去掉第一行，包装一层带有 `note note-info` (现已存在于 CSS 内) 等 Tailwind 类名以及对应 SVG SVG 图标的容器。
*   **影响文件:** `layouts/_default/_markup/render-blockquote.html`, 可能需要少许 `assets/css/main.css` 微调。

---

### Phase 3: 感知性能与全局动效重塑 (涉及生命周期)

#### [F-5] 虚拟滚动条 (OverlayScrollbars)
*   **目标:** 隐藏 Windows 默认又宽又占版面的滚动条，替换为自动隐藏的优雅细长滚动条。
*   **Astro 对标:** `overlayscrollbars`。
*   **Hugo 实现机制:** 
    1. 引入 CDN CSS/JS。
    2. 在 `body` 或需要滚动的特殊容器（如左侧 TOC，或者代码长块）上初始化 `OverlayScrollbars(document.body, {})`。
*   **影响文件:** `layouts/_default/baseof.html`, `assets/js/main.js`

#### [F-6] SPA 级无缝转场 (Swup.js)
*   **目标:** 点击文章链接不白屏，浏览器不刷新，平滑淡入淡出（加载条提示）。
*   **Astro 对标:** `@swup/preload-plugin` 配置。
*   **Hugo 实现机制 (高风险/高收益):** 
    1. 引入 Swup JS。
    2. 将核心内容区包裹在 `<main id="swup" class="transition-fade">` 中。
    3. **关键难点改造：** Hugo 很多 JS (如 Navbar 的监听、Table of contents 监听、Theme Toggle 的监听) 目前都绑定在了 `DOMContentLoaded` 事件上。引入 Swup 后需要提取一个 `initAll()` 函数，并在每次 Swup `page:view` 钩子触发时重新执行绑定。
*   **影响文件:** 全局 `layouts` 结构, `assets/js/*.js` (几乎所有的 JS 事件逻辑需改造)。

---
## 如何使用本 SPEC？
你可以回复我具体的任务代号，例如 `开始执行 F-1`，我会立即着手修改文件并确保在 Hugo 环境下稳定复刻原版特性。
