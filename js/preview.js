import { escapeHtml } from './helpers.js';

// دالة توليد المعاينة الفورية للأطروحات الفكرية في لوحة التحكم
export function generateArticlePreview(title, author, text) {
    if (!text) {
        return `<p class="text-gray-500 text-sm font-light text-center py-8">محراب المعاينة: ابدأ في تدوين أفكارك الفلسفية لرؤية الإخراج فوراً هنا...</p>`;
    }

    const paragraphs = text.split('\n').filter(p => p.trim());
    let paragraphsHtml = '';

    paragraphs.forEach(p => {
        const trimmedText = p.trim();
        if (trimmedText.startsWith('أولاً:') || trimmedText.startsWith('ثانياً:') || trimmedText.startsWith('ثالثاً:') || trimmedText.startsWith('رابعاً:')) {
            paragraphsHtml += `<h3 class="text-amber-500 font-['Reem_Kufi'] text-lg font-semibold mt-6 mb-3">${escapeHtml(trimmedText)}</h3>`;
        } else {
            paragraphsHtml += `<p class="text-gray-300 font-light text-justify leading-relaxed mb-4 opacity-95">${escapeHtml(trimmedText)}</p>`;
        }
    });

    return `
        <div class="mb-6 pb-4 border-b border-white/5">
            <h1 class="font-['Reem_Kufi'] text-2xl font-bold text-amber-500 mb-2">${escapeHtml(title || 'عنوان الأطروحة الفكرية')}</h1>
            <div class="text-xs text-gray-400 font-light">بقلم: ${escapeHtml(author || 'مفكر المنصة')}</div>
        </div>
        <div class="space-y-3">${paragraphsHtml}</div>
    `;
}