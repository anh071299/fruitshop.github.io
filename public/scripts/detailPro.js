let url = new URL(window.location.href);
let productId = url.searchParams.get("productId");
let xhr = $.ajax({
    url: `products/${productId}`,
    type: "GET",
    dataType: "json",
}).done(
    function(json){
        let p = json;
        
        let productInfo = ` 
        <h1 class="product-title">${p.title}</h1>
        <div class="price">
        ${p.salePrice == "" ? `<span class ="original-price real-price">${p.originalPrice}</span>` : `<span class ="original-price"><strike>${p.originalPrice}</strike></span>`}
        <span  ${p.salePrice == "" ? `style ="display:none"` : `style = "display:inline" class="sale-price real-price"`}  >${p.salePrice}</span>
        
        </div>
       
        <div class="product-des">
           ${p.summary}
        </div>
        <div class="product-meta">
            <span class="unit"><b>Unit</b>:${p.unit}</span>
            <span class="posted-in"><b>Categories</b>: ${p.category} </span>
            <span class="sku-id"><b>SKU</b>: ${p.sku} </span> 
        </div>
        `
    let nutrition = '';
    json.component.forEach(function(c){
        for(key in c){
        nutrition +=  `
        <tr>
            <th>${key}</th>
            <td>${c[key]}</td>
        </tr>
         `
        }
    })
    $('.current-fruit').html(`${p.title}`)
    $('.product-info').html(productInfo);
    $('.product-image').html(`<img src="${p.image}" alt="fruit">`);
    $('#des-tab-content').html(`${p.description}`);
    $(".nutrition-table tbody").html(`${nutrition}`);
    $("title").html(`${p.title} - Fresh Farm`);
    }
)
// product added info
$('ul.product-tabs li a').click(function(){
    $this = $(this);
    $('.product-tab-content').hide();
    $('ul.product-tabs li a').removeClass('active');
    $this.addClass('active').blur();
    var panel = $this.attr('href');
    $(panel).fadeIn(350);
    return false;
  });//end click
  $('ul.product-tabs li:first a').click();
// quanity input 
$('.q-icon').off('click').on('click', function () {
    var min = $('.quanity input').attr('min');
    var max = $('.quanity input').attr('max');
    if ($(this).hasClass('q-inc')) {
        var addValue = parseInt($(this).parent().find('input').val()) + 1;
        if (addValue > max) {
            addValue = max;
        }
        $(this).parent().find('input').val(addValue).trigger('change');
    }
    if ($(this).hasClass('q-des')) {
        var removeValue = parseInt($(this).parent().find('input').val()) - 1;
        if (removeValue < min) {
            removeValue = 1;
        }
        $(this).parent().find('input').val(removeValue).trigger('change');
    }

});