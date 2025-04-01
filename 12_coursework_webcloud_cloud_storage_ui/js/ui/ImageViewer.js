/**
 * Класс ImageViewer
 * Используется для взаимодействием блоком изображений
 * */
class ImageViewer {
  constructor( element ) {
    this.element = element;
    this.imageList = this.element.querySelector('.images-list');
    this.imagesContainer = this.imageList.querySelector('.ui.grid .row:first-child');
    this.imagesContainer.classList.add('image-wrapper');
    this.previewImg = document.querySelector('.images-wrapper .six.wide.column img'); 
    console.log(this.previewImg)
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents(){
    // 1. Одиночный клик — меняет класс selected у изображениями
    this.imagesContainer.addEventListener('click', (event) => {
      const img = event.target.closest('img');
      if (img) {
        img.classList.toggle('selected');
        // Обновляем кнопки
        this.checkButtonText();
      }
      // console.log(img)
    });

    // 2. Двойной клик — отображает изображение в блоке предпросмотра
    this.imagesContainer.addEventListener('dblclick', (event) => {
      const img = event.target.closest('img');
      // console.log(img)
      if (img) {
        this.previewImg.src = img.src;
      }
    });

    // 3. Клик по кнопке "Выбрать все"
    const selectAllButton = this.element.querySelector('.select-all');
    selectAllButton.addEventListener('click', (event) => {
      // Получаем все изображения NodeList, 
      // нужно преобразовать в массив, чтобы использовать метод массива
      const allImage = this.imagesContainer.querySelectorAll('img');
      // Нужно понять все ли фото выделены
      const allSelected = Array.from(allImage).every(img => img.classList.contains('selected'));
      // если все (true), то снимаем выделение, если false, то на все ставим .selected
      allImage.forEach(img => {
        if (allSelected) {
          img.classList.remove('selected');
        } else {
          img.classList.add('selected');
        }
      })
      this.checkButtonText();
    })

    // 4. Клик по "Посмотреть загруженные файлы"
    const showUploadedButton = this.element.querySelector('.show-uploaded-files');
    showUploadedButton.addEventListener('click', (event) => {
      event.preventDefault();
      const previewModal = App.getModal('filePreviewer');
      previewModal.content.html('<i class="asterisk loading icon massive"></i>');
      previewModal.open();
      Yandex.getUploadedFiles((data) => {
        previewModal.showImages(data);
      }, 'NetologyVkToYandexPhoto');
    });


    // 5. Клик по "Отправить на диск"
    const uploadToDiskButton = this.element.querySelector('.send');
    uploadToDiskButton.addEventListener('click', (event) => {
      event.preventDefault();

      // 1. Получаем все выделенные изображения
      const selectedImages = this.imagesContainer.querySelectorAll('img.selected');

      // 2. Проверяем, есть ли выделенные изображения
      if (selectedImages.length === 0) {
        alert('Выберите хотя бы одно изображение');
        return;
      }

      // 3. Формируем массив объектов с путями и именами
      const imageData = Array.from(selectedImages).map(img => ({
        src: img.src,
        name: img.src.split('/').pop().split('?')[0] // Извлекаем имя файла из URL
      }));

      // 4. Получаем модальное окно загрузки
      const uploadModal = App.getModal('fileUploader');

      // 5. Открываем модальное окно
      uploadModal.open();

      // 6. Отображаем изображения в модальном окне
      uploadModal.showImages(imageData);
    });

    this.checkButtonText();
  }

  /**
   * Очищает отрисованные изображения
   */
  clear() {
    this.imagesContainer.replaceChildren();
    this.checkButtonText();
  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
    this.clear();

    images.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      img.className = 'ui image';
      this.imagesContainer.append(img);
    })

    this.checkButtonText();
  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){
    const selectAllButton = this.element.querySelector('.select-all');
    const allImages = this.imagesContainer.querySelectorAll('img');
    const sendButton = this.element.querySelector('.send');
    const selectedImages = this.imagesContainer.querySelectorAll('img.selected');

    // Если все изображения выделены, то текст кнопки должен быть "Снять выделение"
    if (selectedImages.length === allImages.length && allImages.length > 0) {
      selectAllButton.textContent = "Снять выделение";
    } else {
      selectAllButton.textContent = "Выбрать всё";
    }


    // Если есть хотя бы одно изображение, 
    // то кнопка "Отправить на диск" не должна быть disabled
    if (allImages.length > 0) {
      selectAllButton.classList.remove('disabled');
    } else {
      selectAllButton.classList.add('disabled');
    }


    // Если есть хотя бы одно изображение, 
    // то кнопка "Отправить на диск" не должна быть disabled
    if (selectedImages.length > 0) {
      sendButton.classList.remove('disabled');
    } else {
      sendButton.classList.add('disabled');
    }

  }

}