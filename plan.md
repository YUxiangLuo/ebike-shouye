# Shopify Theme 首页二次开发计划

## 项目概述

**目标**: 将 React 首页设计转换为 Shopify Liquid Theme，整合到现有的 Shopify Refresh Theme (v15.4.1) 中。

**开发策略**: 最小侵入式二次开发
- 保留现有主题的所有基础功能（Header, Footer, Cart Drawer, 客户账户等）
- 添加 10 个自定义 Sections
- 创建独立的 CSS/JS 资产文件
- 通过修改 `templates/index.json` 应用新首页

**预计工作量**: 4-5 个工作日

---

## 技术栈对比

### 当前 React 实现
- **框架**: React 19.2.3 + TypeScript
- **构建工具**: Vite 6.2.0
- **样式**: Tailwind CSS (CDN)
- **字体**: Inter (body) + Playfair Display (headings)
- **组件**: 12 个 React 组件
- **状态管理**: React useState/useEffect

### 目标 Shopify 实现
- **模板引擎**: Liquid
- **样式**: 纯 CSS + CSS Variables（复用主题的 base.css）
- **脚本**: 原生 JavaScript ES6+ / Web Components
- **数据源**: Shopify SSR (Collections, Products, Blogs)
- **配置**: JSON Schema (Theme Customizer)

---

## 文件结构规划

```
shopify_theme/
├── sections/
│   ├── hero-banner-custom.liquid          [新建] ✅ 可配置
│   ├── promo-ticker-custom.liquid         [新建] ✅ 可配置
│   ├── christmas-banner-custom.liquid     [新建] ✅ 可配置
│   ├── best-sellers-custom.liquid         [新建] 🔗 Shopify 数据
│   ├── categories-custom.liquid           [新建] 🔗 Shopify 数据
│   ├── feature-video-custom.liquid        [新建] 📌 静态内容
│   ├── reviews-custom.liquid              [新建] 📌 静态内容
│   ├── blog-section-custom.liquid         [新建] 🔗 Shopify 数据
│   ├── social-family-custom.liquid        [新建] 📌 静态/混合
│   └── help-download-custom.liquid        [新建] 📌 静态内容
├── assets/
│   ├── custom-base.css                    [新建] 全局样式
│   ├── custom-hero.css                    [新建] Hero 专用样式
│   ├── custom-animations.css              [新建] 动画样式
│   ├── custom-hero.js                     [新建] Hero 交互
│   ├── custom-ticker.js                   [新建] Ticker 动画
│   └── custom-global.js                   [新建] 通用工具函数
├── templates/
│   └── index.json                         [修改] 首页配置
└── config/
    └── settings_schema.json               [可选修改] 全局设置
```

---

## Section 开发计划

### Phase 1: 基础配置型 Sections（可配置）

#### 1. Hero Banner Custom (`hero-banner-custom.liquid`)

**功能描述**:
- 全屏/大幅 hero 区域，支持图片轮播
- 4 个幻灯片，每个包含：标题、副标题、CTA 按钮、背景图
- 底部缩略图导航 + 进度条指示器
- 自动轮播（5秒），鼠标悬停暂停
- 响应式：桌面 85vh，移动 70vh

**React 组件参考**: `components/Hero.tsx`

**数据类型**: 可配置（Schema）

**Schema 配置项**:
- [Section Settings]
  - `autoplay_enabled` (checkbox): 启用自动播放，默认 true
  - `autoplay_speed` (range): 轮播速度，3-10秒，默认 5秒
  - `height_desktop` (select): 桌面高度 (70vh/85vh/100vh)
  - `height_mobile` (select): 移动高度 (60vh/70vh/80vh)
  - `overlay_opacity` (range): 遮罩透明度 0-50%，默认 10%
  - `show_thumbnails` (checkbox): 显示缩略图导航，默认 true
  - `show_indicators` (checkbox): 显示进度条，默认 true

- [Blocks: "slide" 类型，最多 6 个]
  - `image` (image_picker): 幻灯片背景图
  - `thumbnail` (image_picker): 缩略图（可选）
  - `title` (text): 主标题
  - `subtitle` (textarea): 副标题
  - `button_text` (text): 按钮文字，默认 "Explore more"
  - `button_link` (url): 按钮链接
  - `text_alignment` (select): 文字对齐 (left/center/right)
  - `text_color` (color): 文字颜色，默认白色

**技术要点**:
- CSS: 淡入淡出动画（opacity transition）
- JS: setInterval 自动轮播，鼠标事件控制暂停
- 响应式图片：使用 `| image_url: width: 1920` filter

