document.addEventListener('DOMContentLoaded', function () {

  console.log("webdmitriev");

  const isAnimation = document.querySelector('.is-animation');

  createSpansWithOptions();
  function createSpansWithOptions() {
    const container = document.querySelector('.background-blue');
    if (!container) return;

    const config = {
      totalSpans: 150,
      hasAnimation: isAnimation,
      animationDuration: 0.6,
      animationDelay: 8,
      startOpacity: 1,
      endOpacity: 0.001
    };

    container.innerHTML = '';

    const fragment = document.createDocumentFragment();
    const opacityStep = (config.startOpacity - config.endOpacity) / (config.totalSpans - 1);

    for (let i = 0; i < config.totalSpans; i++) {
      const span = document.createElement('span');
      const opacity = config.startOpacity - opacityStep * i;

      if (config.hasAnimation) {
        span.style.cssText = `
        opacity: 0;
        transform: translateX(-20px);
        transition: opacity ${config.animationDuration}s ease, 
                    transform ${config.animationDuration}s ease;
        transition-delay: ${i * config.animationDelay}ms;
      `;
        span.dataset.opacity = opacity;
      } else {
        span.style.opacity = opacity;
      }

      fragment.appendChild(span);
    }

    container.appendChild(fragment);

    if (config.hasAnimation) {
      setTimeout(() => {
        container.querySelectorAll('span').forEach(span => {
          span.style.opacity = span.dataset.opacity;
          span.style.transform = 'translateX(0)';
        });
      }, 150);
    }
  }

  // ******
  // header
  $(".header").on("click", ".burger", function () {
    $(this).toggleClass("active")
  })

});