window.addEventListener("load", function () {
    loadBoilingTimes();
});

function loadBoilingTimes() {
    let config = loadConfig();
    switch (document.querySelector("input[type=radio]:checked").value) {
        case "small":
            config = config[0];
            break;
        case "medium":
            config = config[1];
            break;
        case "large":
            config = config[2];
            break;
        default:
            console.log("Error when loading config.")
            break;
    }
    document.getElementById("time-soft-eggs").value = config[0];
    document.getElementById("time-medium-eggs").value = config[1];
    document.getElementById("time-hard-eggs").value = config[2];
}