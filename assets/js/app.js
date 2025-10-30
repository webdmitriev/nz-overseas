class AdvancedSequentialAnimator {
  constructor() {
    this.animationQueue = [];
    this.isAnimating = false;
  }

  // Добавление элементов в очередь анимации с расширенными параметрами
  addAnimation(selector, animationClass, options = {}) {
    const config = {
      selector,
      animationClass,
      delayBeforeNext: options.delayBeforeNext || 0, // Задержка после завершения анимации
      initialDelay: options.initialDelay || 0, // Задержка перед началом анимации
      timeout: options.timeout || 1000, // Максимальное время ожидания анимации
      condition: options.condition // Условие для выполнения анимации
    };

    this.animationQueue.push(config);
    return this;
  }

  // Запуск последовательной анимации
  async start() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    for (const item of this.animationQueue) {
      // Проверяем условие (если есть)
      if (item.condition && !item.condition()) {
        console.log(`Пропуск анимации: ${item.selector} - условие не выполнено`);
        continue;
      }

      // Начальная задержка
      if (item.initialDelay > 0) {
        await this.delay(item.initialDelay);
      }

      // Запускаем анимацию элемента
      await this.animateElement(
        item.selector,
        item.animationClass,
        item.timeout
      );

      // Задержка перед следующим элементом
      if (item.delayBeforeNext > 0) {
        await this.delay(item.delayBeforeNext);
      }
    }

    this.isAnimating = false;
  }

  // Анимация одного элемента
  animateElement(selector, animationClass, timeout = 500) {
    return new Promise((resolve) => {
      const element = document.querySelector(selector);

      if (!element) {
        console.warn(`Элемент не найден: ${selector}`);
        resolve();
        return;
      }

      // Добавляем класс анимации
      element.classList.add(animationClass);

      let animationEnded = false;

      const completeAnimation = () => {
        if (animationEnded) return;
        animationEnded = true;
        element.removeEventListener('animationend', onAnimationEnd);
        element.removeEventListener('transitionend', onAnimationEnd);
        resolve();
      };

      const onAnimationEnd = () => {
        completeAnimation();
      };

      element.addEventListener('animationend', onAnimationEnd);
      element.addEventListener('transitionend', onAnimationEnd);

      // Таймаут на случай если анимация не сработает
      setTimeout(completeAnimation, timeout);
    });
  }

  // Вспомогательная функция задержки
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Очистка очереди
  clear() {
    this.animationQueue = [];
    this.isAnimating = false;
  }
}

document.addEventListener('DOMContentLoaded', function () {

  console.log("webdmitriev");

  const isAnimation = document.querySelector('.is-animation');

  // animation screen
  const advancedAnimator = new AdvancedSequentialAnimator();
  if (isAnimation) {
    advancedAnimator
      .addAnimation('.nz-background .line-horizontals', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 500
      })
      .addAnimation('.nz-background .line-verticals', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 500
      })
      .addAnimation('.header', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 500,
        condition: () => window.innerWidth > 768 // Только на десктопе
      })
      .addAnimation('.main .main-content .h1', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 500,
        condition: () => window.innerWidth > 768 // Только на десктопе
      })
      .addAnimation('.main .main-content .sub_title', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
        condition: () => window.innerWidth > 768 // Только на десктопе
      })
      .addAnimation('.main .main-images', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
        condition: () => window.innerWidth > 768 // Только на десктопе
      })
      .addAnimation('.main .main-images .images-container .cup.cup-01', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-02', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-03', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-04', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-05', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-06', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-07', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-08', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-09', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-10', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-11', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-12', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-13', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-14', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-15', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 10,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-16', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 10,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-17', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 10,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-18', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 10,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-19', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 10,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-20', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 10,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-21', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 10,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-22', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 10,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-23', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 10,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-24', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 10,
      })
      .addAnimation('.main .main-images .images-container .cup.cup-25', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 10,
        condition: () => window.innerWidth > 768 // Только на десктопе
      })
      .addAnimation('.main .main-images .images-container .ogive.ogive-04', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 10,
      })
      .addAnimation('.main .main-images .images-container .ogive.ogive-03', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 10,
      })
      .addAnimation('.main .main-images .images-container .ogive.ogive-02', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 10,
      })
      .addAnimation('.main .main-images .images-container .ogive.ogive-01', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 10,
      })
      .addAnimation('.main .main-content .candle.candle-01', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 10,
        condition: () => window.innerWidth > 768 // Только на десктопе
      })
      .addAnimation('.main .main-content .candle.candle-02', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 10,
        condition: () => window.innerWidth > 768 // Только на десктопе
      })
      .addAnimation('.main .main-content .candle.candle-03', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 10,
        condition: () => window.innerWidth > 768 // Только на десктопе
      })
      .addAnimation('.main .main-content .candle.candle-04', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 10,
        condition: () => window.innerWidth > 768 // Только на десктопе
      })
      .addAnimation('.main .main-content .candle.candle-05', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 10,
      })
      .addAnimation('.main .main-content .candle.candle-06', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 10,
      })
      .addAnimation('.main .line-items .line-item.line-item-01', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
        condition: () => window.innerWidth > 768 // Только на десктопе
      })
      .addAnimation('.main .line-items .line-item.line-item-02', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
        condition: () => window.innerWidth > 768 // Только на десктопе
      })
      .addAnimation('.main .line-items .line-item.line-item-03', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
        condition: () => window.innerWidth > 768 // Только на десктопе
      })
      .addAnimation('.main .line-items .line-item.line-item-04', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
        condition: () => window.innerWidth > 768 // Только на десктопе
      })
      .addAnimation('.request', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
        condition: () => window.innerWidth > 768 // Только на десктопе
      })
      .addAnimation('.footer', 'show-in', {
        initialDelay: 50, // Ждем перед началом анимации
        delayBeforeNext: 50, // Ждем после анимации перед следующим
        timeout: 20,
        condition: () => window.innerWidth > 768 // Только на десктопе
      })

    advancedAnimator.start();
  }

  // Graph line
  animateGraphLine()
  function animateGraphLine() {
    const path = document.getElementById('graph-line');
    const length = path.getTotalLength();

    // Устанавливаем начальные значения для анимации
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.style.transition = 'none';

    // Анимация
    let start = null;
    const duration = 20000; // 4 секунды

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);

      // Easing функция для плавности
      const eased = easeOutCubic(percent);

      path.style.strokeDashoffset = length * (1 - eased);

      if (percent < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  // start animation
  startAnimation()
  function startAnimation() {
    if (isAnimation) {
      // gold
      // setTimeout(() => createGoldGrid(), 50);
    } else {
      createGoldGrid()
    }
  }

  // ******
  // header
  $(".header").on("click", ".burger", function () {
    $(this).toggleClass("active")
  })

});