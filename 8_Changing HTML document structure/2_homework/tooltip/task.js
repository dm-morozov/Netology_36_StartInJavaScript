document.addEventListener('DOMContentLoaded', () => {
    const tooltips = document.querySelectorAll('.has-tooltip');
    // Область видимости для активной подсказки
    let activeTooltip = null;

    // Функция для удаления активной подсказки
    function removeActiveTooltip() {
        if (activeTooltip) {
            activeTooltip.tooltipDiv.remove();
            activeTooltip = null;
        }
    }

    tooltips.forEach(tooltip => {
        tooltip.addEventListener('click', function(event) {
            event.preventDefault();

            // Если кликнули по той же ссылке → закрываем подсказку
            if (activeTooltip && activeTooltip.tooltip === tooltip) {
                removeActiveTooltip();
                return;
            }

            // Если есть активная подсказка, то удаляем ее
            removeActiveTooltip();

            // Создаем подсказку
            let tooltipDiv = document.createElement('div');
            tooltipDiv.classList.add('tooltip', 'tooltip_active');
            tooltipDiv.textContent = tooltip.title;

            // Добавляем подсказку в DOM
            document.body.appendChild(tooltipDiv);
            
            // Позиционируем подсказку
            console.log(tooltip.getBoundingClientRect())
            const {left, top, width, height} = tooltip.getBoundingClientRect();
            // Узнаем позиционирование, если не задано, то внизу
            const position = tooltip.dataset.position || 'bottom';

            switch(position) {
                case 'top':
                    tooltipDiv.style.left = `${left + 5}px`;
                    tooltipDiv.style.top = `${top - tooltipDiv.offsetHeight - 3}px`;
                    break;
                case 'left':
                    tooltipDiv.style.left = `${left - tooltipDiv.offsetWidth - 3}px`;
                    tooltipDiv.style.top = `${top - 5}px`;
                    break;
                case 'right':
                    tooltipDiv.style.left = `${left + width + 3}px`;
                    tooltipDiv.style.top = `${top - 5}px`;
                    break;
                case 'bottom':
                    tooltipDiv.style.left = `${left + 5}px`;
                    tooltipDiv.style.top = `${top + height + 3}px`;
                    break;
            }      
            
            // Сохраняем активную подсказку
            activeTooltip = {tooltip, tooltipDiv}
            
        });
    });

    // Удаляем подсказку при клике вне подсказки
    document.addEventListener('click', (event) => {
        if (!event.target.classList.contains('has-tooltip')) {
            removeActiveTooltip();
        }
    })

    document.addEventListener('scroll', removeActiveTooltip);
});