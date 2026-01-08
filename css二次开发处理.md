# CSS 二次开发处理逻辑

> Shopify Theme 二次开发中的 CSS 架构设计与冲突解决方案

## 文档目的

本文档记录了在 Shopify Refresh Theme (v15.4.1) 基础上进行自定义首页开发时，如何正确处理 CSS 以避免与主题原有样式冲突，同时保持代码的可维护性和扩展性。

---

## 问题背景

### 初始错误方案

在开发初期，我们采用了以下方式：

```css
/* custom-base.css (错误示例) */
:root {
  --custom-font-body: 'Inter', sans-serif;
  --custom-font-heading: 'Playfair Display', serif;
  --custom-font-bold: 700;
  --custom-spacing-md: 1rem;
  /* ...更多变量 */
}

.custom-visually-hidden { /* 重复定义主题已有的类 */ }
.custom-truncate { /* ... */ }
```

```liquid
<!-- hero-banner-custom.liquid (错误示例) -->
{{ 'custom-base.css' | asset_url | stylesheet_tag }}
{{ 'custom-animations.css' | asset_url | stylesheet_tag }}

<!-- 如果有10个sections，会加载10次！ -->
```

### 存在的问题

#### 1️⃣ **CSS 变量冲突风险**
- 主题在 `theme.liquid` 中已定义 `--font-body-family`, `--font-heading-family`
- 我们又定义 `--custom-font-body`, `--custom-font-heading`，造成重复
- 无法利用主题的字体配置系统（settings_schema.json）

#### 2️⃣ **重复加载 CSS**
- 每个 section 都加载一次 custom-base.css
- 10 个 sections = 10 次加载
- 浪费带宽，影响性能

#### 3️⃣ **无法复用主题资源**
- 主题有 3597 行的 base.css，包含大量工具类
- 我们又重新定义了 393 行，很多是重复的
- `.visually-hidden` 主题有，我们又定义了 `.custom-visually-hidden`

#### 4️⃣ **维护困难**
- 未来主题升级时，可能与我们的自定义 CSS 产生新冲突
- 代码臃肿，不易维护

---

## 解决方案

### 核心原则

> **最小侵入原则**: 复用主题资源，只添加主题没有的，不修改主题文件

### 1. CSS 加载策略

#### ✅ 正确方式：全局加载一次

```liquid
<!-- shopify_theme/layout/theme.liquid -->
<head>
  <!-- ... 主题原有内容 ... -->

  {{ 'base.css' | asset_url | stylesheet_tag }}

  {%- comment -%} 自定义CSS - 在base.css之后加载 {%- endcomment -%}
  {{ 'custom-base.css' | asset_url | stylesheet_tag }}
  {{ 'custom-animations.css' | asset_url | stylesheet_tag }}
</head>
```

**要点**:
- 在 `theme.liquid` 中全局加载，而不是每个 section
- 加载顺序：`base.css` → `custom-base.css` → `custom-animations.css`
- 利用 CSS 层叠（Cascade）特性

#### ❌ 错误方式：每个 section 加载

```liquid
<!-- hero-banner-custom.liquid (错误) -->
{{ 'custom-base.css' | asset_url | stylesheet_tag }}  <!-- ❌ -->
{{ 'custom-animations.css' | asset_url | stylesheet_tag }}  <!-- ❌ -->
```

---

### 2. CSS 变量策略

#### ✅ 只定义主题没有的变量

```css
/* custom-base.css (正确示例) */
:root {
  /* ✅ 品牌色 - 主题没有这个具体值 */
  --custom-color-primary: #004d43;
  --custom-color-accent: #ffcc00;

  /* ✅ 扩展的圆角 - 主题最大只到 ~1rem */
  --custom-radius-2xl: 2.5rem;
  --custom-radius-full: 9999px;

  /* ✅ 自定义容器宽度 - 1550px vs 主题的 1600px */
  --custom-container-max-width: 1550px;

  /* ❌ 不要重新定义主题已有的 */
  /* --custom-font-body: ... (主题有 --font-body-family) */
  /* --custom-spacing-md: ... (直接用 1rem 即可) */
}
```

#### 🔄 复用主题变量

```css
/* 在我们的 sections 中使用 */
.hero-banner-custom__title {
  font-family: var(--font-heading-family);  /* ← 主题变量 */
  font-weight: 900;
  color: var(--custom-color-primary);       /* ← 我们的变量 */
}
```

---

### 3. 工具类策略

#### ✅ 只添加主题缺少的

```css
/* custom-base.css */

/* ✅ 主题没有 - 添加 */
.custom-hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.custom-line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ❌ 主题已有 - 不添加 */
/* .custom-visually-hidden { ... }  主题有 .visually-hidden */
```

