document.addEventListener('DOMContentLoaded', () => {
   
    const cookieImg = document.getElementById('cookie');
    const counterText = document.getElementById('clicker__counter');
    const speedValue = document.getElementById('clicker__speed-value');
    let lastClickTime = Date.now();

    cookieImg.setAttribute('data-size', 'small');
    cookieImg.style.transition = 'all 0.2s ease';
    
    cookie = cookieImg.addEventListener('click', () => {
        counterText.textContent = Number(counterText.textContent) + 1;

        correctTime = Date.now()
        let speedClick = correctTime - lastClickTime;
        speedValue.textContent = speedClick;
        lastClickTime = correctTime;

        console.log(speedClick);
        if (cookieImg.getAttribute('data-size') === 'small') {
            cookieImg.setAttribute('data-size', 'big');
            cookieImg.width = 240;
        } else {
            cookieImg.setAttribute('data-size', 'small');
            cookieImg.width = 200;
            
        }
    })
    console.log('')
    
});