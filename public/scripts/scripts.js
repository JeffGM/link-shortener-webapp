function isJsonString(str) {
    try {
        let newUrl = str["url"];
        if (newUrl.includes("http")) {
            return true;
        } else {
            throw new Error();
        }
    } catch (e) {
        return false;
    }
    return true;
}

function redirectOrReplace(data) {
    if (isJsonString(data)) {
        let body = {};
        body["url"] = window.location.pathname;

        $.ajax({
            type: "POST",
            url: '/log-access',
            data: JSON.stringify(body),
            contentType: "application/json",
            success: function(data){
                redirectOrReplace(data);
            }
        });

        window.location.replace(data["url"]);
    } else {
        var newDoc = document.open("text/html", "replace");
        newDoc.write(data);
        newDoc.close(); 
    }
}