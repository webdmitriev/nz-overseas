document.addEventListener('DOMContentLoaded', function () {

  console.log("webdmitriev");

  const isAnimation = document.querySelector('.is-animation');

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