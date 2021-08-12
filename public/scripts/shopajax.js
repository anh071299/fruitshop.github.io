// pagination
import renderProduct from "../scripts/renderProduct.js"
let toPrevPage = (link, current) => {
  return `
      <li class="page-item ${current == 1 ? "disabled" : ""}">
          <a class="page-link" href="${link}"> <span aria-hidden="true">&laquo;</span></a>
      </li>    
  `;
};

let toNextPage = (link, current, totalPage) => {
  return `
      <li class="page-item ${current == totalPage ? "disabled" : ""}">
          <a class="page-link" href="${link}"><span aria-hidden="true">&raquo;</span></a>
      </li>    
  `;
};

let currentPage = (current) => {
  return `
      <li class="page-item active">
          <a class="page-link">${current}</a>
      </li>
  `;
};

let prevPage = (current) => {
  let rt = "";
  for (let page = 1; page < current; page++) {

    rt += `
      <li class="page-item">
          <a class="page-link" href="?_page=${page}&_limit=6>">${page}</a>
      </li>
  `
  }
  return rt;
};

let nextPage = (current, totalPage) => {
  let rt = "";
  for (let page = current + 1; page <= totalPage; page++) {

    rt += `
      <li class="page-item">
          <a class="page-link" href="?_page=${page}&_limit=6>">${page}</a>
      </li>
  `
  }
  return rt;
};

function pagination({ prev, next }, current, totalPage) {
  return `
      <ul class="pagination">
          ${toPrevPage(prev, current)}
          ${prevPage(current)}
          ${currentPage(current)}
          ${nextPage(current, totalPage)}
          ${toNextPage(next, current, totalPage)}
      </ul>
  `;
}
// filter price
$("#slider-range").slider({
  range: true,
  min: 0,
  max: 500,
  values: [0, 500],
  slide: function (event, ui) { $("#price").html("$" + ui.values[0] + " - $" + ui.values[1]); }
});
$("#price").html("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
// parselink
let url = new URL(window.location.href);
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
// ajax

$.get("/products")
  .done(function (json) {
    let fruit = 0, vegetables = 0, milk = 0, dried = 0;
    $.each(json, function (c) {
      if (json[c].category == 'fruit') {
        fruit += 1;
      }
      else if ((json[c].category == 'vegetables')) {
        vegetables += 1;
      }
      else if ((json[c].category == 'milk')) {
        milk += 1;
      }
      else dried += 1;
    })
    $('.categorie-list')[0].innerHTML = `
    <li class="cat-item">
        <a>Fruits<span/>${fruit}</span></a>
    </li>
    <li class="cat-item">
        <a href="">Vegetables<span>${vegetables}</span></a>
    </li>
    <li class="cat-item" >
        <a href="">Dried<span>${dried}</span></a>
    </li>
    <li class="cat-item ">
        <a href="">Milk, Cream<span>${milk}</span></a>
    </li>
`
  })

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
          delay += 0.05;
          return `
      <div class="col-12 col-md-6 col-xl-4" style="animation-delay:${delay}s">
   ${renderProduct(p)}
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
