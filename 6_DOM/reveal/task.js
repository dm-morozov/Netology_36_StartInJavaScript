document.addEventListener('DOMContentLoaded', () => {
    const revealBlocks = document.querySelectorAll('.reveal');
    
    function checkVisibility() {
        revealBlocks.forEach(revealBlock => {
            const {top, bottom} = revealBlock.getBoundingClientRect();
            if (bottom < 0 || top > window.innerHeight) return revealBlock.classList.remove('reveal_active')
            revealBlock.classList.add('reveal_active')
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
});