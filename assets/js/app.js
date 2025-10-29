document.addEventListener('DOMContentLoaded', function () {

  console.log("webdmitriev");

  const isAnimation = document.querySelector('.is-animation');

  // blue bg
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

  // gold bg
  function createGoldGrid() {
    const container = document.querySelector('.background-gold');
    if (!container) return;

    // Определяем мобильное устройство
    const isMobile = window.innerWidth <= 768;

    const config = {
      // Адаптивное количество линий
      totalLines: isMobile ? 6 : 10, // На мобиле меньше линий
      hasAnimation: isAnimation,
      color: '#C8A86A',
      opacity: '0.09',
      lineThickness: 2,
      // Настройка расстояния между линиями
      gapPercentage: isMobile ? 15 : 18, // % расстояния между линиями
      // Минимальное и максимальное количество линий
      minLines: 6,
      maxLines: 8,
      // Дополнительные настройки
      mobileBreakpoint: 768,
      tabletBreakpoint: 1024
    };

    // Динамическое вычисление количества линий в зависимости от размера экрана
    function calculateLines() {
      const width = window.innerWidth;

      if (width <= config.mobileBreakpoint) {
        return config.minLines;
      } else if (width <= config.tabletBreakpoint) {
        return Math.floor((config.minLines + config.maxLines) / 2);
      } else {
        return config.maxLines;
      }
    }

    // Обновляем количество линий
    config.totalLines = calculateLines();

    container.innerHTML = '';

    const fragment = document.createDocumentFragment();

    // Создаем горизонтальные линии с учетом расстояния
    for (let i = 0; i < config.totalLines; i++) {
      const horizontalLine = document.createElement('span');
      horizontalLine.className = 'gold-line gold-line--horizontal';

      // Равномерное распределение с учетом расстояния
      const positionY = (i / (config.totalLines - 1)) * (100 - config.gapPercentage) + (config.gapPercentage / 2);

      horizontalLine.style.cssText = `
      position: absolute;
      width: 100%;
      height: ${config.lineThickness}px;
      background: ${config.color};
      top: ${positionY}%;
      left: 0;
      opacity: ${config.hasAnimation ? '0' : config.opacity};
      transform: ${config.hasAnimation ? 'translateX(-100%)' : 'translateX(0)'};
    `;

      if (config.hasAnimation) {
        horizontalLine.style.transition = `opacity 0.6s ease, transform 0.8s ease`;
        horizontalLine.style.transitionDelay = `${i * 50}ms`;
        horizontalLine.dataset.finalOpacity = config.opacity;
      }

      fragment.appendChild(horizontalLine);
    }

    // Создаем вертикальные линии с учетом расстояния
    for (let i = 0; i < config.totalLines; i++) {
      const verticalLine = document.createElement('span');
      verticalLine.className = 'gold-line gold-line--vertical';

      // Равномерное распределение с учетом расстояния
      const positionX = (i / (config.totalLines - 1)) * (100 - config.gapPercentage) + (config.gapPercentage / 2);

      verticalLine.style.cssText = `
      position: absolute;
      width: ${config.lineThickness}px;
      height: 100%;
      background: ${config.color};
      left: ${positionX}%;
      top: 0;
      opacity: ${config.hasAnimation ? '0' : config.opacity};
      transform: ${config.hasAnimation ? 'translateY(-100%)' : 'translateY(0)'};
    `;

      if (config.hasAnimation) {
        verticalLine.style.transition = `opacity 0.6s ease, transform 0.8s ease`;
        verticalLine.style.transitionDelay = `${(i + config.totalLines) * 50}ms`;
        verticalLine.dataset.finalOpacity = config.opacity;
      }

      fragment.appendChild(verticalLine);
    }

    container.appendChild(fragment);

    // Запуск анимации
    if (config.hasAnimation) {
      setTimeout(() => {
        const horizontalLines = container.querySelectorAll('.gold-line--horizontal');
        const verticalLines = container.querySelectorAll('.gold-line--vertical');

        horizontalLines.forEach(line => {
          line.style.opacity = line.dataset.finalOpacity;
          line.style.transform = 'translateX(0)';
        });

        verticalLines.forEach(line => {
          line.style.opacity = line.dataset.finalOpacity;
          line.style.transform = 'translateY(0)';
        });
      }, 200);
    }
  }

  let resizeTimeout;
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      createGoldGrid();
    }, 250);
  }
  window.addEventListener('resize', handleResize);

  // start animation
  startAnimation()
  function startAnimation() {
    if (isAnimation) {
      // blue
      setTimeout(() => createSpansWithOptions(), 150);

      // gold
      setTimeout(() => createGoldGrid(), 250);
    } else {
      createSpansWithOptions()
      createGoldGrid()
    }
  }


  // ******
  // header
  $(".header").on("click", ".burger", function () {
    $(this).toggleClass("active")
  })

});