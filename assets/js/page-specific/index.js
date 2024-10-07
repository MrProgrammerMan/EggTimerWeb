const noEggsIDs = ["no-soft-eggs", "no-medium-eggs", "no-hard-eggs"];

window.addEventListener("load", function () {
    for (let i = 0; i < noEggsIDs.length; i++) {
        let element = document.getElementById(noEggsIDs[i]);
        element.oninput = function() {
            document.getElementById(noEggsIDs[i] + "-visual").innerHTML = element.value;
        }
    }
});