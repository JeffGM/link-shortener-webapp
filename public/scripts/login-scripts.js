$("#formLogin").submit(function(e){
    e.preventDefault();

    let body = {};
    body["username"] = $("#username").val();
    body["password"] = $("#password").val();

    $.ajax({
        type: "POST",
        url: "/login",
        data: JSON.stringify(body),
        contentType: "application/json",  
            success: function(response){
               window.localStorage.setItem("jwtToken", response["authToken"])
               window.location.replace("/dashboard");
            },
            error: function (request, status, error) {
                Swal.fire(
                    'Error!',
                    'Email or password invalid!',
                    'error'
                )
            }
    });
});