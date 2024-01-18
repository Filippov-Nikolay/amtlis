// SLICK SLIDER
$('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    centerMode: true,
    focusOnSelect: true,
    responsive: [
        {
            breakpoint: 570,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }
    ]
});