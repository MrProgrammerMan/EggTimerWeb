window.addEventListener("load", function () {
    defaultsValid();
    loadURL();
});

function loadURL() {
    try {
        let url = window.location.href.split("?")[1];
        console.log("Read URL: " + url);
        let action = url.split("#")[1];
        console.log("Action: " + action);
        url = url.split("#")[0].split("&");
        console.log("Rehashed URL: " + url);
        handleAction(action, url);
    } catch {
        console.log("No valid option chosen.");
        ensureConfigExistance();
    }

}

function handleAction(action, url) {
    switch(action) {
        case "save":
            saveConfig(url);
            break;
        case "start":
            window.location.href = "time.html";
            break;
        case "configure":

            break;
        default:
            console.log("ERROR: Invalid action.");
            break;
    }
}