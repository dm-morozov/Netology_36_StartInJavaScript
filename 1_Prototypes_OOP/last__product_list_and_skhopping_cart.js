class Good {
    /*
     * Опишите объект Товар посредством классов в JavaScript.
     * При инициализации нового объекта Товар через ключевое
     * слово new в коструктор необходимо передавать:
     *   - id           (свойство идентификатора товара типа number)
     *   - name         (свойство названия товара типа string)
     *   - description  (свойство описания товара типа string)
     *   - sizes        (свойство размеров в виде массива со
     *                   значениями типа string или number)
     *   - price        (свойство цены товара типа number)
     *   - available    (свойство доступности товара типа boolean)
     * Объекты типа Товар должны иметь один метод - setAvailable.
     * Данный метод должен принимать в качестве аргумента булево
     * значение и устанавивать это значение в свойство available.
     * В качестве результата ничего не возвращать.
     */

    constructor(id = null, name = '', description = '', sizes = [], price = 0, available=false) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvailable(available) {
        this.available = available;
    }
}
  
class GoodsList {
    /*
     * Опишите объект Список Товаров посредством классов в JavaScript.
     * При инициализации нового объекта Список Товаров через ключевое
     * слово new в коструктор ничего передавать не надо. Объект типа
     * GoodsList должен содержать в себе:
     * - #goods - скрытое извне свойство, которое будет содержать
     *   все товары типа Good
     * - filter - свойство, которому в процессе использования объекта
     *   типа GoodsList может быть присвоено значение регулярного
     *   выражения. Данное свойство может быть использовано при
     *   фильтрации товаров по имени.
     * - sortPrice - свойство, которому в процессе использования объекта
     *   типа GoodsList может быть присвоено булево значение. По умолчанию,
     *   установить значение свойства в false. Данное свойство должно
     *   быть использовано при определении - необходимо сортировать
     *   товары по цене или нет (true - сортировать по цене,
     *   false - не сортировать по цене).
     * - sortDir - свойство, которому в процессе использования объекта
     *   типа GoodsList может быть присвоено булево значение. По умолчанию
     *   установить значение свойства в true. Данное свойство должно
     *   быть использовано при направлении сортировки товаров по цене
     *   (true - сортировать по возрастанию, false - сортировать по
     *   убыванию). Данное свойство примениме только в том случае если
     *   свойство sortPrice установлено в true.
     * - list - "геттер", который должен возвращать список товаров:
     *   1) отфильтрованный по доступности товаров (good.available)
     *   2) отфильтрованный по имени, если задано регулярное выражение
     *      для свойства filter
     *   3а) отсортирован по возрастанию, если свойство sortPrice установлено
     *       в true и свойство sortDir установлено в true
     *   3б) отсортирован по убыванию, если свойство sortPrice установлено
     *       в true и свойство sortDir установлено в false
     * - add - метод, который добавляет товар в список. В качестве параметра метод
     *   должен принимать объект типа Good. В случае наличия товара в списке
     *   переданный товар не добавлять. В качестве результата ничего не возвращать.
     * - remove - метод, который удаляет товар из списка. В качестве параметра метод
     *   принимает идентификатор товара. В случае наличия товара в списке товар
     *   необходимо удалить из списка. В качестве результата ничего не возвращать.
     */


