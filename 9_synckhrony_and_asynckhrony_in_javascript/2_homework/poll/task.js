document.addEventListener('DOMContentLoaded', () => {
    const titlePoll = document.getElementById('poll__title');
    const answersPollContainer = document.getElementById('poll__answers');


    // Функция для отображения ответов
    function renderAnswersPoll(pollData) {
        answersPollContainer.innerHTML = '';
        titlePoll.textContent = pollData.data.title;
        
        pollData.data.answers.forEach((answer, index) => {
            const answerEl = document.createElement('button');
            answerEl.classList.add('poll__answer');
            answerEl.textContent = answer;

            answerEl.addEventListener('click', () => {
                console.log('id вопроса:', pollData.id, '; Индекс ответа:',  index);
                sendVote(pollData.id, index);
            })
            answersPollContainer.appendChild(answerEl);
        })
    }

    // Функция для отправки голоса
    function sendVote(voteID, answerIndex) {
        const xhrPost = new XMLHttpRequest();
        xhrPost.open( 'POST', 'https://students.netoservices.ru/nestjs-backend/poll' );
        xhrPost.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
        
        xhrPost.addEventListener('readystatechange', function() {
            if (this.readyState === this.DONE) {
                console.log('POST Статус:', this.status);
                console.log('POST Ответ:', this.responseText);

                if (this.status === 201) {
                    try {
                        const result = JSON.parse(this.responseText);
                        showResults(result.stat);
                        alert('Спасибо, ваш голос засчитан!')
                    } catch (error) {
                        console.log('Ошибка в парсинге:', error);
                    }
                }
            }
        })
        
        xhrPost.send(`vote=${voteID}&answer=${answerIndex}`);
    }

    // Функция для отображения результатов
    function showResults (result) {
        console.log(result);
        if(document.querySelector('.poll__result')) {
            document.querySelector('.poll__result').remove();
        }
        const resultContainer = document.createElement('div');
        resultContainer.classList.add('poll__result');
        answersPollContainer.parentElement.insertAdjacentElement('beforeend', resultContainer);

        // Считаем общее количество голосов
        const totalVotes = result.reduce((sum, item) => sum + item.votes, 0);

        result.forEach(item => {
            const resultAnswer = document.createElement('div');
            resultAnswer.classList.add('poll__result-answer');

            const percentage = (item.votes / totalVotes * 100).toFixed(2);
            resultAnswer.textContent = `${item.answer}: ${item.votes} голосa (ов) — ${percentage}%`;

            resultContainer.appendChild(resultAnswer);
        })

        document.querySelectorAll('.poll__answer').forEach(answer => {
            answer.disabled = true;
            answer.classList.add('poll__answer_disabled');
        })

        const refreshButton = document.createElement('button');
        refreshButton.classList.add('poll__result-refresh');
        refreshButton.textContent = 'Обновить';
        refreshButton.addEventListener('click', () => {
            loadPoll();
        })
        resultContainer.appendChild(refreshButton);
    }

    // Функция для загрузки опроса
    function loadPoll() {
        if(document.querySelector('.poll__result')) {
            document.querySelector('.poll__result').remove();
        }
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () => {
            if(xhr.readyState === xhr.DONE) {
                if (xhr.status === 200) {
                    const pollData = JSON.parse(xhr.responseText);
                    console.log('Полученные данные:', pollData);
                    renderAnswersPoll(pollData)
                } else {
                    console.log('Ошибка', xhr.status);
                }
            }
        });
    
        xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll', true);
        xhr.send();
    }

    // Загрузка опроса
    loadPoll();

});