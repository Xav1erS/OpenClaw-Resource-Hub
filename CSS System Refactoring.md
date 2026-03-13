给 Trae 的完整执行方案

第一部分：官网设计要素精确提取markdown【OpenClaw官网设计要素提取】

1. **配色方案精确值**
  - 主背景色：#0B0E14（深靛蓝色，接近纯黑但偏蓝）
  - 导航栏背景：#111827（深黑蓝色）
  - 卡片背景：#1F2937（深灰蓝色）
  - 卡片悬浮背景：#374151（悬浮时颜色稍亮）
  - 主文字：#FFFFFF（纯白）
  - 副标题文字：#9CA3AF（浅灰色）
  - 强调色：#F97316（橙色，用于CTA按钮）
  - 图标颜色：#60A5FA（蓝色）、#F97316（橙色）、#34D399（绿色）、#FBBF24（黄色）
2. **字体系统精确值**
  - 字体族：Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  - 主标题字号：32px-48px（桌面），24px-32px（移动端）
  - 副标题字号：14px-16px
  - 正文字号：14px-16px
  - 数字字号：24px-36px（用于高亮数据）
  - 字重：400（常规）、500（中等）、600（半粗）、700（粗体）
3. **组件尺寸精确值**
  - 导航栏高度：64px（桌面）、56px（移动端）
  - 卡片圆角：12px（rounded-xl）
  - 按钮圆角：8px（rounded-lg）
  - 输入框圆角：8px（rounded-lg）
  - 卡片内边距：24px（p-6）
  - 卡片间距：16px-24px（gap-4或gap-6）
  - 容器最大宽度：1280px（max-w-7xl）
  - 侧边距：16px-32px（px-4或px-8）
4. **阴影系统精确值**
  - 卡片默认阴影：box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)
  - 卡片悬浮阴影：box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
  - 导航栏阴影：box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
5. **背景星点肌理精确实现**
  - 使用CSS radial-gradient创建多个白色小圆点
  - 背景颜色：#0B0E14
  - 星点颜色：rgba(255, 255, 255, 0.3)（30%透明度）
  - 星点大小：1px-2px
  - 星点分布：随机分布，但固定位置（避免每次渲染不同）
  - 背景重复：background-size: 200px 200px（每200x200px重复一次）

第二部分：完整CSS代码（复制到全局样式文件）css/* ========================================
   OpenClaw Design System - 全局样式
   复制到项目的 global.css 或 styles.css
   ======================================== */

/* ========================================  
   OpenClaw Design System - 全局样式  
   复制到项目的 global.css 或 styles.css  
   ======================================== */*  
  
*/* 1. 背景星点肌理 */*  
*.openclaw-bg {*  
  *background-color: #0B0E14;*  
  *background-image: *  
    *radial-gradient(1px 1px at 10% 10%, rgba(255, 255, 255, 0.3), transparent),*  
    *radial-gradient(1px 1px at 20% 80%, rgba(255, 255, 255, 0.3), transparent),*  
    *radial-gradient(1px 1px at 60% 40%, rgba(255, 255, 255, 0.3), transparent),*  
    *radial-gradient(1px 1px at 80% 20%, rgba(255, 255, 255, 0.3), transparent),*  
    *radial-gradient(2px 2px at 40% 60%, rgba(255, 255, 255, 0.2), transparent),*  
    *radial-gradient(1px 1px at 90% 90%, rgba(255, 255, 255, 0.3), transparent);*  
  *background-size: 200px 200px;*  
  *background-attachment: fixed;*  
  *min-height: 100vh;*  
*}*  
  
*/* 2. 导航栏样式 */*  
*.openclaw-nav {*  
  *background-color: #111827;*  
  *box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);*  
  *height: 64px;*  
  *backdrop-filter: blur(8px);*  
*}*  
  
*/* 3. 卡片基础样式 */*  
*.openclaw-card {*  
  *background-color: #1F2937;*  
  *border-radius: 12px;*  
  *padding: 24px;*  
  *box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);*  
  *transition: all 0.3s ease;*  
  *cursor: pointer;*  
*}*  
  
*.openclaw-card:hover {*  
  *background-color: #374151;*  
  *box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);*  
  *transform: translateY(-4px);*  
*}*  
  
*/* 4. 按钮样式 */*  
*.openclaw-btn {*  
  *background-color: #F97316;*  
  *color: white;*  
  *padding: 10px 24px;*  
  *border-radius: 8px;*  
  *font-weight: 600;*  
  *transition: all 0.2s ease;*  
  *border: none;*  
  *cursor: pointer;*  
  *display: inline-flex;*  
  *align-items: center;*  
  *gap: 8px;*  
*}*  
  
