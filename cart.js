document.addEventListener('DOMContentLoaded', function () {
    // Загрузка товаров из localStorage
    function loadCartItems() {
        const cartContainer = document.querySelector('.cart-items');
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        if (cartItems.length === 0) {
            cartContainer.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
            return;
        }

        cartContainer.innerHTML = '';

        cartItems.forEach((item, index) => {
            const cartItemHTML = `
                <div class="cart-item" data-index="${index}">
                    <div class="item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p class="item-description">${item.description}</p>
                    </div>
                    <div class="item-quantity">
                        <button class="qty-btn minus">-</button>
                        <input type="number" value="${item.quantity}" min="1" class="qty-input">
                        <button class="qty-btn plus">+</button>
                    </div>
                    <div class="item-price">
                        <span class="current">${item.price.toLocaleString()}</span>
                    </div>
                    <button class="remove-item">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            cartContainer.insertAdjacentHTML('beforeend', cartItemHTML);
        });

        // Обновляем обработчики событий
        attachEventHandlers();
        updateTotals();
        updateCartCount();
    }

    // Обработчики событий для элементов корзины
    function attachEventHandlers() {
        // Обработчики кнопок количества
        document.querySelectorAll('.qty-btn').forEach(button => {
            button.addEventListener('click', function () {
                const input = this.parentElement.querySelector('.qty-input');
                const cartItem = this.closest('.cart-item');
                const index = cartItem.dataset.index;
                let currentValue = parseInt(input.value);

                if (this.classList.contains('minus') && currentValue > 1) {
                    currentValue--;
                } else if (this.classList.contains('plus')) {
                    currentValue++;
                }

                input.value = currentValue;
                updateItemQuantity(index, currentValue);
            });
        });

        // Обработчики кнопок удаления
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function () {
                const cartItem = this.closest('.cart-item');
                const index = cartItem.dataset.index;
                removeItem(index);
            });
        });
    }

    // Обновление количества товара
    function updateItemQuantity(index, quantity) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems[index].quantity = quantity;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateTotals();
        updateCartCount();
    }

    // Удаление товара
    function removeItem(index) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        loadCartItems(); // Перезагружаем корзину
    }

    // Обновление итогов
    function updateTotals() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discount = Math.round(total * 0.1); // 10% скидка
        const finalTotal = total - discount;

        document.querySelector('.total-items').textContent = total.toLocaleString();
        document.querySelector('.total-discount').textContent = `-${discount.toLocaleString()}`;
        document.querySelector('.total-sum').textContent = finalTotal.toLocaleString();
    }

    // Обновление счетчика корзины
    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.cart-count').textContent = totalItems;
    }

    // Очистка корзины
    document.querySelector('.clear-cart').addEventListener('click', function () {
        localStorage.removeItem('cartItems');
        loadCartItems();
    });

    // Оформление заказа
    document.querySelector('.checkout-btn').addEventListener('click', function () {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartItems.length > 0) {
            alert('Заказ оформлен!');
            localStorage.removeItem('cartItems');
            loadCartItems();
        } else {
            alert('Корзина пуста!');
        }
    });

    // Обновленная функция обработки промокода
    document.querySelector('.promo-code button').addEventListener('click', function () {
        const input = document.querySelector('.promo-code input');
        const promoCode = input.value.trim();

        if (promoCode === 'Tilek') {
            // Получаем текущие товары
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            // Применяем скидку 50%
            const discount = Math.round(total * 0.5); // 50% скидка
            const finalTotal = total - discount;

            // Обновляем отображение
            document.querySelector('.total-items').textContent = total.toLocaleString();
            document.querySelector('.total-discount').textContent = `-${discount.toLocaleString()}`;
            document.querySelector('.total-sum').textContent = finalTotal.toLocaleString();

            // Визуальное подтверждение
            alert('Промокод применен! Скидка 50%');
            input.value = '';
            input.disabled = true;
            this.disabled = true;
            this.textContent = 'Применено';
            this.style.background = '#4CAF50';
            this.style.color = '#fff';
        } else if (promoCode) {
            alert('Неверный промокод');
            input.value = '';
        }
    });

    // Загружаем корзину при загрузке страницы
    loadCartItems();
}); 