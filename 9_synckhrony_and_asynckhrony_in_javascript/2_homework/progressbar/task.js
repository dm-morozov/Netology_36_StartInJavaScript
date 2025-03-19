document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];
    console.log(file);
    const progressBar = document.getElementById('progress');

    if (!file) alert('Выберите файл');

    // Создаём объект FormData для отправки файла
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload", true);

    // Отслеживаем прогресс загрузки
    xhr.upload.addEventListener('progress', function(event) {
        if (event.lengthComputable) {
            const percentComplete = event.loaded / event.total;
            progressBar.value = percentComplete;
            console.log(`Прогресс: ${Math.round(percentComplete * 100)}%`);
        }
    })

    xhr.send(formData);
});