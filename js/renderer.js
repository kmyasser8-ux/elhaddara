import { dom } from './dom.js';
import { api } from './api.js';
import { updateState } from './state.js';
import { escapeHtml } from './helpers.js';
import { navigateTo } from './router.js';

export async function renderHomeScreen() {
    if (!dom.containers.categories) return;
    const categories = await api.fetchCategories();

    dom.containers.categories.innerHTML = categories.map(cat => `
        <div class="glass card-hover rounded-2xl p-6 flex flex-col justify-between cursor-pointer border border-white/5 bg-gradient-to-br ${cat.color} ${cat.border}" data-id="${cat.id}">
            <div>
                <div class="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 text-xl mb-5">
                    <i class="fas ${cat.icon}"></i>
                </div>
                <h3 class="font-['Reem_Kufi'] text-xl font-bold mb-3">${escapeHtml(cat.title)}</h3>
                <p class="text-gray-400 text-sm font-light leading-relaxed">${escapeHtml(cat.desc)}</p>
            </div>
            <div class="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-amber-500 text-sm font-medium">
                <span>تصفح الأطروحات</span>
                <i class="fas fa-chevron-left text-xs"></i>
            </div>
        </div>
    `).join('');
    
    dom.containers.categories.querySelectorAll('[data-id]').forEach(card => {
        card.addEventListener('click', () => renderCategoryScreen(card.dataset.id));
    });
    updateState({ currentView: 'view-home' });
}

export async function renderCategoryScreen(catId) {
    const categories = await api.fetchCategories();
    const currentCat = categories.find(c => c.id === catId);
    if (!currentCat) return;

    dom.categoryMeta.title.innerText = currentCat.title;
    dom.categoryMeta.desc.innerText = currentCat.desc;

    const articles = await api.fetchArticlesByScience(catId);

    if (articles.length === 0) {
        dom.containers.articles.innerHTML = `<p class="text-gray-500 col-span-full py-12 text-center font-light">لا توجد أطروحات منشورة في هذا العلم حالياً.</p>`;
    } else {
        dom.containers.articles.innerHTML = articles.map((art, index) => `
            <div class="glass card-hover rounded-2xl p-6 border border-white/5 flex flex-col justify-between cursor-pointer" data-cat="${catId}" data-index="${index}">
                <div>
                    <span class="text-xs text-amber-500/80 tracking-wider block mb-2">${escapeHtml(art.author || 'مفكر المنصة')}</span>
                    <h3 class="text-lg font-bold mb-3 leading-snug">${escapeHtml(art.title)}</h3>
                    <p class="text-gray-400 text-sm line-clamp-3 font-light leading-relaxed">${escapeHtml(art.summary || art.text)}</p>
                </div>
                <div class="mt-6 flex justify-between items-center text-xs text-gray-500">
                    <span>${art.date || 'منذ قليل'}</span>
                    <span class="text-amber-500 font-medium">اقرأ المزيد <i class="fas fa-book-open mr-1"></i></span>
                </div>
            </div>
        `).join('');

        dom.containers.articles.querySelectorAll('[data-index]').forEach(card => {
            card.addEventListener('click', () => renderArticleScreen(card.dataset.cat, card.dataset.index));
        });
    }

    updateState({ currentView: 'view-category', activeCategory: catId });
    navigateTo('view-category');
}

export async function renderArticleScreen(catId, index) {
    const articles = await api.fetchArticlesByScience(catId);
    const art = articles[index];
    if (!art) return;

    dom.articleMeta.header.innerHTML = `
        <h1 class="font-['Reem_Kufi'] text-2xl md:text-4xl font-bold mb-4 text-amber-500 leading-snug">${escapeHtml(art.title)}</h1>
        <div class="flex flex-wrap gap-4 text-xs text-gray-400 font-light">
            <span><i class="fas fa-user ml-1 text-amber-600"></i> بقلم: ${escapeHtml(art.author || 'مفكر الحضارة')}</span>
            <span><i class="fas fa-calendar-alt ml-1 text-amber-600"></i> نُشر في: ${art.date || 'اليوم'}</span>
        </div>
    `;

    dom.articleMeta.body.innerHTML = '';
    const paragraphs = art.text.split('\n').filter(p => p.trim());
    
    paragraphs.forEach(p => {
        const text = p.trim();
        if (text.startsWith('أولاً:') || text.startsWith('ثانياً:') || text.startsWith('ثالثاً:') || text.startsWith('رابعاً:')) {
            dom.articleMeta.body.innerHTML += `<h3 class="text-amber-500 font-['Reem_Kufi'] text-xl font-semibold mt-6 mb-2">${escapeHtml(text)}</h3>`;
        } else {
            dom.articleMeta.body.innerHTML += `<p class="text-gray-300 font-light text-justify leading-loose mb-4 opacity-95">${escapeHtml(text)}</p>`;
        }
    });

    updateState({ currentView: 'view-article', activeArticle: index });
    navigateTo('view-article');
}