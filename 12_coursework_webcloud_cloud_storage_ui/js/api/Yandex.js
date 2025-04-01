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
  static removeFile(path, callback) {
    fetch(`${this.HOST}/resources?path=${encodeURIComponent(path)}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `OAuth ${this.getToken()}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка удаления файла: ${response.status} ${response.statusText}`);
      }
      callback(null); // Успех
    })
    .catch(error => {
      console.error("Ошибка при удалении файла", error);
      callback(error);
    });
  }


  /**
   * Метод публикации файла для получения public_url
   */
  static publishFile(path, callback) {
    fetch(`${this.HOST}/resources/publish?path=${encodeURIComponent(path)}`, {
      method: 'PUT',
      headers: {
        'Authorization': `OAuth ${this.getToken()}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка публикации: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      callback(data.public_url || null);
    })
    .catch(error => {
      console.error("Ошибка при публикации файла:", error);
      callback(null);
    });
  }

  /**
   * Метод получения всех загруженных файлов в облаке с публичными данными
   */
  static getUploadedFiles(callback, folderPath = 'NetologyVkToYandexPhoto') {
    const url = `${this.HOST}/resources?path=${encodeURIComponent(`disk:/${folderPath}`)}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `OAuth ${this.getToken()}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка получения файлов: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      const items = data._embedded?.items || [];
      console.log('Список файлов с диска:', items);

      // Создаём массив промисов для публикации и получения публичных данных
      const publicPromises = items.map(item => {
        if (item.public_url) {
          // Если public_url уже есть, используем его
          return Promise.resolve({
            ...item,
            preview: item.public_url // Используем public_url как превью
          });
        }
        if (!item.public_key) {
          // Если public_key нет, публикуем файл
          return new Promise(resolve => {
            this.publishFile(item.path, (publicUrl) => {
              if (publicUrl) {
                resolve({
                  ...item,
                  public_url: publicUrl,
                  preview: publicUrl // Используем public_url как превью
                });
              } else {
                resolve(item); // Если публикация не удалась, возвращаем исходный
              }
            });
          });
        }
        // Если public_key есть, запрашиваем публичные данные
        return fetch(`${this.HOST}/public/resources?public_key=${encodeURIComponent(item.public_key)}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `OAuth ${this.getToken()}`
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Ошибка получения публичных данных: ${response.status}`);
          }
          return response.json();
        })
        .then(publicData => {
          return {
            ...item,
            public_url: publicData.public_url || item.public_url,
            preview: publicData.public_url || publicData.preview || item.preview, // Предпочитаем public_url
            file: publicData.file || item.file
          };
        })
        .catch(error => {
          console.error(`Ошибка для ${item.path}:`, error);
          return item;
        });
      });

      Promise.all(publicPromises).then(updatedItems => {
        console.log('Обновлённые файлы с публичными данными:', updatedItems);
        callback(updatedItems);
      });
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
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `OAuth ${this.getToken()}` // Добавляем токен для авторизации
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Ошибка скачивания файла: ${response.status} ${response.statusText}`);
        }
        // Извлекаем имя файла из заголовка Content-Disposition, если есть
        const contentDisposition = response.headers.get('Content-Disposition');
        let fileName = 'downloaded_file'; // Имя по умолчанию
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
          if (fileNameMatch) {
            fileName = fileNameMatch[1];
          }
        } else {
          fileName = url.split('/').pop().split('?')[0]; // Убираем параметры запроса
        }
        return response.blob().then(blob => ({ blob, fileName }));
      })
      .then(({ blob, fileName }) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName; // Устанавливаем чистое имя файла
        link.click();
        callback(); // Успешное завершение
      })
      .catch(error => {
        console.error("Ошибка при скачивании файла", error);
        callback(error);
      });
  }
  
}
