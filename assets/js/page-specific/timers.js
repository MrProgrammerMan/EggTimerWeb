window.addEventListener("load", function () {
    time();
});

const timerNames = ["timer-soft", "timer-medium", "timer-hard"];

function time() {
    // Get stored info of no. eggs chosen
    let url = localStorage.getItem("start");
    // Split info into egg size, and no. eggs for each size(small, medium, large)
    let urlSplit = url.split("&").map(param => param.split("=")[1]);
    // Extract the no. of each egg size and convert to integer
    let noOfEggs = urlSplit.slice(1).map(Number);
    
    // Load the boiling time config
    let config = loadConfigSeconds();
    // Extract just the boiling config for the chosen egg size
    const sizeMap = { small: 0, medium: 1, large: 2 };
    config = config[sizeMap[urlSplit[0]] ?? console.error("Error when loading config.")];

    let audio = new Audio("assets/audio/alarm.mp3");

    // Show html elements corresponding to eggs actually being boiled (i.e.: no hard boiled timer if no hard eggs selected)
    for (let i = 0; i < config.length; i++) {
        if (noOfEggs[i] <= 0) {
            document.getElementsByClassName("timer")[i].style.display = "none";
        } else {
            updateTimersVisual(timerNames[i], config[i]);
        }
    }

    setInterval(function() {
        for (let i = 0; i < config.length; i++) {
            if (noOfEggs[i] > 0) {
                config[i]--;
                updateTimersVisual(timerNames[i], config[i]);
                if (config[i] <= 0) {
                    let wrapper = document.createElement("div");
                    wrapper.className = "notification-wrapper";
                    let notification = document.createElement("p");
                    notification.className = "notification-text";
                    notification.innerHTML = "Take out " + noOfEggs[i] + " eggs and cool off!";
                    let button = document.createElement("button");
                    button.className = "notification-btn"
                    button.innerHTML = "OK";
                    button.onclick = function() {
                        wrapper.style.display = "none";
                    };
                    wrapper.appendChild(notification);
                    wrapper.appendChild(button);
                    document.getElementsByTagName("main")[0].prepend(wrapper);
                    noOfEggs[i] = -1;
                    audio.play();
                }
            }
        }
    }, 1000);
}

function updateTimersVisual(id, config) {
    let seconds = config % 60;
    let minutes = Math.floor(config / 60);
    document.getElementById(id).innerHTML = String(String(minutes) + ":" + String(seconds).padStart(2, '0'));
}