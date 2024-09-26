window.addEventListener("load", function () {
    time();
});

function time() {
    console.log("Entered time.js");
    let url = localStorage.getItem("start");
    console.log("Saved data: " + url);
    let urlSplit = url.split("&");
    console.log("Split url: " + urlSplit);
    for (let i = 0; i < urlSplit.length; i++) {
        urlSplit[i] = urlSplit[i].split("=")[1];
    }
    console.log("Cleaned split url: " + urlSplit);
    let noOfEggs = [parseInt(urlSplit[1]), parseInt(urlSplit[2]), parseInt(urlSplit[3])];
    console.log("Number of eggs: " + noOfEggs);
    let config = loadConfigSeconds();
    console.log("Loaded config: " + config);
    switch (urlSplit[0]) {
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
            console.log("Error when loading config.");
            break;
    }

    if (noOfEggs[0] > 0) {
        let timerSoft = document.getElementById("timer-soft");
        timerSoft.style.display = "block";
        let seconds = config[0] % 60;
        let minutes = Math.floor(config[0] / 60);
        timerSoft.innerHTML = String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');  // Config for small eggs
    }
    if (noOfEggs[1] > 0) {
        let timerMedium = document.getElementById("timer-medium");
        timerMedium.style.display = "block";
        let seconds = config[1] % 60;
        let minutes = Math.floor(config[1] / 60);
        timerMedium.innerHTML = String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');  // Config for medium eggs
    }
    if (noOfEggs[2] > 0) {
        let timerHard = document.getElementById("timer-hard");
        timerHard.style.display = "block";
        let seconds = config[2] % 60;
        let minutes = Math.floor(config[2] / 60);
        timerHard.innerHTML = String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');  // Config for large eggs
    }
    


    setInterval(function() {

    }, 1000);
}