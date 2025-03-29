/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getToken(){
    return config.YANDEX_ACCESS_TOKEN;
  }

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(path, url, callback){
    fetch(`${this.HOST}/resources/upload?path=${encodeURIComponent(path)}&url=${encodeURIComponent(url)}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization' : `OAuth ${this.getToken()}`
      }
    })
    .then(response => {
      if(!response.ok) {
        throw new Error(`Ошибка загрузки файлов: ${response.status} ${response.statusText}`);
      } else {
        return response.json();
      }
    })
    .then(data => {
      console.log('Ответ API на загрузку:', data);
      callback(null); // Успех
    })
    .catch(error => {
      console.error("Ошибка при загрузке файлов", error);
      callback(error);
    });
  }

  /**
   * Метод удаления файла из облака
   */
  static removeFile(path, callback){

  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback, folderPath = 'NetologyVkToYandexPhoto'){
    const url = folderPath
      ? `${this.HOST}/resources?path=${encodeURIComponent(`disk:/${folderPath}`)}`
      : `${this.HOST}/resources/files`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization' : `OAuth ${this.getToken()}`
      }
    })
    .then(response => {
      if(!response.ok) {
        throw new Error(`Ошибка получения файлов: ${response.status} ${response.statusText}`);
      } else {
        return response.json();
      }
    })
    .then(data => {
      console.log('Ответ API на получение файлов (Yandex.js):', data);  
      callback(data._embedded?.items || []);
    })
    .catch(error => {
      console.error("Ошибка при получении файлов", error);
      callback([]);
    });
  }

  // Метод получения ссылки для скачивания (метод получения файла по ссылке) — пока не рабочий
static getDownloadLink(path, callback) {
  if (!path || path === 'undefined') {
    console.error('Ошибка: путь к файлу не указан или равен undefined');
    callback(null);
    return;
  }

  const encodedPath = encodeURIComponent(path);
  fetch(`${this.HOST}/resources/download?path=${encodedPath}`, {
    method: 'GET',
    headers: {
      'Authorization': `OAuth ${this.getToken()}`
    }
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(errorData => {
        throw new Error(`Ошибка получения ссылки на файл: ${response.status} ${response.statusText}. Детали: ${JSON.stringify(errorData)}`);
      });
    }
    return response.json();
  })
  .then(data => {
    if (data.href) {
      callback(data.href); // Возвращаем ссылку для скачивания
    } else {
      throw new Error('Не получена ссылка для скачивания');
    }
  })
  .catch(error => {
    console.error("Ошибка при получении ссылки для скачивания:", error);
    callback(null);
  });
}
 
  

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url, callback) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Ошибка скачивания файла: ${response.status} ${response.statusText}`);
        }
        return response.blob();
      })
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = url.split('/').pop(); // Используем имя файла из URL
        link.click();
        callback(); // Успешное завершение
      })
      .catch(error => {
        console.error("Ошибка при скачивании файла", error);
        callback(error);
      });
  }
  
}
