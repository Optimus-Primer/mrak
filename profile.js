document.addEventListener('DOMContentLoaded', function () {
    // Обновление счетчика корзины
    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.cart-count').textContent = totalItems;
    }

    // Получаем элементы
    const nameInput = document.getElementById('profileName');
    const emailInput = document.getElementById('profileEmail');
    const phoneInput = document.getElementById('profilePhone');
    const passwordInput = document.getElementById('profilePassword');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const editButton = document.querySelector('.edit-profile');
    const saveButton = document.querySelector('.save-profile');

    // Загружаем данные из localStorage
    function loadUserData() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            nameInput.value = userData.name || '';
            emailInput.value = userData.email || '';
            phoneInput.value = userData.phone || '';
            passwordInput.value = userData.password || '';
        } else {
            // Если данных нет, перенаправляем на регистрацию
            window.location.href = 'index.html';
        }
    }

    // Переключение видимости пароля
    togglePasswordBtn.addEventListener('click', function () {
        const icon = this.querySelector('i');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });

    // Включаем редактирование
    editButton.addEventListener('click', function () {
        nameInput.readOnly = false;
        emailInput.readOnly = false;
        phoneInput.readOnly = false;
        passwordInput.readOnly = false;

        editButton.style.display = 'none';
        saveButton.style.display = 'block';

        // Добавляем класс для визуального выделения редактируемых полей
        nameInput.classList.add('editing');
        emailInput.classList.add('editing');
        phoneInput.classList.add('editing');
        passwordInput.classList.add('editing');
    });

    // Сохраняем изменения
    saveButton.addEventListener('click', function () {
        const updatedData = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            password: passwordInput.value,
            isRegistered: true
        };

        localStorage.setItem('userData', JSON.stringify(updatedData));

        nameInput.readOnly = true;
        emailInput.readOnly = true;
        phoneInput.readOnly = true;
        passwordInput.readOnly = true;

        editButton.style.display = 'block';
        saveButton.style.display = 'none';

        // Убираем класс редактирования
        nameInput.classList.remove('editing');
        emailInput.classList.remove('editing');
        phoneInput.classList.remove('editing');
        passwordInput.classList.remove('editing');

        alert('Данные успешно сохранены!');
    });

    // Загружаем данные при открытии страницы
    loadUserData();

    // Повторить заказ
    document.querySelectorAll('.repeat-order').forEach(button => {
        button.addEventListener('click', function () {
            const orderItem = this.closest('.order-item');
            const productName = orderItem.querySelector('.product-info h3').textContent;
            alert(`Заказ "${productName}" добавлен в корзину!`);
        });
    });

    // Инициализация
    updateCartCount();
}); 