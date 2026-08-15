# DragonSword Awakening Wiki - 开发要求文档

**文档版本**: v1.0
**创建日期**: 2026-08-12
**适用对象**: AI编程工具（Codex/智谱GLM等）+ 前端开发者
**文档性质**: 可直接执行的技术规格说明书

---

## 一、技术栈

### 1.1 核心技术

| 层级 | 技术 | 版本/说明 |
|------|------|-----------|
| 标记语言 | HTML5 | 语义化标签 |
| 样式 | CSS3 | CSS变量 + Grid + Flexbox |
| 交互 | 原生JavaScript (ES6+) | 无框架依赖 |
| 构建 | 无构建工具 | 纯静态文件 |
| 部署 | GitHub Pages / Vercel / Cloudflare Pages | 静态托管 |

### 1.2 为什么选纯静态

- 加载速度快，SEO友好
- 无构建步骤，AI可直接生成完整文件
- 部署简单，任意静态托管平台均可
- 维护成本低，适合个人项目

### 1.3 禁止使用

- ❌ React/Vue/Angular等前端框架
- ❌ TypeScript（增加编译步骤）
- ❌ CSS预处理器（Sass/Less）
- ❌ 后端语言（Node.js/Python等）
- ❌ 数据库

### 1.4 配套Skill与MCP（AI协作工具链）

**重要前提**：前端开发本身**不需要**专门的Skill——AI编程工具（Codex/智谱GLM等）读取本文档和素材库后，可直接生成HTML/CSS/JS代码。以下列出的是开发期一次性使用、以及运营期持续需要的辅助工具。

#### 1.4.1 开发期一次性工具（用完即止，无需长期配套）

| 工具 | 用途 | 使用时机 | 是否必须 |
|------|------|----------|----------|
| `doubao-creative-design` | 生成favicon图标、hero封面图、社交媒体分享图 | 建站初期生成图片素材 | 可选（已有素材可跳过） |
| `browser-task` | 浏览器自动化：抓取竞品页面、截取素材、验证部署效果 | 素材搜集阶段 + 部署验证 | 推荐（提升效率） |

> 说明：以上工具仅在开发阶段使用1-2次，网站上线后不再需要。图片素材生成后存入 `assets/` 目录，后续无需再调用。

#### 1.4.2 运营期持续配套工具（才是真正需要长期接入的）

以下是网站上线后，日常运营和数据监控持续需要的工具：

**Skill（AI助手技能）**:

| Skill名称 | 用途 | 频率 |
|-----------|------|------|
| `doubao-cron-scheduler` | 定时任务：每周检查关键词排名、每日监控游戏更新公告、定期提醒内容更新 | 持续 |
| `lark-sheets` | 飞书表格：GSC数据复盘表、关键词排名跟踪表、流量监控看板 | 持续 |
| `browser-task` | 定期抓取SEO排名截图、监控竞品更新、验证线上页面状态 | 每周/每月 |

**MCP（AI编程工具外接能力）**:

| MCP/工具 | 优先级 | 用途 | 关键能力 |
|----------|--------|------|----------|
| **Google Search Console MCP** | P0 必须 | SEO数据监控 | 查看收录状态、搜索排名、点击量、提交sitemap、请求索引 |
| **Google Analytics MCP** | P0 必须 | 流量分析 | UV/PV、用户来源、页面停留时间、跳出率、转化数据 |
| **GitHub MCP** | P1 重要 | 代码更新与部署 | 提交内容更新、推送触发Pages部署、管理Issue |
| **Cloudflare MCP** | P1 重要 | DNS与CDN运维 | 刷新缓存、查看流量统计、配置SSL、DNS记录调整 |
| **SimilarWeb MCP** | P2 推荐 | 关键词与竞品 | 查询KD难度变化、竞品流量估算、新长尾词挖掘 |
| **Steam MCP / Steam Web API** | P2 推荐 | 游戏数据动态 | 获取玩家在线数、评测数据、更新公告（用于内容更新触发） |
| **Google AdSense MCP** | P3 可选 | 变现数据 | 广告收入、展示量、eCPM、支付状态 |

