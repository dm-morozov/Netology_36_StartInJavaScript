/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */
class SearchBlock {
  constructor( element ) {
    this.element = element; //сохраняет <div class="search-block">, переданный из App.init
    this.registerEvents();
    
  }

  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents(){
    const input = this.element.querySelector('input');
    const replaceButton = this.element.querySelector('.replace');
    const addButton = this.element.querySelector('.add');

    addButton.addEventListener('click', function(event) {
      event.preventDefault();
      const id = input.value.trim();
      if (!id) return;
          
      // Вызов VK.get
      VK.get(id, (photos) => {
        // console.log('Фотки:', photos); // Это callback, который мы передали в VK.get
        // Отрисовываем изображения
        App.imageViewer.drawImages(photos);
      });
    });

    replaceButton.addEventListener('click', function(event) {
      event.preventDefault();
      const id = input.value.trim();
      if (!id) return;

      // Очищаем все отрисованные ранее изображения
      App.imageViewer.clear();

      // Вызов VK.get
      VK.get(id, (photos) => {
        // console.log('Фотки:', photos); // Это callback, который мы передали в VK.get
        // Отрисовываем изображения
        // Передаем массив изображений (url) в функцию drawImages(images)
        App.imageViewer.drawImages(photos);
      });
    })
  }
}

if (typeof module !== 'undefined') {
  module.exports = SearchBlock;
}