*.openclaw-btn:hover {*  
  *background-color: #EA580C;*  
  *transform: scale(1.02);*  
*}*  
  
*.openclaw-btn:active {*  
  *transform: scale(0.98);*  
*}*  
  
*/* 5. 输入框样式 */*  
*.openclaw-input {*  
  *background-color: #1F2937;*  
  *border: 1px solid #374151;*  
  *color: white;*  
  *padding: 12px 16px;*  
  *border-radius: 8px;*  
  *font-size: 14px;*  
  *transition: all 0.2s ease;*  
*}*  
  
*.openclaw-input:focus {*  
  *outline: none;*  
  *border-color: #60A5FA;*  
  *box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);*  
*}*  
  
*/* 6. 文字颜色 */*  
*.openclaw-text-primary {*  
  *color: #FFFFFF;*  
*}*  
  
*.openclaw-text-secondary {*  
  *color: #9CA3AF;*  
*}*  
  
*.openclaw-text-accent {*  
  *color: #F97316;*  
*}*  
  
*/* 7. 图标颜色 */*  
*.icon-blue {*  
  *color: #60A5FA;*  
*}*  
  
*.icon-orange {*  
  *color: #F97316;*  
*}*  
  
*.icon-green {*  
  *color: #34D399;*  
*}*  
  
*.icon-yellow {*  
  *color: #FBBF24;*  
*}*  
  
*/* 8. 字体大小 */*  
*.text-lg-title {*  
  *font-size: 32px;*  
  *font-weight: 700;*  
  *line-height: 1.2;*  
*}*  
  
*.text-md-subtitle {*  
  *font-size: 14px;*  
  *font-weight: 400;*  
  *color: #9CA3AF;*  
  *line-height: 1.6;*  
*}*  
  
*.text-body {*  
  *font-size: 14px;*  
  *color: #E5E7EB;*  
  *line-height: 1.6;*  
*}*  
  
*.text-number {*  
  *font-size: 36px;*  
  *font-weight: 700;*  
  *color: #FFFFFF;*  
*}*  
  
*/* 9. 响应式调整 */*  
*@media (max-width: 640px) {*  
  *.openclaw-nav {*  
    *height: 56px;*  
  *}*  
  **  
  *.text-lg-title {*  
    *font-size: 24px;*  
  *}*  
  **  
  *.openclaw-card {*  
    *padding: 16px;*  
  *}*  
*}*  
  
*/* 10. 动画 */  
@keyframes fadeIn {  
  from {  
    opacity: 0;  
    transform: translateY(20px);  
  }  
  to {  
    opacity: 1;  
    transform: translateY(0);  
  }  
}  
  
.animate-fadeIn {  
  animation: fadeIn 0.3s ease-in-out;  
}



第三部分：Tailwind配置（更新tailwind.config.js）


// tailwind.config.js  
module.exports = {  
  content: [  
    "./index.html",  
    "./src/ **/*.{js,ts,jsx,tsx}",  
    "./pages/** /*.{js,ts,jsx,tsx}",  
    "./components/ **/*.{js,ts,jsx,tsx}",  
  ],  
  theme: {  
    extend: {  
      colors: {  
        // OpenClaw品牌色  
        'openclaw-bg': '#0B0E14',  
        'openclaw-nav': '#111827',  
        'openclaw-card': '#1F2937',  
        'openclaw-card-hover': '#374151',  
        'openclaw-primary': '#F97316',  
        'openclaw-accent': '#60A5FA',  
          
        // 文字颜色  
        'openclaw-text': '#FFFFFF',  
        'openclaw-text-secondary': '#9CA3AF',  
      },  
      fontFamily: {  
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],  
      },  
      fontSize: {  
        'lg-title': ['32px', { lineHeight: '1.2', fontWeight: '700' }],  
        'md-subtitle': ['14px', { lineHeight: '1.6', fontWeight: '400' }],  
        'number': ['36px', { lineHeight: '1', fontWeight: '700' }],  
      },  
      borderRadius: {  
        'card': '12px',  
        'btn': '8px',  
      },  
      boxShadow: {  
        'card': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',  
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',  
      },  
    },  
  },  
  plugins: [],  
}



第四部分：首页完整HTML模板（复制即用）html



