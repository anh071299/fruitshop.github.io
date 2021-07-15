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
      
        <div class="product-img">
        <a href="">
          <img src="${p.image}" alt="${p.title}" />
          </a>
        </div>
     
      <div class="product-content">
        <h2 class="product-title"><a href="">${p.title}</a></h2>
         ${p.salePrice == "" ? `<span class ="original-price real-price">${p.originalPrice}</span>` : `<span class ="original-price"><strike>${p.originalPrice}</strike></span>`} 
        <span  ${p.salePrice == "" ? `style ="display:none"` : `style = "display:inline" class="sale-price real-price"`}  >${p.salePrice}</span>
      </div>
      <a href="" class="basket-icon icon"><i class="bi bi-basket"></i></span></a>
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