**MCP配置说明**:
- GSC/GA MCP: 需要OAuth授权Google账号，确保账号已添加为站点属性所有者
- GitHub MCP: 需要Personal Access Token，权限勾选 `repo` 和 `workflow`
- Cloudflare MCP: 需要API Token，权限勾选 `Zone:DNS:Edit` 和 `Zone:Cache:Purge`
- SimilarWeb MCP: 需要API Key（用户已有PRO账户）

#### 1.4.3 必须接入的外部服务（非MCP，手动接入）

| 服务 | 用途 | 接入方式 | 优先级 |
|------|------|----------|--------|
| Google Search Console | 搜索引擎收录监控 | 验证域名所有权（DNS TXT记录或HTML文件） | P0 |
| Google Analytics 4 | 流量统计 | 页面插入GA4跟踪代码（gtag.js） | P0 |
| Cloudflare | DNS解析+CDN+SSL | 域名Nameserver指向Cloudflare | P0 |
| GitHub Pages | 静态网站托管 | 仓库设置开启Pages | P0 |
| Spaceship | 域名注册 | 购买域名ds-guides.wiki | P0 |
| Google AdSense | 广告变现 | 申请审核通过后插入广告代码 | P1 |

#### 1.4.4 AI编程工具（Codex/GLM）协作流程

```
┌─────────────────────────────────────────────────────────────┐
│                     AI编程工具工作流                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  开发阶段（一次性）:                                          │
│  1. 读取本文档 + 素材库 → 理解规范和内容原料                   │
│  2. 读取参考页面（en/beginner-guide.html）→ 理解结构          │
│  3. 直接生成/修改HTML/CSS/JS代码（无需前端Skill）              │
│  4. （可选）调用 doubao-creative-design 生成图片素材           │
│  5. 调用 GitHub MCP → 提交代码、推送、触发Pages部署            │
│  6. 调用 Cloudflare MCP → 配置DNS、刷新缓存                   │
│  7. 调用 browser-task → 验证部署后页面效果、截图存档           │
│                                                             │
│  运营阶段（持续）:                                            │
│  8. 调用 GSC MCP → 查看收录/排名数据、提交sitemap             │
│  9. 调用 GA MCP → 分析流量、用户行为                          │
│  10. 调用 cron-scheduler → 定时监控排名和游戏更新              │
│  11. 根据数据 → 生成新页面/更新旧内容 →  GitHub MCP部署       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### 1.4.5 无MCP时的降级方案

如果某些MCP不可用，按以下方式降级：

| 缺失MCP | 降级方案 | 影响 |
|---------|----------|------|
| GSC MCP | 手动在GSC面板查看数据，用browser-task截图 | 无法自动监控，需定期人工检查 |
| GA MCP | 手动在GA面板查看数据，导出CSV到lark-sheets | 无法自动分析，需人工整理 |
| GitHub MCP | 用Bash执行git命令，手动在浏览器开启Pages | 效率降低，需人工确认 |
| Cloudflare MCP | 手动在Cloudflare面板配置DNS和刷新缓存 | 需人工操作，无法自动化 |
| SimilarWeb MCP | 用browser-task登录SimilarWeb截图 | 需人工操作，数据获取慢 |

---

## 二、项目目录结构

```
dragonsword-guides/
├── index.html                  # 根目录语言跳转页
├── en/                         # 英文版本（主语言）
│   ├── index.html              # 英文首页
│   ├── beginner-guide.html
│   ├── tier-list.html
│   ├── characters.html
│   ├── classes.html
│   ├── lute.html
│   ├── theresia.html
│   ├── charlotte.html
│   ├── reina.html
│   ├── combat.html
│   ├── best-team.html
│   ├── build.html
│   ├── gear.html
│   ├── karma.html
│   ├── recipes.html
│   ├── map.html
│   ├── boss.html
│   ├── raid.html
│   ├── endgame.html
│   ├── coop.html
│   ├── multiplayer.html
│   ├── review.html
│   └── roadmap.html
├── ko/                         # 韩语版本（同en/结构）
├── ru/                         # 俄语版本（同en/结构）
├── ja/                         # 日语版本（同en/结构）
├── css/
│   └── style.css               # 统一样式文件
├── js/
│   └── main.js                 # 通用脚本
├── assets/
│   ├── favicon.png             # 网站图标 (512x512)
│   ├── favicon-64.png          # 64x64图标
│   ├── hero-cover.jpg          # 首页封面图
│   └── hero-cover-800.jpg      # 800px宽封面图
├── sitemap.xml                 # 站点地图（待添加）
├── robots.txt                  # 爬虫规则（待添加）
└── .gitignore
```

**命名规则**:
- 文件名全小写，用连字符分隔: `beginner-guide.html`
- 图片资源放 `assets/`
- 每个语言目录结构完全一致

---

## 三、页面模板规范

### 3.1 标准页面结构

每个HTML页面必须包含以下部分，顺序固定：

```html
<!DOCTYPE html>
<html lang="en">                <!-- lang属性: en/ko/ru/ja -->
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta (必须) -->
    <title>[页面标题] ≤60字符</title>
    <meta name="description" content="[页面描述] 140-160字符">
    <meta name="keywords" content="[关键词] ≤100字符">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://ds-guides.wiki/en/[页面].html">
    
    <!-- Open Graph -->
    <meta property="og:title" content="[同上title]">
    <meta property="og:description" content="[同上description]">
    <meta property="og:image" content="https://ds-guides.wiki/assets/hero-cover.jpg">
    
    <!-- 资源引用 -->
    <link rel="stylesheet" href="../css/style.css">
    <link rel="icon" type="image/png" href="../assets/favicon.png">
    
    <!-- hreflang多语言标签 (5个) -->
    <link rel="alternate" hreflang="en" href="https://ds-guides.wiki/en/[页面].html">
    <link rel="alternate" hreflang="ko" href="https://ds-guides.wiki/ko/[页面].html">
    <link rel="alternate" hreflang="ru" href="https://ds-guides.wiki/ru/[页面].html">
    <link rel="alternate" hreflang="ja" href="https://ds-guides.wiki/ja/[页面].html">
    <link rel="alternate" hreflang="x-default" href="https://ds-guides.wiki/en/[页面].html">
