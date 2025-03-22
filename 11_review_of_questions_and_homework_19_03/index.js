import { createFormContainer, createFormSimple } from "./forms/forms.js"
import { createBubbles, listenerCube } from "./bubbles/bubbles.js"
import { createRender } from "./render-cube/render.js"
import { createPostsBox, createPostElement, getPosts } from "./posts/posts.js"


const root = document.querySelector('#root')
// ----------- Блок с постами -----------
// const container = createPostsBox(root)
// const btnAdd = container.querySelector('.btn-add')
// const btnSortDown = container.querySelector('.btn-sort_down')
// // const btnAdd = container.querySelector('.btn-add')
// const listEl = container.querySelector('.post-list')

// btnAdd.addEventListener('click', onGetPost)

// const arrListPost = []

// async function onGetPost() {
//     const arrPost = await getPosts(5)
//     // console.log(arrPost);
//     arrPost.forEach(el => {
//         const box = createPostElement(el)
//         const deleteEl = box.querySelector('.post-delete')
//         deleteEl.addEventListener('click', onDeleteHandler)
//         listEl.append(box)
//     })
// }

// function onDeleteHandler(e) {
//     const parent = e.target.closest('.post-box')
//     parent.remove()
//     e.target.removeEventListener('click', onDeleteHandler)
// }

// btnSortDown.addEventListener('click', onSortDown)

// function onSortDown() {
//     const posts = [...listEl.querySelectorAll('.post-box')]
//     arrListPost.push(...posts)
//     listEl.replaceChildren()
//     console.log(arrListPost);
//     arrListPost.sort((a, b) => {
//         const textA = a.querySelector('.post-text').textContent
//         const textB = b.querySelector('.post-text').textContent
//         if(textA.length > textB.length) {
//             return -1
//         } else {
//             return 1
//         }
//     })
//     arrListPost.forEach(el => listEl.append(el))

// }


// listEl.addEventListener('click', (e) => {
//     if(!e.target.classList.contains('post-delete')) {
//         return
//     }
//     const parent = e.target.closest('.post-box')
//     parent.remove()
// })



// ----------- Двигаем прямоугольник -----------
// const container = createRender(root)

// const btn = container.querySelector('.render-btn')
// const box = container.querySelector('.render-item')
// let counter = 1

// btn.addEventListener('click', () => {
//     console.log(box);
//     counter = counter === 4 ? 1 : counter + 1
//     box.className = `render-item item-${counter}`

//     // if(counter === 4) {
//     //     box.classList.add('hidden')
//     // } else {
//     //     box.classList.remove('hidden')
//     // }

//     // box.style.left = (box.clientWidth * counter) + "px"
//     // box.style.backgroundColor = "red"
    
// })


// ----------- Эффекты всплытия и погружения -----------
// createBubbles(root)
// listenerCube()

// ----------- Блок работы с формой -----------
// const container = createFormContainer(root)
// const formBox = createFormSimple(container)

// const form = formBox.querySelector('form')
// console.log(form);
// const btnSubmit = formBox.querySelector('.submit')
// const btnReset = formBox.querySelector('.reset')

// form.addEventListener('submit', (e) => {
//     e.preventDefault()
//     console.log('Event Submit on Form');
//     form.reset()
// })

// btnSubmit.addEventListener('click', (e) => {
//     // e.preventDefault()
//     console.log('Event Click on btnSubmit');
// })

// btnReset.addEventListener('click', (e) => {
//     // e.preventDefault()
//     console.log('Event Click on btnReset');
// })

