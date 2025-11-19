document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    const quantityInput = document.getElementById('quantity');
    const productSelect = document.getElementById('product');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultElement = document.getElementById('result');
    const quantityError = document.getElementById('quantityError');
    const orderForm = document.getElementById('orderForm');

    const quantityRegex = /^[1-9]\d*$/;
    
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
    
    
    function showError(message) {
        quantityError.textContent = message;
        quantityError.style.display = 'block';
        quantityInput.classList.add('input-error');
        calculateBtn.disabled = true;
    }
    

    function hideError() {
        quantityError.style.display = 'none';
        quantityInput.classList.remove('input-error');
        calculateBtn.disabled = false;
    }
    

    function calculateCost() {
        if (!validateQuantity()) {
            return;
        }
        
        const quantity = parseInt(quantityInput.value.trim(), 10);
        const price = parseFloat(productSelect.value);
        const totalCost = price * quantity;
        
        const productText = productSelect.options[productSelect.selectedIndex].text;
        const productName = productText.split(' - ')[0];
        
        const formattedPrice = formatNumber(price);
        const formattedTotal = formatNumber(totalCost);
        
        resultElement.innerHTML = `
            <strong>Стоимость заказа:</strong><br>
            Товар: ${productName}<br>
            Количество: ${quantity} шт.<br>
            Цена за единицу: ${formattedPrice} руб.<br>
            <strong>Итого: ${formattedTotal} руб.</strong>
        `;
        resultElement.style.display = 'block';
    }
    
    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    
    quantityInput.addEventListener('input', validateQuantity);
    quantityInput.addEventListener('blur', validateQuantity);
    
    calculateBtn.addEventListener('click', calculateCost);
    
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();
        calculateCost();
    });
    

    quantityInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            calculateCost();
        }
    });
    
    validateQuantity();

});

