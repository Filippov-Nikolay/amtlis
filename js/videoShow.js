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