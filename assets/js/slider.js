document.addEventListener('DOMContentLoaded', function () {

  $('.www').each(function () {
    const slider = $(this);
    slider.slick({
      autoplay: true,
      autoplaySpeed: 700000,
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      prevArrow: $('.www .prev'),
      nextArrow: $('.www .next'),
      rows: 0,
      responsive: [
        {
          breakpoint: 1199,
          settings: {
            centerMode: true,
          }
        }
      ]
    });
  })

})
