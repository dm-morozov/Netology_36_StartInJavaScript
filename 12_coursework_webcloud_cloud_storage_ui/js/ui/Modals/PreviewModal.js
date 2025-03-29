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
        Yandex.downloadFileByUrl(url, () => {
          console.log('Файл скачан');
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
    // // Изменяем кнопку на загрузку (с индикатором загрузки)
    // button.addClass('disabled').find('i').addClass('icon spinner loading');
    
    // // Запрос на удаление изображения через Yandex API
    // Yandex.removeFile(path, (response) => {
    //   if (response === null) {
    //     // Если удаление прошло успешно, удаляем блок с изображением
    //     button.closest('.image-preview-container').remove();
    //   } else {
    //     // Если произошла ошибка, снимаем индикатор
    //     button.removeClass('disabled').find('i').removeClass('icon spinner loading');
    //   }
    // });
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

    console.log(image.file);
    const { preview, name, created, size, path, file } = image;
    console.log('Получаем информацию о изображении', preview);
    const sizeInKb = Math.round(size / 1024);
    const formattedDate = this.formatDate(created);
    return `
      <div class="image-preview-container">
        <img src="https://downloader.disk.yandex.ru/disk/ebf8a5c20a65c0b8243dac9968c45515212a9a0043a8a227280a044b83eef79b/67e82936/iOqwoiT5Jo5s4cDwK8kYVjmE-MZg6YYVP0pd3ToKv7Dg0pvoKsLLu8tIRKaNa0tWIDsxLxL2NbGwnPagBERj9g%3D%3D?uid=1918231531&filename=_MG_7571.jpg&disposition=attachment&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1918231531&fsize=2669482&hid=7c290c4d6e20f057b87eed425503f154&media_type=image&tknv=v2&etag=6c34ee1ee9b67a7e1797ca407987429e" />
        <table class="ui celled table">
        <thead>
          <tr><th>Имя</th><th>Создано</th><th>Размер</th></tr>
        </thead>
        <tbody>
          <tr><td>${name}</td><td>${formattedDate}</td><td>${sizeInKb} Кб</td></tr>
        </tbody>
        </table>
        <div class="buttons-wrapper">
          <button class="ui labeled icon red basic button delete" data-path='${path}'>
            Удалить
            <i class="trash icon"></i>
          </button>
          <button class="ui labeled icon violet basic button download" data-file='${file}'>
            Скачать
            <i class="download icon"></i>
          </button>
        </div>
      </div>
    `;
  }
}
