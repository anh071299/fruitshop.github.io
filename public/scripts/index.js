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
            return `
      <div class="product-item">
        
          <div class="product-container">
            <div class="product-img">
            <a href="product.html?productId=${p.id}">
              <img src="${p.image}" alt="${p.title}" />
              </a>
            </div>
                 
                  <div class="product-content">
            <h2 class="product-title"><a href="product.html?productId=${p.id}">${p.title}</a></h2>
             ${p.salePrice == "" ? `<span class ="original-price real-price">${p.originalPrice}</span>` : `<span class ="original-price"><strike>${p.originalPrice}</strike></span>`}
            <span  ${p.salePrice == "" ? `style ="display:none"` : `style = "display:inline" class="sale-price real-price"`}  >${p.salePrice}</span>
                  </div>
                  <a href="" class="basket-icon icon"><i class="bi bi-basket"></i></span></a>
          </div>
     
      </div>
  `}
          ).join("");
  
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
  
  