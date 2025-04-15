let currentUserType = '';

function showForm(type) {
    currentUserType = type;
    document.getElementById('customer-form').style.display = type === 'customer' ? 'block' : 'none';
    document.getElementById('driver-form').style.display = type === 'driver' ? 'block' : 'none';

    const formElement = document.getElementById(`${type}-form`);
    formElement.scrollIntoView({ behavior: 'smooth' });
}

function handleRegistration(event, type) {
    event.preventDefault();
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = type === 'customer'
        ? 'Теперь вы можете размещать заказы на перевозку.'
        : 'Теперь вы можете принимать заказы на перевозку.';
    document.getElementById('success-modal').style.display = 'flex';
}

function redirectAfterRegistration() {
    window.location.href = currentUserType === 'customer' ? 'create-order.html' : 'available-orders.html';
}

function closeModal() {
    document.getElementById('success-modal').style.display = 'none';
}

document.getElementById('customer-registration-form').addEventListener('submit', (e) => handleRegistration(e, 'customer'));
document.getElementById('driver-registration-form').addEventListener('submit', (e) => handleRegistration(e, 'driver'));

// Закрытие модального окна при клике вне его
window.onclick = function (event) {
    const modal = document.getElementById('success-modal');
    if (event.target === modal) {
        closeModal();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const customerBtn = document.getElementById('customerBtn');
    const customerForm = document.getElementById('customerForm');
    const customerRegistration = document.getElementById('customerRegistration');

    // Показываем форму при нажатии на кнопку "Заказчик"
    customerBtn.addEventListener('click', function () {
        customerForm.style.display = 'block';
        // Плавная прокрутка к форме
        customerForm.scrollIntoView({ behavior: 'smooth' });
    });

    // Обработка отправки формы регистрации
    customerRegistration.addEventListener('submit', function (e) {
        e.preventDefault();

        // Собираем данные формы
        const formData = {
            name: this.elements.name.value,
            email: this.elements.email.value,
            phone: this.elements.phone.value,
            password: this.elements.password.value,
            isRegistered: true
        };

        // Сохраняем данные в localStorage
        localStorage.setItem('userData', JSON.stringify(formData));

        // Показываем сообщение об успешной регистрации
        alert('Регистрация успешна! Сейчас вы будете перенаправлены в каталог.');

        // Перенаправляем на страницу каталога
        window.location.href = 'catalog.html';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const contractorBtn = document.getElementById('contractorBtn');
    const contractorForm = document.getElementById('contractorForm');
    const contractorRegistration = document.getElementById('contractorRegistration');

    // Показываем форму при нажатии на кнопку "Исполнитель"
    contractorBtn.addEventListener('click', function () {
        contractorForm.style.display = 'block';
        // Плавная прокрутка к форме
        contractorForm.scrollIntoView({ behavior: 'smooth' });
    });

    // Обработка отправки формы
    contractorRegistration.addEventListener('submit', function (e) {
        e.preventDefault();

        // Сохраняем данные исполнителя
        const contractorData = {
            fullName: this.elements.fullName.value,
            email: this.elements.email.value,
            phone: this.elements.phone.value,
            specialization: this.elements.specialization.value,
            experience: this.elements.experience.value,
            password: this.elements.password.value,
            isContractor: true,
            isRegistered: true
        };

        // Сохраняем в localStorage
        localStorage.setItem('contractorData', JSON.stringify(contractorData));

        // Перенаправляем на страницу заказов
        window.location.href = 'order.html';
    });

    // Обработка видимости пароля
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function () {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
});