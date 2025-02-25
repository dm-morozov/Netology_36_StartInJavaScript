// 1️⃣ Найти все выполненные задачи (чекбокс с checked) и вывести их в консоль.

const completedTasks = document.querySelectorAll('input[type="checkbox"]:checked');
console.log(`Выполнено задач: ${completedTasks.length}`);
// completedTasks.forEach(task => {
//     const taskItem = task.closest('li');
//     taskText = taskItem.querySelector('span').textContent;
//     console.log(taskText)
// });

const taskText = [...completedTasks].map(task => {
    const taskItem = task.closest('li');
    return taskItem.querySelector('span').textContent;
});

console.log(taskText);

// 2️⃣ Найти первую невыполненную (input[type="checkbox"]:not(:checked)) и изменить её текст.

const outstandingTask = document.querySelectorAll('input[type="checkbox"]:not(:checked)');

console.log("Невополненных задач:", outstandingTask.length);

const textOutstandingTask = [...outstandingTask].map(task => {
    const itemLi = task.closest('li');
    return itemLi.querySelector('span');
})

// Нашли все невыполненные задачи и вывели первую:
console.log(textOutstandingTask[0].textContent);

// Теперь изменим ее:

if (textOutstandingTask.length) {
    textOutstandingTask[0].textContent = 'Изменяем невыполненную задачу'; 
} else {
    console.log("Нет нувыполненных задач");
}
console.log(textOutstandingTask[0].textContent);

// 3️⃣ Найти последнюю задачу в списке и удалить её (эмулировать клик по кнопке "Удалить").
function removeLastTask() {
    const actionDelete = document.querySelectorAll('.delete');
    actionDelete.forEach(action => {
        action.addEventListener('click', () => {
            action.closest('li').remove();
        })
    })
}

removeLastTask();

// 4️⃣ Добавить новую задачу "Выучить JavaScript" при клике на кнопку "Добавить задачу".

const addTask = document.querySelector('#addTask');


addTask.addEventListener('click', () => {
    const newTask = document.createElement('li');
    const inputText = document.querySelector('#taskInput');

    newTask.innerHTML = `
        <input type="checkbox">
        <span>${inputText.value}</span>
        <button class="delete">Удалить</button>
    `;
    document.querySelector('ul').appendChild(newTask);
    inputText.value = '';
    removeLastTask();
})
