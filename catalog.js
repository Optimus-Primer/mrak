// Функция фильтрации товаров
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.category-btn');
    const activeCategory = document.querySelector('.active-category');

    // Обновляем активную кнопку
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
            // Обновляем текст активной категории
            activeCategory.innerHTML = btn.innerHTML;
        }
    });

    // Показываем/скрываем товары
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Добавляем обработчики событий для кнопок категорий
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
        filterProducts(button.dataset.category);
    });
});




// Функция получения цены товара
function getProductPrice(product) {
    const currentPrice = product.querySelector('.current').textContent;
    return parseInt(currentPrice.replace(/[^0-9]/g, '')); // Убираем все символы кроме цифр
}

// Функция сортировки товаров
function sortProducts(sortType) {
    const productsGrid = document.querySelector('.products-grid');
    const products = Array.from(productsGrid.getElementsByClassName('product-card'));

    products.sort((a, b) => {
        const priceA = getProductPrice(a);
        const priceB = getProductPrice(b);

        switch (sortType) {
            case 'price-asc':
                return priceA - priceB;
            case 'price-desc':
                return priceB - priceA;
            case 'popular':
                // Для популярных товаров проверяем наличие метки "hit"
                const isHitA = a.querySelector('.label-hit') !== null;
                const isHitB = b.querySelector('.label-hit') !== null;
                return isHitB - isHitA;
            case 'new':
                // Для новинок проверяем наличие метки "new"
                const isNewA = a.querySelector('.label-new') !== null;
                const isNewB = b.querySelector('.label-new') !== null;
                return isNewB - isNewA;
            default:
                return 0;
        }
    });

    // Очищаем и заново добавляем отсортированные товары
    products.forEach(product => productsGrid.appendChild(product));
}

// Функция фильтрации товаров по категории
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.category-btn');
    const activeCategory = document.querySelector('.active-category');

    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
            activeCategory.innerHTML = btn.innerHTML;
        }
    });

    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });

    // После фильтрации применяем текущую сортировку
    const currentSort = document.querySelector('.sort-select').value;
    sortProducts(currentSort);
}

