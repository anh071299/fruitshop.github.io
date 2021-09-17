import renderProduct from "../scripts/renderProduct.js";
$('.banner-slide').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
  dots: true, 
  autoplaySpeed: 1600,
  infinite: true,
  fade: true,
  cssEase: 'linear',
  swipeToSlide: true,
  adaptiveHeight: true
});
$('.partner-slick').slick({
  infinite: true,
  slidesToShow: 6,
  centerPadding: '20px', 
  slidesToScroll: 1,
  arrows: false,
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
        arrows: false,
        slidesToScroll: 4,
        dots: true,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              dots: true,
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              dots: true,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: false,
            }
          }
        ]
      });
    })

