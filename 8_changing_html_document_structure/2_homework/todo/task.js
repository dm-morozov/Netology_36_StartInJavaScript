document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('tasks__form');
    const tasksInput = document.getElementById('task__input');
    const taskList = document.getElementById('tasks__list');

    let taskArray = JSON.parse(localStorage.getItem('tasks')) || [];

    taskArray.forEach(taskText => addTask(taskText));
    console.log(taskArray)

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(taskArray));
    }

    function addTask(taskText) {
        const task = document.createElement('div');
        task.classList.add('task');
        task.innerHTML = `
            <div class="task__title">
                ${taskText}
            </div>
            <a href="#" class="task__remove">&times;</a>
        `;
        taskList.appendChild(task);
        
        task.querySelector('.task__remove').addEventListener('click', () => {
            taskArray = taskArray.filter(item => item !== taskText);
            saveTasks();
            task.remove();
        })
    }



    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const taskText = tasksInput.value.trim();
        if (!taskText) return;

        taskArray.push(taskText);
        saveTasks();

        addTask(taskText);
        tasksInput.value = '';
    })

});