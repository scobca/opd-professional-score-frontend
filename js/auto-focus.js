//DOMContentLoaded - когда вся страница загрузится
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.code-field input[type="number"]');

    inputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.length > 1) {
                input.value = input.value.slice(0, 1); // Оставляем только первую цифру
            }
            if (input.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !input.value && index > 0) {
                inputs[index - 1].focus();
            }
        });
    });
});