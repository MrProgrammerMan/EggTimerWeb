window.addEventListener("load", function () {
    let action, data;
    try {
        let info = loadURL();
        action = info[1];
        data = info[0];
    } catch {
        console.log("Error when reading URL. No valid option chosen");
    }
    handleAction(action, data);
});

function loadURL() {
    let url = window.location.href; // Fetches the URL
    let urlSplit = url.split("?")[1].split("#"); // Extracts part of url that contains important info
    return urlSplit;
}

function handleAction(action, data) {
    switch(action) {
        case "save":
            saveConfig(data);
            // Loads newly saved config into view
            loadBoilingTimes();
            break;
        case "start":
            localStorage.setItem(action, data);
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