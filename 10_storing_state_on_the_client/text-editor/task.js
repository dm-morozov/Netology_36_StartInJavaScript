document.addEventListener('DOMContentLoaded', () => {
    const textEditor = document.getElementById('editor');
    const btnClear = document.getElementById('clear');

    textEditor.addEventListener('input', () => {
        localStorage.setItem('textEditor', textEditor.value);
    });

    textEditor.value = localStorage.getItem('textEditor') || '';

    btnClear.addEventListener('click', () => {
        localStorage.removeItem('textEditor');
        textEditor.value = '';
    });
});

