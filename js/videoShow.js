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

let url = "../database/listVideo.json";

fetch(url)
    .then(response => response.json()) // десериализует объект из ответа в JSON формате
    .then(json => {
        let size = json.length;

        for (let i = 0; i < size; i++) {
            if (getUrl == json[i].video_url) {
                console.log(i);
                console.log(json[i]);
                break;
            }
        }
});