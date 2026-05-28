// مستودع الكاش المركزي لكافة عناصر الـ DOM لتفادي تكرار البحث في الصفحة
export const dom = {
    views: {
        home: document.getElementById('view-home'),
        category: document.getElementById('view-category'),
        article: document.getElementById('view-article')
    },
    containers: {
        categories: document.getElementById('categories-container'),
        articles: document.getElementById('articles-container')
    },
    categoryMeta: {
        title: document.getElementById('cat-title'),
        desc: document.getElementById('cat-desc')
    },
    articleMeta: {
        header: document.getElementById('article-header'),
        body: document.getElementById('article-body')
    },
    controls: {
        themeBtn: document.getElementById('themeBtn'),
        navLogo: document.getElementById('nav-logo'),
        backButtons: document.querySelectorAll('.back-btn')
    }
};