// // language dropdown
let langList = $(".lang-menu");
let langElements = $(".lang-menu li")
let langDropdownBtn = $(".dropdown-btn")
langElements.each(function () {
    $(this).click(function () {
      
        langDropdownBtn.attr('value', $(this).attr('value'));
        langDropdownBtn.html($(this).children("a").html());

    })

});
langDropdownBtn.html($(langElements[0].children).html());
langDropdownBtn.attr('value', $(langElements[0]).attr('value'));

$(window).on('click', function(event){
    // element over which click was made
    var clickOver = $(event.target)
    if ($('.navbar .navbar-toggler').attr('aria-expanded') == 'true' && clickOver.closest('.navbar').length === 0) {
        // Click on navbar toggler button
        $('button[aria-expanded="true"]').click();
    }
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
    $(".modal-header .modal-title").html(`<img src="img/header/logo.png" alt="">`);
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
    $(".modal-header .modal-title").html(`<img src="img/header/logo.png" alt="">`);
    return false;
});
// header-fixed
$('.header .navbar-nav a[href^="' + location.pathname.split("/")[1] + '"]').addClass('active');




