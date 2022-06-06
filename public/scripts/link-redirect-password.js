$("#formLinkPassword").submit(function(e){
    e.preventDefault();

    let body = {};
    body["password"] = $("#password").val();

    $.ajax({
        type: "POST",
        url: window.location.pathname,
        data: JSON.stringify(body),
        contentType: "application/json",
        success: function(data){
            redirectOrReplace(data);
        }
    });
});