#### 🔍 检查主题是否已有

```bash
# 检查主题是否已有某个类
grep "visually-hidden" shopify_theme/assets/base.css

# 检查主题已有的CSS变量
grep "^[[:space:]]*--" shopify_theme/layout/theme.liquid
```

---

### 4. JavaScript 引用

#### ✅ 使用主题的类名

```javascript
// custom-hero.js
const liveRegion = document.createElement('div');
liveRegion.className = 'visually-hidden';  // ✅ 使用主题的类
```

#### ❌ 创建重复的类

```javascript
// 错误示例
liveRegion.className = 'custom-visually-hidden';  // ❌ 重复
```

---

## 实施流程

### Step 1: 审查主题现有资源

```bash
# 1. 查看主题CSS变量
cat shopify_theme/layout/theme.liquid | grep -A 100 ":root {"

# 2. 查看base.css大小和内容
wc -l shopify_theme/assets/base.css
head -100 shopify_theme/assets/base.css

# 3. 搜索是否有特定的工具类
grep "visually-hidden\|truncate\|sr-only" shopify_theme/assets/base.css
```

### Step 2: 规划自定义CSS

创建一个清单：

| 需要添加的内容 | 主题是否已有 | 处理方式 |
|--------------|------------|---------|
| 字体变量 | ✅ 有 (`--font-body-family`) | 复用主题变量 |
| 品牌色 `#004d43` | ❌ 无 | 新增 `--custom-color-primary` |
| 大圆角 2.5rem | ❌ 无（最大1rem） | 新增 `--custom-radius-2xl` |
| hide-scrollbar | ❌ 无 | 新增 `.custom-hide-scrollbar` |
| visually-hidden | ✅ 有 | 使用主题的 `.visually-hidden` |

### Step 3: 精简自定义CSS

**原则**: 删除所有主题已有的，只保留新增的

```css
/* custom-base.css - 精简后 */

/* 1. 字体导入（如果主题没引入这些字体）*/
@import url('https://fonts.googleapis.com/css2?family=Inter:...');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:...');

/* 2. 只定义新变量 */
:root {
  --custom-color-primary: #004d43;
  --custom-radius-2xl: 2.5rem;
  /* 不再定义 --custom-font-* */
}

/* 3. 只定义新工具类 */
.custom-hide-scrollbar { ... }
.custom-line-clamp-2 { ... }
/* 不再定义 .custom-visually-hidden */
```

### Step 4: 更新引用

```liquid
<!-- hero-banner-custom.liquid -->

{%- comment -%}
  CSS已在theme.liquid全局加载，此处只加载JS
{%- endcomment -%}
<script src="{{ 'custom-hero.js' | asset_url }}" defer="defer"></script>

<style>
  .hero-banner-custom__title {
    font-family: var(--font-heading-family);  /* ← 改为主题变量 */
    color: var(--custom-color-primary);        /* ← 保留自定义变量 */
  }
</style>
```

### Step 5: 测试验证

```bash
# 1. 检查没有重复加载
grep "custom-base.css\|custom-animations.css" shopify_theme/sections/*.liquid
# 应该没有结果

# 2. 检查已在theme.liquid加载
grep "custom-base.css\|custom-animations.css" shopify_theme/layout/theme.liquid
# 应该有结果

# 3. 检查变量使用正确
grep "var(--custom-font" shopify_theme/sections/*.liquid
# 应该没有结果（改用--font-body-family）
```

---

## 重构前后对比

### 文件大小

| 文件 | 重构前 | 重构后 | 优化 |
|-----|--------|--------|------|
| custom-base.css | 393 行 | 220 行 | **-44%** |

### CSS 变量数量

| 类型 | 重构前 | 重构后 | 说明 |
|-----|--------|--------|------|
| 品牌色 | 8 个 | 4 个 | 保留必要的 |
| 字体相关 | 8 个 | 0 个 | **全部改用主题变量** |
| 间距 | 7 个 | 0 个 | **删除，直接用数值** |
| 圆角 | 6 个 | 2 个 | 只保留主题没有的 |
| 阴影 | 5 个 | 0 个 | 改用主题系统 |

### 工具类数量

| 类型 | 重构前 | 重构后 | 说明 |
|-----|--------|--------|------|
| 可见性 | 3 个 | 0 个 | 使用主题的 `.visually-hidden` |
| 布局 | 6 个 | 1 个 | 只保留 `.custom-container` |
| 其他 | 15+ 个 | 8 个 | 精简到必要的 |

---

## 最佳实践总结

### ✅ 应该做的

