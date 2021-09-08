$(document).ready(function () {
    showProvince();
    showDistrict("Hồ Chí Minh");
    showWard("Bình Chánh", "Hồ Chí Minh");
})
function showProvince() {
    $.ajax({
        url: "https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/Index.json",
        type: "GET",
    }).done(function (json) {
        let province = ''

        Object.keys(json).forEach(function (key) {
            province +=
                `
                <option name="${key}">${key}</option>
            `;
        });
        $(".province-select").html(province);

        $(".province-select").change(function () {
            showDistrict($(this).val());
            let districtVal = $('district-select').val();
            showWard(districtVal, $(this).val());
        })
      
        $(".district-select").change(function () {
            let provinceVal = $('.province-select').val();
            showWard($(this).val(), provinceVal);
        })
    })
}
function showDistrict(province) {
    $.ajax({
        url: "https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/Index.json",
        type: "GET",
    }).done(function (json) {
        let path = json[province].file_path.slice(1);
        let d = '';
        $.ajax({
            url: `https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/${path}`,
            type: "GET",
        }).done(function (json) {
            Object.keys(json.district).forEach(function (key) {
                d +=
                    `    <option name="${json.district[key].name}">${json.district[key].name}</option>
                `;
            })
            $('.district-select').html(d);
    
        })
    })
    
}
function showWard(district, province) {
    $.ajax({
        url: "https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/Index.json",
        type: "GET",
    }).done(function (json) {
        let path = json[province].file_path.slice(1);
        let d = '';
        $.ajax({
            url: `https://cdn.jsdelivr.net/gh/thien0291/vietnam_dataset@1.0.0/${path}`,
            type: "GET",
        }).done(function (json) {
        
            for(i=0; i<Object.keys(json.district).length; i++){
                if(json.district[i].name == district){
                    index = i;
                }
            }
            Object.keys(json.district[index].ward).forEach(function (key) {
                d+=
                `
                <option name="${json.district[index].ward[key].name}">${json.district[index].ward[key].name}</option>
                `
            })
            $('.ward-select').html(d);
        })
    })
}
