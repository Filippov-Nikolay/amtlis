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


    // RIGHT BAR
    $(".header-right-bar__video").click(function (e) {
        if($(".right-bar__menu-bell").attr("style") != undefined) {
            if ($(".right-bar__menu-bell").attr("style").indexOf("block") != -1)
                $(".right-bar__menu-bell").toggle("active");
        }
        if($(".right-bar-avatar").attr("style") != undefined) {
            if ($(".right-bar-avatar").attr("style").indexOf("block") != -1)
                $(".right-bar-avatar").toggle("active");
        }

        $(".right-bar__menu-video").toggle("active");
        // $(".right-bar__menu-video").toggleClass("header-right-bar__video--active");
    });
    $(".header-right-bar__bell").click(function (e) {
        if($(".right-bar__menu-video").attr("style") != undefined) {
            if ($(".right-bar__menu-video").attr("style").indexOf("block") != -1)
                $(".right-bar__menu-video").toggle("active");
        }
        if($(".right-bar-avatar").attr("style") != undefined) {
            if ($(".right-bar-avatar").attr("style").indexOf("block") != -1)
                $(".right-bar-avatar").toggle("active");
        }

        $(".right-bar__menu-bell").toggle("active");
        // $(".right-bar__menu-bell").toggleClass("right-bar__menu-bell--active");
    });
    $(".header-right-bar__avatar").click(function (e) {
        if($(".right-bar__menu-video").attr("style") != undefined) {
            if ($(".right-bar__menu-video").attr("style").indexOf("block") != -1)
                $(".right-bar__menu-video").toggle("active");
        }
        if($(".right-bar__menu-bell").attr("style") != undefined) {
            if ($(".right-bar__menu-bell").attr("style").indexOf("block") != -1)
                $(".right-bar__menu-bell").toggle("active");
        }

        $(".right-bar-avatar").toggle("active");
        // $(".right-bar-avatar").toggleClass("right-bar-avatar--active");
    });

    // CATEGORY
    let isLongClick = true;

    // $(".category__slider").slick({
    //     slidesToShow: 1,
    //     infinite: false,
    //     arrows: false,
    //     variableWidth: true
    // });

    let isDown = false;
    let startX;
    let scrollLeft;
    
    const slider = document.querySelector('.category__slider'); // замените '.items' на селектор вашего элемента
    
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = x - startX;
        slider.scrollLeft = scrollLeft - walk;
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    
    $(".category__slider").mousedown(function() {
        clickTimer = setTimeout(function() {
            isLongClick = false;
            console.log("Длинный клик");
            $(".category__btn").off("click");
        }, 250);
    });
    $(".category__slider").mouseup(function() {
        clearTimeout(clickTimer);
        if (isLongClick) {
            console.log("Короткий клик ===================================");
            $(".category__btn").on("click", function () {
                // FILTER CATEGORY

                console.log($(".video__item").remove());
    
                $(".category__btn").removeClass("category__btn--active");
                $(this).addClass("category__btn--active");
        
                let filter = $(this).text();
                console.log(filter);
        
                fetch(url)
                    .then(response => response.json())
                    .then(json => {
                        let size = json.length;
        
                        for (let i = 0; i < size; i++) {
                            console.log("for 1");
                            for (let j = 0; j < json[i].category.length; j++) {
                                console.log("for 2");
                                if (json[i].category[j] == filter) {
                                    // console.log(json[i].category[j], json[i]);
    
                                    templateClone = template.content.cloneNode(true);
        
                                    templateClone.querySelector(".video-img img").setAttribute("src", json[i].path_to_video_photo);
                                    templateClone.querySelector(".channel__link-img").setAttribute("src", json[i].channel_image_title);
                                    
                                    templateClone.querySelector(".link__video").setAttribute("href", `video.html${json[i].video_url}` );
                                    templateClone.querySelector(".name-video__link").innerHTML = json[i].video_title;
                                    templateClone.querySelector(".channel-name__link").innerHTML = json[i].channel_title;
        
                                    templateClone.querySelector(".video-content__number-views").innerHTML = formatNumber(String(json[i].views_count));
    
                                    for (let k = 0; k < json[i].category.length; k++) {
                                        console.log("for 3");
    
                                        if (json[i].category[k] == "top_10_for_the_week") {
                                            top_10_for_the_week.append(templateClone);
                                            console.log(json[i].category[k]);
                                        } else if (json[i].category[k] == "continue_watching") {
                                            continue_watching.append(templateClone);
                                            console.log(json[i].category[k]);
                                        } else if (json[i].category[k] == "popular") {
                                            popular.append(templateClone);
                                            console.log(json[i].category[k]);
                                        } else if (json[i].category[k] == "all") {
                                            all.append(templateClone);
                                            console.log(json[i].category[k]);
                                        }
                                        
                                    }
                                }
                            }
                        }
                });

                $(".category__btn").off("click");
            });
        }
        isLongClick = true;
    });


    // TEMPLATE CONTENT
    let url = "../database/listVideo.json";
    let template = document.querySelector("#template");
    let templateClone = template.content.cloneNode(true);
    let content = $(".video-about");

    console.log(templateClone);
    console.log(content);

    function formatNumber(viewsCount) {
        if (viewsCount <= 9000) {
            return `${viewsCount.substring(0, 1)}K views`;
        } else if (viewsCount <= 99000) {
            return `${viewsCount.substring(0, 2)}K views`;
        } else if (viewsCount <= 999000) {
            return `${viewsCount.substring(0, 3)}K views`;
        } else if (viewsCount <= 9999000) {
            return `${viewsCount.substring(0, 1)}M views`;
        } else if (viewsCount <= 99999000) {
            return `${viewsCount.substring(0, 2)}M views`;
        } else if (viewsCount <= 999999000) {
            return `${viewsCount.substring(0, 3)}M views`;
        } else if (viewsCount <= 9999999000) {
            return `${viewsCount.substring(0, 1)}B views`;
        } else if (viewsCount <= 99999999000) {
            return `${viewsCount.substring(0, 2)}B views`;
        } else {
            return `${viewsCount} views`;
        }
    }

    // PAGE CATEGORIES
    let top_10_for_the_week = document.querySelector("#top_10_for_the_week .video-about");
    let continue_watching = document.querySelector("#continue_watching .video-about");
    let popular = document.querySelector("#popular .video-about");
    let all = document.querySelector("#all .video-about");

    fetch(url)
    .then(response => response.json()) // десериализует объект из ответа в JSON формате
    .then(json => {
        console.log(Object.keys(json[0]));
        
        let size = json.length;

        for (let i = 0; i < size; i++) {
            templateClone = template.content.cloneNode(true);

            templateClone.querySelector(".video-img img").setAttribute("src", json[i].path_to_video_photo);
            templateClone.querySelector(".channel__link-img").setAttribute("src", json[i].channel_image_title);
            templateClone.querySelector(".link__video").setAttribute("href", `video.html${json[i].video_url}` );
            templateClone.querySelector(".name-video__link").innerHTML = json[i].video_title;
            templateClone.querySelector(".channel-name__link").innerHTML = json[i].channel_title;
            templateClone.querySelector(".video-content__number-views").innerHTML = formatNumber(String(json[i].views_count));
            templateClone.querySelector(".video-content__metadata").innerHTML = json[i].video_age;

            for (let j = 0; j < json[i].category.length; j++) {
                if (json[i].category[j] == "top_10_for_the_week") {
                    top_10_for_the_week.append(templateClone);
                    console.log(1);
                } else if (json[i].category[j] == "continue_watching") {
                    continue_watching.append(templateClone);
                    console.log(2);
                } else if (json[i].category[j] == "popular") {
                    popular.append(templateClone);
                    console.log(3);
                } else if (json[i].category[j] == "all") {
                    all.append(templateClone);
                    console.log(4);
                }
            }
            // content[0].append(templateClone);
        }
    });


    // LOCAL STORAGE
    $(document).on("click", ".link__video", function() {
        console.log("TRUE");
        localStorage.setItem("URL", $(".link__video").attr("href"));
    });


    // BANNER
    function bannerContent(getUrl) {
        fetch(url)
            .then(response => response.json())
            .then(json => {
                let size = json.length;

                for (let i = 0; i < size; i++) {
                    if (getUrl == json[i].video_url) {
                        // $(".banner__title").text = json[i].video_title;
                        document.querySelector(".banner__title").innerHTML = json[i].video_title;
                        document.querySelector(".banner__video-name").innerHTML = json[i].channel_title;
                        document.querySelectorAll(".video-info__item")[0].innerHTML = formatNumber(String(json[i].views_count));
                        document.querySelectorAll(".video-info__item")[1].innerHTML = json[i].video_age;
                        document.querySelector(".banner__btn").setAttribute("href", `video.html${json[i].video_url}`);
                        break;
                    }
                }
        });
    }
    bannerContent($(".banner__item.slick-current").on(".banner__item .slick-current").data("link"));

    $(".banner__about").on("click", ".slick-arrow", function() {
        $(".banner__video-info").css("opacity", 0);
        $(".banner__title").css("opacity", 0);
        
        setTimeout(() => {
            bannerContent($(".banner__item.slick-current").on(".banner__item .slick-current").data("link"));
        }, 300);
        setTimeout(() => {
            $(".banner__video-info").css("opacity", 1);
            $(".banner__title").css("opacity", 1);
        }, 300);
    });
    $(".banner__item").click(function() {
        $(".banner__video-info").css("opacity", 0);
        $(".banner__title").css("opacity", 0);

        setTimeout(() => {
            bannerContent($(this).on(".slick-current").data("link"));
        }, 300);
        setTimeout(() => {
            $(".banner__video-info").css("opacity", 1);
            $(".banner__title").css("opacity", 1);
        }, 300);
    });


    // ANIMATION
    $(".banner__btn").click(function () {
        for (let i = 1; i <= $(".canvas-decor__span").length; i++) {
            $(`.canvas-decor__span-${i}`).css("height", 0);
        }
        $(".banner__info").css("opacity", 0);
        $(".slider-nav").css("opacity", 0);
    });
    $(".banner__btn").click(function () {
        let href = $(this).attr('href');
        setTimeout(function() {window.location = href}, 800);
        return false;
    });
});