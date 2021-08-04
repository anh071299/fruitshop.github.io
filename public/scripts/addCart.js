
let arrayProduct = [];
function addCart(id) {
    $.get("/products").done(
        function (data) {
            $.each(data, function (i, val) {
                if (val.id == id) {
                    $.post('/cart-items', {"product": JSON.parse(JSON.stringify(val)), "count" : countQuanity(arrayProduct, val)})
                }
                
            })
        }
    )
    arrayProduct

}

function countQuanity(arr, item) {
    let count = 0;
    $.each(arr, function (i, val) {
        if (val.id == item.id) {
            count++;
        }
    })
    return count;
}