```
 <!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OpenClaw 资源中心</title>
  <!-- Tailwind CSS (CDN版本，生产环境建议使用npm) -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts - Inter -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <!-- 自定义CSS -->
  <link rel="stylesheet" href="global.css">
  <!-- Tailwind配置 -->
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            'openclaw-bg': '#0B0E14',
            'openclaw-nav': '#111827',
            'openclaw-card': '#1F2937',
            'openclaw-card-hover': '#374151',
            'openclaw-primary': '#F97316',
            'openclaw-accent': '#60A5FA',
            'openclaw-text': '#FFFFFF',
            'openclaw-text-secondary': '#9CA3AF',
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
          },
        }
      }
    }
  </script>
</head>
<body class="openclaw-bg min-h-screen">
  
  <!-- 导航栏 -->
  <nav class="openclaw-nav fixed top-0 left-0 right-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <span class="text-white font-bold text-xl">🦞 OpenClaw 资源中心</span>
        </div>
        
        <!-- 导航链接（桌面端） -->
        <div class="hidden md:flex items-center space-x-8">
          <a href="/" class="text-white hover:text-openclaw-accent transition-colors">首页</a>
          <a href="/templates" class="text-white hover:text-openclaw-accent transition-colors">模板库</a>
          <a href="/cost-calculator" class="text-white hover:text-openclaw-accent transition-colors">成本计算</a>
          <a href="/workflows" class="text-white hover:text-openclaw-accent transition-colors">工作流</a>
          <a href="/tools" class="text-white hover:text-openclaw-accent transition-colors">工具</a>
          <a href="/tutorials" class="text-white hover:text-openclaw-accent transition-colors">教程</a>
        </div>
        
        <!-- 语言选择 -->
        <div class="flex items-center">
          <button class="text-white hover:text-openclaw-accent transition-colors flex items-center gap-2">
            <span>CN 中文</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- 主内容区 -->
  <main class="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      
      <!-- 核心标题区 -->
      <div class="text-center mb-12 animate-fadeIn">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
          OpenClaw 一站式资源聚合平台
        </h1>
        <p class="text-lg text-openclaw-text-secondary max-w-2xl mx-auto">
          任务模板、成本计算、工作流展示、小工具、教程社区，应有尽有
        </p>
      </div>

      <!-- 快速导航网格（2行3列） -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        
        <!-- 卡片1：首页 -->
        <div class="openclaw-card animate-fadeIn" style="animation-delay: 0.1s;">
          <div class="flex items-start gap-4">
            <!-- 图标：房屋 -->
            <div class="icon-blue">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-white font-semibold text-lg mb-2">首页</h3>
              <p class="text-openclaw-text-secondary text-sm">欢迎来到OpenClaw资源中心</p>
            </div>
          </div>
        </div>

        <!-- 卡片2：模板库 -->
        <div class="openclaw-card animate-fadeIn" style="animation-delay: 0.2s;">
          <div class="flex items-start gap-4">
            <!-- 图标：堆叠文件 -->
            <div class="icon-orange">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-white font-semibold text-lg mb-2">模板库</h3>
              <p class="text-openclaw-text-secondary text-sm">50+精选任务模板</p>
            </div>
          </div>
        </div>

        <!-- 卡片3：成本计算 -->
        <div class="openclaw-card animate-fadeIn" style="animation-delay: 0.3s;">
          <div class="flex items-start gap-4">
            <!-- 图标：钱袋 -->
            <div class="icon-yellow">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-white font-semibold text-lg mb-2">成本计算</h3>
              <p class="text-openclaw-text-secondary text-sm">预估Token成本</p>
            </div>
          </div>
        </div>

        <!-- 卡片4：工作流 -->
        <div class="openclaw-card animate-fadeIn" style="animation-delay: 0.4s;">
          <div class="flex items-start gap-4">
            <!-- 图标：刷新箭头 -->
            <div class="icon-green">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-white font-semibold text-lg mb-2">工作流</h3>
              <p class="text-openclaw-text-secondary text-sm">50+工作流展示</p>
            </div>
          </div>
        </div>

        <!-- 卡片5：工具 -->
        <div class="openclaw-card animate-fadeIn" style="animation-delay: 0.5s;">
          <div class="flex items-start gap-4">
            <!-- 图标：扳手锤子 -->
            <div class="text-gray-400">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-white font-semibold text-lg mb-2">工具</h3>
              <p class="text-openclaw-text-secondary text-sm">实用小工具箱</p>
            </div>
          </div>
        </div>

        <!-- 卡片6：教程 -->
        <div class="openclaw-card animate-fadeIn" style="animation-delay: 0.6s;">
          <div class="flex items-start gap-4">
            <!-- 图标：书本 -->
            <div class="icon-blue">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-white font-semibold text-lg mb-2">教程</h3>
              <p class="text-openclaw-text-secondary text-sm">从入门到精通</p>
            </div>
          </div>
        </div>

      </div>

      <!-- 热门资源 & 最新数据（2列布局） -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- 热门资源 -->
        <div class="openclaw-card animate-fadeIn" style="animation-delay: 0.7s;">
          <div class="flex items-center gap-3 mb-4">
            <svg class="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"></path>
            </svg>
            <h3 class="text-white font-semibold text-lg">热门资源</h3>
          </div>
          <p class="text-openclaw-text-secondary text-sm">
            市场调研 Agent 使用 12.5k 次
          </p>
        </div>

        <!-- 最新数据 -->
        <div class="openclaw-card animate-fadeIn" style="animation-delay: 0.8s;">
          <div class="flex items-center gap-3 mb-4">
            <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <h3 class="text-white font-semibold text-lg">最新数据</h3>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-openclaw-text-secondary text-sm">社区 Workflow</span>
            <span class="text-white font-bold text-xl">5,420</span>
          </div>
        </div>

      </div>

    </div>
  </main>

</body>
</html>
```





