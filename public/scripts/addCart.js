function addCart(t) {
  $.get("/products").done(function (e) {
    e.forEach(function (e) {
      e.id == t && (totalCost(e), cartNumbers(e));
    });
  });
}
function onLoadCartNumbers() {
  let t = sessionStorage.getItem("cartNumbers");
  t && $(".basket-amount").html(t);
}
function cartNumbers(t, e) {
  let a = sessionStorage.getItem("cartNumbers");
  a = parseInt(a);
  let s = sessionStorage.getItem("productsInCart");
  (s = JSON.parse(s)),
    e
      ? (sessionStorage.setItem("cartNumbers", a - 1),
        $(".basket-amount").html(`${a - 1}`),
        console.log("action running"))
      : a
      ? (sessionStorage.setItem("cartNumbers", a + 1),
        $(".basket-amount").html(`${a + 1}`))
      : (sessionStorage.setItem("cartNumbers", 1),
        $(".basket-amount").html("1")),
    setItems(t);
    let n = $(".product-item .basket-icon.pending");
    let added = $("input[value='Add to Cart']");
    n.removeClass("pending"),
    n.addClass("success"),
    (typeof(n.attr('title'))  === "undefined") ? $('.productAlert').prepend(`<span>Product "${added.attr('title')}" added to your cart<span>`).fadeIn() :$('.productAlert').prepend(`<span>Product "${n.attr('title')}" added to your cart<span>`).fadeIn()
   ; 
    window.setTimeout(() => {
      n.removeClass("success"),
      $('.productAlert span').remove();
      $('.productAlert').fadeOut();
    $(".product-container.add-cart-item").removeClass("add-cart-item");
    },1500);
}
function setItems(t) {
  let e = sessionStorage.getItem("productsInCart");
  if (null != (e = JSON.parse(e))) {
    let a = t.title;
    null == e[a] && (e = { ...e, [a]: t }), (e[a].inCart += 1);
  } else (t.inCart = 1), (e = { [t.title]: t });
  sessionStorage.setItem("productsInCart", JSON.stringify(e));
}
function totalCost(t, e) {
  let a,
    s = sessionStorage.getItem("totalCost");
  (a = "" == t.salePrice ? t.originalPrice : t.salePrice),
    e
      ? ((s = parseInt(s)), sessionStorage.setItem("totalCost", s - a))
      : null != s
      ? ((s = parseInt(s)), sessionStorage.setItem("totalCost", s + a))
      : sessionStorage.setItem("totalCost", a);
}
function displayCart() {
  $(".cart-action").hide(), $(".order").hide();
  let t = sessionStorage.getItem("productsInCart");
  t = JSON.parse(t);
  let e = sessionStorage.getItem("totalCost");
  e = parseInt(e);
  let a = $(".cart-form")[0],
    s = $(".order-items")[0];
  if (t && a) {
    a.innerHTML = "";
    let s = "";
    Object.values(t).map((t, e) => {
      (html = ` \n        <td class="product-img">\n            <img src="${
        t.image
      }" />\n        </td>\n        <td class="product-name" data-title="Product">\n            <a  href="product.html?productId=${
        t.id
      }">${t.title}</a>\n        </td>\n        ${
        "" == t.salePrice
          ? `<td data-title="Price"><span class ="original-price real-price">$${t.originalPrice}.0<span></td>`
          : `<td data-title="Price"><span  class="sale-price real-price">$${t.salePrice}.0 </span></td>`
      }\n        <td class="cart-quanity" data-title="Quanity">\n            <div>\n                <input type="number" step="1" min="1" value="${
        t.inCart
      }" max="9" class="product-quanity">\n                <span class="q-inc q-icon increase"></span>\n                <span class="q-des q-icon decrease"></span>\n            </div>\n        </td>\n        ${
        "" == t.salePrice
          ? `<td class="total"  data-title="Total">$${
              t.inCart * t.originalPrice
            }.0</td>`
          : `<td class="total" data-title="Total">$${
              t.inCart * t.salePrice
            }.0</td>`
      }\n        <td class="close"><i class="bi bi-x close-btn"></i></td>\n        \n        `),
        "" != html && (s += `<tr>${html}</tr>`);
    }),
      s
        ? ((a.innerHTML = `\n            <table class="cart-table table mt-80 d-block d-lg-table">\n                <thead>\n                    <tr>\n                        <th colspan="2">Product</th>\n                        <th class="col-2">Price</th>\n                        <th class="col-2">Quanity</th>\n                        <th class="col-2">Total</th>\n                        <th class="col-1"></th>\n                    </tr>\n                </thead>\n                <tbody class="cart-table-content">\n                    ${s}\n                </tbody>\n                <tfoot class="cart-table-footer">\n                    <tr>\n                        <th colspan="4" class="total-title">Totals</th>\n                        <td colspan="2" class="total-price">$${e}.00</td>\n                    </tr>\n                </tfoot>\n            </table>\n\n       `),
          (a.innerHTML = `\n            <table class="cart-table table mt-80 d-block d-lg-table">\n                <thead>\n                    <tr>\n                        <th colspan="2">Product</th>\n                        <th class="col-2">Price</th>\n                        <th class="col-2">Quanity</th>\n                        <th class="col-2">Total</th>\n                        <th class="col-1"></th>\n                    </tr>\n                </thead>\n                <tbody class="cart-table-content">\n                    ${s}\n                </tbody>\n                <tfoot class="cart-table-footer">\n                    <tr>\n                        <th colspan="4" class="total-title">Totals</th>\n                        <td colspan="2" class="total-price">$${e}.00</td>\n                    </tr>\n                </tfoot>\n            </table>\n\n       `),
          deleteButtons(),
          manageQuantity(),
          ($(".sub-total")[0].innerHTML = `$${e}`),
          ($(".total-bill")[0].innerHTML = `$${e}`),
          $(".cart-action").show(),
          $(".cart-message").hide(),
          $(".order").show())
        : ($(".cart-message").show(),
          $(".order").hide(),
          $(".cart-action").hide());
  }
  if (t && s) {
    s.innerHTML = "";
    let a = "";
    Object.values(t).map((t, e) => {
      (bill = ` \n            <td class = "product-name">\n               ${
        t.title
      }\n               <strong class="bill-item-quantity">×&nbsp;${
        t.inCart
      }</strong>\n            </td>\n            \n            ${
        "" == t.salePrice
          ? `<td class="total"  data-title="Total">$${
              t.inCart * t.originalPrice
            }.0</td>`
          : `<td class="total" data-title="Total">$${
              t.inCart * t.salePrice
            }.0</td>`
      }\n        \n            `),
        "" != bill && (a += `<tr>${bill}</tr>`);
    }),
      a && (s.innerHTML = `${a}`),
      ($(".sub-total")[0].innerHTML = `$${e}.0`),
      ($(".total-bill")[0].innerHTML = `$${e}.0`);
  }
}
function manageQuantity() {
  let t = document.querySelectorAll(".decrease"),
    e = document.querySelectorAll(".increase"),
    a = 0,
    s = "",
    n = sessionStorage.getItem("productsInCart");
  n = JSON.parse(n);
  for (let r = 0; r < e.length; r++)
    t[r].addEventListener("click", () => {
      (a = t[r].parentElement.querySelector("input").value),
        (s = $("table .product-name a")[r].innerHTML),
        n[s].inCart > 1 &&
          ((n[s].inCart -= 1),
          cartNumbers(n[s], "decrease"),
          totalCost(n[s], "decrease"),
          sessionStorage.setItem("productsInCart", JSON.stringify(n)),
          displayCart());
    }),
      e[r].addEventListener("click", () => {
        (a = e[r].parentElement.querySelector("span").textContent),
          (s = $("table .product-name a")[r].innerHTML),
          (n[s].inCart += 1),
          cartNumbers(n[s]),
          totalCost(n[s]),
          sessionStorage.setItem("productsInCart", JSON.stringify(n)),
          displayCart();
      });
}
function deleteButtons() {
  let t,
    e = document.querySelectorAll(".close-btn"),
    a = sessionStorage.getItem("cartNumbers"),
    s = sessionStorage.getItem("totalCost"),
    n = sessionStorage.getItem("productsInCart");
  n = JSON.parse(n);
  for (let r = 0; r < e.length; r++)
    e[r].addEventListener("click", () => {
      (t = $("table .product-name a")[r].innerHTML),
        sessionStorage.setItem("cartNumbers", a - n[t].inCart),
        "" == n[t].salePrice
          ? sessionStorage.setItem(
              "totalCost",
              s - n[t].originalPrice * n[t].inCart
            )
          : sessionStorage.setItem(
              "totalCost",
              s - n[t].salePrice * n[t].inCart
            ),
        delete n[t],
        sessionStorage.setItem("productsInCart", JSON.stringify(n)),
        displayCart(),
        onLoadCartNumbers();
    });
}
$(document).on("click", ".product-item .basket-icon", function () {
  $(this).addClass("pending"), $(this.parentElement).addClass("add-cart-item");
}),
$(document).on("click", "input[value='Add to Cart']", function () {
    $(this).addClass("added");
  }),
  $(document).ready(function () {
    $("tr:empty").remove();
  }),
  onLoadCartNumbers(),
  displayCart();
