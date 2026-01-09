# Shopify 主题部署指南

## 🎉 开发完成状态

**所有开发工作已 100% 完成！**

- ✅ 10/10 自定义 Sections
- ✅ 7 个 JavaScript 文件
- ✅ 2 个 CSS 文件
- ✅ 1 个 Snippet
- ✅ 首页模板配置

---

## 📦 已完成的文件清单

### Sections (10 个)
```
shopify_theme/sections/
├── hero-banner-custom.liquid          ✅ Hero 轮播
├── promo-ticker-custom.liquid         ✅ 促销滚动条
├── christmas-banner-custom.liquid     ✅ 季节性横幅
├── best-sellers-custom.liquid         ✅ 畅销产品
├── categories-custom.liquid           ✅ 产品分类
├── blog-section-custom.liquid         ✅ 博客文章
├── feature-video-custom.liquid        ✅ 特色视频
├── reviews-custom.liquid              ✅ 客户评价
├── social-family-custom.liquid        ✅ 社交图片
└── help-download-custom.liquid        ✅ 帮助资源
```

### Assets (10 个)
```
shopify_theme/assets/
├── custom-base.css                    ✅ 全局样式（CSS变量）
├── custom-animations.css              ✅ 动画库（@keyframes）
├── custom-utilities.css               ✅ 工具类库（800+ Tailwind风格类）⭐ NEW
├── custom-hero.js                     ✅ Hero 交互
├── custom-product-card.js             ✅ 产品卡片交互
├── custom-video.js                    ✅ 视频播放器
├── custom-reviews.js                  ✅ 评价导航
├── custom-social.js                   ✅ 社交图片交互
└── custom-global.js                   ✅ 全局工具
```

**⭐ 重要更新**: 已添加 `custom-utilities.css` 包含完整的 Tailwind 风格工具类，确保所有 sections 样式正确显示！

### Snippets (1 个)
```
shopify_theme/snippets/
└── social-product-card.liquid         ✅ 社交产品卡片
```

### Templates (1 个)
```
shopify_theme/templates/
└── index.json                         ✅ 首页配置（已整合所有 sections）
```

---

## 🚀 部署步骤

### 方法 1: 使用 Shopify CLI（推荐）

1. **安装 Shopify CLI**（如果还未安装）
   ```bash
   npm install -g @shopify/cli @shopify/theme
   ```

2. **登录到你的 Shopify 商店**
   ```bash
   shopify auth login
   ```

3. **进入主题目录**
   ```bash
   cd /home/alice/shouye/shopify_theme
   ```

4. **推送到开发主题**
   ```bash
   shopify theme push --development
   ```

5. **或者推送到线上主题（谨慎使用）**
   ```bash
   shopify theme push --live
   ```

### 方法 2: 手动上传

1. **登录 Shopify 后台**
   - 进入：在线商店 → 模板

2. **选择你的主题**
   - 点击「操作」→「编辑代码」

3. **上传 Sections**
   - 在左侧找到 `sections` 文件夹
   - 点击「添加新分区」或直接拖拽上传 10 个 `.liquid` 文件

4. **上传 Assets**
   - 在左侧找到 `assets` 文件夹
   - 点击「添加新资源」或直接拖拽上传 9 个 `.css` 和 `.js` 文件

5. **上传 Snippets**
   - 在左侧找到 `snippets` 文件夹
   - 点击「添加新代码段」上传 `social-product-card.liquid`

6. **替换 index.json**
   - 在左侧找到 `templates` → `index.json`
   - 复制 `/home/alice/shouye/shopify_theme/templates/index.json` 的全部内容
   - 粘贴替换原有内容
   - 点击「保存」

---

## ⚙️ Shopify 后台配置需求

上传文件后，你需要在 Shopify 后台进行以下配置：

### 1. 创建产品集合 (Collections)

进入：产品 → 商品系列

- **best-sellers** - 畅销产品集合（至少 6 个产品）
- **City E-Bike** - 城市电动车分类
- **Foldable E-Bike** - 折叠电动车分类
- **Fat Tire** - 大轮胎分类
- **Cargo** - 货运车分类
- **Gear** - 配件分类
- **Sale** - 促销分类

### 2. 配置产品 (Products)

确保产品包含以下设置：

- **颜色选项 (Color Option)**
  - 添加 "Color" 选项到产品变体
  - 每个颜色对应不同的产品图片

- **价格设置**
  - 设置 `compare_at_price`（划线价）以显示折扣

- **自定义字段 (Metafields)**
  - 创建 metafield: `custom.shipping_date` (类型: single_line_text)
  - 示例值: "within 24-hour", "November 10", "Pre-order"

### 3. 创建博客 (Blog)

进入：在线商店 → 博客

- 创建博客名称: "news" 或 "stories"
- 添加至少 3 篇文章
- 每篇文章需要特色图片

### 4. 上传图片资源

为以下 sections 上传图片（在主题定制器中）：

- **Hero Banner**: 4 张幻灯片背景图 + 缩略图
- **Christmas Banner**: 1 张背景图
- **Categories**: 6 张分类图片
- **Social Family**: 至少 4 张社交图片

### 5. 配置字体

进入：主题定制器 → 主题设置 → 排版

- **标题字体**: Playfair Display
- **正文字体**: Inter

---

## 🎨 主题定制器配置

文件上传完成后，在主题定制器中：

1. **进入首页编辑**
   - 在线商店 → 模板 → 自定义

2. **查看所有 Sections**
   - 你应该能看到所有 10 个自定义 sections
   - 它们都以 "Custom" 结尾，易于识别

