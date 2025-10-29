document.addEventListener('DOMContentLoaded', function () {

  const payment = document.querySelectorAll('.progress-content');
  if (payment) {
    payment.forEach(el => {
      const line = el.querySelector('.progress-line')
      const dataStart = +line.getAttribute('data-start')
      const dataEnd = +line.getAttribute('data-end')

      const result = Math.floor(dataStart * 100 / dataEnd);

      if (line.querySelector(".progress-line__real")) { line.querySelector(".progress-line__real").style.width = result + '%'; }
    })
  }

  $('body').on('click', '.popup-close, .overlay', function () {
    $('.popup, .overlay').removeClass('active');
    $('.popup-video video').attr('src', '');
  })

  // плавный скролл
  $("a.ancLinks").click(function () {
    console.log('ddsas');
    var elementClick = $(this).attr("href");
    var destination = $(elementClick).offset().top;
    $("html,body").animate({ scrollTop: destination }, 1100);
    return false;
  });

  $(".btn-popup-pdf").click(function () {
    $(".popup").removeClass("active");
    $(".popup-pdf").addClass("active");
    var iframeSRC = "/vendors/pdfjs/web/viewer.html?file=" + encodeURIComponent(this.dataset.src);
    $(".popup-pdf--iframe").attr("src", iframeSRC);
    $(".overlay").addClass("active");
  });

  $(".btn-popup-subscr").click(function () {
    $(".popup-subscr").addClass("active");
    $(".overlay").addClass("active");
  });

});