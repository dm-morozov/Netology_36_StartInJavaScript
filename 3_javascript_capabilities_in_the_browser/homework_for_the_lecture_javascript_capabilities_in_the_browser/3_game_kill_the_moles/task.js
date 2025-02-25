(() => {
    let playing = true,
      activeHole = 1;
  
      const deadHoles = document.getElementById('dead'),
      lostHoles = document.getElementById('lost'),
      getHole = index => document.getElementById(`hole${index}`),
      deactivateHole = index => getHole( index ).className = 'hole',
      activateHole = index => getHole( index ).className = 'hole hole_has-mole',
      holeGame = document.getElementById('hole-game');
  
      //Получаем активную лунку (работает некорректно, считает лунку с классом hole_has-mole как активную)
      // const holeElement = getHole(activeHole);
  
      // holeElement.addEventListener('click', () => {
      //   deadHoles.textContent = Number(deadHoles.textContent) + 1;
      //   console.log(deadHoles.textContent);
      // });
  
  
      // Инициализация игры, добавление обработчика клика на holeGame
      holeGame.addEventListener('click', () => {
        if (!playing) { // Если игра завершена
          stop('Ну что?');
        }
      });
  
      const refresh = () => {
        deadHoles.textContent = 0;
        lostHoles.textContent = 0;
        playing = true;
        next();
      }
  
      
      const stop = (message = '') => {
        playing = false;
        setTimeout(() => {
          let restart = confirm(message + " Сыграем снова?");
          console.log(restart);
          restart ? refresh() : alert('Спасибо за игру!');
        }, 0)
      };
  
  
      // Добавляем обработчики событий на все лунки (один раз)
      for (let i = 1; i <= 9; i++) {
  
        getHole(i).addEventListener('click', function() {
          if (this.classList.contains('hole_has-mole')) {
            deadHoles.textContent = Number(deadHoles.textContent) + 1;
          } else {
            lostHoles.textContent = Number(lostHoles.textContent) + 1;
          }
        });
  
      }
  
  
      const next = () => setTimeout(() => {
        if (!playing) return;
  
        deactivateHole( activeHole );
        activeHole = Math.floor( 1 + Math.random() * 9 );
        activateHole( activeHole );
  
        if (Number(deadHoles.textContent) >= 10) {
          stop('Вы победили в конкурсе!');
          return;
        } else if (Number(lostHoles.textContent) >= 5) {
          stop('Вы проиграли в конкурсе!');
          return;
        }
  
        next();
      }, 800 );
  
    next();
  })();
  