3. **配置每个 Section**
   - Hero Banner Custom: 上传图片、编辑文案
   - Promo Ticker Custom: 编辑促销信息
   - Christmas Banner Custom: 上传背景图、编辑文案
   - Best Sellers Custom: 选择 "best-sellers" 集合
   - Categories Custom: 为每个分类选择集合和图片
   - Feature Video Custom: 粘贴 YouTube/Vimeo 链接或上传视频
   - Reviews Custom: 编辑客户评价内容
   - Blog Section Custom: 选择博客 "news"
   - Social Family Custom: 上传社交图片
   - Help & Download Custom: 添加帮助资源链接

---

## ✅ 验收检查清单

### 功能验收
- [ ] Hero 轮播自动播放，鼠标悬停暂停
- [ ] Promo Ticker 无缝循环滚动
- [ ] Best Sellers 显示正确的产品数据
- [ ] 颜色切换器更新产品图片
- [ ] Categories 链接到正确的集合页面
- [ ] Blog Section 显示最新文章
- [ ] 视频播放器正常工作
- [ ] 评价区域左右导航按钮工作
- [ ] 社交图片展开和产品快速添加功能
- [ ] 所有 sections 可在主题定制器中编辑

### 视觉验收
- [ ] 响应式布局正常（手机/平板/桌面）
- [ ] 字体正确加载（Inter + Playfair Display）
- [ ] 品牌色 #004d43 正确应用
- [ ] 圆角样式一致（2.5rem）
- [ ] 动画流畅无卡顿

### 性能验收
- [ ] 首屏加载时间 < 2.5s
- [ ] 图片正确通过 Shopify CDN 加载
- [ ] 无 JavaScript 错误（检查浏览器控制台）

---

## 🐛 常见问题排查

### 问题 1: Sections 不显示

**原因**: 文件可能未正确上传

**解决**:
1. 检查文件名是否正确（必须以 `-custom.liquid` 结尾）
2. 确认文件在 `sections` 文件夹中
3. 刷新主题编辑器页面

### 问题 2: 产品颜色切换不工作

**原因**: 产品未配置颜色选项或图片关联不正确

**解决**:
1. 确保产品有 "Color" 选项
2. 每个颜色变体有对应的产品图片
3. 图片按颜色顺序排列

### 问题 3: Best Sellers 集合为空

**原因**: 集合 handle 不匹配或集合中无产品

**解决**:
1. 确认集合 handle 为 "best-sellers"（可在集合 URL 中查看）
2. 确保集合中至少有 6 个产品
3. 在主题定制器中重新选择集合

### 问题 4: CSS 样式不生效

**原因**: CSS 文件未正确上传或缺少工具类库

**解决**:
1. ⭐ 确认 `custom-utilities.css` 已上传（最重要！包含所有样式类）
2. 确认 `custom-base.css` 和 `custom-animations.css` 已上传到 `assets` 文件夹
3. 确认 `layout/theme.liquid` 包含以下引用（第261-263行）：
   ```liquid
   {{ 'custom-base.css' | asset_url | stylesheet_tag }}
   {{ 'custom-animations.css' | asset_url | stylesheet_tag }}
   {{ 'custom-utilities.css' | asset_url | stylesheet_tag }}
   ```
4. 清除浏览器缓存（Ctrl+Shift+R 或 Cmd+Shift+R）
5. 检查浏览器控制台是否有 CSS 加载错误

### 问题 5: JavaScript 功能不工作

**原因**: JS 文件未上传或未在 theme.liquid 中引用

**解决**:
1. 确认所有 6 个 `.js` 文件已上传到 `assets` 文件夹
2. 确认 `layout/theme.liquid` 在 `</body>` 前包含以下引用（第379-384行）：
   ```liquid
   <script src="{{ 'custom-hero.js' | asset_url }}" defer="defer"></script>
   <script src="{{ 'custom-product-card.js' | asset_url }}" defer="defer"></script>
   <script src="{{ 'custom-video.js' | asset_url }}" defer="defer"></script>
   <script src="{{ 'custom-reviews.js' | asset_url }}" defer="defer"></script>
   <script src="{{ 'custom-social.js' | asset_url }}" defer="defer"></script>
   <script src="{{ 'custom-global.js' | asset_url }}" defer="defer"></script>
   ```
3. 打开浏览器控制台（F12）查看错误信息
4. 确保主题支持现代 JavaScript（ES6+）

---

## 📱 测试设备建议

### 桌面端
- Chrome（最新版）
- Safari（最新版）
- Firefox（最新版）
- Edge（最新版）

### 移动端
- iPhone Safari (iOS 14+)
- Android Chrome (Android 10+)
- 不同屏幕尺寸（375px - 428px）

### 平板
- iPad Safari
- Android Tablet Chrome

---

## 🔗 下一步行动

1. **立即行动**: 使用上述方法之一将文件部署到 Shopify
2. **配置数据**: 按照"Shopify 后台配置需求"章节设置集合、产品、博客
3. **定制内容**: 在主题定制器中上传图片和编辑文案
4. **测试验收**: 完成验收检查清单中的所有项目
5. **修复问题**: 如遇问题参考"常见问题排查"
6. **性能优化**: 压缩图片、测试加载速度
7. **正式上线**: 确认一切正常后发布主题

---

## 📞 技术支持

如有问题，可以：
- 查看 `plan.md` 了解详细的技术规格
- 查看各个 `.liquid` 文件顶部的注释了解功能说明
- 检查浏览器控制台的错误信息
- 参考 Shopify 官方文档：https://shopify.dev/docs/themes

---

**祝你部署顺利！** 🚀
