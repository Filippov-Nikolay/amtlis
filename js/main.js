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
        focusOnSelect: true
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
    ctx.lineTo(50, 270); // 20px дальше и в два раза короче

    ctx.moveTo(220, 40);
    ctx.lineTo(85, 270);

    ctx.moveTo(390, 10);
    ctx.lineTo(150, 270);

    ctx.moveTo(350, 160);
    ctx.lineTo(210, 270);

    ctx.moveTo(550, 160);
    ctx.lineTo(15, 360);

    // ctx.moveTo(230, 180);
    // ctx.lineTo(49010, 560);

    // ctx.moveTo(280, 120);
    // ctx.lineTo(130, 270);

    // ctx.lineTo(60, 100);
    // ctx.lineTo(80, 20);
    // ctx.lineTo(100, 100);
    // ctx.lineTo(140, 40);
    // ctx.lineTo(120, 140);
    // ctx.closePath();

    
    ctx.strokeStyle = "#6486DB";
    ctx.stroke();
});