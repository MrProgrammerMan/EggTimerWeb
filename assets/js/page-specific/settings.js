const eggTimeVisualIDs = ["time-soft-eggs", "time-medium-eggs", "time-hard-eggs"];

window.addEventListener("load", function () {
    this.document.getElementById("egg-size-selection").onchange = function() {loadBoilingTimes()}
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
    for (let i = 0; i < eggTimeVisualIDs.length; i++) {
        document.getElementById(eggTimeVisualIDs[i]).value = config[i];
    }
}