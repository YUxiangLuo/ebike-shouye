#!/bin/bash

echo "=========================================="
echo "🔍 Shopify 主题部署前检查"
echo "=========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0
WARNINGS=0

# Check function
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅${NC} $2"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}❌${NC} $2 (文件缺失: $1)"
        ((FAILED++))
        return 1
    fi
}

check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅${NC} $2"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}❌${NC} $2 (目录缺失: $1)"
        ((FAILED++))
        return 1
    fi
}

echo "📁 检查主题目录结构..."
echo "---"
check_dir "shopify_theme/sections" "Sections 目录"
check_dir "shopify_theme/assets" "Assets 目录"
check_dir "shopify_theme/snippets" "Snippets 目录"
check_dir "shopify_theme/templates" "Templates 目录"
check_dir "shopify_theme/config" "Config 目录"
echo ""

echo "🎨 检查配置文件（配色方案）..."
echo "---"
check_file "shopify_theme/config/settings_schema.json" "settings_schema.json (配色方案定义)"
check_file "shopify_theme/config/settings_data.json" "settings_data.json (配色方案数据)"

# Check color schemes in settings_data.json
if [ -f "shopify_theme/config/settings_data.json" ]; then
    SCHEME_COUNT=$(grep -o '"scheme-[0-9]"' shopify_theme/config/settings_data.json | sort -u | wc -l)
    if [ "$SCHEME_COUNT" -ge 1 ]; then
        echo -e "${GREEN}✅${NC} 配色方案数量: $SCHEME_COUNT 个"
        ((PASSED++))
    else
        echo -e "${RED}❌${NC} 配色方案数量: 0 个（需要至少 1 个）"
        ((FAILED++))
    fi
fi
echo ""

echo "📦 检查自定义 Sections (10/10)..."
echo "---"
check_file "shopify_theme/sections/hero-banner-custom.liquid" "1. Hero Banner Custom"
check_file "shopify_theme/sections/promo-ticker-custom.liquid" "2. Promo Ticker Custom"
check_file "shopify_theme/sections/christmas-banner-custom.liquid" "3. Christmas Banner Custom"
check_file "shopify_theme/sections/best-sellers-custom.liquid" "4. Best Sellers Custom"
check_file "shopify_theme/sections/categories-custom.liquid" "5. Categories Custom"
check_file "shopify_theme/sections/blog-section-custom.liquid" "6. Blog Section Custom"
check_file "shopify_theme/sections/feature-video-custom.liquid" "7. Feature Video Custom"
check_file "shopify_theme/sections/reviews-custom.liquid" "8. Reviews Custom"
check_file "shopify_theme/sections/social-family-custom.liquid" "9. Social Family Custom"
check_file "shopify_theme/sections/help-download-custom.liquid" "10. Help & Download Custom"
echo ""

echo "🎨 检查 CSS 资源 (2/2)..."
echo "---"
check_file "shopify_theme/assets/custom-base.css" "custom-base.css (全局样式)"
check_file "shopify_theme/assets/custom-animations.css" "custom-animations.css (动画库)"
echo ""

echo "⚡ 检查 JavaScript 资源 (6/6)..."
echo "---"
check_file "shopify_theme/assets/custom-hero.js" "custom-hero.js (Hero 交互)"
check_file "shopify_theme/assets/custom-product-card.js" "custom-product-card.js (产品卡片)"
check_file "shopify_theme/assets/custom-video.js" "custom-video.js (视频播放器)"
check_file "shopify_theme/assets/custom-reviews.js" "custom-reviews.js (评价导航)"
check_file "shopify_theme/assets/custom-social.js" "custom-social.js (社交图片)"
check_file "shopify_theme/assets/custom-global.js" "custom-global.js (全局工具)"
echo ""

echo "🧩 检查 Snippets (1/1)..."
echo "---"
check_file "shopify_theme/snippets/social-product-card.liquid" "social-product-card.liquid"
echo ""

echo "📄 检查模板配置 (1/1)..."
echo "---"
check_file "shopify_theme/templates/index.json" "index.json (首页配置)"

# Check if index.json contains our custom sections
if [ -f "shopify_theme/templates/index.json" ]; then
    CUSTOM_SECTIONS=$(grep -o '"type": "[a-z-]*-custom"' shopify_theme/templates/index.json | wc -l)
    if [ "$CUSTOM_SECTIONS" -ge 10 ]; then
        echo -e "${GREEN}✅${NC} 首页包含 $CUSTOM_SECTIONS 个自定义 sections"
        ((PASSED++))
    else
        echo -e "${YELLOW}⚠️${NC} 首页仅包含 $CUSTOM_SECTIONS 个自定义 sections（期望 10 个）"
        ((WARNINGS++))
    fi
fi
echo ""

echo "=========================================="
echo "📊 检查结果汇总"
echo "=========================================="
echo -e "${GREEN}✅ 通过: $PASSED${NC}"
if [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}⚠️  警告: $WARNINGS${NC}"
fi
if [ $FAILED -gt 0 ]; then
    echo -e "${RED}❌ 失败: $FAILED${NC}"
fi
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 所有检查通过！主题已准备好部署到 Shopify。${NC}"
    echo ""
    echo "下一步："
    echo "  1. 使用 Shopify CLI: shopify theme push --development"
    echo "  2. 或手动上传到 Shopify 后台"
    echo "  3. 查看 DEPLOYMENT_GUIDE.md 获取详细步骤"
    echo ""
    exit 0
else
    echo -e "${RED}⚠️  发现 $FAILED 个问题，请先解决后再部署。${NC}"
    echo ""
    exit 1
fi
