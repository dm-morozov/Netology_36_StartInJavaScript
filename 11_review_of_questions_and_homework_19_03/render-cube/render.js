
export const createRender = (root) => {
    const html = 
    `<div class="render-btn">Переместить</div>
    <div class="render-box">
        <div class="render-item item-1"></div>
    </div>`
    const container = document.createElement('div')
    container.className = 'render-container'
    container.insertAdjacentHTML('beforeend', html)
    root.append(container)
    return container
}