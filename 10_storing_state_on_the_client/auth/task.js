document.addEventListener('DOMContentLoaded', () => {
    
    const signin = document.getElementById('signin');
    const signinForm = document.getElementById('signin__form');
    const welcome = document.getElementById('welcome');
    const userIdSpan = document.getElementById('user_id');
    const logoutBtn = document.getElementById('logout__btn');

    const storageUserId = localStorage.getItem('user_id');
    if (storageUserId) {
        showWelcome(storageUserId);
    }


    signinForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/auth', true)
        xhr.addEventListener('readystatechange', function() {
            if (this.readyState === this.DONE) {
                if (this.status === 200 || this.status ===201) {
                    const response = JSON.parse(this.responseText);
                    console.log(response);
                    if (response.success) {
                        const userId = response.user_id;
                        localStorage.setItem('user_id', userId);
                        showWelcome(userId);
                    } else {
                        alert("Неверный логин или пароль!");
                    }
                    signinForm.reset();
                } else {
                    alert("Ошибка сервера: ", this.status);
                }
            }
        })

        xhr.addEventListener('error', () => alert('Произошла ошибка сети!'));

        xhr.send(formData)
    })



    function showWelcome(userId) {
        signin.classList.remove('signin_active');
        userIdSpan.textContent = userId;
        
        welcome.classList.add('welcome_active')
    }

    logoutBtn.addEventListener('click', function (event) {
        localStorage.removeItem('user_id');
        welcome.classList.remove('welcome_active');
        signin.classList.add('signin_active');
    }, {once: true});
})