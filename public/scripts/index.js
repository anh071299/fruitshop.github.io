// language dropdown
let langList = $(".lang-menu");
let langElements = $(".lang-menu li")
let langDropdownBtn = $("#lang-dropdown")
langElements.each(function () {
    $(this).click(function () {
        langList.hide();
        langDropdownBtn.attr('value', $(this).attr('value'));
        langDropdownBtn.html($(this).children("a").html());
    })

});
langDropdownBtn.html($(langElements[0].children).html());
langDropdownBtn.attr('value', $(langElements[0]).attr('value'));

langDropdownBtn.click(function () {
    langList.show();
});
// user-account
$("#register").click(function () {
    $(".login-form").hide();
    $(".sign-up-form").show();
    $(".modal-header .modal-title").html('Register');
    return false;
});

$("#back-to-login").click(function () {
    $(".recover-pass-form").trigger("reset");
    $('input').removeClass('is-invalid')
    $(".login-form").show();
    $(".sign-up-form").hide();
    $(".modal-header .modal-title").html(`<img src="img/header/logo.jpg" alt="">`);
    return false;
});

$("#forgot-pass").click(function () {
    $(".login-form").hide();
    $(".recover-pass-form").show();
    $(".modal-header .modal-title").html('Reset your password');
    return false;
});


$("#cancel-recover-pass").click(function () {
    $(".recover-pass-form").trigger("reset");
    $('input').removeClass('is-invalid');
    $(".login-form").show();
    $(".recover-pass-form").hide();
    $(".modal-header .modal-title").html(`<img src="img/header/logo.jpg" alt="">`);
    return false;
});

// fixed menu
// $(window).scroll(
//     {
//         previousTop: 0
//     },
//     function () {
//         var currentTop = $(window).scrollTop();
//         if (currentTop < this.previousTop) {
//           setTimeout(function(){
//             $(".header").show();
//           },60);
//         }
//         else {
//             $(".header").hide();
//         }
//         this.previousTop = currentTop;
//     });
// add active on menu link
$('.header .navbar-nav a[href^="' + location.pathname.split("/")[1] + '"]').addClass('active');
// banner-slide 


// productDetail
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


$('.quanity input').off('change').on('change', function () {
    console.log($(this).val());
});

// product-tabs productDetail
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

