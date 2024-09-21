// Default egg boiling times for 3 sizes of egg.
const defaults = [
    ["small", ["360", "450", "540"]],
    ["medium", ["420", "510", "630"]],
    ["large", ["450", "540", "660"]],
];

// Checks if boiling times are saved for all sizes of egg.
// If config is missing, the dafault is saved.
function ensureConfigExistance() {
    if (defaults.length !== 3) {
        window.location.href = "error.html";
        return;
    }
    for (let i = 0; i < defaults.length; i++) {
        ensureConfigExistance(defaults[i][0], defaults[i][1]);
    }
}

function ensureEggSizeConfig(size, defaults) {
    try {
        if (defaults.length !== 3) {
            window.location.href = "error.html";
            return;
        }
        let attemptGet = localStorage.getItem("egg-size=" + size);
        let times = attemptGet.split("&");
        for (let i = 0; i < times.length; i++) {
            times[i] = times[i].split("=")[1];
        }
        console.log(times);
    } catch {
        console.log("No valid config saved for " + size + " eggs. Saving default config.");
        localStorage.setItem("egg-size=" + size, "time-soft-eggs=" + defaults[0] + "&time-medium-eggs=" + defaults[1] + "&time-hard-eggs=" + defaults[2]);
    }
}

function saveConfig(config) {
    try {
        if (config[0] !== "egg-size=small" && config[0] !== "egg-size=medium" && config[0] !== "egg-size=large") {
            console.log("Invalid url for saving config. No data saved.");
            return;
        }
        //Concatonate the info regarding bioling times for soft, medium and hard eggs.
        let concat = config[1] + "&" + config[2] + "&" + config[3];
        localStorage.setItem(config[0], concat);
    } catch {
        console.log("Invalid data. No data saved.")
        return;
    }
}

function loadConfig() {
    let configSmall = localStorage.getItem("egg-size=small").split("&");
    let configMedium = localStorage.getItem("egg-size=medium").split("&");
    let configLarge = localStorage.getItem("egg-size=large").split("&");
    let config = [configSmall, configMedium, configLarge];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            config[i][j] = config[i][j].split("=")[1].replace("%3A", ":")
        }
    }
    return config;
}