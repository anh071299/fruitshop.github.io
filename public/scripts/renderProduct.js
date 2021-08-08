export default (p) => 
` <div class="product-item"  >
<div class="product-container">
  <div class="product-img">
  <a href="product.html?productId=${p.id}">
    <img src="${p.image}" alt="quả bơ" />
    </a>
  </div>
        <div class="product-content">
        <h2 class="product-title"><a href="product.html?productId=${p.id}">${p.title}</a></h2>
   ${p.salePrice == "" ? `<span class ="original-price real-price">$${p.originalPrice}.0</span>` : `<span class ="original-price"><strike>$${p.originalPrice}.0</strike></span>`}
  <span ${p.salePrice == "" ? `style ="display:none"` : `style = "display:inline" class="sale-price real-price"`}  >$${p.salePrice}.0</span>
        </div>
        <a class="basket-icon icon" onclick="addCart(${p.id})"><i class="bi bi-basket"></i></span></a>
</div>
</div>`
    
