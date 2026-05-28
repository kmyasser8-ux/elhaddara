import { getCategories, getArticlesByCat } from './storage.js';

// معزل الشبكة والبيانات لمحاكاة جلب البيانات بشكل غير متزامن وآمن (Async Layer)
export const api = {
    async fetchCategories() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(getCategories()), 30);
        });
    },
    async fetchArticlesByScience(catId) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(getArticlesByCat(catId)), 30);
        });
    }
};