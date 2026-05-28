// دالة لتأمين مخرجات النصوص ومنع ثغرات الحقن الخبيثة XSS
export function escapeHtml(str) { 
    if(!str) return ''; 
    return str.replace(/[&<>]/g, m => m === '&' ? '&amp;' : (m === '<' ? '&lt;' : '&gt;')); 
}