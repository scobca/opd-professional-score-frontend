//DOMContentLoaded - когда вся страница загрузится
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.code-field input[type="tel"]');

    inputs.forEach((input, index) => {
        //обработка ввода: разрешаем ввод только одной цифры; послеующие цифры переносим в следующее поле
        input.addEventListener('input', () => {
            input.value = input.value.replace(/\D/g, '').slice(0, 1); // оставляем только 1 цифрц

            // если введена цифра и не последний инпут, переносим фокус на следующий
            if (input.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });

        // обработка нажатия Backspace
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !input.value && index > 0) {
                // если поле пустое и был нажат Backspace, переносим фокус на предыдущий инпут; если поле не пусто, то просто удаляется цифра
                inputs[index - 1].focus();
            }
        });
    });
});

