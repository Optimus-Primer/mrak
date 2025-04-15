document.addEventListener('DOMContentLoaded', function () {
    // Функционал фильтрации заказов
    const orderFilter = document.getElementById('orderFilter');
    orderFilter.addEventListener('change', function () {
        filterOrders(this.value);
    });

    // Функция фильтрации заказов
    function filterOrders(filterValue) {
        const orders = document.querySelectorAll('.order-card');
        orders.forEach(order => {
            if (filterValue === 'all') {
                order.style.display = 'block';
            } else {
                const status = order.querySelector('.order-status').classList.contains(filterValue);
                order.style.display = status ? 'block' : 'none';
            }
        });
    }

    // Функционал модального окна
    function showOrderDetails(orderId) {
        const modal = document.getElementById('orderDetailsModal');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Здесь можно добавить загрузку деталей заказа по ID
    }

    function closeOrderDetails() {
        const modal = document.getElementById('orderDetailsModal');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Обработчики для кнопок
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const orderId = this.getAttribute('onclick').match(/\d+/)[0];
            showOrderDetails(orderId);
        });
    });

    document.querySelector('.close-modal').addEventListener('click', closeOrderDetails);

    // Закрытие модального окна по клику вне его
    window.addEventListener('click', function (e) {
        const modal = document.getElementById('orderDetailsModal');
        if (e.target === modal) {
            closeOrderDetails();
        }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeOrderDetails();
        }
    });
}); 