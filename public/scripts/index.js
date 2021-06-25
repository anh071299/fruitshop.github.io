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

langDropdownBtn.hover(function () {
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
$(window).scroll(
    {
        previousTop: 0
    },
    function () {
        var currentTop = $(window).scrollTop();
        if (currentTop < this.previousTop) {
            $(".header").show();
        }
        else {
            $(".header").hide();
        }
        this.previousTop = currentTop;
    });

$('.banner-slide').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    swipeToSlide: true,
    adaptiveHeight: true
});
$('.certification-slick').slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
            }
        }]
});

