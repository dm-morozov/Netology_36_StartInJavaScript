/**
 * Класс PreviewModal
 * Используется как обозреватель загруженный файлов в облако
 */
class PreviewModal extends BaseModal {
  constructor( element ) {
    super(element);
    this.content = this.element.find('.content');
    this.registerEvents();

  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по контроллерам изображения: 
   * Отправляет запрос на удаление изображения, если клик был на кнопке delete
   * Скачивает изображение, если клик был на кнопке download
   */
  registerEvents() {
    // возвращает jQuery-объект, а не нативный DOM-элемент
    // У jQuery-объекта нет метода querySelector — это метод нативных DOM-элементов. 
    // Вместо этого нужно использовать jQuery-метод .find()
    // 1. Клик по крестику
    const closeBtnIconX = this.element.find('.header .x.icon');
    if (closeBtnIconX.length) {
      closeBtnIconX.css('cursor', 'pointer');
      console.log(closeBtnIconX);
      closeBtnIconX.on('click', () => {
        this.close();
      });
    }

    // Обработчик событий для кнопок внутри модалки
    this.content.on('click', (event) => {
      const target = $(event.target);
      
      // Клик по кнопке "Удалить"
      if (target.hasClass('delete')) {
        const path = target.data('path');
        this.deleteImage(path, target);
      }

      // Клик по кнопке "Скачать"
      if (target.hasClass('download')) {
        const file = target.data('file');
        this.downloadImage(file);
      }
    });
  }

  /**
   * Скачивает изображение
   */
  downloadImage(file) {
    Yandex.getDownloadLink(file, (url) => {
      if (url) {
        Yandex.downloadFileByUrl(url, (error) => {
          if (!error) {
            console.log('Файл скачан');
          } else {
            console.log('Ошибка скачивания:', error);
          }
        });
      } else {
        console.log('Ошибка: не получена ссылка для скачивания');
      }
    });
  }

  /**
   * Удаляет изображение с диска
   */
  deleteImage(path, button) {
    button.addClass('disabled').find('i').removeClass('trash').addClass('spinner loading');
    Yandex.removeFile(path, (error) => {
      if (!error) {
        button.closest('.image-preview-container').remove();
        console.log(`Файл ${path} удалён`);
        if (this.content.find('.image-preview-container').length === 0) {
          this.close(); // Закрываем модалку, если файлов больше нет
        }
      } else {
        button.removeClass('disabled').find('i').removeClass('spinner loading').addClass('trash');
      }
    });
  }


  /**
   * Отрисовывает изображения в блоке всплывающего окна
   */
  showImages(images) {
    // Очистить текущие изображения
    this.content.empty(); // jQuery метод для очистки содержимого

    // Добавить новые изображения
    console.log('Добавляем изображения в модальное окно', images); 
    const imagesMarkup = images.map(image => this.getImageInfo(image)).join('');

    // Вставляем полученную разметку в модальное окно
    this.content.html(imagesMarkup);
  }
  

  /**
   * Форматирует дату в формате 2021-12-30T20:40:02+00:00(строка)
   * в формат «30 декабря 2021 г. в 23:40» (учитывая временной пояс)
   * */
  formatDate(date) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };
    const formattedDate = new Date(date).toLocaleDateString('ru-RU', options);
    return formattedDate;
  }

  /**
   * Возвращает разметку из изображения, таблицы с описанием данных изображения и кнопок контроллеров (удаления и скачивания)
   */
  getImageInfo(image) {
    const { preview, name, created, size, path } = image; // Убираем file, используем path
    const sizeInKb = Math.round(size / 1024);
    const formattedDate = this.formatDate(created);
    console.log('Получаем информацию о изображении:', preview);

    return `
      <div class="image-preview-container">
        <img src="${preview}" />
        <table class="ui celled table">
          <thead>
            <tr><th>Имя</th><th>Создано</th><th>Размер</th></tr>
          </thead>
          <tbody>
            <tr><td>${name}</td><td>${formattedDate}</td><td>${sizeInKb} Кб</td></tr>
          </tbody>
        </table>
        <div class="buttons-wrapper">
          <button class="ui labeled icon red basic button delete" data-path="${path}">
            Удалить
            <i class="trash icon"></i>
          </button>
          <button class="ui labeled icon violet basic button download" data-file="${path}">
            Скачать
            <i class="download icon"></i>
          </button>
        </div>
      </div>
    `;
  }
}
