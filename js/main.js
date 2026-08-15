// ========== Mobile Navigation Toggle ==========
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
        });
    }
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks) {
                navLinks.classList.remove('open');
            }
        });
    });
    
    // ========== Active Navigation Link ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.nav-links a');
    navLinksAll.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
    
    // ========== Sidebar Active Link ==========
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
    
    // ========== Tab Switching ==========
    const tabs = document.querySelectorAll('.tab');
    
    function showTabContent(target) {
        const tabContents = document.querySelectorAll('.tab-content');
        if (target === 'all') {
            // "All Heroes" - 显示所有阵营
            tabContents.forEach(content => {
                content.style.display = 'block';
            });
        } else {
            // 单个阵营 - 隐藏所有，只显示目标
            tabContents.forEach(content => {
                content.style.display = 'none';
            });
            const targetContent = document.getElementById(target);
            if (targetContent) {
                targetContent.style.display = 'block';
            }
        }
    }
    
    // 页面加载时初始化：根据当前激活的tab显示对应内容
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
        showTabContent(activeTab.getAttribute('data-tab'));
    }
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabGroup = this.closest('.tabs');
            const target = this.getAttribute('data-tab');
            
            // Deactivate all tabs in group
            tabGroup.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            showTabContent(target);
        });
    });
    
    // ========== Smooth Scroll for Anchor Links ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ========== Footer Year ==========
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
    
    // ========== Copy to Clipboard (for codes/commands) ==========
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const text = targetElement.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                });
            }
        });
    });
    
    // ========== Theme Toggle (Dark/Light) ==========
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
    
    function updateThemeIcon(theme) {
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
            themeToggle.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
        }
    }
    
    // ========== Language Selector Dropdown ==========
    const langBtn = document.querySelector('.lang-selector-btn');
    const langDropdown = document.querySelector('.lang-dropdown');
    
    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            langDropdown.classList.toggle('open');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!langDropdown.contains(e.target) && e.target !== langBtn) {
                langDropdown.classList.remove('open');
            }
        });
    }
    
    // ========== Dynamic Language Switcher (auto-inject) ==========
    // 从html标签的lang属性读取当前语言（比URL解析更可靠，兼容file://和线上）
    const langDirs = ['en', 'zh', 'ko', 'ru', 'ja'];
    const rawLang = (document.documentElement.lang || 'en').toLowerCase();
    // 规范化：zh-CN -> zh, en-US -> en, ko-KR -> ko 等
    const currentLang = rawLang.split('-')[0];
    
    // 如果是支持的语言，生成语言切换器
    if (langDirs.includes(currentLang)) {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle && !document.querySelector('.lang-selector')) {
            // 获取当前页面文件名（从URL路径解析）
            const pathParts = window.location.pathname.split('/');
            let currentPage = 'index.html';
            for (let i = 0; i < pathParts.length; i++) {
                if (langDirs.includes(pathParts[i])) {
                    currentPage = pathParts.slice(i + 1).join('/') || 'index.html';
                    break;
                }
            }
            
            // 判断是否在根目录（路径中没有语言目录）
            const inRoot = !pathParts.some(part => langDirs.includes(part));
            const prefix = inRoot ? '' : '../';
            
            const langNames = {
                'en': 'EN',
                'zh': '中文',
                'ko': '한국어',
                'ru': 'RU',
                'ja': '日本語'
            };
            
            const langFullNames = {
                'en': 'English',
                'zh': '中文',
                'ko': '한국어',
                'ru': 'Русский',
                'ja': '日本語'
            };
            
            // 构建语言切换器HTML（使用相对路径，兼容本地file://和线上部署）
            let dropdownHtml = '';
            langDirs.forEach(lang => {
                const activeClass = lang === currentLang ? 'active' : '';
                let href;
                if (lang === 'en' && currentPage === 'index.html') {
                    // 首页的英文版本指向根目录
                    href = inRoot ? 'index.html' : '../index.html';
                } else {
                    href = `${prefix}${lang}/${currentPage}`;
                }
                dropdownHtml += `<a href="${href}" class="${activeClass}">${langFullNames[lang]}</a>`;
            });
            
            const selectorHtml = `
                <div class="lang-selector">
                    <button class="lang-selector-btn">
                        <span>${langNames[currentLang]}</span>
                        <span>▼</span>
                    </button>
                    <div class="lang-dropdown">
                        ${dropdownHtml}
                    </div>
                </div>
            `;
            
            // 插入到主题切换按钮后面
            themeToggle.insertAdjacentHTML('afterend', selectorHtml);
            
            // 绑定事件
            const newLangBtn = document.querySelector('.lang-selector-btn');
            const newLangDropdown = document.querySelector('.lang-dropdown');
            
            if (newLangBtn && newLangDropdown) {
                newLangBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    newLangDropdown.classList.toggle('open');
                });
                
                document.addEventListener('click', function(e) {
                    if (!newLangDropdown.contains(e.target) && e.target !== newLangBtn) {
                        newLangDropdown.classList.remove('open');
                    }
                });
            }
        }
    }
});

// ========== Utility Functions ==========

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Debounce function (for search/filter)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Simple search filter for list pages
function filterList(searchInputId, listItemClass) {
    const searchInput = document.getElementById(searchInputId);
    const items = document.querySelectorAll('.' + listItemClass);
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', debounce(function() {
        const searchTerm = this.value.toLowerCase();
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }, 200));
}
