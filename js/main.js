function app() {
    return {
        currentPage: 'home',
        mobileMenuOpen: false,
        currentLang: 'zh',
        languageChanging: false,
        langDropdownOpen: false,
        
        get pages() {
            const t = translations[this.currentLang];
            return [
                { id: 'home', name: t.pages.home, icon: '🏠', description: this.currentLang === 'zh' ? '欢迎来到OpenClaw资源中心' : 'Welcome to OpenClaw Resource Hub' },
                { id: 'task-library', name: t.pages.taskLibrary, icon: '📚', description: this.currentLang === 'zh' ? '50+精选任务模板' : '50+ curated task templates' },
                { id: 'cost-calculator', name: t.pages.costCalculator, icon: '💰', description: this.currentLang === 'zh' ? '预估Token成本' : 'Estimate token costs' },
                { id: 'workflows', name: t.pages.workflows, icon: '🔄', description: this.currentLang === 'zh' ? '50+工作流展示' : '50+ workflow showcase' },
                { id: 'tools', name: t.pages.tools, icon: '🛠️', description: this.currentLang === 'zh' ? '实用小工具箱' : 'Useful toolbox' },
                { id: 'tutorials', name: t.pages.tutorials, icon: '📖', description: this.currentLang === 'zh' ? '从入门到精通' : 'From beginner to expert' },
                { id: 'community', name: t.pages.community, icon: '👥', description: this.currentLang === 'zh' ? '连接开发者' : 'Connect with developers' }
            ];
        },
        
        get t() {
            return translations[this.currentLang];
        },
        
        get languages() {
            return [
                { code: 'zh', name: '中文', flag: '🇨🇳' },
                { code: 'en', name: 'English', flag: '🇺🇸' }
            ];
        },
        
        get currentLanguageName() {
            const lang = this.languages.find(l => l.code === this.currentLang);
            return lang ? lang.name : '';
        },
        
        get currentLanguageFlag() {
            const lang = this.languages.find(l => l.code === this.currentLang);
            return lang ? lang.flag : '';
        },
        
        switchLanguage(lang) {
            if (lang === this.currentLang) {
                this.langDropdownOpen = false;
                return;
            }
            
            this.languageChanging = true;
            this.langDropdownOpen = false;
            
            setTimeout(() => {
                this.currentLang = lang;
                localStorage.setItem('openclaw-lang', lang);
                document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
                
                setTimeout(() => {
                    this.languageChanging = false;
                }, 300);
            }, 150);
        },
        
        toggleLangDropdown() {
            this.langDropdownOpen = !this.langDropdownOpen;
        },
        
        init() {
            const savedLang = localStorage.getItem('openclaw-lang');
            if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
                this.currentLang = savedLang;
                document.documentElement.lang = savedLang === 'zh' ? 'zh-CN' : 'en';
            }
            
            const hash = window.location.hash.slice(1);
            if (hash && this.pages.some(p => p.id === hash)) {
                this.currentPage = hash;
            }
            
            this.$watch('currentPage', (page) => {
                window.location.hash = page;
            });
            
            window.addEventListener('hashchange', () => {
                const hash = window.location.hash.slice(1);
                if (hash && this.pages.some(p => p.id === hash)) {
                    this.currentPage = hash;
                }
            });
            
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.lang-dropdown')) {
                    this.langDropdownOpen = false;
                }
            });
            
            this.createStars();
        },
        
        createStars() {
            const starsContainer = document.getElementById('stars');
            if (!starsContainer) return;
            
            const starCount = 150;
            
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                
                const size = Math.random() * 3 + 1;
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                const delay = Math.random() * 3;
                const duration = Math.random() * 2 + 2;
                
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.left = `${x}%`;
                star.style.top = `${y}%`;
                star.style.animationDelay = `${delay}s`;
                star.style.animationDuration = `${duration}s`;
                
                starsContainer.appendChild(star);
            }
        }
    }
}
