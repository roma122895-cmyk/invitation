// Показать нужную страницу
function showPage(pageId) {

    // скрыть все страницы
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // показать нужную
    document.getElementById(pageId).classList.add('active');

    // сохранить текущую страницу
    localStorage.setItem('currentPage', pageId);

    // прокрутить наверх
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// Восстановление страницы после обновления
document.addEventListener('DOMContentLoaded', () => {

    const currentPage = localStorage.getItem('currentPage');

    if (currentPage && document.getElementById(currentPage)) {

        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        document.getElementById(currentPage).classList.add('active');

    }

});
