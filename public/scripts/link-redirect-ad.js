

$( document ).ready(function() {
    let currentAdId;

    $.ajax({
        url: "/ad",
        type: 'GET',
        dataType: 'json', 
        success: function(res) {
            currentAdId = res["adId"];
            $("#ad-image").attr("src","data:image/png;base64," + res["image"]);
        }
    });

    var count = 10;

    const intervalId = setInterval(function() {
        count--;
        $("#countdown").html(count);

        if (count === 0) {
            proceed(currentAdId);
            clearInterval(intervalId);
        }
    }, 1000);
});

function proceed(currentAdId) {
    let body = {};
    body["seenAd"] = true;
    body["adId"] = currentAdId;
    body["url"] = window.location.pathname;

    $.ajax({
        type: "POST",
        url: '/log-profit',
        data: JSON.stringify(body),
        contentType: "application/json",
    });

    $.ajax({
        type: "POST",
        url: window.location.pathname,
        data: JSON.stringify(body),
        contentType: "application/json",
        success: function(data){
            redirectOrReplace(data);
        }
    });
}