第五部分：组件代码（卡片、按钮、输入框）

  
#### **卡片组件（通用）**

<!-- 基础卡片 -->  
<div class="openclaw-card">  
  <div class="flex items-start gap-4">  
    <!-- 图标（彩色） -->  
    <div class="icon-blue">  
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>  
      </svg>  
    </div>  
    <!-- 内容 -->  
    <div>  
      <h3 class="text-white font-semibold text-lg mb-2">卡片标题</h3>  
      <p class="text-openclaw-text-secondary text-sm">卡片描述文字</p>  
    </div>  
  </div>  
</div>  
  
<!-- 带点击跳转的卡片 -->  
<a href="/target-page" class="openclaw-card block">  
  <div class="flex items-start gap-4">  
    <div class="icon-blue">  
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>  
      </svg>  
    </div>  
    <div>  
      <h3 class="text-white font-semibold text-lg mb-2">卡片标题</h3>  
      <p class="text-openclaw-text-secondary text-sm">卡片描述文字</p>  
    </div>  
  </div>  
</a>



#### **按钮组件**

<!-- 主按钮（橙色） -->  
<button class="openclaw-btn">  
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>  
  </svg>  
  开始计算  
</button>  
  
<!-- 次要按钮（边框样式） -->  
<button class="border-2 border-openclaw-primary text-openclaw-primary px-4 py-2 rounded-lg font-semibold hover:bg-openclaw-primary hover:text-white transition-all">  
  查看详情  
</button>  
  
<!-- 图标按钮 -->  
<button class="p-2 rounded-lg hover:bg-openclaw-card-hover transition-colors">  
  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">  
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>  
  </svg>  
</button>



#### **输入框组件**

<!-- 文本输入框 -->  
<input type="text"   
       placeholder="输入内容"   
       class="openclaw-input w-full">  
  
<!-- 数字输入框 -->  
<input type="number"   
       placeholder="输入数字"   
       class="openclaw-input w-full">  
  
<!-- 下拉选择框 -->  
<select class="openclaw-input w-full">  
  <option value="">选择模型</option>  
  <option value="gpt-4o">GPT-4o</option>  
  <option value="claude-opus">Claude Opus</option>  
  <option value="deepseek-v3">DeepSeek V3</option>  
</select>  
  
<!-- 文本域 -->  
<textarea placeholder="输入多行文本"  
          class="openclaw-input w-full h-32 resize-none"></textarea>




第六部分：实施步骤（按顺序执行）plaintext【实施步骤 - 按顺序执行】

Step 1：创建/更新全局样式文件

- 创建文件：global.css（如果不存在）
- 将"第二部分：完整CSS代码"中的内容复制到global.css
- 在HTML中引入：

Step 2：更新Tailwind配置

- 找到tailwind.config.js文件
- 将"第三部分：Tailwind配置"中的内容复制到tailwind.config.js
- 重启开发服务器（如果运行中）

Step 3：重构首页

- 打开首页文件（通常是index.html或pages/index.html）
- 将"第四部分：首页完整HTML模板"中的内容复制，覆盖原有首页
- 保存并预览，检查是否与官网首页一致

Step 4：优化Cost Calculator页面

- 打开Cost Calculator页面文件
- 使用"第五部分：组件代码"中的样式
- 输入框使用openclaw-input类
- 结果卡片使用openclaw-card类
- 按钮使用openclaw-btn类
- 确保颜色、圆角、阴影与首页一致

Step 5：优化Task Library页面

- 打开Task Library页面文件
- 模板卡片使用openclaw-card类
- 图标使用彩色图标（icon-blue、icon-orange等）
- 复制按钮使用openclaw-btn类
- 确保布局与首页快速导航一致

Step 6：优化Workflow Gallery页面

