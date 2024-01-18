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

    let getUrl = window.location.search;
    
    let param = (new URL(document.location).searchParams);
    let channelParam = param.get("channel");
    // console.log(param.get("channel"));
    
    console.log(getUrl);
    

    let url = "../database/listVideo.json";
    let template = document.querySelector("#template");
    let template1 = document.querySelector("#template1");



    fetch(url)
        .then(response => response.json()) // десериализует объект из ответа в JSON формате
        .then(json => {
            let size = json.length;
            let top_videos_from_channel = document.querySelector("#top_videos_from_channel .list__video-from-channel");
            let top_recommendation_videos = document.querySelector("#top_recommendation_videos .list__wrapper-recommendation-video");
           
            //подгружение видоса
            for (let i = 0; i < size; i++) {
                if (getUrl == json[i].video_url) {
                    document.querySelector(".section__name-video").innerHTML = json[i].video_title;
                    document.querySelector(".metadata__img").setAttribute("src", json[i].channel_image_title);
                    document.querySelector(".name-channel").innerHTML = json[i].channel_title;
                    document.querySelector(".always-shown__views").innerHTML = formatNumber(String(json[i].views_count)) + ' views';
                    document.querySelector(".text-btn").innerHTML = formatNumber(String(json[i].likes_count));
                    document.querySelector(".subscribers-channel").innerHTML = formatNumber(String(json[i].subscribers_count)) + ' subscribes';
                    document.querySelector(".always-shown__download").innerHTML = json[i].video_age;
                    document.querySelector(".video").setAttribute("src", json[i].iframe_url);
                    console.log(i);
                    console.log(json[i]);
                    break;
                }
            }
            
            
            //подгружение видосов из канала
            for(let i = 0; i< size; i++) {
                let tempURL = json[i].video_url;
                console.log(tempURL.indexOf("channel"));
                let f = false;
                let jsonChannel = "";

                for (let j = 0; j < tempURL.length; j++) {
                    if (tempURL[j] == "=") {
                        for (let k = j + 1; k < tempURL.length; k++) {
                            if (tempURL[k] != "&") {
                                jsonChannel += tempURL[k];
                            } else {
                                f = true;
                                break;
                            }
                        }
                    }
                    if (f) {
                        break;
                    }
                }

                console.log(jsonChannel);

                if(jsonChannel.indexOf(channelParam) != -1) {
                    console.log("AGA!!!!");
                    console.log(json[i]);

                    if (getUrl !== json[i].video_url) {
                        let templateClone = template.content.cloneNode(true);

                        templateClone.querySelector(".video-container img").setAttribute("src", json[i].path_to_video_photo);
                        templateClone.querySelector(".text-video-name").innerHTML = json[i].video_title;
                        templateClone.querySelector(".text-channel-name").innerHTML = json[i].channel_title;
                        templateClone.querySelector(".video-text-wrapper").setAttribute("href", `video.html${json[i].video_url}`);
                        

                        for (let j = 0; j < json[i].video_url.length; j++) {
                                top_videos_from_channel.append(templateClone);
                                break;
                        }
                    }
                }
                else{
                    console.log("NO!!!!");
                }

            }

            let randomIndices = [];
                while (randomIndices.length < 5) {
                    let randomIndex = Math.floor(Math.random() * size);
                    if (!randomIndices.includes(randomIndex)) {
                        randomIndices.push(randomIndex);
                    }
                }

           
            randomIndices.forEach(index => {
            let templateClone = template1.content.cloneNode(true);

            templateClone.querySelector(".video-picture").setAttribute("src", json[index].path_to_video_photo);
            templateClone.querySelector(".avatar-channel").setAttribute("src", json[index].channel_image_title);
            templateClone.querySelector(".title__name-video").innerHTML = json[index].video_title;
            templateClone.querySelector(".title__name-channel").innerHTML = json[index].channel_title;
            templateClone.querySelector(".link__recommendation-video").setAttribute("href", `video.html${json[index].video_url}`);
            templateClone.querySelector(".info__views-video").innerHTML = formatNumber(String(json[index].views_count)) + ' views';
            templateClone.querySelector(".info__data-video").innerHTML = json[index].video_age;

            top_recommendation_videos.append(templateClone);
        });
            
    });


    

    //from main.js copy(sorry Kristina for copy)

    function formatNumber(viewsCount) {
        if (viewsCount >= 1000 && viewsCount <= 9000) {
            return `${viewsCount.substring(0, 1)}K `;
        } else if (viewsCount <= 99000) {
            return `${viewsCount.substring(0, 2)}K `;
        } else if (viewsCount <= 999000) {
            return `${viewsCount.substring(0, 3)}K `;
        } else if (viewsCount <= 9999000) {
            return `${viewsCount.substring(0, 1)}M `;
        } else if (viewsCount <= 99999000) {
            return `${viewsCount.substring(0, 2)}M `;
        } else if (viewsCount <= 999999000) {
            return `${viewsCount.substring(0, 3)}M `;
        } else if (viewsCount <= 9999999000) {
            return `${viewsCount.substring(0, 1)}B `;
        } else if (viewsCount <= 99999999000) {
            return `${viewsCount.substring(0, 2)}B `;
        } else {
            return `${viewsCount} `;
        }
    }
    });


/*
 ◦ скачать все видео из канала
 ◦ добавить iframe
 ◦ добавить лайк
 ◦ добавить поделиться 
 ◦ добавить уведомления 
 ◦ добавить more
 ◦ добавить описание 
 ◦ добавить верстку комментов и автомат подгружение из json
*/





