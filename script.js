document.addEventListener('DOMContentLoaded', function() {
  const aboutSection = document.querySelector('.about');

  function checkVisibility() {
    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight - 100) {
      aboutSection.classList.add('visible');
    } else {
      aboutSection.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); // Run on page load in case section is already visible
});
