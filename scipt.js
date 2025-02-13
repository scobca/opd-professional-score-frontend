
const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('mouseenter', () => {
        input.style.transform = 'scale(1.05)';
    });

    input.addEventListener('mouseleave', () => {
        input.style.transform = 'scale(1)';
    });
});
