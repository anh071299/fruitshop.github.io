function addCart(id) {
    $.get('/products').done(function (json) {
        json.forEach(function (val) {
            if (val.id == id) {
                cartNumbers(val);
                totalCost(val);
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
    if(product.salePrice==""){
        price = product.originalPrice;
     }
     else{
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
    let cartItems = sessionStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let cart = sessionStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = $('.cart-table-content')[0];
    let productTotal = $('.cart-table-footer')[0];
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        productTotal.innerHTML ='';
        Object.values(cartItems).map((item, index) => {
            productContainer.innerHTML +=
            `<tr>
                <td class="product-img">
                    <img src="${item.image}" />
                </td>
                <td class="product-name">
                    <a class="cart-product-name" href="product.html?productId=${item.id}">${item.title}</a>
                </td>
                ${item.salePrice == "" 
                ? `<td><span class ="original-price real-price">$${item.originalPrice}.0<span></td>` 
                : `<td><span  class="sale-price real-price">$${item.salePrice}.0 </span></td>`}
                <td class="quanity">
                    <input type="number" step="1" min="1" value="${item.inCart}" max="9" class="product-quanity">
                    <span class="q-inc q-icon increase"></span>
                    <span class="q-des q-icon decrease"></span>
                </td>
                ${item.salePrice == "" ? 
                `<td class="total">$${item.inCart * item.originalPrice}.0</td>` : 
                `<td class="total">$${item.inCart * item.salePrice}.0</td>`}
                <td><i class="bi bi-x close-btn"></i></td>
            <tr>`;
        });

        productTotal.innerHTML += `
                <tr>
                    <th colspan="4" class="total-title">Totals</th>
                    <td colspan="2" class="total-price">$${cart}.00</td>
                </tr>
           `
        $('.sub-total')[0].innerHTML = `$${cart}`
        $('.total-bill')[0].innerHTML = `$${cart}`
        deleteButtons();
        manageQuantity();
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
            if(cartItems[productName].salePrice==""){
                sessionStorage.setItem('totalCost', cartCost - (cartItems[productName].originalPrice * cartItems[productName].inCart));
             }
             else{
                sessionStorage.setItem('totalCost', cartCost - (cartItems[productName].salePrice * cartItems[productName].inCart));
             }
            delete cartItems[productName];
            sessionStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
            onLoadCartNumbers();
        })
    }
}

onLoadCartNumbers();
displayCart();


