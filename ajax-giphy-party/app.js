const $form = $("#form");
const $imageList = $("#imageList");
const $removeList = $("#removeList");

$("#form").on('submit', function (e) {
    e.preventDefault();
    const $searchTerm = $("#searchTerm").val();
    getInfo($searchTerm);
});

$("#removeList").on('click', function () {
    $imageList.empty();
});

async function getInfo(term) {
    let res = await axios.get("http://api.giphy.com/v1/gifs/search",{ params: 
    {
        q: term,
        api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
    }});

    let url = res.data.data[0].images.original.url;
    appendGIF(url);
}

function appendGIF(url) {
    const $newImg = $("<img>", {src: url});
    $imageList.append($newImg);
}