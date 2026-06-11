
// Текущая страница
let currentPage = localStorage.getItem('currentPage') || 'page1';

// Показать страницу
function showPage(pageId) {

    // скрыть все страницы
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // показать нужную
    document.getElementById(pageId).classList.add('active');

    // сохранить состояние
    localStorage.setItem('currentPage', pageId);

    // плавная прокрутка вверх
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// восстановление страницы после обновления
document.addEventListener('DOMContentLoaded', () => {

    showPage(currentPage);

});