</head>
<body>
    <!-- 1. 导航栏 -->
    <nav class="navbar">...</nav>
    
    <!-- 2. 页面标题区 -->
    <section class="hero">...</section>
    
    <!-- 3. 主内容区 (双栏布局) -->
    <main class="main-layout">
        <div class="content-area article-content">
            <!-- 快速答案区 -->
            <div class="alert alert-success">...</div>
            <!-- 正文内容 -->
        </div>
        <aside class="sidebar">
            <!-- 侧边栏 -->
        </aside>
    </main>
    
    <!-- 4. 页脚 -->
    <footer class="footer">...</footer>
    
    <!-- 5. 脚本 -->
    <script src="../js/main.js"></script>
</body>
</html>
```

### 3.2 导航栏规范

```html
<nav class="navbar">
    <div class="nav-container">
        <a href="index.html" class="nav-logo">
            <img src="../assets/favicon.png" alt="Logo" style="width:32px;height:32px;border-radius:6px;">
            <span>DragonSword Wiki</span>
        </a>
        <button class="nav-toggle" aria-label="Toggle menu">☰</button>
        <ul class="nav-links">
            <li><a href="beginner-guide.html">Beginner Guide</a></li>
            <li><a href="tier-list.html">Tier List</a></li>
            <li><a href="characters.html">Characters</a></li>
            <li><a href="build.html">Builds</a></li>
            <li><a href="best-team.html">Teams</a></li>
            <li><a href="combat.html">Combat</a></li>
            <li><a href="map.html">Map</a></li>
            <li><a href="https://store.steampowered.com/app/4570720/" target="_blank" class="nav-cta">Play on Steam</a></li>
        </ul>
        <button class="theme-toggle" title="Switch to light mode">☀️</button>
        <!-- 语言切换器由JS动态生成 -->
    </div>
