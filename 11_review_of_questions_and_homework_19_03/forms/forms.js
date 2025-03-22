
export const createFormContainer = (root) => {
    const container = document.createElement('div')
    container.className = 'form-container'
    root.append(container)
    return container
}

export const createFormSimple = (container) => {
    const html = 
    `<h3>Простая форма</h3>
    <form>
        <input type="text" name="text1">
        <input type="button" class="btn-form submit" value="ok">
        <input type="reset" class="btn-form reset">
    </form>`

    const formBox = document.createElement('div')
    formBox.className = 'form-box'
    formBox.insertAdjacentHTML('beforeend', html)
    container.append(formBox)
    return formBox
}

export const createFormClassic = (container) => {
    const html = 
    `<h3>Простая форма</h3>
    <form>
        <input type="text" name="text1">
        <input type="text" name="text2">
        <input type="text" name="text3">
        <input type="submit" class="btn-form" value="ok">
        <input type="reset" class="btn-form">
    </form>`

    const formBox = document.createElement('div')
    formBox.className = 'form-box'
    formBox.insertAdjacentHTML('beforeend', html)
    container.append(formBox)
    return formBox
}