    #goods = [];
    filter = false;
    sortPrice = false;
    sortDir = true;
    
    
    get list() {
        if (this.#goods.length === 0) return [];
        
        let result = this.#goods.filter(good => good.available === true)
        // console.log('До result:', JSON.stringify(result, null, 2));

        // Нерабочий вариант
        // if (this.filter) result = result.filter(good => good.name.toLowerCase().match(this.filter));
        
        // Фильтрация по регулярному выражению (рабочий вариант)
        if (this.filter instanceof RegExp) {
            try {
                const regFilteredGoods = result.filter(good => this.filter.test(good.name));
                if (regFilteredGoods.length > 0) {
                    result = regFilteredGoods;
                }
            } catch (error) {
                console.error(error);
            }
        }
        // console.log('Ответ такой:', JSON.stringify(result, null, 2));
        if (this.sortPrice) {
            // result = this.sortDir ? result.sort((a, b) => a.price - b.price) : result.sort((a, b) => b.price - a.price);
            if (this.sortDir) {
                result = result.sort((a, b) => a.price - b.price);
                // result.forEach(item => console.log(item.price));
            } else {
                result = result.sort((a, b) => b.price - a.price);
                // result.forEach(item => console.log(item.price));
            }

            // console.log('Ответ такой (после сортировки по цене):', JSON.stringify(result, null, 2));

        }

        return result;
    }

    add(good) {
        if (this.#goods.some(item => item.id === good.id)) return;
        
        this.#goods.push(good);
    }

    remove(id) {
        this.#goods = this.#goods.filter(good => good.id !== id);
    }
}


  
/*
* Необходимо описать класс Товар в Корзине. Данный класс должен содержать
* такие же свойства, как и у класса Good. Поэтому класс BasketGood должен
* наследоваться от Good (быть дочерним). Также данный класс должен описывать
* дополнительное свойство amount (количество). При инициализации экземпляра
* класса BasketGood через ключевое слово new в конструктор (в качестве
* параметров) необходимо передать:
* - good - экземпляр (объект) типа Good
* - amount - количество товаров типа number
*/
class BasketGood extends Good {
    constructor(good, amount) {
        super(good.id, good.name, good.description, good.sizes, good.price, good.available);
        this.amount = amount;
    }
}
  
class Basket {
    /*
     * Необходимо описать класс Корзина. При инициализации нового
     * объекта Корзина через ключевое слово new в коструктор ничего
     * не передавать. Объект типа Basket должен содержать в себе:
     * - goods - свойство, которое будет содержать все товары типа
     *   BasketGood.
     * - totalAmount - "геттер", который должен возвращать общее
     *   количество всех товаров в корзине.
     * - totalSumm - "геттер", который должен возвращать общую
     *   стоимость всех товаров в корзине.
     * - add - метод, который добавляет новый товар типа BasketGood
     *   в корзину, если такого товара еще нет в корзине, иначе
     *   увеличивает количество существующего товара в корзине.
     *   В качестве параметров метод принимает товар типа Good и
     *   количество типа number. В качестве результата метод ничего
     *   не возвращает.
     * - remove - метод, который удаляет товар типа BasketGood из корзины,
     *   если значение amount больше или равно количеству товаров в корзине.
     *   В противном случае метод уменьшает количество товаров в корзине.
     *   В качестве параметров метод принимает товар типа Good и количество
     *   типа number. В качестве результата метод ничего не возвращает.
     * - clear - метод, который удаляет все товары из корзины. В качестве
     *   параметров метод ничего не принимает. В качестве результата метод
     *   ничего не возвращает.
     * - removeUnavailable - метод, который удаляет недоступные товары.
     *   В качестве параметров метод ничего не принимает. В качестве
     *   результата метод ничего не возвращает.
     */ 

    constructor() {
        this.goods = [];
    }

    add(good, amount) {
        const existingItem = this.goods.find(item => item.id === good.id);

        if (existingItem) {
            existingItem.amount +=  amount;
        } else {
            this.goods.push(new BasketGood(good, amount));
        }
    }

    get totalAmount() {
        return this.goods.reduce((sum, item) => sum + item.amount, 0);
    }

    get totalSumm() {
        return this.goods.reduce((sum, item) => sum + item.amount*item.price, 0);
    }

    remove(good, amount) {
        const index = this.goods.findIndex(item => item.id === good.id);
    
        if (index !== -1) {  // Если товар найден
            if (this.goods[index].amount <= amount) {
                // Если требуется удалить больше или равно количеству - удаляем товар полностью
                this.goods.splice(index, 1);
            } else {
                // Иначе уменьшаем количество
                this.goods[index].amount -= amount;
            }
        }
        // Если товар не найден - ничего не делаем
    }

    clear() { 
        this.goods = []; 
    }

    removeUnavailable() {
        this.goods = this.goods.filter(good => good.available);
    }


}
  

const data = [
    [1, "Ботинки Саламандра", "Очень качественная обувь", [39, 40, 41, 43, 44, 45], 3490, true],
    [2, "Рубашка", "Удобная рубашка для костюма", ["S", "M", "L", "XXL", "XXXL"], 770, true],
    [3, "Брюки черные", "Элегантные брюки на лубой случай", ["S", "M", "L", "XXL", "XXXL"], 1090, true],
    [4, "Ботинки Ральф", "№1 для состоятельных граждан", [41, 42, 43, 44, 45, 46], 5990, true],
    [5, "Костюм спортивный синий", "Для походов в горы", ["M", "L", "XL", "XXL"], 2790, true],
    [6, "Костюм спортивный розовый", "Для стройных дам", ["XS", "S", "M", "L"], 2290, true],
    [7, "Костюм спортивный детский", "Для самых маленьких", [96, 104, 113, 127, 136], 1490, true],
    [8, "Кроссовки спортивные", "Для всей семьи", [27, 31, 33, 37, 39, 41, 42, 43, 45, 46, 47, 48], 3190, true],
];

// Список товаров

const goodsList = new GoodsList();
const goods = [];

data.forEach((params) => {
    const [id] = params;
    const good = new Good(...params);

    if (id > 1 && id <=5 && id % 2 > 0) {
        good.setAvailable(false);
    }

    goodsList.add(good);
    goods.push(good);
});

console.log("--------------------");
console.log("Посмотрим на весь список товаров что у нас есть:");
console.log(goodsList.list);
console.log("Видно что 3-й и 5-й товары не значятся в общем списке товаров, потому что у них свойство available = false");
console.log("--------------------");

goodsList.filter = /спорт/i;

console.log("--------------------");
console.log("Применим фильтр к нашему списку товаров");
console.log("Ожидаем что будет получен список товаров где в названии присутствует \"спорт\":");
console.log(goodsList.list);
console.log("--------------------");

const eight = goods.find((good) => good.id === 8);

eight.setAvailable(false);

console.log("--------------------");
console.log("А в данный момент 8-й товар не доступен для продажи в магазине");
console.log("И этот товар не попадает в отфильтрованный список с фильтром \"спорт\":");
console.log(goodsList.list);
console.log("--------------------");

goodsList.filter = null;
goodsList.sortPrice = true;
goodsList.sortDir = false;
console.log("--------------------");
console.log("Сбросим фильтр, и отсортируем список товаров по убыванию цены товара");
console.log(goodsList.list);
console.log("--------------------");

goodsList.sortDir = true;
console.log("--------------------");
console.log("А теперь отсортируем список товаров по возростанию цены товара");
console.log(goodsList.list);
console.log("--------------------");

// Корзина
console.log("====================");
console.log("Посмотрим - как у нас работает Корзина покупок?");

const basket = new Basket();
const boots = goods.find((good) => good.id === 4);
const shirt = goods.find((good) => good.id === 2);
const pant =  goods.find((good) => good.id === 3);

pant.setAvailable(true);

console.log("--------------------");
console.log("Добавим в корзину 5 пар ботинок, одну рубашку, и одни брюки");

basket.add(boots, 5);
basket.add(shirt, 1);
basket.add(pant, 1);

console.log("Общее количество:", basket.totalAmount);
console.log("--------------------");
console.log("Вообще и одной пары ботинок хватит");

basket.remove(boots, 4);

console.log("Общее количество:", basket.totalAmount);
console.log("Общая сумма:", basket.totalSumm);
console.log("--------------------");
console.log("Пока удаляли товары из корзины, рубашки все раскупили. Ничего не осталось");

const order = basket.goods.find((item) => item.id === shirt.id);

order.setAvailable(false);

basket.removeUnavailable();

console.log("Общее количество:", basket.totalAmount);

console.log("--------------------");
console.log("Тогда нет смысла покупать что либо. Удалить всё из корзины");

basket.clear();

console.log("Общее количество:", basket.totalAmount);
console.log("Общая сумма:", basket.totalSumm);
console.log("--------------------");