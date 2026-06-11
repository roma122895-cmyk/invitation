
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
let historyStack = [];

function showPage(pageId) {

    const activePage = document.querySelector('.page.active');

    if (activePage) {
        historyStack.push(activePage.id);
    }

    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    document.getElementById(pageId).classList.add('active');

    currentPage = pageId;

    localStorage.setItem('currentPage', currentPage);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

function historyBack() {

    if (historyStack.length === 0)
        return;

    const prevPage = historyStack.pop();

    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    document.getElementById(prevPage).classList.add('active');

    currentPage = prevPage;

    localStorage.setItem('currentPage', currentPage);

}
