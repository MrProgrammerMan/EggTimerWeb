window.addEventListener("load", function () {
    loadURL();
});

function loadURL() {
    try {
        let url = window.location.href.split("?")[1];
        let action = url.split("#")[1];
        url = url.split("#")[0].split("&");
        handleAction(action, url);
    } catch {
        console.log("No valid option chosen");
        ensureConfigExistance();
    }

}

function handleAction(action, url) {
    switch(action) {
        case "save":
            console.log("Saving new config.")
            saveConfig(url);
            break;
        case "start":
            console.log("Start chosen, code TBA.")
            console.log(loadConfig());
            break;
        default:
            console.log("ERROR: Invalid action.");
            break;
    }
}