</nav>
```

**要求**:
- 当前页面对应的导航链接加 `class="active"`
- 导航链接顺序全站统一
- 外部链接加 `target="_blank"`

### 3.3 侧边栏规范

侧边栏包含3个卡片，顺序固定：

```html
<aside class="sidebar">
    <!-- 卡片1: 本页目录 -->
    <div class="sidebar-card">
        <div class="sidebar-title">On This Page</div>
        <ul class="sidebar-nav">
            <li><a href="#section-1">Section 1</a></li>
            <li><a href="#section-2">Section 2</a></li>
        </ul>
    </div>
    
    <!-- 卡片2: Wiki全站导航 -->
    <div class="sidebar-card">
        <div class="sidebar-title">Wiki Navigation</div>
        <ul class="sidebar-nav">
            <li><a href="beginner-guide.html">Getting Started <span class="count">1</span></a></li>
            <!-- ... 全站页面列表 -->
        </ul>
    </div>
    
    <!-- 卡片3: 官方链接 -->
    <div class="sidebar-card">
        <div class="sidebar-title">Official Links</div>
        <ul class="sidebar-nav">
            <li><a href="https://store.steampowered.com/app/4570720/" target="_blank">🎮 Steam Store</a></li>
            <li><a href="https://discord.gg/CzZ5ddkMVg" target="_blank">💬 Official Discord</a></li>
            <li><a href="https://www.youtube.com/@DragonSwordAwakening" target="_blank">📺 YouTube</a></li>
        </ul>
    </div>
</aside>
```

### 3.4 页脚规范

```html
<footer class="footer">
    <div class="footer-container">
        <div class="footer-about">
            <h3>DragonSword Awakening Wiki</h3>
            <p>[站点介绍，2-3句]</p>
        </div>
        <div class="footer-col">
            <h4>Guides</h4>
            <ul>...</ul>
        </div>
        <div class="footer-col">
            <h4>Systems</h4>
            <ul>...</ul>
        </div>
        <div class="footer-col">
            <h4>Community</h4>
            <ul>...</ul>
        </div>
    </div>
    <div class="footer-bottom">
        <span>© <span class="current-year">2026</span> DragonSword Awakening Wiki. Fan-made, not affiliated with Hound13.</span>
        <span>Last updated: Aug 2026</span>
    </div>
    <div class="footer-disclaimer">
        DragonSword: Awakening is a trademark of Hound13 Inc. This site is a community resource...
    </div>
</footer>
```

---

## 四、CSS设计系统

### 4.1 CSS变量（深色主题，默认）

```css
:root {
    /* 颜色 - 背景 */
    --bg-primary: #0f0f1a;
    --bg-secondary: #161625;
    --bg-card: #1e1e30;
    --bg-card-hover: #252540;
    
    /* 颜色 - 文字 */
    --text-primary: #e8e8f0;
    --text-secondary: #a0a0b8;
    --text-muted: #6a6a80;
    
    /* 颜色 - 主题色 */
    --accent-purple: #8b5cf6;
    --accent-purple-light: #a78bfa;
    --accent-gold: #f59e0b;
    
    /* 边框 */
    --border-color: #2a2a40;
    --border-light: #353550;
    
    /* 圆角 */
    --radius-sm: 6px;
    --radius-md: 10px;
    --radius-lg: 16px;
    
    /* 间距 */
    --space-xs: 4px;
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 24px;
    --space-xl: 32px;
    
    /* 阴影 */
    --shadow-sm: 0 2px 8px rgba(0,0,0,0.3);
    --shadow-md: 0 4px 16px rgba(0,0,0,0.4);
    --shadow-lg: 0 8px 32px rgba(0,0,0,0.5);
    
    /* 导航 */
    --nav-height: 64px;
}
```

### 4.2 亮色主题覆盖

```css
[data-theme="light"] {
    --bg-primary: #f8f9fc;
    --bg-secondary: #ffffff;
    --bg-card: #ffffff;
    --text-primary: #1a1a2e;
    --text-secondary: #4a4a68;
    --border-color: #e2e6f0;
    /* ... 其他变量覆盖 */
}
```

### 4.3 必须实现的CSS组件

| 组件 | 类名 | 说明 |
|------|------|------|
| 导航栏 | `.navbar` | 固定顶部，毛玻璃效果 |
| 英雄区 | `.hero` | 页面标题区，渐变背景 |
| 主布局 | `.main-layout` | CSS Grid双栏，侧边栏固定 |
| 内容区 | `.content-area` | 文章内容容器 |
| 侧边栏 | `.sidebar` | 右侧导航卡片 |
| 卡片 | `.card` | 通用卡片，hover效果 |
| 卡片网格 | `.card-grid` | Grid布局，响应式 |
| 表格包裹 | `.table-wrapper` | 横向滚动容器 |
| 提示框 | `.alert` | 4种: success/warning/info/error |
| 按钮 | `.btn` | 3种: primary/secondary/gold |
| 等级徽章 | `.tier-badge` | S/A/B/C/D级，不同颜色 |
| 页脚 | `.footer` | 4列布局 |

### 4.4 响应式断点

```css
/* 桌面: >1024px (默认样式) */

