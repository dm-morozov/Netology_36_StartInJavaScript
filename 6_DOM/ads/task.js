document.addEventListener('DOMContentLoaded', () => {
    const rotators = document.querySelectorAll('.rotator');
    let speed = 1000;

    function checkVisivility() {

        rotators.forEach(rotator => {
            const rotatorCase = document.querySelector('.rotator__case.rotator__case_active');
            rotatorCase.classList.remove('rotator__case_active');
            
            let nextElement;
            if (rotatorCase.nextElementSibling) {
                nextElement = rotatorCase.nextElementSibling;
            } else {
                nextElement = rotator.firstElementChild;
            }

            nextElement.classList.add('rotator__case_active');
            nextElement.style.color = nextElement.dataset.color;
            speed = parseInt(nextElement.dataset.speed, 10) || 1000;
            console.log('Элемент на странице: ', nextElement);
            setTimeout(checkVisivility, speed);
        });
    }
    checkVisivility()
});