- 打开Workflow Gallery页面文件
- 工作流卡片使用openclaw-card类
- 图标使用彩色图标
- 确保与Task Library页面样式一致

Step 7：优化导航栏

- 找到导航栏组件（可能在所有页面）
- 使用"第四部分"中的导航栏代码
- 确保导航项链接正确（首页、模板库、成本计算、工作流、工具、教程）
- 确保语言选择按钮存在

Step 8：测试与修复

- 在不同浏览器中测试（Chrome、Safari、Firefox）
- 在不同设备中测试（桌面、平板、手机）
- 检查颜色一致性（所有页面使用相同的颜色值）
- 检查布局一致性（卡片圆角、阴影、间距）
- 检查响应式布局（移动端单列，桌面端多列）
- 修复发现的问题

Step 9：性能优化（可选）

- 检查页面加载速度（使用Lighthouse）
- 优化图片资源（压缩、WebP格式）
- 启用代码压缩和缓存
- 确保首屏加载时间<2秒

Step 10：部署上线

- 提交代码到版本控制
- 部署到生产环境（Vercel/Netlify）
- 在生产环境测试所有功能
- 监控错误日志
- 收集用户反馈

第七部分：常见问题解决方案markdown【常见问题解决方案】

问题1：背景星点不显示  
原因：CSS代码未正确引入或优先级被覆盖  
解决方案：

1. 检查global.css是否正确引入到HTML中
2. 确保openclaw-bg类应用到body或主容器
3. 检查是否有其他背景样式覆盖（使用!important提升优先级）

问题2：颜色不一致  
原因：不同页面使用了不同的颜色值  
解决方案：

1. 检查所有页面的颜色值是否一致（#0B0E14、#111827等）
2. 使用Tailwind的自定义颜色（openclaw-bg、openclaw-card等）
3. 避免硬编码颜色值，统一使用CSS类

问题3：卡片悬浮效果不工作  
原因：transition属性未正确设置或JavaScript冲突  
解决方案：

1. 检查.openclaw-card:hover选择器是否存在
2. 确保transition属性设置正确（transition: all 0.3s ease）
3. 检查是否有JavaScript事件监听器阻止了悬浮效果

问题4：移动端布局错乱  
原因：响应式断点设置不正确或flex/grid布局问题  
解决方案：

1. 检查Tailwind的响应式断点（sm:、md:、lg:）
2. 确保使用grid-cols-1 md:grid-cols-2 lg:grid-cols-3
3. 检查卡片宽度是否设置为100%（w-full）
4. 检查是否有固定宽度设置（避免使用固定像素）

问题5：字体不显示  
原因：Google Fonts未加载或字体族设置错误  
解决方案：

1. 检查Google Fonts链接是否正确引入
2. 检查font-family设置是否正确（Inter, -apple-system等）
3. 检查网络连接（确保可访问fonts.googleapis.com）
4. 备选方案：下载字体文件到本地

问题6：图标不显示  
原因：SVG路径错误或颜色类未正确应用  
解决方案：

1. 检查SVG路径是否完整
2. 确保图标容器应用了颜色类（icon-blue、icon-orange等）
3. 检查SVG的fill和stroke属性设置
4. 使用在线SVG验证工具检查SVG代码

问题7：按钮点击无反应  
原因：JavaScript事件未绑定或CSS pointer-events问题  
解决方案：

1. 检查JavaScript事件监听器是否正确绑定
2. 检查CSS的pointer-events属性（设置为auto）
3. 检查是否有其他元素遮挡按钮（z-index问题）
4. 使用浏览器开发者工具检查元素可点击性

问题8：输入框无法输入  
原因：disabled属性未移除或readonly属性设置  
解决方案：

1. 检查input标签是否有disabled或readonly属性
2. 检查JavaScript是否禁用了输入框
3. 检查CSS的user-select属性（设置为text）
4. 检查是否有覆盖层遮挡输入框

问题9：Tailwind样式不生效  
原因：Tailwind配置未正确加载或CDN版本问题  
解决方案：

1. 检查tailwind.config.js是否正确配置
2. 检查Tailwind CDN链接是否正确引入
3. 重启开发服务器
4. 清除浏览器缓存
5. 使用npm安装Tailwind（如果CDN有问题）

问题10：页面空白  
原因：HTML结构错误或JavaScript运行时错误  
解决方案：

1. 检查浏览器开发者工具的Console标签（查看错误信息）
2. 检查HTML标签是否正确闭合
3. 检查JavaScript语法错误
4. 检查网络请求是否成功（检查CDN资源加载）
5. 逐步排查（注释掉部分代码，定位问题）

