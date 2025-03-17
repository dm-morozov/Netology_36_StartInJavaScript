document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product');
    const cartContainer = document.querySelector('.cart__products');
    let arrCartProducts = JSON.parse(localStorage.getItem('CartProducts')) || [];

    function saveCartProducts() {
        localStorage.setItem('CartProducts', JSON.stringify(arrCartProducts))
    }

    // Функция для создания элемента корзины
    function createCartProduct(product) {
        const cartProduct = document.createElement('div');
        cartProduct.classList.add('cart__product')
        cartProduct.dataset.id = product.id;

        const cartProductImg = document.createElement('img');
        cartProductImg.classList.add('cart__product-image');
        cartProductImg.src = product.img;

        const cartProductCount = document.createElement('div');
        cartProductCount.classList.add('cart__product-count');
        cartProductCount.textContent = product.quantity;

        const cartProductRemove = document.createElement('div');
        cartProductRemove.classList.add('cart__product-remove');
        cartProductRemove.textContent = '×';


        cartProduct.appendChild(cartProductImg);
        cartProduct.appendChild(cartProductCount);
        cartProduct.appendChild(cartProductRemove);
        cartContainer.appendChild(cartProduct);
        console.log(cartContainer);

        cartProductRemove.addEventListener('click', () => {
            arrCartProducts = arrCartProducts.filter(item => item.id !== product.id);
            saveCartProducts();
            cartProduct.remove();
        });
    }

    // Востанавливаем все товары из localStorage при перезагрузке
    arrCartProducts.forEach(product => createCartProduct(product));


    products.forEach(product => {
        const id = product.dataset.id;
        const controlDec = product.querySelector('.product__quantity-control_dec');
        const controlInc = product.querySelector('.product__quantity-control_inc');
        const controlValue = product.querySelector('.product__quantity-value');
        const productImg = product.querySelector('.product__image');
        const productAddBtn = product.querySelector('.product__add'); 


        controlDec.addEventListener('click', () => {
            if (parseInt(controlValue.textContent) > 1) {
                controlValue.textContent = parseInt(controlValue.textContent) - 1;
            }
        });

        controlInc.addEventListener('click', () => {
            controlValue.textContent = parseInt(controlValue.textContent) + 1;
        });

        // Добавление товара в корзину
        productAddBtn.addEventListener('click', function(event) {
            event.preventDefault();

            const quantity = parseInt(controlValue.textContent);
            if (quantity === 0) return;

            const existingProduct = arrCartProducts.find(product => product.id === id);
            if (existingProduct) {
                existingProduct.quantity += quantity;
                if (existingProduct.quantity > 15) {
                    existingProduct.quantity = 15;
                }
            } else {
                arrCartProducts.push({id, img: productImg.src, quantity});
            }

            saveCartProducts();


            cartContainer.innerHTML = '';
            arrCartProducts.forEach(product => createCartProduct(product));

            animateProductToCart(productImg, id);

            controlValue.textContent = 1;

        })
    });

    function animateProductToCart(productImg, id) {
        // Делаем клон картинки
        const cloneImg = productImg.cloneNode(true);

        cloneImg.style.position = 'absolute';
        cloneImg.style.width = '100px';
        cloneImg.style.height = 'auto';
        cloneImg.style.transition = 'all 0.7s ease-in-out';

        const productRect = productImg.getBoundingClientRect();
        const cartItem = document.querySelector(`.cart__product[data-id="${id}"]`);
        const cartRect = cartItem
            ? cartItem.getBoundingClientRect()
            : cartContainer.getBoundingClientRect();

        cloneImg.style.left = `${productRect.left}px`;
        cloneImg.style.top = `${productRect.top + window.scrollY}px`;

        document.body.appendChild(cloneImg);

        setTimeout(() => {
            cloneImg.style.left = `${cartRect.left}px`;
            cloneImg.style.top = `${cartRect.top + window.scrollY}px`;
            cloneImg.style.opacity = '0';
        }, 10);

        setTimeout(() => {
            cloneImg.remove();
        }, 700);
    }

})