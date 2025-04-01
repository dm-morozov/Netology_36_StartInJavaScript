/**
 * Класс FileUploaderModal
 * Используется как всплывающее окно для загрузки изображений
 */
class FileUploaderModal extends BaseModal {
  constructor(element) {
    super(element);
    this.content = this.element.find('.content'); // Блок содержимого модалки
    this.imageContainers = this.content.find('.image-preview-container'); // Для отслеживания состояния
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по кнопке "Закрыть" на всплывающем окне, закрывает его
   * 3. Клик по кнопке "Отправить все файлы" на всплывающем окне, вызывает метод sendAllImages
   * 4. Клик по контроллерам изображения: 
   *    - Убирает ошибку, если клик был по полю ввода
   *    - Отправляет одно изображение, если клик был по кнопке отправки
   */
  registerEvents() {
    // 1. Клик по крестику
    const closeBtnIconX = this.element.find('.header .x.icon');
    if (closeBtnIconX.length) {
      closeBtnIconX.css('cursor', 'pointer');
      closeBtnIconX.on('click', () => this.close());
    }

    // 2. Клик по кнопке "Закрыть"
    const closeBtn = this.element.find('.actions .close.button');
    if (closeBtn.length) {
      closeBtn.on('click', () => this.close());
    }

    // 3. Клик по кнопке "Отправить все файлы"
    const sendAllBtn = this.element.find('.actions .send-all.button');
    if (sendAllBtn.length) {
      sendAllBtn.on('click', () => this.sendAllImages());
    }

    // 4. Обработчик кликов по телу модалки
    this.content.on('click', (event) => {
      const target = $(event.target);

      // Клик по полю ввода — убираем ошибку
      if (target.is('input')) {
        target.closest('.input').removeClass('error');
      }

      // Клик по кнопке отправки изображения
      if (target.is('button') && target.find('.upload.icon').length) {
        const container = target.closest('.image-preview-container');
        this.sendImage(container);
      }
    });
  }

  /**
   * Отображает все полученные изображения в теле всплывающего окна
   */
  showImages(images) {
    // Убеждаемся, что все элементы — объекты с src и name
    const formattedImages = images.map(item => ({
      src: item.src,
      name: item.name // Используем уже очищенное имя из ImageViewer
    }));
  
    // Меняем порядок на противоположный
    const reversedImages = formattedImages.reverse();
  
    // Формируем разметку
    const imagesMarkup = reversedImages.map(image => this.getImageHTML(image)).join('');
    this.content.html(imagesMarkup);
  
    // Обновляем ссылку на контейнеры после вставки
    this.imageContainers = this.content.find('.image-preview-container');
  }

  /**
   * Формирует HTML разметку с изображением, полем ввода для имени файла и кнопкой загрузки
   */
  getImageHTML(item) {
    const defaultPath = `disk:/NetologyVkToYandexPhoto/${item.name || 'image.jpg'}`;
    return `
      <div class="image-preview-container">
        <img src="${item.src}" />
        <div class="ui action input">
          <input type="text" placeholder="Путь к файлу" value="${defaultPath}" />
          <button class="ui button"><i class="upload icon"></i></button>
        </div>
      </div>
    `;
  }

  /**
   * Отправляет все изображения в облако
   */
  sendAllImages() {
    this.imageContainers.each((_, container) => {
      this.sendImage($(container));
    });
  }

  /**
   * Валидирует изображение и отправляет его на сервер
   */
  sendImage(imageContainer) {
    const inputBlock = imageContainer.find('.input');
    const input = inputBlock.find('input');
    const path = input.val().trim();
    const imgSrc = imageContainer.find('img').attr('src');

    // 1. Валидация пути
    if (!path) {
      inputBlock.addClass('error');
      return;
    }

    // 2. Блокируем поле ввода
    inputBlock.addClass('disabled');

    // 3. Отправка на Яндекс.Диск
    Yandex.uploadFile(path, imgSrc, (error) => {
      if (!error) {
        // Удаляем контейнер
        imageContainer.remove();
        // Проверяем, остались ли изображения
        if (this.content.find('.image-preview-container').length === 0) {
          this.close();
        }
      } else {
        // При ошибке разблокируем поле
        inputBlock.removeClass('disabled');
      }
    });
  }
}