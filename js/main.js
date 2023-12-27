$(document).ready(function() {
    // HEADER-MENU
    function showMenu () {
        $(".left-bar").show();
        $(".left-bar").css("transform", "translateX(0)");
    }
    function hideMenu() {
        $(".left-bar").css("transform", "translateX(-100%)");

        setTimeout(() => {
            $(".left-bar").hide();
        }, 500);
    }

    let nextClick = true;

    $(".burger").click(function (e) {
        if (nextClick) {
            nextClick = false;

            $(".left-bar").toggleClass("show-bar");
            $(".burger").addClass('click');
            setTimeout(function() {
                $(".burger").removeClass('click');

                nextClick = true;
            }, 500);
    
            console.log($(".left-bar").hasClass("show-bar"));
    
            $(".left-bar").hasClass("show-bar") ? showMenu() : hideMenu();
        }
    });


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

    // $(".category__btn").click(function() {
    //     $(".category__btn").removeClass("category__btn--active");
    //     $(this).addClass("category__btn--active");
    // });

    $(".category__slider").slick({
        slidesToShow: 1,
        infinite: false,
        arrows: false,
        variableWidth: true
    });


    // button
    let canvas = document.getElementById("canvas__btn");
    let ctx = canvas.getContext('2d');

    canvas.height = 280;
    canvas.width = 640;

    ctx.moveTo(-10, 1140); // наклон нижней части, длинна вниз
    ctx.lineTo(2, 140); // , длина вверх

    ctx.moveTo(60, 60);
    ctx.lineTo(25, 270);

    ctx.moveTo(90, 180);
    ctx.lineTo(50, 270);

    ctx.moveTo(220, 40);
    ctx.lineTo(85, 270);

    ctx.moveTo(390, 10);
    ctx.lineTo(150, 270);

    ctx.moveTo(350, 160);
    ctx.lineTo(210, 270);

    ctx.moveTo(550, 160);
    ctx.lineTo(15, 360);
    
    ctx.strokeStyle = "#6486DB";
    ctx.stroke();
});