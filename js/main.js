$(document).ready(function() {
    // HEADER-MENU
    function showMenu () {
        $(".left-bar").show();
        $(".left-bar").css("transform", "translateX(0)");
        $("body").css("overflow", "hidden");
    }
    function hideMenu() {
        $(".left-bar").css("transform", "translateX(-100%)");
        $("body").removeAttr("style");

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


    // SEARCH
    function removeStyle() {
        $(".search-form__btn").removeClass("search-form__btn--active");
        $(".search-form").removeAttr("style");
        $(".logo").removeAttr("style");
        $(".header__burger").removeAttr("style");
        setTimeout(() => {
            $(".header__form").removeAttr("style");
        }, 400);
    }

    window.addEventListener('resize',(e) => {
        if (window.innerWidth > 767 && $(".search-form__btn").hasClass("search-form__btn--active")) {
            removeStyle();
        }
    });

    $(".search-form__btn").click(function () {
        if (window.innerWidth < 767) {
            if ($(".search-form__btn").hasClass("search-form__btn--active")) {
                removeStyle();
            } else {
                $(".search-form__btn").addClass("search-form__btn--active");
                $(".search-form").css("width", "100%");
                $(".logo").css("opacity", "0");
                $(".header__burger").css("opacity", "0");
                $(".header__form").css("width", "100%");
            }
        }
    });


    // RIGHT BAR
    $(".header-right-bar__link").click(function () {
        if ($(this).hasClass("header-right-bar__link--active")) {
            $(this).removeClass("header-right-bar__link--active");
        } else {
            $(".header-right-bar__link").removeClass("header-right-bar__link--active");
            $(this).addClass("header-right-bar__link--active");
        }
    });


    // TEMPLATE CONTENT
    let url = "https://filippov-nikolay.github.io/amtlis/database/listVideo.json";
    let template = document.querySelector("#template");

    // PAGE CATEGORIES
    let top_10_for_the_week = document.querySelector("#top_10_for_the_week .video-about");
    let continue_watching = document.querySelector("#continue_watching .video-about");
    let popular = document.querySelector("#popular .video-about");
    let all = document.querySelector("#all .video-about");

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
    // function formatTime(date) {
    //     const dateNow = new Date();

    // }

    if (template != null) {
        let templateClone = template.content.cloneNode(true);
        let content = $(".video-about");
    
        console.log(templateClone);
        console.log(content);
    
        fetch(url)
        .then(response => response.json()) // десериализует объект из ответа в JSON формате
        .then(json => {
            console.log(Object.keys(json[0]));
            
            let size = json.length;
    
            for (let i = 0; i < size; i++) {
                templateClone = template.content.cloneNode(true);
                
                if (templateClone.querySelector(".video-img img")) {
                    templateClone.querySelector(".link__video").setAttribute("data-link-video", `video.html${json[i].video_url}`);
                    // templateClone.querySelector(".link__video").setAttribute("onclick", `window.location='video.html${json[i].video_url}'`);
                    templateClone.querySelector(".video-img img").setAttribute("src", json[i].path_to_video_photo);
                    templateClone.querySelector(".channel__link-img").setAttribute("src", json[i].channel_image_title);
                    // templateClone.querySelector(".link__video").setAttribute("href", `video.html${json[i].video_url}` );
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
            }
        });
    }



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
    
    const slider = document.querySelector('.category__slider');
    
    if (slider) {
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
    }

    
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


    // LOCAL STORAGE
    $(document).on("click", ".link__video", function() {
        console.log("TRUE", $(this).data("link-video"));
        window.location.href = $(this).data("link-video");
        // localStorage.setItem("URL", $(".link__video").attr("href"));
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
                        document.querySelectorAll(".video-info__item")[1].innerHTML = formatNumber(String(json[i].views_count));
                        document.querySelectorAll(".video-info__item")[2].innerHTML = json[i].video_age;
                        document.querySelector(".banner__btn").setAttribute("href", `video.html${json[i].video_url}`);
                        break;
                    }
                }
        });
    }
    bannerContent($(".banner__item.slick-current").on(".banner__item .slick-current").data("link"));

    function bannerAnimation() {
        $(".banner__video-info").css("opacity", 0);
        $(".banner__title").css("opacity", 0);
        
        setTimeout(() => {
            bannerContent($(".banner__item.slick-current").on(".banner__item .slick-current").data("link"));
        }, 300);
        setTimeout(() => {
            $(".banner__video-info").css("opacity", 1);
            $(".banner__title").css("opacity", 1);
        }, 300);
    }

    $(".banner__about").on("click", ".slick-arrow", bannerAnimation);
    $(".slider-nav").on("touchend", bannerAnimation);
    $(".slick-track").click(bannerAnimation);


    // ANIMATION

    // Срабатывает, когда веб-страница отображается, включая случаи, когда она загружается из кэша
    window.addEventListener('pageshow', function(event) {
        for (let i = 1; i <= $(".canvas-decor__span").length; i++) {
            $(`.canvas-decor__span-${i}`).removeAttr("style");
        }
        $(".banner__info").css("opacity", 1);
        $(".slider-nav").css("opacity", 1);
    });

    // Это событие срабатывает перед тем, как страница будет выгружена
    // window.addEventListener('beforeunload', function() {
        
    // });

    $(".banner__btn").click(function () {
        for (let i = 1; i <= $(".canvas-decor__span").length; i++) {
            $(`.canvas-decor__span-${i}`).css("height", 0);
        }
        $(".banner__info").css("opacity", 0);
        $(".slider-nav").css("opacity", 0);
    });
    $(".banner__btn").click(function () {
        let href = $(this).attr('href');
        setTimeout(function() {window.location = href;}, 800);
        return false;
    });


    // SEARCH
    let videoNames = [];

    function getOptions(word, videoNames) {
        return videoNames.filter(s => {
            // Определение на совпадение в инпут

            const regex = new RegExp(word, 'gi');

            return s.video_title.match(regex);
        })
    }

    function displayOptions() {
        console.log("value -> ", this.value);

        const options = getOptions(this.value, videoNames);
        console.log("options -> ", options);

        const html = options.map(videoNames => {
            return `<li class="search-form__item"><a class="search-form__link" href=video.html${videoNames.video_url}>${videoNames.video_title}</a></li>`;
        }).slice(0, 10);

        $(".search-form__options").html(this.value ? html : null);

        if ($(".search-form__options .search-form__item").length == 0) {
            $(".search-form__options").css("display", "none");
        } else {
            $(".search-form__options").css("display", "block");
        }
    }

    $('.search-form__input').focus(function(){
        $(".search-form__input").keyup(displayOptions);
        $(".search-form__input").click(displayOptions)
    });

    
    $('.search-form__input').blur(function(){
        setTimeout(function() {
            let isItemBtn = true;
    
            $(".search-form__item").click(function() {
                isItemBtn = false;
            });
    
            if (isItemBtn)
                $(".search-form__options").css("display", "none");
        }, 100);
    });

    fetch(url)
    .then(response => response.json())
    .then(json => {
        json.forEach(el => {
            videoNames.push(el);
        });

        console.log(videoNames);
        console.log(getOptions("sav", videoNames));
    });
});