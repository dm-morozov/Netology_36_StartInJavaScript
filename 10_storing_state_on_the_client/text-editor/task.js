document.addEventListener('DOMContentLoaded', () => {
    const textEditor = document.getElementById('editor');
    const btnClear = document.getElementById('clear');
    
    textEditor.value = localStorage.getItem('textEditor') || '';

    textEditor.addEventListener('input', () => {
        localStorage.setItem('textEditor', textEditor.value);
    });


    btnClear.addEventListener('click', () => {
        localStorage.removeItem('textEditor');
        textEditor.value = '';
    });
});

