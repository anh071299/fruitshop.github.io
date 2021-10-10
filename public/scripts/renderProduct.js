export default (i) =>
  ` <div class="product-item"  >\n<div class="product-container">\n  <div class="product-img">\n  <a href="product.html?productId=${
    i.id
  }">\n    <img src="${
    i.image
  }" alt="quả bơ" />\n    </a>\n  </div>\n        <div class="product-content">\n        <h2 class="product-title"><a href="product.html?productId=${
    i.id
  }">${i.title}</a></h2>\n   ${
    "" == i.salePrice
      ? `<span class ="original-price real-price">$${i.originalPrice}.0</span>`
      : `<span class ="original-price"><strike>$${i.originalPrice}.0</strike></span>`
  }\n  <span ${
    "" == i.salePrice
      ? 'style ="display:none"'
      : 'style = "display:inline" class="sale-price real-price"'
  }  >$${
    i.salePrice
  }.0</span>\n        </div>\n        <a class="basket-icon icon" title = "${i.title}" onclick="addCart(${
    i.id
  })"><i class="bi bi-basket"></i></span></a>\n</div>\n</div>`;
