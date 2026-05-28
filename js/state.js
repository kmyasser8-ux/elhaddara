// إدارة حالة الذاكرة المؤقتة أثناء التشغيل
export const state = {
    currentView: 'view-home',
    activeCategory: null,
    activeArticle: null,
    currentTheme: 'dark'
};

export function updateState(newState) {
    Object.assign(state, newState);
}