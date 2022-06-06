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
        window.location.replace(data["url"]);
    } else {
        var newDoc = document.open("text/html", "replace");
        newDoc.write(data);
        newDoc.close(); 
    }
}