// Инициализация обработчиков событий
document.addEventListener('DOMContentLoaded', function () {
    // Обработчик для кнопок категорий
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => {
            filterProducts(button.dataset.category);
        });
    });

    // Обработчик для селекта сортировки
    document.querySelector('.sort-select').addEventListener('change', (e) => {
        sortProducts(e.target.value);
    });

    // Обработчики для кнопок количества
    document.querySelectorAll('.qty-btn').forEach(button => {
        button.addEventListener('click', function () {
            const input = this.parentElement.querySelector('.qty-input');
            const currentValue = parseInt(input.value);

            if (this.classList.contains('minus')) {
                if (currentValue > 1) input.value = currentValue - 1;
            } else {
                input.value = currentValue + 1;
            }
        });
    });

    // Обработчики для кнопок "В корзину"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.closest('.product-card');

            // Создаем объект товара
            const product = {
                image: productCard.querySelector('.product-image img').src,
                name: productCard.querySelector('.product-info h3').textContent,
                description: productCard.querySelector('.product-info .description').textContent,
                price: parseInt(productCard.querySelector('.price .current').textContent.replace(/\s/g, '')),
                quantity: parseInt(productCard.querySelector('.qty-input').value)
            };

            console.log('Добавляемый товар:', product); // Для отладки

            // Получаем текущие товары из localStorage
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            // Проверяем, есть ли уже такой товар
            const existingProductIndex = cartItems.findIndex(item =>
                item.name === product.name
            );

            if (existingProductIndex !== -1) {
                // Если товар уже есть, увеличиваем количество
                cartItems[existingProductIndex].quantity += product.quantity;
            } else {
                // Если товара нет, добавляем новый
                cartItems.push(product);
            }

            // Сохраняем в localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            console.log('Корзина после добавления:', cartItems); // Для отладки

            // Обновляем счетчик
            updateCartCount();

            // Анимация добавления
            button.textContent = 'Добавлено!';
            button.style.background = '#4CAF50';
            setTimeout(() => {
                button.textContent = 'В корзину';
                button.style.background = '';
            }, 1000);
        });
    });

    // Обновление счетчика корзины
    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.cart-count').textContent = totalItems;
    }

    // Инициализация счетчика при загрузке
    updateCartCount();

    // Добавляем HTML для мобильного меню категорий
    const mobileMenuHTML = `
        <button class="mobile-categories-btn">
            <i class="fas fa-bars"></i>
            Категории
        </button>
        <div class="mobile-categories-menu">
            <div class="mobile-categories-content">
                <div class="mobile-categories-header">
                    <h3>Категории</h3>
                    <button class="close-categories">×</button>
                </div>
                <div class="mobile-categories-list">
                    <!-- Категории будут добавлены динамически -->
                </div>
            </div>
        </div>
    `;

    // Вставляем меню в начало navbar
    const navbar = document.querySelector('.navbar');
    navbar.insertAdjacentHTML('afterbegin', mobileMenuHTML);

    // Копируем существующие категории в мобильное меню
    const categoriesList = document.querySelector('.categories-sidebar').innerHTML;
    const mobileCategoriesList = document.querySelector('.mobile-categories-list');
    mobileCategoriesList.innerHTML = categoriesList;

    // Добавляем класс для анимации к каждой категории
    mobileCategoriesList.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.add('mobile-category-item');
    });

    // Обработчики событий для мобильного меню
    const categoriesBtn = document.querySelector('.mobile-categories-btn');
    const categoriesMenu = document.querySelector('.mobile-categories-menu');
    const closeBtn = document.querySelector('.close-categories');

    categoriesBtn.addEventListener('click', function () {
        document.body.classList.add('mobile-menu-active');
        // Предотвращаем прокрутку основного контента
        document.body.style.overflow = 'hidden';
    });

    function closeMenu() {
        document.body.classList.remove('mobile-menu-active');
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeMenu);

    // Закрытие при клике вне меню
    categoriesMenu.addEventListener('click', function (e) {
        if (e.target === categoriesMenu) {
            closeMenu();
        }
    });

    // Закрытие при свайпе влево
    let touchStartX = 0;
    let touchEndX = 0;

    categoriesMenu.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    categoriesMenu.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            closeMenu();
        }
    }, false);

    // Добавляем HTML для мобильного поиска
    const mobileSearchHTML = `
        <div class="mobile-search-overlay"></div>
        <div class="mobile-search-container">
            <input type="text" placeholder="Поиск товаров...">
            <button class="close-search">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Вставляем HTML после navbar
    document.querySelector('.navbar').insertAdjacentHTML('afterend', mobileSearchHTML);

    const searchBtn = document.querySelector('.search-btn');
    const mobileSearchOverlay = document.querySelector('.mobile-search-overlay');
    const mobileSearchContainer = document.querySelector('.mobile-search-container');
    const closeSearchBtn = document.querySelector('.close-search');
    const mobileSearchInput = document.querySelector('.mobile-search-container input');

    // Создаем и добавляем поисковик в хедер
    const searchContainerHeader = document.createElement('div');
    searchContainerHeader.className = 'search-container-header';
    searchContainerHeader.innerHTML = `
        <input type="text" placeholder="Поиск товаров...">
        <button class="close-search-header" type="button">
            <i class="fas fa-times"></i>
        </button>
    `;
    navbar.appendChild(searchContainerHeader);

    const searchInput = searchContainerHeader.querySelector('input');
    const closeSearchBtnHeader = searchContainerHeader.querySelector('.close-search-header');

    // Функция закрытия поиска
    function closeSearch() {
        searchContainerHeader.classList.remove('active');
        searchInput.value = '';
    }

    // Обработчик для кнопки поиска
    searchBtn.addEventListener('click', function (e) {
        e.preventDefault();
        searchContainerHeader.classList.add('active');
        searchInput.focus();
    });

    // Обработчик для кнопки закрытия
    if (closeSearchBtnHeader) {
        closeSearchBtnHeader.addEventListener('click', function () {
            closeSearch();
        });
    }

    // Обработчик поиска
    let searchTimeout;
    searchInput.addEventListener('input', function () {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = this.value.toLowerCase().trim();
            const products = document.querySelectorAll('.product-card');
            let foundCount = 0;

            products.forEach(product => {
                const title = product.querySelector('h3').textContent.toLowerCase();
                const description = product.querySelector('.description')?.textContent.toLowerCase() || '';
                const price = product.querySelector('.price').textContent.toLowerCase();

                if (title.includes(query) ||
                    description.includes(query) ||
                    price.includes(query)) {
                    product.style.display = 'block';
                    foundCount++;
                } else {
                    product.style.display = 'none';
                }
            });

            if (query && foundCount === 0) {
                showNoResults(query);
            } else {
                hideNoResults();
            }
        }, 300);
    });

    function showNoResults(query) {
        hideNoResults();
        const message = document.createElement('div');
        message.className = 'search-results-message';
        message.innerHTML = `
            <div class="no-results-content">
                <i class="fas fa-search"></i>
                <p>По запросу "${query}" ничего не найдено</p>
            </div>
        `;
        searchContainerHeader.appendChild(message);
    }

    function hideNoResults() {
        const existingMessage = document.querySelector('.search-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    }

    // Закрытие по Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeSearch();
        }
    });

    // Функция для сортировки товаров по категории
    function filterProducts(category) {
        const products = document.querySelectorAll('.product-card');

        products.forEach(product => {
            if (category === 'all') {
                product.style.display = 'block';
                // Добавляем анимацию появления
                product.style.animation = 'fadeIn 0.3s ease';
            } else {
                if (product.dataset.category === category) {
                    product.style.display = 'block';
                    product.style.animation = 'fadeIn 0.3s ease';
                } else {
                    product.style.display = 'none';
                }
            }
        });

        // Закрываем мобильное меню категорий
        document.querySelector('.mobile-categories-menu').classList.remove('active');
        document.body.style.overflow = '';
    }

    // Обработчик клика по категории
    document.querySelectorAll('.mobile-category-item').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            // Убираем активный класс у всех категорий
            document.querySelectorAll('.mobile-category-item').forEach(cat => {
                cat.classList.remove('active');
            });

            // Добавляем активный класс выбранной категории
            this.classList.add('active');

            // Фильтруем товары
            const category = this.dataset.category;
            filterProducts(category);
        });
    });
});

// Функция поиска товаров
function searchProducts(query) {
    const products = document.querySelectorAll('.product-card');
    const searchQuery = query.toLowerCase().trim();
    let foundCount = 0;

    products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        const description = product.querySelector('.description').textContent.toLowerCase();
        const price = product.querySelector('.price').textContent.toLowerCase();

        if (title.includes(searchQuery) ||
            description.includes(searchQuery) ||
            price.includes(searchQuery)) {
            product.style.display = 'block';
            foundCount++;
        } else {
            product.style.display = 'none';
        }
    });

    // Показываем сообщение, если ничего не найдено
    const noResultsMessage = document.getElementById('no-results-message');
    if (foundCount === 0) {
        if (!noResultsMessage) {
            const message = document.createElement('div');
            message.id = 'no-results-message';
            message.className = 'no-results';
            message.innerHTML = `
                <div class="no-results-content">
                    <i class="fas fa-search"></i>
                    <h3>По запросу "${query}" ничего не найдено</h3>
                    <p>Попробуйте изменить параметры поиска</p>
                </div>
            `;
            document.querySelector('.products-grid').appendChild(message);
        }
    } else if (noResultsMessage) {
        noResultsMessage.remove();
    }
}

// Инициализация поиска при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search');
    const searchBtn = document.querySelector('.search-btn');
    let searchTimeout;

    searchInput.addEventListener('input', function (e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchProducts(e.target.value);
        }, 300);
    });

    searchBtn.addEventListener('click', function () {
        searchProducts(searchInput.value);
    });

    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchProducts(this.value);
        }
    });
});

// Добавляем функцию для открытия поддержки
function openSupport() {
    // Здесь можно добавить логику открытия чата поддержки
    // Например:
    alert('Служба поддержки будет доступна в ближайшее время');
}