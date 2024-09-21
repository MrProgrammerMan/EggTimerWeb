window.addEventListener("load", function () {
    let soft = document.getElementById("no-soft-eggs");
    let medium = document.getElementById("no-medium-eggs");
    let hard = document.getElementById("no-hard-eggs");

    soft.oninput = function() {
        document.getElementById("no-soft-eggs-visual").innerHTML = soft.value;
    }
    medium.oninput = function() {
        document.getElementById("no-medium-eggs-visual").innerHTML = medium.value;
    }
    hard.oninput = function() {
        document.getElementById("no-hard-eggs-visual").innerHTML = hard.value;
    }
});