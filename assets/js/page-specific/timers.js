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
        timerSoft.innerHTML = config[0]
    }
    if (noOfEggs[1] > 0) {
        document.getElementById("timer-medium").style.display = "block";
    }
    if (noOfEggs[2] > 0) {
        document.getElementById("timer-hard").style.display = "block";
    }


    setInterval(function() {

    }, 1000);
}