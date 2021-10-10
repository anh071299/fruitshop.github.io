let url = new URL(window.location.href),
  productId = url.searchParams.get("productId"),
  xhr = $.ajax({
    url: `products/${productId}`,
    type: "GET",
    dataType: "json",
  }).done(function (t) {
    let n = t,
      i = ` \n        <h1 class="product-title">${
        n.title
      }</h1>\n        <div class="price">\n        ${
        "" == n.salePrice
          ? `<span class ="original-price real-price">$${n.originalPrice}.0</span>`
          : `<span class ="original-price"><strike>$${n.originalPrice}.0</strike></span>`
      }\n        <span  ${
        "" == n.salePrice
          ? 'style ="display:none"'
          : 'style = "display:inline" class="sale-price real-price"'
      }  >$${
        n.salePrice
      }.0</span>\n        \n        </div>\n        <div class="product-des">\n           ${
        n.summary
      }\n        </div>\n        <div class="product-meta">\n            <span class="unit"><b>Unit</b>:${
        n.unit
      }</span>\n            <span class="posted-in"><b>Categories</b>: ${
        n.category
      } </span>\n            <span class="sku-id"><b>SKU</b>: ${
        n.sku
      } </span> \n        </div>\n        `,
      a = "";
    t.component.forEach(function (t) {
      for (key in t)
        a += `\n        <tr>\n            <th>${key}</th>\n            <td>${t[key]}</td>\n        </tr>\n         `;
    }),
      $(".current-fruit").html(`${n.title}`),
      $(".product-info").html(i),
      $(".product-image").html(`<img src="${n.image}" alt="fruit">`),
      $("#des-tab-content").html(`${n.description}`),
      $(".nutrition-table tbody").html(`${a}`),
      $("title").html(`${n.title} - Fresh Farm`),
      $(".product-detail .corner-add").html(
        `\n        <input type="button" value="Add to Cart" title = "${n.title}" class="btn submitBtn" onclick="addCart(${n.id})" />\n        <span class="morph-element">\n        </span>\n    `
      );
  });
$("ul.product-tabs li a").click(function () {
  ($this = $(this)),
    $(".product-tab-content").hide(),
    $("ul.product-tabs li a").removeClass("active"),
    $this.addClass("active").blur();
  var t = $this.attr("href");
  return $(t).fadeIn(350), !1;
}),
  $("ul.product-tabs li:first a").click(),
  $(".q-icon")
    .off("click")
    .on("click", function () {
      var t = $(".quanity input").attr("min"),
        n = $(".quanity input").attr("max");
      if ($(this).hasClass("q-inc")) {
        var i = parseInt($(this).parent().find("input").val()) + 1;
        i > n && (i = n),
          $(this).parent().find("input").val(i).trigger("change");
      }
      if ($(this).hasClass("q-des")) {
        var a = parseInt($(this).parent().find("input").val()) - 1;
        a < t && (a = 1),
          $(this).parent().find("input").val(a).trigger("change");
      }
    });