**预计工作量**: 4-5 小时

---

#### 2. Promo Ticker Custom (`promo-ticker-custom.liquid`)

**功能描述**:
- 无限循环滚动的促销信息条
- 深绿色背景 (#004d43)
- 支持图标 + 文字组合
- CSS 动画实现无缝滚动

**React 组件参考**: `components/PromoTicker.tsx`

**数据类型**: 可配置（Schema Blocks）

**Schema 配置项**:
- [Section Settings]
  - `enabled` (checkbox): 启用滚动条，默认 true
  - `background_color` (color): 背景颜色，默认 #004d43
  - `text_color` (color): 文字颜色，默认 #ffffff
  - `speed` (range): 滚动速度 10-60秒，默认 30秒
  - `border_top` (checkbox): 显示上边框，默认 true
  - `border_bottom` (checkbox): 显示下边框，默认 true

- [Blocks: "message" 类型，最多 10 个]
  - `text` (text): 消息内容
  - `icon_type` (select): 图标类型（tag/chart/truck/shield/star/none）
  - `icon_svg` (html): 自定义 SVG 图标（可选）
  - `link` (url): 点击链接（可选）

**技术要点**:
- CSS @keyframes marquee 动画
- 内容复制 4 次保证无缝循环
- transform: translateX(-50%) 实现循环效果
- 鼠标悬停暂停: animation-play-state: paused

**预计工作量**: 2-3 小时

---

#### 3. Christmas Banner Custom (`christmas-banner-custom.liquid`)

**功能描述**:
- 季节性促销横幅
- 移动端：竖版 (aspect-ratio 3.5/4)
- 桌面端：横版 (aspect-ratio 25/9)
- 渐变遮罩保证文字可读性
- 悬停时图片放大效果

**React 代码参考**: `App.tsx` 第 108-143 行

**数据类型**: 可配置（Schema）

**Schema 配置项**:
- [Section Settings]
  - `enabled` (checkbox): 启用此 banner，默认 true
  - `background_image` (image_picker): 背景图片
  - `icon_type` (select): 图标（christmas-tree/gift/snowflake/none）
  - `title` (text): 主标题，默认 "Christmas Sale"
  - `subtitle` (textarea): 副标题
  - `button_text` (text): 按钮文字，默认 "ORDER NOW"
  - `button_link` (url): 按钮链接
  - `button_color` (color): 按钮颜色，默认 #004d43
  - `text_alignment_desktop` (select): 桌面对齐 (left/center/right)
  - `text_alignment_mobile` (select): 移动对齐 (center/left)

**技术要点**:
- 响应式 aspect-ratio 切换
- 多层渐变遮罩：`bg-gradient-to-t` (mobile) / `bg-gradient-to-r` (desktop)
- 图片 hover 放大：`group-hover:scale-105`
- 字体：Playfair Display 斜体

**预计工作量**: 2 小时

---

### Phase 2: 数据驱动型 Sections（Shopify SSR）

#### 4. Best Sellers Custom (`best-sellers-custom.liquid`)

**功能描述**:
- 展示 6 个畅销产品
- 移动端：横向滚动（拖拽）
- 桌面端：6 列网格
- 每个产品卡片包含：
  - 产品图片（白色背景）
  - 折扣标签（左上角）
  - 产品名称（可点击）
  - 发货日期（metafield）
  - 颜色选择器（最多 4 个颜色）
  - 价格（当前价 + 原价）
  - 底部政策信息（保修、退货）

**React 组件参考**: `components/BestSellers.tsx`

**数据来源**: Shopify Collection

**Schema 配置项**:
- `title` (text): Section 标题，默认 "Best seller"
- `collection` (collection): 产品集合，默认 "best-sellers"
- `products_to_show` (range): 显示数量 3-12，默认 6
- `show_vendor` (checkbox): 显示品牌，默认 false
- `show_shipping_date` (checkbox): 显示发货日期，默认 true

**Liquid 逻辑**:
```liquid
{%- assign collection = collections[section.settings.collection] -%}
{%- for product in collection.products limit: section.settings.products_to_show -%}
  - 计算折扣百分比: compare_at_price vs price
  - 获取颜色选项: product.options_with_values
  - 获取 metafield: product.metafields.custom.shipping_date
  - 渲染价格: {{ product.price | money }}
{%- endfor -%}
```

**JavaScript 功能**:
- 颜色切换器（更新图片）
- 移动端拖拽滚动
- 首个颜色默认选中

**技术要点**:
- 产品 variants 处理（颜色与图片关联）
- Metafield 配置需求: `custom.shipping_date` (single_line_text)
- 颜色 hex 映射（Black→#000000, White→#ffffff 等）
- 响应式网格：`flex lg:grid lg:grid-cols-6`

**预计工作量**: 5-6 小时

---

#### 5. Categories Custom (`categories-custom.liquid`)

**功能描述**:
- 展示 6 个产品分类
- 2 列（移动）→ 3 列（平板）→ 6 列（桌面）
- 每个分类：圆角卡片 + 图片 + 名称
- 悬停效果：阴影增强 + 图片放大

**React 组件参考**: `components/Categories.tsx`

**数据来源**: Shopify Collections

**Schema 配置项**:
- `title` (text): Section 标题，默认 "Shop by category"
- [Blocks: "category" 类型，最多 8 个]
  - `collection` (collection): 集合
  - `image` (image_picker): 自定义图片（可选，默认用集合图）
  - `title` (text): 自定义标题（可选，默认用集合名）

**Liquid 逻辑**:
```liquid
{%- for block in section.blocks -%}
  {%- assign collection = collections[block.settings.collection] -%}
  {%- assign cat_image = block.settings.image | default: collection.image -%}
  {%- assign cat_title = block.settings.title | default: collection.title -%}
{%- endfor -%}
```

**技术要点**:
- 使用 blocks 实现可配置的分类数量和顺序
- 圆角样式：`rounded-[2.5rem]`
- aspect-ratio: 1/1（正方形）
- 响应式网格：`grid-cols-2 sm:grid-cols-3 lg:grid-cols-6`

**预计工作量**: 3 小时

---

#### 6. Blog Section Custom (`blog-section-custom.liquid`)

**功能描述**:
- 展示最新的 3 篇博客文章
- 每篇文章：特色图片、标题、摘要、阅读更多链接
- 卡片式布局，3 列网格（桌面）

**React 组件参考**: `components/BlogSection.tsx`

**数据来源**: Shopify Blog

**Schema 配置项**:
- `title` (text): Section 标题，默认 "Latest Stories"
- `blog` (blog): 博客选择，默认 "news"
- `articles_to_show` (range): 显示文章数 2-6，默认 3
- `show_excerpt` (checkbox): 显示摘要，默认 true
- `show_date` (checkbox): 显示日期，默认 true
- `show_author` (checkbox): 显示作者，默认 false

**Liquid 逻辑**:
```liquid
{%- assign blog = blogs[section.settings.blog] -%}
{%- for article in blog.articles limit: section.settings.articles_to_show -%}
  {{ article.image | image_url: width: 800 }}
  {{ article.title }}
  {{ article.excerpt_or_content | strip_html | truncate: 150 }}
  {{ article.published_at | date: "%B %d, %Y" }}
{%- endfor -%}
```

**预计工作量**: 2-3 小时

---

### Phase 3: 静态内容型 Sections（写死内容）

#### 7. Feature Video Custom (`feature-video-custom.liquid`)

**功能描述**:
- 展示产品特色视频
- 支持 YouTube/Vimeo 嵌入或自托管视频
- 可选：带有标题和描述的覆盖层
- 点击播放功能

**React 组件参考**: `components/FeatureVideo.tsx`

**数据类型**: 可配置（单个视频）

**Schema 配置项**:
- `video_url` (url): YouTube/Vimeo URL
- `video_file` (video): 自托管视频文件
- `video_type` (select): 视频类型（youtube/vimeo/hosted）
- `cover_image` (image_picker): 封面图
- `title` (text): 标题（可选）
- `description` (textarea): 描述（可选）
- `autoplay` (checkbox): 自动播放，默认 false
- `loop` (checkbox): 循环播放，默认 true

**技术要点**:
- YouTube iframe API 嵌入
- 自托管视频使用 `<video>` 标签
- 播放按钮覆盖层
- 响应式视频容器（16:9 aspect-ratio）

**预计工作量**: 3 小时

---

#### 8. Reviews Custom (`reviews-custom.liquid`)

**功能描述**:
- 展示客户评价（4-6 条）
- 每条评价：头像、姓名、星级、评价内容
- 可选择：静态硬编码 或 集成第三方评价应用

**React 组件参考**: `components/Reviews.tsx`

**数据类型**: Schema Blocks（硬编码）或 第三方 App

**Schema 配置项**:
- `title` (text): Section 标题，默认 "Customer Reviews"
- `rating_source` (select): 评价来源（manual/judge.me/yotpo/loox）
- [Blocks: "review" 类型（如果选择 manual）]
  - `customer_name` (text): 客户姓名
  - `customer_avatar` (image_picker): 头像
  - `rating` (range): 星级 1-5
  - `review_text` (textarea): 评价内容
  - `review_date` (text): 日期（可选）
  - `verified` (checkbox): 已验证购买

**技术要点**:
- 星级显示：SVG 星星图标
- 如果集成第三方：使用 App Block 或 snippet include
- 响应式网格：2 列（移动）→ 3 列（桌面）

**预计工作量**: 2-3 小时

---

#### 9. Social Family Custom (`social-family-custom.liquid`)

**功能描述**:
- Instagram 风格的社交内容展示
- 包含产品快速添加功能（可选）
- 图片网格布局

**React 组件参考**: `components/SocialFamily.tsx`

**数据类型**: 混合（静态图片 + 产品快速添加）

**Schema 配置项**:
- `title` (text): Section 标题
- `subtitle` (textarea): 副标题
- `enable_quick_add` (checkbox): 启用产品快速添加，默认 false
- [Blocks: "image" 类型]
  - `image` (image_picker): 图片
  - `link` (url): 链接（可选）
  - `product` (product): 关联产品（如果启用快速添加）

**技术要点**:
- Masonry 布局 或 标准网格
- 如果启用快速添加：集成 Shopify Ajax Cart API
- Instagram 链接（可选）

**预计工作量**: 3-4 小时

---

#### 10. Help & Download Custom (`help-download-custom.liquid`)

**功能描述**:
- 帮助资源和下载中心
- 包含：用户手册、APP 下载链接、FAQ 链接等
- 图标 + 文字的卡片布局

**React 组件参考**: `components/HelpAndDownload.tsx`

**数据类型**: Schema Blocks

**Schema 配置项**:
- `title` (text): Section 标题
- `background_color` (color): 背景颜色
- [Blocks: "resource" 类型]
  - `icon_type` (select): 图标类型（download/manual/app/faq/support/custom）
  - `icon_svg` (html): 自定义 SVG（如果选择 custom）
  - `title` (text): 资源标题
  - `description` (textarea): 描述
  - `link` (url): 链接
  - `button_text` (text): 按钮文字

**预计工作量**: 2 小时

---

## 全局资源开发

### CSS 资源 (`assets/custom-*.css`)

#### `custom-base.css` (全局样式)
**内容**:
- CSS Variables 定义（品牌色、字体等）
- 工具类（hide-scrollbar, aspect-ratio 兼容等）
- 字体导入（Inter, Playfair Display）
- 全局重置和基础样式

**工作量**: 2 小时

#### `custom-animations.css` (动画库)
**内容**:
- @keyframes marquee（滚动条动画）
- @keyframes fade-in-up（淡入上升）
- Hover 效果（scale, shadow）
- Transition 定义

**工作量**: 1 小时

---

### JavaScript 资源 (`assets/custom-*.js`)

#### `custom-hero.js` (Hero 轮播)
**功能**:
- 自动轮播逻辑
- 鼠标悬停暂停
- 缩略图/指示器点击切换
- 键盘导航支持（可选）

**工作量**: 2-3 小时

#### `custom-ticker.js` (滚动条)
**功能**:
- 无缝循环滚动
- 鼠标悬停暂停
- 速度控制

**工作量**: 1 小时

#### `custom-global.js` (通用工具)
**功能**:
- 拖拽滚动（Best Sellers 移动端）
- 图片懒加载增强
- 平滑滚动锚点

**工作量**: 2 小时

---

## 模板配置

### `templates/index.json` 修改

**操作**: 替换现有的 sections 配置

**新配置结构**:
```json
{
  "sections": {
    "hero_custom": {
      "type": "hero-banner-custom",
      "blocks": {
        "slide_1": { "type": "slide", "settings": {...} },
        "slide_2": { "type": "slide", "settings": {...} },
        "slide_3": { "type": "slide", "settings": {...} },
        "slide_4": { "type": "slide", "settings": {...} }
      },
      "block_order": ["slide_1", "slide_2", "slide_3", "slide_4"],
      "settings": {
        "autoplay_enabled": true,
        "autoplay_speed": 5,
        "height_desktop": "85vh",
        "height_mobile": "70vh"
      }
    },
    "promo_ticker_custom": {
      "type": "promo-ticker-custom",
      "blocks": {
        "msg_1": { "type": "message", "settings": {"text": "BLACK FRIDAY"} },
        "msg_2": { "type": "message", "settings": {"text": "UP TO 50% OFF"} },
        "msg_3": { "type": "message", "settings": {"text": "FREE SHIPPING"} },
        "msg_4": { "type": "message", "settings": {"text": "2-YEAR WARRANTY"} }
      },
      "block_order": ["msg_1", "msg_2", "msg_3", "msg_4"]
    },
    "christmas_banner_custom": { "type": "christmas-banner-custom" },
    "best_sellers_custom": {
      "type": "best-sellers-custom",
      "settings": { "collection": "best-sellers", "products_to_show": 6 }
    },
    "categories_custom": { "type": "categories-custom" },
    "feature_video_custom": { "type": "feature-video-custom" },
    "reviews_custom": { "type": "reviews-custom" },
    "blog_section_custom": { "type": "blog-section-custom" },
    "social_family_custom": { "type": "social-family-custom" },
    "help_download_custom": { "type": "help-download-custom" }
  },
  "order": [
    "hero_custom",
    "promo_ticker_custom",
    "christmas_banner_custom",
    "best_sellers_custom",
    "categories_custom",
    "feature_video_custom",
    "reviews_custom",
    "blog_section_custom",
    "social_family_custom",
    "help_download_custom"
  ]
}
```

**工作量**: 1 小时（配置 + 测试）

---

## Shopify 后台配置需求

### 必需的数据准备

1. **Collections（集合）**:
   - `best-sellers` - 畅销产品集合
   - 6 个分类集合（City E-Bike, Foldable E-Bike, Fat Tire, Cargo, Gear, Sale）

2. **Products（产品）**:
   - 至少 6-8 个产品
   - 配置 Color 选项（variant option）
   - 每个颜色对应不同的产品图片
   - 配置 compare_at_price（划线价）

3. **Metafields（自定义字段）**:
   - `product.metafields.custom.shipping_date` (single_line_text)
     - 示例值: "within 24-hour", "November 10", "Pre-order"

4. **Blog（博客）**:
   - 创建一个 "news" 或 "stories" 博客
   - 至少 3 篇文章，带特色图片

5. **Settings（设置）**:
   - 上传品牌 Logo
   - 配置颜色方案
   - 设置字体（Inter + Playfair Display）

---

## 验收标准

### 功能性验收

- [ ] 所有 10 个 sections 可在 Theme Customizer 中添加/删除/排序
- [ ] Hero 轮播自动播放，鼠标悬停暂停
- [ ] PromoTicker 无缝循环滚动
- [ ] Best Sellers 正确显示 Shopify 产品数据
- [ ] 颜色切换器更新产品图片
- [ ] Categories 链接到正确的集合页面
- [ ] Blog Section 显示最新文章
- [ ] 所有 Schema 配置项在 Customizer 中可编辑

### 视觉验收

- [ ] 响应式布局：移动端 (375px) / 平板 (768px) / 桌面 (1440px+)
- [ ] 字体正确加载（Inter, Playfair Display）
- [ ] 品牌色 #004d43 正确应用
- [ ] 圆角样式一致（2.5rem）
- [ ] 阴影效果符合设计
- [ ] 动画流畅（无卡顿）

### 性能验收

- [ ] CSS 文件总大小 < 150KB
- [ ] JavaScript 文件总大小 < 100KB
- [ ] 首屏 LCP < 2.5s
- [ ] 所有图片使用 Shopify CDN 优化
- [ ] 懒加载正确实现

### 兼容性验收

- [ ] Chrome/Edge（最新版）
- [ ] Safari（最新版）
- [ ] Firefox（最新版）
- [ ] 移动端 Safari (iOS)
- [ ] 移动端 Chrome (Android)

---

## 风险与注意事项

### 技术风险

1. **颜色 Variant 处理复杂度**:
   - Shopify 的 variant 图片关联需要正确配置
   - 需要建立颜色名称到 hex 的映射字典
   - **缓解**: 提供详细的产品配置文档

2. **Metafield 依赖**:
   - shipping_date 需要在产品级别配置
   - **缓解**: 提供 fallback 默认值 "within 24-hour"

3. **第三方评价集成**:
   - 如果需要集成 Judge.me 等 App，需要额外配置
   - **缓解**: 先实现静态版本，后续可替换

### 浏览器兼容性

1. **CSS Grid**:
   - IE11 不支持（但 Shopify 已不支持 IE11）
   - 现代浏览器完全支持

2. **CSS Variables**:
   - 现代浏览器完全支持
   - 与主题已有的 CSS Variables 系统一致

3. **Web Components**:
   - 如果使用自定义元素，需要 polyfill（主题已包含）

---

## 开发顺序建议

### 第 1 天: 基础设施 + Hero + Ticker
1. ✅ 创建 `custom-base.css`
2. ✅ 创建 `custom-animations.css`
3. ✅ 开发 `hero-banner-custom.liquid` + `custom-hero.js`
4. ✅ 开发 `promo-ticker-custom.liquid`
5. ✅ 测试响应式和基础功能

### 第 2 天: 数据驱动型 Sections (Part 1)
1. ✅ 开发 `best-sellers-custom.liquid`
2. ✅ 实现颜色切换 JavaScript
3. ✅ 开发 `categories-custom.liquid`
4. ✅ 测试 Shopify 数据获取

### 第 3 天: 数据驱动型 Sections (Part 2) + 静态 Sections
1. ✅ 开发 `blog-section-custom.liquid`
2. ✅ 开发 `christmas-banner-custom.liquid`
3. ✅ 开发 `feature-video-custom.liquid`
4. ✅ 开发 `reviews-custom.liquid`

### 第 4 天: 剩余 Sections + 全局 JS
1. ✅ 开发 `social-family-custom.liquid`
2. ✅ 开发 `help-download-custom.liquid`
3. ✅ 创建 `custom-global.js`（拖拽滚动等）
4. ✅ 配置 `templates/index.json`

### 第 5 天: 测试 + 优化 + 文档
1. ✅ 完整功能测试（所有 sections）
2. ✅ 响应式测试（多设备）
3. ✅ 性能优化（图片、CSS/JS 压缩）
4. ✅ 编写配置文档（商家使用指南）
5. ✅ 最终验收

---

## 后续优化建议

### Phase 4: 高级功能（可选）

1. **国际化增强**:
   - 添加多语言支持到自定义 sections
   - 使用 Shopify Translation API

2. **性能优化**:
   - 图片懒加载增强（Intersection Observer）
   - Critical CSS 提取
   - JavaScript 代码分割

3. **Analytics 集成**:
   - Google Analytics 事件追踪
   - 产品点击追踪
   - 转化漏斗分析

4. **A/B 测试支持**:
   - 多版本 Hero 文案测试
   - CTA 按钮颜色测试

5. **Accessibility 增强**:
   - ARIA 标签完善
   - 键盘导航优化
   - 屏幕阅读器测试

---

## 资源清单

### 开发工具
- Shopify CLI (可选，用于本地开发)
- VS Code + Liquid 语法高亮插件
- Shopify Theme Kit (可选)

### 参考文档
- [Shopify Liquid 文档](https://shopify.dev/docs/api/liquid)
- [Shopify Section Schema 文档](https://shopify.dev/docs/themes/architecture/sections/section-schema)
- [Shopify Ajax API 文档](https://shopify.dev/docs/api/ajax)
- [现有主题代码](shopify_theme/sections/) - 作为参考模板

### 设计资源
- Inter 字体: Google Fonts
- Playfair Display 字体: Google Fonts
- 图标: 使用 SVG (现有 React 组件中提取)

---

## 成功指标

### 开发效率
- 目标: 4-5 个工作日完成
- 每个 section 平均开发时间: 2-4 小时

### 代码质量
- Liquid 模板无语法错误
- JavaScript 无 console errors
- CSS 符合 BEM 命名规范
- 所有配置项有合理的默认值

### 用户体验
- 首屏加载时间 < 2.5s
- 页面完全可交互时间 < 3.5s
- 移动端体验流畅（60fps 动画）
- Lighthouse Performance Score > 85

---

## 项目里程碑

- [ ] **Milestone 1**: 基础设施搭建完成（CSS/JS 框架）
- [ ] **Milestone 2**: 可配置型 Sections 完成（Hero, Ticker, Christmas）
- [ ] **Milestone 3**: 数据驱动型 Sections 完成（Best Sellers, Categories, Blog）
- [ ] **Milestone 4**: 静态内容型 Sections 完成（剩余 4 个）
- [ ] **Milestone 5**: 集成测试通过 + 首页上线

---

**文档版本**: v1.0
**创建日期**: 2026-01-09
**最后更新**: 2026-01-09
**负责人**: Alice
**预计完成日期**: 2026-01-14
