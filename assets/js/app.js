document.addEventListener('DOMContentLoaded', function () {

  console.log("webdmitriev");

  const isAnimation = document.querySelector('.is-animation');

  //
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

  // animation screen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.isIntersecting ? entry.target.classList.add('with-animation-active') : entry.target.classList.remove('www'))
  }, { rootMargin: "-5px 0px -100px 0px" })

  if (isAnimation) {

    const arrayClasses = [
      // ".logotype-line-01",
      // ".logotype-line-02",
    ]
    arrayClasses.forEach((str, idx) => {
      if (document.querySelector(str)) {
        const btn = document.querySelectorAll(str)
        btn.forEach(el => observer.observe(el))
      }
    })
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