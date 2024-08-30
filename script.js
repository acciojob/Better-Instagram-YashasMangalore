document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.image');

    let draggedElement = null;

    images.forEach(image => {
        image.addEventListener('dragstart', (e) => {
            draggedElement = e.target;
            setTimeout(() => {
                e.target.style.opacity = '0.5'; // Visual feedback for dragging
            }, 0);
        });

        image.addEventListener('dragend', (e) => {
            setTimeout(() => {
                e.target.style.opacity = '1'; // Restore opacity
                draggedElement = null;
            }, 0);
        });

        image.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow dropping
        });

        image.addEventListener('dragenter', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('image')) {
                e.target.classList.add('selected'); // Highlight target element
            }
        });

        image.addEventListener('dragleave', (e) => {
            if (e.target.classList.contains('image')) {
                e.target.classList.remove('selected'); // Remove highlight
            }
        });

        image.addEventListener('drop', (e) => {
            e.preventDefault();
            if (e.target !== draggedElement && e.target.classList.contains('image')) {
                e.target.classList.remove('selected'); // Remove highlight

                // Swap image URLs while preserving text
                const tempImgUrl = e.target.dataset.img;
                e.target.dataset.img = draggedElement.dataset.img;
                draggedElement.dataset.img = tempImgUrl;

                // Update background images
                e.target.style.backgroundImage = `url(${e.target.dataset.img})`;
                draggedElement.style.backgroundImage = `url(${draggedElement.dataset.img})`;
            }
        });
    });
});