/* 平板: ≤1024px */
@media (max-width: 1024px) {
    .main-layout { grid-template-columns: 1fr; }
    .sidebar { position: static; order: -1; display: grid; grid-template-columns: 1fr 1fr; }
    .card-grid { grid-template-columns: repeat(2, 1fr); }
}

/* 手机: ≤768px */
@media (max-width: 768px) {
    .nav-links { display: none; flex-direction: column; position: absolute; ... }
    .nav-links.open { display: flex; }
    .nav-toggle { display: block; }
    .card-grid { grid-template-columns: 1fr; }
    .hero-title { font-size: 2rem; }
    .footer-container { grid-template-columns: 1fr; }
}

/* 小屏手机: ≤480px */
@media (max-width: 480px) {
    .nav-logo span { display: none; }
    .hero-title { font-size: 1.5rem; }
    .stats-bar { grid-template-columns: 1fr 1fr; }
}

/* 触摸设备 */
@media (hover: none) and (pointer: coarse) {
    .sidebar-nav a, .nav-links a { min-height: 44px; display: flex; align-items: center; }
}
```

---

## 五、JavaScript功能要求

### 5.1 必须实现的功能

| 功能 | 触发方式 | 说明 |
|------|----------|------|
| 移动端导航切换 | 点击 `.nav-toggle` | 切换 `.nav-links` 的 `.open` 类 |
| 导航链接点击关闭菜单 | 点击 `.nav-links a` | 移除 `.open` 类 |
| 当前页面高亮 | 页面加载 | 对比URL，给对应链接加 `.active` |
| 侧边栏当前页高亮 | 页面加载 | 同上 |
| 主题切换 | 点击 `.theme-toggle` | 切换 `data-theme` 属性，存localStorage |
| 语言切换器生成 | 页面加载 | 检测URL语言目录，动态生成下拉菜单 |
| 语言下拉开关 | 点击语言按钮 | 切换 `.open` 类，点击外部关闭 |
| 锚点平滑滚动 | 点击 `a[href^="#"]` | `scrollIntoView({behavior: 'smooth'})` |
| 页脚年份自动更新 | 页面加载 | `new Date().getFullYear()` |

### 5.2 JS代码结构

```javascript
// 所有代码放在 DOMContentLoaded 事件中
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 移动端导航
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    }
    
    // 2. 主题切换
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    // ... 切换逻辑
    
    // 3. 语言切换器（动态生成）
    // 检测当前URL中的语言目录和页面名
    // 在主题切换按钮后插入语言选择器HTML
    
    // 4. 其他功能...
});
```

### 5.3 语言切换器实现逻辑

```javascript
// 检测当前语言和页面
const pathParts = window.location.pathname.split('/');
const langDirs = ['en', 'ko', 'ru', 'ja'];
let currentLang = 'en';
let currentPage = 'index.html';

for (let i = 0; i < pathParts.length; i++) {
    if (langDirs.includes(pathParts[i])) {
        currentLang = pathParts[i];
        currentPage = pathParts.slice(i + 1).join('/') || 'index.html';
        break;
    }
}

