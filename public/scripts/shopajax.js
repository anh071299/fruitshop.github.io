$("#slider-range").slider({
  range: true,
  min: 0,
  max: 500,
  values: [0, 500],
  slide: function(event, ui) {$("#price").html("$" + ui.values[0] + " - $" + ui.values[1]);}
  
});
$("#price").html("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
import pagination from "./pagination.js";

let url = new URL(window.location.href);
console.log(url);
let productPerPage = Number(url.searchParams.get("_limit")) || 6;
let page = Number(url.searchParams.get("_page")) || 1;
let parseLink = (link) => {
  let slash = link.lastIndexOf("?");
  let gte = link.lastIndexOf(">");

  let href = link.slice(slash, gte);

  let quote1 = Number(link.indexOf('"')) + 1;
  let quote2 = link.indexOf('"', quote1);
  let rel = link.slice(quote1, quote2);

  return { [rel]: href };
};

let xhr = $.ajax({
  url: `/products?_page=${page}&_limit=${productPerPage}`,
  type: "GET",
  dataType: "json",
})
  .done(
    function (json) {
      let delay = 0;

      json = json.
        map((p) => {

          delay += 0.16;
          return `
      <div class="col-12 col-md-6 col-xl-4" style="animation-delay:${delay}s">
    <div class="product-item"  >
     
        <div class="product-container">
          <div class="product-img">
          <a href="">
            <img src="${p.image}" alt="quả bơ" />
            </a>
          </div>
                <div class="product-content">
                <h2 class="product-title"><a href="">${p.title}</a></h2>
           ${p.salePrice == "" ? `<span class ="original-price real-price">${p.originalPrice}</span>` : `<span class ="original-price"><strike>${p.originalPrice}</strike></span>`}
          <span  ${p.salePrice == "" ? `style ="display:none"` : `style = "display:inline" class="sale-price real-price"`}  >${p.salePrice}</span>
                </div>
                <a href="" class="basket-icon icon"><i class="bi bi-basket"></i></span></a>
        </div>
    </div>
  </div>`}
        ).join("");

      $(".product-catalog .row").html(json);

      let total = xhr.getResponseHeader("x-total-count");
      let link = xhr.getResponseHeader("link");

      if (link) {
        link = link.split(", ").map((l) => parseLink(l));
        link = Object.assign({}, ...link);
      }


      let totalPage = Math.ceil(total / productPerPage);
      let pg = pagination(link, page, totalPage);
      $(".nav").html(pg);
    })
