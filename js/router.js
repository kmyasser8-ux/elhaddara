import { dom } from './dom.js';

// محرك التنقل الداخلي الخفيف والسلس بدون إعادة تحميل المتصفح
export function navigateTo(viewId) {
    Object.values(dom.views).forEach(view => {
        if (view) view.classList.add('hidden');
    });
    
    // إزالة السابقة view- للتحقق من المفتاح المطابق
    const key = viewId.replace('view-', '');
    const targetView = dom.views[key];
    
    if (targetView) {
        targetView.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}