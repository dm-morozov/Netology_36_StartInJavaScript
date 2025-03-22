

export const createBubbles = (root) => {
    const html =
        `<div class="cube-box">
            <div class="cube cube1">1
                <div class="cube cube2">2
                    <div class="cube cube3">3
                        <div class="cube cube4">4</div>
                    </div>
                </div>
            </div>
        </div>`
    const cubeBox = document.createElement('div')
    cubeBox.className = 'cube-box'
    cubeBox.insertAdjacentHTML('beforeend', html)
    root.append(cubeBox)
    return cubeBox
}

export const listenerCube = () => {
    const cubs = [...document.querySelectorAll('.cube')]
    cubs.forEach(el => {
        el.addEventListener('click', onClickHandler, false)
    })
}

function onClickHandler(e) {
    if (e.currentTarget.classList.contains('cube2')) {
        e.stopPropagation()
    }
    console.log(e.target);
    console.log(e.currentTarget);
    console.log(e.eventPhase);
}