// 生成切换器（仅在语言目录下生成）
if (langDirs.includes(currentLang)) {
    const langNames = { 'en': 'EN', 'ko': '한국어', 'ru': 'RU', 'ja': '日本語' };
    // 构建下拉菜单HTML，插入到主题切换按钮后
}
```

---

## 六、SEO要求

### 6.1 每页必须包含

- [ ] `<title>` ≤60字符，含核心关键词
- [ ] `<meta name="description">` 140-160字符
- [ ] `<meta name="keywords">` ≤100字符，5-10个词
- [ ] `<link rel="canonical">` 规范URL
- [ ] 5个 `<link rel="alternate" hreflang>` 标签
- [ ] Open Graph标签（og:title/description/image）
- [ ] 唯一的 `<h1>`
- [ ] 清晰的 H2/H3 层级
- [ ] 所有图片有 `alt` 属性
- [ ] 语义化HTML标签（article/aside/nav/footer）

### 6.2 站点级SEO

- [ ] `sitemap.xml` - 列出所有页面URL
- [ ] `robots.txt` - 允许所有爬虫
- [ ] 结构化数据（JSON-LD）- WebSite + VideoGame schema
- [ ] 404页面
- [ ] 页面加载速度 <3秒（Lighthouse）

---

## 七、多语言实现规范

### 7.1 实现方式

- **子目录方式**: `/en/` `/ko/` `/ru/` `/ja/`
- **根目录**: `index.html` 语言自动跳转页
- **跳转逻辑**: JS检测 `navigator.language`，匹配后跳转，同时提供手动选择

### 7.2 翻译要求

| 内容类型 | 是否必须翻译 | 说明 |
|----------|-------------|------|
| SEO title/description | ✅ 必须 | 影响搜索排名 |
| 导航栏文字 | ✅ 必须 | 用户体验 |
| 侧边栏文字 | ✅ 必须 | 用户体验 |
| 页脚文字 | ✅ 必须 | 用户体验 |
| 正文标题H1/H2/H3 | ✅ 必须 | 内容可读性 |
| 正文段落 | ✅ 必须 | 核心内容 |
| 表格内容 | ✅ 必须 | 数据可读性 |
| 角色名/游戏专有名词 | ⚠️ 保留原文 | 可加本地化译名 |
| 代码/命令/链接 | ❌ 不翻译 | 保持原样 |

### 7.3 翻译质量标准

- 术语一致性：全站同一术语翻译统一
- 自然流畅：符合目标语言表达习惯，无机器翻译痕迹
- 专有名词：角色名、技能名保留英文或用官方译名
- 格式保留：HTML标签、CSS类名、链接不改动

---

## 八、代码规范

### 8.1 HTML规范

- 缩进4个空格
- 属性用双引号
- 标签闭合（自闭合标签加 `/`）
- 注释标明区块：`<!-- ========== Section Name ========== -->`
- class命名用连字符：`nav-links`, `card-grid`

### 8.2 CSS规范

- 缩进4个空格
- 颜色用十六进制
- 优先使用CSS变量
- 按区块组织：变量→布局→组件→响应式→主题
- 注释标明区块

### 8.3 JS规范

- 缩进4个空格
- 使用 `const`/`let`，不用 `var`
- 箭头函数优先
- 所有代码放在 `DOMContentLoaded` 中
- 变量名驼峰式：`navToggle`, `currentLang`

### 8.4 禁止事项

- ❌ 内联样式（除favicon尺寸等必要情况）
- ❌ 内联脚本
- ❌ `!important`（除非覆盖第三方样式）
- ❌ 控制台输出 `console.log`（生产环境）
- ❌ 引入外部JS库（jQuery等）

---

## 九、部署要求

### 9.1 GitHub Pages部署

```bash
# 1. 创建仓库并推送
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/[用户名]/dragonsword-guides.git
git push -u origin main

