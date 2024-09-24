window.addEventListener("load", function () {
    defaultsValid();
    loadURL();
});

function loadURL() {
    try {
        let url = window.location.href; // Fetches the URL
        let urlSplit = url.split("?")[1].split("#"); // Extracts part of url that contains important info
        let action = urlSplit[1];
        let data = urlSplit[0].split("&");
        handleAction(action, data);
    } catch {
        console.log("No valid option chosen.");
        ensureConfigExistance();
    }
}

function handleAction(action, data) {
    switch(action) {
        case "save":
            saveConfig(data);
            loadBoilingTimes();
            break;
        case "start":
            window.location.href = "time.html";
            break;
        case "configure":
            // TODO: Add possibility to update all egg sizes based on configuration link. Also add capability generate such a link in the settings page
            break;
        default:
            console.log("ERROR: Invalid action.");
            break;
    }
}