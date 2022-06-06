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

    var count = 30;

    setInterval(function() {
        count--;
        $("#countdown").html(count);

        if (count === 0) {
            count = 30;
        }
    }, 1000);
});