
function addCart(id) {
    $.get('/products').done(function (json) {
        json.forEach(function (val) {
            if (val.id == id) {
                totalCost(val);
                cartNumbers(val);
            }
        }
        )
    })
}
function onLoadCartNumbers() {
    let productNumbers = sessionStorage.getItem('cartNumbers');
    if (productNumbers) {
        $('.basket-amount').html(productNumbers);
    }
}
function cartNumbers(product, action) {
    let productNumbers = sessionStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = sessionStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (action) {
        sessionStorage.setItem("cartNumbers", productNumbers - 1);
        $('.basket-amount').html(`${productNumbers - 1}`);
        console.log("action running");
    } else if (productNumbers) {
        sessionStorage.setItem("cartNumbers", productNumbers + 1);
        $('.basket-amount').html(`${productNumbers + 1}`);
    } else {
        sessionStorage.setItem("cartNumbers", 1);
        $('.basket-amount').html('1');
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = sessionStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        let currentProduct = product.title;

        if (cartItems[currentProduct] == undefined) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        }
        cartItems[currentProduct].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.title]: product
        };
    }
    sessionStorage.setItem('productsInCart', JSON.stringify(cartItems));
}
function totalCost(product, action) {
    let cart = sessionStorage.getItem("totalCost");
    let price;
    if (product.salePrice == "") {
        price = product.originalPrice;
    }
    else {
        price = product.salePrice;
    }
    if (action) {
        cart = parseInt(cart);
        sessionStorage.setItem("totalCost", cart - price);
    } else if (cart != null) {
        cart = parseInt(cart);
        sessionStorage.setItem("totalCost", cart + price);

    } else {
        sessionStorage.setItem("totalCost", price);
    }
}
function displayCart() {
    $('.cart-action').hide();
    let cartItems = sessionStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let cart = sessionStorage.getItem("totalCost");
    cart = parseInt(cart);
    let cartContent = $('.cart-form')[0];
    if (cartItems && cartContent) {
        cartContent.innerHTML ='';
        let  productContainer= '';
        let order = '';
        Object.values(cartItems).map((item, index) => {
            html =
        ` 
        <td class="product-img">
            <img src="${item.image}" />
        </td>
        <td class="product-name" data-title="Product">
            <a class="cart-product-name" href="product.html?productId=${item.id}">${item.title}</a>
        </td>
        ${item.salePrice == ""
                    ? `<td data-title="Price"><span class ="original-price real-price">$${item.originalPrice}.0<span></td>`
                    : `<td data-title="Price"><span  class="sale-price real-price">$${item.salePrice}.0 </span></td>`}
        <td class="cart-quanity" data-title="Quanity">
            <div>
                <input type="number" step="1" min="1" value="${item.inCart}" max="9" class="product-quanity">
                <span class="q-inc q-icon increase"></span>
                <span class="q-des q-icon decrease"></span>
            </div>
        </td>
        ${item.salePrice == "" ?
                    `<td class="total"  data-title="Total">$${item.inCart * item.originalPrice}.0</td>` :
                    `<td class="total" data-title="Total">$${item.inCart * item.salePrice}.0</td>`}
        <td class="close"><i class="bi bi-x close-btn"></i></td>
        
        `
        // order += 
        // `
        //     <tr class="cart_item">
        //         <td class="product-name">
        //         ${item.title}<strong class="product-quantity">${item.inCart}</strong></td>
        //         <td class="product-total">
        //         ${item.salePrice == "" ?
        //             `<td class="total"  data-title="Total">$${item.inCart * item.originalPrice}.0</td>` :
        //             `<td class="total" data-title="Total">$${item.inCart * item.salePrice}.0</td>`}
        //     </tr>
        // `
        
            if (html != '') {
                productContainer +=
                    `<tr>${html}</tr>`;
            }
            

        });
   if(productContainer){
    cartContent.innerHTML = `
    <table class="cart-table table mt-80 d-block d-lg-table">
                <thead>
                    <tr>
                        <th colspan="2">Product</th>
                        <th class="col-2">Price</th>
                        <th class="col-2">Quanity</th>
                        <th class="col-2">Total</th>
                        <th class="col-1"></th>
                    </tr>
                </thead>
                <tbody class="cart-table-content">
                    ${productContainer}
                </tbody>
                <tfoot class="cart-table-footer">
                    <tr>
                        <th colspan="4" class="total-title">Totals</th>
                        <td colspan="2" class="total-price">$${cart}.00</td>
                    </tr>
                </tfoot>
            </table>

       `;
    //    console.log(order+'ok');
    //    $('.order-table tbody').innerHTML = order;
    // $('.sub-total')[0].innerHTML = `$${cart}`
    // $('.total-bill')[0].innerHTML = `$${cart}`
    deleteButtons();
    manageQuantity();
    $('.cart-message').hide(); cartContent.innerHTML = `
    <table class="cart-table table mt-80 d-block d-lg-table">
                <thead>
                    <tr>
                        <th colspan="2">Product</th>
                        <th class="col-2">Price</th>
                        <th class="col-2">Quanity</th>
                        <th class="col-2">Total</th>
                        <th class="col-1"></th>
                    </tr>
                </thead>
                <tbody class="cart-table-content">
                    ${productContainer}
                </tbody>
                <tfoot class="cart-table-footer">
                    <tr>
                        <th colspan="4" class="total-title">Totals</th>
                        <td colspan="2" class="total-price">$${cart}.00</td>
                    </tr>
                </tfoot>
            </table>

       `
    // $('.sub-total')[0].innerHTML = `$${cart}`
    // $('.total-bill')[0].innerHTML = `$${cart}`
    deleteButtons();
    manageQuantity();
    // $('.sub-total')[0].innerHTML = `$${cart}`
    // $('.total-bill')[0].innerHTML = `$${cart}`
    $('.cart-action').show();
    $('.cart-message').hide();
   }
       else{
        $('.cart-message').show();
        $('.cart-action').hide();
       }
    }

    
}
function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = sessionStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            currentQuantity = decreaseButtons[i].parentElement.querySelector('input').value;
            currentProduct = $('table .cart-product-name')[i].innerHTML;
            if (cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                sessionStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = $('table .cart-product-name')[i].innerHTML;
            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            sessionStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.close-btn');
    let productNumbers = sessionStorage.getItem('cartNumbers');
    let cartCost = sessionStorage.getItem("totalCost");
    let cartItems = sessionStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = $('table .cart-product-name')[i].innerHTML;
            sessionStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            if (cartItems[productName].salePrice == "") {
                sessionStorage.setItem('totalCost', cartCost - (cartItems[productName].originalPrice * cartItems[productName].inCart));
            }
            else {
                sessionStorage.setItem('totalCost', cartCost - (cartItems[productName].salePrice * cartItems[productName].inCart));
            }
            delete cartItems[productName];
            sessionStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
            onLoadCartNumbers();
        })
    }
}
$(document).ready(function () { $('tr:empty').remove(); });
onLoadCartNumbers();
displayCart();


