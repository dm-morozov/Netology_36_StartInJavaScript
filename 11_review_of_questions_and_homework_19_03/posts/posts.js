
export const createPostsBox = (root) => {
    const box = document.createElement('div')
    box.className = 'posts-container'
    const html =
    `<div class="posts-btn">
        <div class="post-btn btn-add">Получить</div>
        <div class="post-btn btn-sort_down">Сортировать по убыванию</div>
        <div class="post-btn btn-sort_up">Сортировать по возрастанию</div>
    </div>
    <div class="post-list"></div>`
    box.insertAdjacentHTML('beforeend', html)
    root.append(box)
    return box
}

export const createPostElement = (text) => {
    const box = document.createElement('div')
    box.className = 'post-box'
    const html = 
    `<div class="post-text">${text}</div>
    <div class="post-delete">+</div>
    `
    box.insertAdjacentHTML('beforeend', html)
    return box
}

export const getPosts = async (count) => {
    const res = await fetch(`https://fish-text.ru/get?type=paragraph&number=${count}&format=json`)
    // console.log(res);
    const data = await res.json()
    // console.log(data);
    const dataArr = data.text.split("\\n\\n", count)
    // console.log(dataArr);
    return dataArr
}