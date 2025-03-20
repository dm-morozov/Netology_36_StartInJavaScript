document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('subscribe-modal');
    const closeBtn = modal.querySelector('.modal__close') || null;

    function getCookie(name) {
        const pairs = document.cookie.split('; ');
        const cookie = pairs.find(item => item.startsWith(name + '='));
        return cookie ? cookie.substring(name.length + 1) : null;
    }

    function setCookie(name, value) {
        document.cookie = name + '=' + encodeURIComponent(value) + "; max-age=31536000";
    }

    if (!modal || !closeBtn) {
        console.error('Модальное окно или кнопка закрытия не найдены');
        return;
    }

    // Открываем окно
    if(getCookie('modalClosed') !== 'true') {
        modal.classList.add('modal_active');
    }
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('modal_active');
        setCookie('modalClosed', 'true');
    });
});