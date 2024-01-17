$(document).ready(function() {
    // Делаем AJAX-запрос к index.html
    $.ajax({
        url: 'index.html',
        type: 'GET',
        dataType: 'html',
        success: function(data) {
            let header = $($(data).find("header").prevObject[15]).find(".container")[0];
            console.log(header);

            $('.header').html(header);
            
            let nextClick = true;
            console.log($(header).on("click", ".burger", function () {
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
            }));
            // console.log($(data).find("header").prevObject[25]);
            // console.log($(data).find("header"));
            // $('.header').html($(data));
            // $('.header').html($(data).find("header").prevObject[15]);
        },
        error: function() {
            console.log('Не удалось загрузить index.html');
        }
    });
});


let getUrl = window.location.search;
console.log(getUrl);

let param = (new URL(document.location).searchParams);
console.log(param.get("channel"));

let url = "../database/listVideo.json";

fetch(url)
    .then(response => response.json()) // десериализует объект из ответа в JSON формате
    .then(json => {
        let size = json.length;

        for (let i = 0; i < size; i++) {
            if (getUrl == json[i].video_url) {
                document.querySelector(".section__name-video").innerHTML = json[i].video_title;
                document.querySelector(".metadata__img").setAttribute("src", json[i].channel_image_title);
                document.querySelector(".name-channel").innerHTML = json[i].channel_title;
                document.querySelector(".always-shown__views").innerHTML = formatNumber(String(json[i].views_count));
                document.querySelector(".always-shown__download").innerHTML = json[i].video_age;
                document.querySelector(".video").setAttribute("src", json[i].iframe_url);
                console.log(i);
                console.log(json[i]);
                break;
            }
        }
});


//from main.js copy(sorry Kristina for copy)

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
