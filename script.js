document.addEventListener('DOMContentLoaded', function() {
  const aboutSection = document.querySelector('.about');
  let hasAnimated = false; // Ensure it triggers only once

  function checkVisibility() {
    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Trigger animation only once when scrolling down into view
    if (!hasAnimated && rect.top < windowHeight - 100) {
      aboutSection.classList.add('visible');
      hasAnimated = true;
    }
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); // Run on page load in case section is already visible
});
