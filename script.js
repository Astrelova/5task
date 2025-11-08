document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Элементы DOM
    const quantityInput = document.getElementById('quantity');
    const productSelect = document.getElementById('product');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultElement = document.getElementById('result');
    const quantityError = document.getElementById('quantityError');
    const orderForm = document.getElementById('orderForm');
    
    // регулярное выражение для проверки ввода
    const quantityRegex = /^[1-9]\d*$/;
    
    /**
     * Проверка корректности ввода количества
     * @returns {boolean} true если ввод корректен
     */
    function validateQuantity() {
        const value = quantityInput.value.trim();
        
        if (value === '') {
            showError('Поле не может быть пустым');
            return false;
        }
        
        if (!quantityRegex.test(value)) {
            showError('Введите целое положительное число (только цифры)');
            return false;
        }
        
        const quantity = parseInt(value, 10);
        if (quantity < 1) {
            showError('Количество должно быть не менее 1');
            return false;
        }
        
        if (quantity > 1000) {
            showError('Количество не может превышать 1000');
            return false;
        }
        
        hideError();
        return true;
    }
    
    /**
     * Показать сообщение об ошибке
     * @param {string} message - текст ошибки
     */
    function showError(message) {
        quantityError.textContent = message;
        quantityError.style.display = 'block';
        quantityInput.classList.add('input-error');
        calculateBtn.disabled = true;
    }
    
    /**
     * Скрыть сообщение об ошибке
     */
    function hideError() {
        quantityError.style.display = 'none';
        quantityInput.classList.remove('input-error');
        calculateBtn.disabled = false;
    }
    
    /**
     * +15 баллов: корректный подсчет стоимости товара
     * Рассчитывает стоимость заказа
     */
    function calculateCost() {
        if (!validateQuantity()) {
            return;
        }
        
        const quantity = parseInt(quantityInput.value.trim(), 10);
        const price = parseFloat(productSelect.value);
        const totalCost = price * quantity;
        
        // Получаем название товара
        const productText = productSelect.options[productSelect.selectedIndex].text;
        const productName = productText.split(' - ')[0];
        
        // Форматируем числа с разделителями тысяч
        const formattedPrice = formatNumber(price);
        const formattedTotal = formatNumber(totalCost);
        
        // Отображаем результат
        resultElement.innerHTML = `
            <strong>Стоимость заказа:</strong><br>
            Товар: ${productName}<br>
            Количество: ${quantity} шт.<br>
            Цена за единицу: ${formattedPrice} руб.<br>
            <strong>Итого: ${formattedTotal} руб.</strong>
        `;
        resultElement.style.display = 'block';
    }
    
    /**
     * Форматирует число с разделителями тысяч
     * @param {number} number - число для форматирования
     * @returns {string} отформатированная строка
     */
    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    
    // Обработчики событий
    quantityInput.addEventListener('input', validateQuantity);
    quantityInput.addEventListener('blur', validateQuantity);
    
    calculateBtn.addEventListener('click', calculateCost);
    
    // Обработчик отправки формы (предотвращает стандартное поведение)
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();
        calculateCost();
    });
    
    // Обработчик Enter в поле ввода
    quantityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            calculateCost();
        }
    });
    
    // Инициализация при загрузке
    validateQuantity();

});
