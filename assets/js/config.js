window.addEventListener("load", function() {
    defaultsValid();
    ensureConfigExistance();
});

// Default egg boiling times for 3 sizes of egg.
const defaults = [
    ["small", ["360", "450", "540"]],
    ["medium", ["420", "510", "630"]],
    ["large", ["450", "540", "660"]],
];

/*
 * Checks the validity of the hard-coded defaults.
 * Runs once on program start.
 */
function defaultsValid() {
    try {
        // Loop through each element of the 'defaults' array
        for (let i = 0; i < 3; i++) {
            // Check if the length of the element at defaults[i] is 2
            if (defaults[i].length !== 2) {
                throw new Error("Element must have exactly 2 items: [size, times].");
            }
            // Check if the first element (size) is either 'small', 'medium', or 'large'
            const size = defaults[i][0];
            if (!["small", "medium", "large"].includes(size)) {
                throw new Error(`Invalid size at index ${i}: ${size}. Must be 'small', 'medium', or 'large'.`);
            }
            // Check if the second element is an array of length 3
            const times = defaults[i][1];
            if (times.length !== 3) {
                throw new Error(`Boiling times array at index ${i} must have exactly 3 elements.`);
            }
            // Check that each time in the array is a valid integer
            for (let j = 0; j < times.length; j++) {
                const time = parseInt(times[j]);
            }
        }
    } catch {
        window.location.href = "error.html";
    }
}

/*
 * Checks if boiling times are saved for all sizes of egg.
 * If config is missing, the dafault is saved.
 */
function ensureConfigExistance() {
    for (let i = 0; i < defaults.length; i++) {
        ensureEggSizeConfig(defaults[i][0], defaults[i][1]);
    }
}

/*
 * Checks if boiling times are saved for specified size of egg.
 * If config is missing, the default is saved.
 */
function ensureEggSizeConfig(size, defaults) {
    try {
        let attemptGet = localStorage.getItem("egg-size=" + size);
        let times = attemptGet.split("&");
        for (let i = 0; i < times.length; i++) {
            times[i] = parseInt(times[i].split("=")[1]);
        }
    } catch {
        localStorage.setItem("egg-size=" + size, "time-soft-eggs=" + defaults[0] + "&time-medium-eggs=" + defaults[1] + "&time-hard-eggs=" + defaults[2]);
    }
}

/*
 * Saves config for one egg size.
 */
function saveConfig(config) {
    // Trigger catch is config is in format that throws exception as a result of manipulation in ways presumed to be okay if config is in correct format.
    try {
        config = config.split("&");
        // Check that identifier is valid
        if (!["egg-size=small", "egg-size=medium", "egg-size=large"].includes(config[0])) {
            console.log("Invalid url for saving config. No data saved.");
            return;
        }
        for (let i = 1; i < config.length; i++) {
            config[i] = config[i].split("=");
        }
        // Convert time to correct format.
        for (let i = 1; i < config.length; i++) {
            try { // Convert minutes and seconds to seconds
                config[i][1] = config[i][1].split("%3A"); //Throws exception if the time in URL is not in "5:00" format, but instead "300" format.
                config[i][1] = parseInt(config[i][1][0]) * 60 + parseInt(config[i][1][1]); //Convert to seconds.
            } catch { // Convert seconds to integer to ensure validity
                config[i][1] = parseInt(config[i][1]); //Throws exception if the time is not in seconds.
            }
        }
        let concat = "";
        for (let i = 1; i < config.length; i++) {
            concat += config[i][0] + "=" + String(config[i][1]);
            if (i == config.length - 1) {
                continue;
            }
            concat += "&";
        }
        localStorage.setItem(config[0], concat);
    } catch {
        console.log("Invalid data. No data saved.")
    }
}

/*
 * Wrapper function for loadConfig(boolean)
 * Used to retry once
 */
function loadConfig() {
    return loadConfigRetried(false);
}

/*
 * Fetches config from locaStorage and returns it for all egg sizes, fomatted as "XX:YY"
 */
function loadConfigRetried(defaultsSaved) {
    let config = [];
    try{
        // Fetch config from localStorage
        for (let i = 0; i < defaults.length; i++) {
            config.push(localStorage.getItem("egg-size=" + defaults[i][0]).split("&"));
        }
        // Loop through every boiling time, for each egg size and each boiling degree
        for (let i = 0; i < config.length; i++) {
            for (let j = 0; j < config[0].length; j++) {
                // Convert seconds to "minutes:seconds"
                let time = parseInt(config[i][j].split("=")[1]);
                let seconds = time % 60;
                time = String((time - seconds)/60);
                seconds = String(seconds);
                if (seconds === "0") {
                    seconds = "00";
                }
                config[i][j] = time + ":" + seconds;
            }
        }
        return config;
    } catch { // If no valid config exists
        // Redirect to error page if rewrite has already been attemped
        if (defaultsSaved) {
            window.location.href = "error.html";
            return;
        }
        // Save defaults and retry (but only once!)
        ensureConfigExistance();
        loadConfig(true);
    }
}

function loadConfigSeconds() {
    return loadConfigSecondsRetried(false);
}

function loadConfigSecondsRetried(defaultsSaved) {
    let config = [];
    try{
        for (let i = 0; i < defaults.length; i++) {
            config.push(localStorage.getItem("egg-size=" + defaults[i][0]).split("&"));
        }
        for (let i = 0; i < config.length; i++) {
            for (let j = 0; j < config[0].length; j++) {
                config[i][j] = parseInt(config[i][j].split("=")[1]);
            }
        }
        return config;
    } catch { // If no valid config exists
        // Redirect to error page if rewrite has already been attemped
        if (defaultsSaved) {
            window.location.href = "error.html";
            return;
        }
        // Save defaults and retry (but only once!)
        ensureConfigExistance();
        loadConfigSecondsRetried(true);
    }
}