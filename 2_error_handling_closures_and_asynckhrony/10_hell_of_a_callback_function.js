// Задание «Ад функций обратного вызова»

// Условие задачи
// Давайте знакомиться с такой распостроненной проблемой как «callback hell». 
// Такое часто можно встретить даже в современной разработке. 
// При том что нам (программистам) доступны инструменты и подходы 
// что позволяют избегать такой проблемы.

// В приведенном в этом задании примере (с использованием Promise, then, Promise.all), 
// при реализации получения необходимых данных о пользователе, его корзине покупок, 
// и товарах в корзине получился работоспособный код. Но настолько трудно поддержываемый 
// что желательно его изменить и улучшить.

// Давайте познакомимся с такой распространенной проблемой, как «callback hell». 
// Даже в современной разработке такая проблема встречается довольно часто. 
// Однако мы, программисты, имеем доступ к инструментам и подходам, 
// которые позволяют избегать этой проблемы.

// В задании релизован код с использованием Promise, then и Promise.all. 
// Программа позволяет получать необходимые данных о пользователе, 
// его корзине покупок и товарах в корзине. Код работает, 
// но стал настолько сложным и трудно поддерживаемым, что желательно его улучшить.

const authUser = async function (userName, password) {
    userName = 'oliviaw';
    password = 'oliviawpass';
    const api = "https://dummyjson.com/";
    const result = {
        user: {
        id: null,
        firstName: null,
        lastName: null,
        cart: null,
        },
    };

    /*
    * Код, приведенный ниже, работает, как ожидается.
    * Но получился callback hell. Такую функциональность
    * очень затрудительно поддерживать. Потому что
    * очень трудно читать код и понимать, что он делает.
    * 
    * Необходимо переписать приведенный ниже код, чтобы
    * сделать его более читаемым и понятным.
    */
    try {
        const authResponse = await fetch(`${api}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: userName,
            password: password,
        }),
        });
        const auth = await authResponse.json();
        if (!auth || !auth.id) throw new Error("Ошибка авторизации");
        const { id, firstName, lastName } = auth;

        result.user = { id, firstName, lastName };

        const cartsResponse = await fetch(`${api}carts/user/${result.user.id}`);
        const cartsData = await cartsResponse.json();
        if (!cartsData) throw new Error("Корзина не найдена");
        const userCart = cartsData.carts[0];

        const { total: totalSumm, discountedTotal: discountedSumm } = userCart;
        result.user.cart = { totalSumm, discountedSumm };

        const productPromises = userCart.products.map(async (product) => {
            const productResponse = await fetch(`${api}products/${product.id}`);
            const productData = await productResponse.json();
            return {
                id: productData.id,
                title: productData.title,
                description: productData.description,
                price: productData.price,
                discount: productData.discountPercentage,
                rating: productData.rating,
                count: product.quantity,
            }
        });

        // Ожидаем завершение всех запросов товаров
        const products = await Promise.all(productPromises);
        result.user.cart.products = products;
        // console.log("Проверка через json", JSON.stringify(result, null, 2));

        return result; // Возвращаем результат с данными пользователя и товарами
    } catch (error) {
        console.log("Произошла ошибка:", error);
        return null;
    }

};


authUser("atuny0", "9uQFF1Lh").then((result) => {
  const user = result.user;
  const fullName = `${user.firstName} ${user.lastName}`;

  console.log(`Пользователь: ${fullName}`);
  console.log(`В корзине покупок ${fullName} находится товаров на сумму: ${user.cart.totalSumm}`);
  console.log(`С учетом скидок - ${user.cart.discountedSumm}`);
  console.log(`${fullName} собирается купить:`);

  user.cart.products.forEach((product) => console.log(`  - ${product.title} количеством ${product.count}`));
});