import renderProduct from "../scripts/renderProduct.js";
$('.banner-slide').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  infinite: true,
  fade: true,
  cssEase: 'linear',
  swipeToSlide: true,
  adaptiveHeight: true
});
$('.partner-slick').slick({
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      }
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
      }
    }]
});

let xhr = $.ajax({
  url: `/products`,
  type: "GET",
  dataType: "json",
})
  .done(
    function (json) {
      json = json.
        map((p) => {
          return `${renderProduct(p)}`
        }).join("");

      $(".product-slider").html(json);
      $('.product-slider').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    })

// resize
// function resize_text() {
//   var fSizeH2 = Math.ceil($(window).width() * (36 / 1200));
//   var fSizeH1 = Math.ceil($(window).width() * (72 / 1200))
//   if ($(window).width() < 1200) {
//       $('.slide-content h2').css('font-size', fSizeH2 + 'px');
//       $('.slide-content h2').css('line-height', fSizeH2*2 + 'px');
//       $('.slide-content h2').css('font-size', fSizeH2 + 'px');
//       $('.slide-content h2').css('line-height', fSizeH2*2 + 'px');
//     }
//    else {
//     $('.slide-content h2').css('font-size', 36 + 'px');
//     $('.slide-content h2').css('line-height', 72 +'px');
//   }
// }
// $(window).resize(function () {
//   resize_text();
// })
// resize_text();