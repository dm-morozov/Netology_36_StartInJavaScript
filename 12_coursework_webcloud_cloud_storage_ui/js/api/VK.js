/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {
  // ACCESS_TOKEN теперь лежит в файле config.js
  static lastCallback;

  /**
   * Получает изображения
   * */
  static get(id = '1', callback) {
    this.lastCallback = callback;

    // Чтобы получить данные от VK API, мы используем JSONP 
    // (это способ обойти ограничения CORS). 
    // JSONP работает так: мы создаём тег <script> с URL запроса, 
    // добавляем его в страницу, и VK сам выполнит запрос, вернув результат.
    const script = document.createElement('script');

    // Документация по составлению запроса: 
    // https://dev.vk.com/ru/method/photos.get
    // profile - фотографии профиля
    script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&album_id=profile&access_token=${config.VK_ACCESS_TOKEN}&v=5.199&callback=VK.processData`;
    document.body.append(script);
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result){
    // Получаем все теги <script> в документе и удаляем добавленный ранее.
    const scripts = document.getElementsByTagName('script');
    // Идем по ним в обратном порядке, потому что тег добовляется в конец.
    for (let i = scripts.length - 1; i >= 0; i--) {
      if (scripts[i].src.includes('api.vk.com')) {
        // console.log(scripts[i]);
        scripts[i].remove();
        break;
      }
    }

    // Если в ответе есть ошибка, то выводим ее.
    if (result.error) {
      alert(`Ошибка VK API: ${result.error.error_msg}`);
      return;
    }

    const photos = result.response.items.map(item => {
      const sizes = item.sizes;
      // console.log(sizes);
      // Находим самое большое изображение
      const largest = sizes.reduce((prev, curr) => // предудущее значение, текущее
        (prev.width * prev.height > curr.width * curr.height ? prev : curr)
      );
      // console.log(largest.url);
      return largest.url;
    });

    // Передаём фотки в колбек
    this.lastCallback(photos);

    // Очищаем lastCallback
    this.lastCallback = () => {};
  }
}
