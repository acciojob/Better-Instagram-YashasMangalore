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

                // Swap the entire content and attributes of the div
                const draggedHTML = draggedElement.innerHTML;
                const targetHTML = e.target.innerHTML;
                const draggedStyle = draggedElement.style.backgroundImage;
                const targetStyle = e.target.style.backgroundImage;
                const draggedData = { ...draggedElement.dataset }; // Save data attributes of dragged element
                const targetData = { ...e.target.dataset }; // Save data attributes of target element

                // Swap HTML content
                draggedElement.innerHTML = targetHTML;
                e.target.innerHTML = draggedHTML;

                // Swap background images
                draggedElement.style.backgroundImage = targetStyle;
                e.target.style.backgroundImage = draggedStyle;

                // Swap data attributes
                draggedElement.dataset = targetData;
                e.target.dataset = draggedData;
            }
        });
    });
});
