$(document).ready(function() {
    // Делаем AJAX-запрос к index.html
    $.ajax({
        url: 'index.html',
        type: 'GET',
        dataType: 'html',
        success: function(data) {
            let indexHtml = Object.values($(data));

            console.log(indexHtml);
            console.log(indexHtml.indexOf("header.header"));

            for (let i = 0; i < Object.values($(indexHtml)).length; i++) {
                if ($(indexHtml[i]).hasClass("header")) {
                    console.log(i, ">>>", indexHtml[i]);
                    $(".header").html($(indexHtml[i]).html() + "<script src='js/main.js'></script>");
                    break;
                }
            }

            // let header = $($(data))[19];
            // console.log(header);

            // $(".header").html($(header).html() + "<script src='js/main.js'></script>");
        },
        error: function() {
            console.log('Не удалось загрузить index.html');
        }
    });

    let getUrl = window.location.search;

    let param = (new URL(document.location).searchParams);
    let channelParam = param.get("channel");
    // console.log(param.get("channel"));

    if ((!channelParam || channelParam.trim() === "")) {
        window.location.href = "index.html";
    }

    console.log(getUrl);


    let url = "https://filippov-nikolay.github.io/amtlis/database/listVideo.json";
    let template = document.querySelector("#template");
    let template1 = document.querySelector("#template1");
    let template2 = document.querySelector("#commentTemplate");


    fetch(url)
        .then(response => response.json()) // десериализует объект из ответа в JSON формате
        .then(json => {
            let size = json.length;
            let top_videos_from_channel = document.querySelector("#top_videos_from_channel .list__video-from-channel");
            let top_recommendation_videos = document.querySelector("#top_recommendation_videos .list__wrapper-recommendation-video");
            let comments_Container = document.querySelector("#commentsContainer .list__users-comments");
           
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
                // console.log(tempURL.indexOf("channel"));
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

                // console.log(jsonChannel);

                if(jsonChannel.indexOf(channelParam) != -1) {
                    // console.log("AGA!!!!");
                    // console.log(json[i]);

                    if (getUrl !== json[i].video_url) {
                        let templateClone = template.content.cloneNode(true);

                        templateClone.querySelector(".video-container img").setAttribute("src", json[i].path_to_video_photo);
                        templateClone.querySelector(".text-video-name").innerHTML = json[i].video_title;
                        templateClone.querySelector(".text-channel-name").innerHTML = json[i].channel_title;
                        templateClone.querySelector(".video-text-wrapper").setAttribute("href", `video.html${json[i].video_url}`);
                        
                        top_videos_from_channel.append(templateClone);
                    }
                }
                else{
                    // console.log("NO!!!!");
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



        let uniqueChannels = new Set();

        randomIndices.forEach(index => {

            let channelTitle = json[index].channel_title;

            if (!uniqueChannels.has(channelTitle)) {
                uniqueChannels.add(channelTitle);

            let templateClone = template2.content.cloneNode(true);

            templateClone.querySelector('.avatar-channel').src = json[index].channel_image_title;
            templateClone.querySelector('.title-channel').textContent = json[index].channel_title;
            templateClone.querySelector('.upload-comments').textContent = json[index].video_age;
            templateClone.querySelector('.title-commments').textContent = json[index].comment_title;

            comments_Container.appendChild(templateClone);
            }
        });
            
    });

    

    $(".btn-metadata-review.metadata-review__like").click(function () {
        $(this).toggleClass('active');
    });

    $(".btn-subscribers").click(function () {
        $(this).toggleClass('active');
    });
    

    $('#add-comment-input').on('input', function () {
        $(this).css('height', 'auto');
        $(this).css('height', this.scrollHeight + 'px');
    
        let textareaHeight = this.scrollHeight;
        $('.section__users-comments').css('margin-top', textareaHeight + 'px');
    });



    function formatNumber(viewsCount) {
        if (viewsCount < 1000){
            return `${viewsCount} `;
        }else if (viewsCount <= 9000) {
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

    $('#add-comment-btn').on('click', function () {
        let commentText = $('#add-comment-input').val();
        if (commentText.trim() !== '') {
            // Клонируем шаблон
            let commentTemplate = document.getElementById('commentTemplate');
            let commentClone = document.importNode(commentTemplate.content, true);

            // Заполняем клонированный элемент данными
            commentClone.querySelector('.title-channel').textContent = 'Filippov and Shvets';  // Замените на ваше имя пользователя
            commentClone.querySelector('.upload-comments').textContent = 'Just now';  // Замените на время комментария
            commentClone.querySelector('.title-commments').textContent = commentText;

            // Добавляем клонированный элемент в начало списка комментариев
            $('#commentsContainer ul').prepend(commentClone);
            
            // Очищаем поле ввода
            $('#add-comment-input').val('');
            
            // Сбрасываем высоту textarea и отступ у блока комментариев
            $('#add-comment-input').css('height', 'auto');
            $('.section__users-comments').css('margin-top', '0');
        }
    });


    $('.btn-comments-sub').on('click', function () {
        $('.comments-sub').toggleClass('hidden');
        $(this).toggleClass('active');
    });

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





