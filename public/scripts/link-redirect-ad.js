let currentAdId;

$( document ).ready(function() {
    $.ajax({
        url: "/ad",
        type: 'GET',
        dataType: 'json', 
        success: function(res) {
            currentImageId = res["adId"];
            $("#ad-image").attr("src","data:image/png;base64," + res["image"]);
        }
    });

    var count = 10;

    setInterval(function() {
        count--;
        $("#countdown").html(count);

        if (count === 0) {
            proceed();
        }
    }, 1000);
});

function proceed() {
    let body = {};
    body["seenAd"] = true;

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