1. **全局加载 CSS** - 在 `theme.liquid` 中加载，不在每个 section
2. **复用主题变量** - 优先使用 `--font-body-family` 等主题变量
3. **使用主题类名** - 如 `.visually-hidden` 而不是创建新的
4. **添加前缀** - 自定义的用 `custom-*` 前缀，避免未来冲突
5. **只添加必要的** - 主题没有的才添加
6. **注释说明** - 标注为什么需要这个变量/类

### ❌ 不应该做的

1. **不修改主题文件** - 不要直接修改 `base.css`, `theme.liquid` 的原有内容
2. **不重复定义** - 主题有的变量/类不要重新定义
3. **不分散加载** - 不在每个 section 重复加载同一个 CSS
4. **不覆盖重要样式** - 不要覆盖主题的核心样式（除非确实需要）
5. **不使用 !important** - 除非绝对必要
6. **不删除主题代码** - 保持主题文件完整性

---

## 兼容性保证

### 主题升级安全

```
✅ 主题可安全升级
   └─ base.css 未修改
   └─ theme.liquid 只添加了3行（加载自定义CSS）
   └─ 其他主题文件完全未动

✅ 自定义CSS独立
   └─ custom-base.css 独立文件
   └─ 主题升级不影响
   └─ 可轻松回滚
```

### CSS 层叠顺序

```
1. theme.liquid <style> 内联样式 (主题配置的颜色、字体等)
   ↓
2. base.css (主题基础，3597行)
   ↓
3. custom-base.css (我们的扩展，220行)
   ↓
4. custom-animations.css (动画库)
   ↓
5. component-*.css (按需加载的组件CSS)
   ↓
6. section 内联 <style> (section特定样式)
```

**优先级**: 6 > 5 > 4 > 3 > 2 > 1

---

## 常见问题 FAQ

### Q1: 为什么不直接修改 base.css？

**答**:
- ❌ 会导致主题无法安全升级
- ❌ 未来主题更新会覆盖你的修改
- ❌ 不符合最佳实践
- ✅ 应该通过独立文件扩展

### Q2: 如何知道主题有哪些变量？

**答**:
```bash
# 查看theme.liquid中定义的变量
grep "^[[:space:]]*--" shopify_theme/layout/theme.liquid

# 查看base.css中定义的变量
grep "^[[:space:]]*--" shopify_theme/assets/base.css
```

### Q3: 我的自定义CSS没有生效怎么办？

**答**: 检查加载顺序
```liquid
<!-- theme.liquid 应该是这个顺序 -->
{{ 'base.css' | asset_url | stylesheet_tag }}
{{ 'custom-base.css' | asset_url | stylesheet_tag }}  <!-- 你的CSS -->
```

如果 custom-base.css 在 base.css 之前，可能被覆盖。

### Q4: 可以用 !important 强制覆盖吗？

**答**: 尽量避免
- ❌ 破坏CSS层叠规则
- ❌ 难以维护和调试
- ✅ 优先通过提高选择器权重
- ✅ 或调整加载顺序

### Q5: 字体怎么配置？

**答**: 通过 Shopify Admin
1. 在 Shopify Admin → Theme Settings
2. Typography → Body font → 选择 Inter
3. Typography → Heading font → 选择 Playfair Display
4. 主题会自动生成 `--font-body-family` 变量
5. 我们的 CSS 直接使用这个变量

---

## 技术债务记录

### 当前状态
- ✅ CSS 架构已优化
- ✅ 无冲突风险
- ✅ 主题可安全升级

### 未来优化方向
1. **CSS 压缩**: 生产环境可考虑压缩 custom-base.css
2. **Critical CSS**: 提取首屏CSS，内联到 head
3. **CSS Modules**: 如果项目扩大，考虑模块化方案
4. **PostCSS**: 自动添加浏览器前缀

---

## 参考资源

### Shopify 官方文档
- [Theme Architecture](https://shopify.dev/docs/themes/architecture)
- [Liquid Filters](https://shopify.dev/docs/api/liquid/filters)
- [CSS Variables Best Practices](https://shopify.dev/docs/themes/best-practices/performance/css)

### 相关文件
- `shopify_theme/layout/theme.liquid` - 主题布局，CSS全局加载点
- `shopify_theme/assets/base.css` - 主题基础CSS（3597行）
- `shopify_theme/assets/custom-base.css` - 我们的扩展CSS（220行）
- `shopify_theme/assets/custom-animations.css` - 动画库

---

## 更新日志

### 2026-01-09 - 初始重构
- 精简 custom-base.css 从 393 行到 220 行 (-44%)
- 移除重复的 CSS 变量（字体、间距、阴影等）
- 改为全局加载（theme.liquid）
- 复用主题变量和工具类
- Git commit: `ef1631f`

---

**文档版本**: v1.0
**创建日期**: 2026-01-09
**适用主题**: Shopify Refresh v15.4.1
**负责人**: Alice
