$('.history-about').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    appendDots: $('.history-dots'),
}
)
$('.history-wrap .slick-dots li:nth-child(1)').html('<a>2005</a>');
$('.history-wrap .slick-dots li:nth-child(2)').html('<a>2008</a>');
$('.history-wrap .slick-dots li:nth-child(3)').html('<a>2015</a>');
$('.history-wrap .slick-dots li:nth-child(4)').html('<a>2020</a>');
$('.counter').each(function () {
    var $this = $(this),
        countTo = $this.attr('data-count');
    $({ countNum: $this.text() }).animate({
        countNum: countTo
    },
        {
            duration: 3500,
            easing: 'swing',
            step: function () {
                $this.text(Math.floor(this.countNum));
            },
            complete: function () {
                $this.text(this.countNum);
            }
        });
});
$('.feedback-slides').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
}
)