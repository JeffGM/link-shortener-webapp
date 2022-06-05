$("#formCadastro").submit(function(e){
    e.preventDefault();

    let body = {};
    body["username"] = $("#username").val();
    body["email"] = $("#email").val();
    body["password"] = $("#password").val();
    body["rePassword"] = $("#rePassword").val();

    if (body["password"] !== body["rePassword"]) {
        Swal.fire(
            'Erro!',
            'Password and password confirmation dont match!',
            'error'
        );
        return;
    } 

    console.log(body);
    $.ajax({
        type: "POST",
        url: "/account",
        data: JSON.stringify(body),
        contentType: "application/json",  
            success: function(response){
               Swal.fire(
                   'Success!',
                   'Your account was created! You will be redirected to the login page',
                   'success'
               )

                setTimeout(function(){
                    window.location.replace("/login");                
                }, 3000);
            },
            error: function (request, status, error) {
                Swal.fire(
                    'Error!',
                    request.responseText,
                    'error'
                )
            }
    });
});