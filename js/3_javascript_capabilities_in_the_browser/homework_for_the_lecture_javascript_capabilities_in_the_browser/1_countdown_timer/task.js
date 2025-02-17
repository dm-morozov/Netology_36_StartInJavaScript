document.addEventListener('DOMContentLoaded', () => {

    const timer = document.getElementById('timer');
    let TotalSeconds = Number(timer.textContent)

    function formatTime(seconds) {
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let sec = seconds % 60;

        return [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            sec.toString().padStart(2, '0'),
        ].join(':');
    }

    timer.textContent = formatTime(TotalSeconds);

    const timerInterval = setInterval(() => {
        if (TotalSeconds >= 0) {
            timer.textContent = formatTime(TotalSeconds--);
        } else {
            // Остановить setInterval
            clearInterval(timerInterval);
            alert("Вы победили в конкурсе!");
            let result = confirm("Хочешь скачать файл с домашними работами `bhj-homeworks-master`?");
            if (result) window.location.href = 'https://github.com/netology-code/bhj-homeworks/archive/refs/heads/master.zip';
        }
    }, 1000);
        
})