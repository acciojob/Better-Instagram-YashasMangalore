//your code here
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.image');
  
  let draggedElement = null;

  images.forEach(image => {
    image.addEventListener('dragstart', (e) => {
      draggedElement = e.target;
      setTimeout(() => {
        e.target.style.display = 'none';
      }, 0);
    });

    image.addEventListener('dragend', (e) => {
      setTimeout(() => {
        draggedElement.style.display = 'block';
        draggedElement = null;
      }, 0);
    });

    image.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    image.addEventListener('dragenter', (e) => {
      e.preventDefault();
      e.target.classList.add('selected');
    });

    image.addEventListener('dragleave', (e) => {
      e.target.classList.remove('selected');
    });

    image.addEventListener('drop', (e) => {
      e.preventDefault();
      e.target.classList.remove('selected');
      if (e.target !== draggedElement) {
        const tempContent = e.target.innerHTML;
        e.target.innerHTML = draggedElement.innerHTML;
        draggedElement.innerHTML = tempContent;
      }
    });
  });
});