# 2. 在GitHub仓库设置中开启Pages
# Settings → Pages → Source: main branch / root
```

### 9.2 自定义域名

- 在Cloudflare添加域名
- DNS CNAME指向 `[用户名].github.io`
- 仓库设置中添加自定义域名
- 开启HTTPS

### 9.3 部署前检查清单

- [ ] 所有页面本地测试通过
- [ ] 无断链
- [ ] 响应式在手机/平板/桌面测试通过
- [ ] 主题切换正常
- [ ] 多语言切换正常
- [ ] SEO标签完整
- [ ] 图片已优化
- [ ] `.gitignore` 已配置

---

## 十、验收标准

### 10.1 功能验收

- [ ] 23个英文页面全部可访问
- [ ] 4种语言版本目录结构完整
- [ ] 导航栏所有链接有效
- [ ] 侧边栏所有链接有效
- [ ] 移动端汉堡菜单正常展开/收起
- [ ] 主题切换正常，刷新后保持偏好
- [ ] 语言切换正常，跳转到对应语言的同一页面
- [ ] 根目录自动检测浏览器语言跳转

### 10.2 视觉验收

- [ ] 桌面端布局正常（双栏）
- [ ] 平板端布局正常（单栏，侧边栏在上）
- [ ] 手机端布局正常（单栏，导航折叠）
- [ ] 深色主题显示正常
- [ ] 亮色主题显示正常
- [ ] 表格在小屏可横向滚动
- [ ] 无水平滚动条
- [ ] 图片不变形、不溢出

### 10.3 SEO验收

- [ ] 所有页面title≤60字符
- [ ] 所有页面description 140-160字符
- [ ] 所有页面有5个hreflang标签
- [ ] 所有页面有canonical标签
- [ ] sitemap.xml已生成
- [ ] robots.txt已配置

### 10.4 Lighthouse评分目标

| 指标 | 目标分数 |
|------|----------|
| Performance | ≥90 |
| Accessibility | ≥90 |
| Best Practices | ≥90 |
| SEO | ≥95 |

---

## 十一、AI编程提示词模板

### 11.1 新建页面提示词（给Codex/GLM）

```
请为 DragonSword: Awakening Wiki 创建一个新的攻略页面。

【页面信息】
- 文件名: [页面英文名].html
- 存放目录: en/
- 页面标题: [SEO标题，≤60字符]
- 页面描述: [SEO描述，140-160字符]
- 核心关键词: [关键词1, 关键词2, 关键词3]

【技术要求】
1. 严格遵循项目模板规范（参考 en/beginner-guide.html 的结构）
2. 必须包含: 导航栏、hero标题区、快速答案alert、正文、侧边栏、页脚
3. 引用 ../css/style.css 和 ../js/main.js
4. 添加5个hreflang标签（en/ko/ru/ja/x-default）
5. 响应式设计已在CSS中实现，无需额外写
6. 主题切换和语言切换器由JS动态生成，HTML中只需放theme-toggle按钮

【内容要求】
- 顶部放快速答案区（alert-success）
- 正文用H2/H3分级
- 数据用表格（table-wrapper包裹）
- 相关内容用卡片网格（card-grid）
- 底部放相关页面推荐

【输出】
完整的HTML文件内容，直接写入文件。
```

### 11.2 翻译页面提示词

```
请将以下英文HTML页面翻译为[目标语言]。

【翻译规则】
1. 只翻译用户可见的文本内容，不改动HTML标签、CSS类名、链接
2. SEO标签（title/description/keywords）必须翻译
3. 导航栏、侧边栏、页脚的固定文本必须翻译
4. 角色名、游戏专有名词保留英文（可在括号中加本地化译名）
5. 代码、命令、URL不翻译
6. lang属性改为 [目标语言代码]
7. hreflang标签中的URL路径改为对应语言目录
8. 保持HTML结构完全不变

【输出】
完整的翻译后HTML文件内容。
```

---

## 附录: 参考文件

- 产品说明文档: `./prd.md`
- 最终审核报告: `./audit-report.md`
- 素材库: `../素材库/`
- 现有页面模板: `en/beginner-guide.html`（最完整的参考页面）
- 样式文件: `css/style.css`
- 脚本文件: `js/main.js`
