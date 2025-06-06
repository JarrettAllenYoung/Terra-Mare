
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();

      // Set responsive offsets
      const screenWidth = window.innerWidth;
      let offset;

      if (screenWidth <= 1024) {
        offset = 20; // Mobile/tablet offset
      } else {
        offset = 140; // Desktop offset
      }

      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

window.addEventListener('load', () => {
  const hash = window.location.hash;
  if (hash && document.querySelector(hash)) {
    const target = document.querySelector(hash);
    if (target) {
      setTimeout(() => {
        const screenWidth = window.innerWidth;
        let offset = screenWidth <= 1024 ? 20 : 140;

        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = target.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
});
