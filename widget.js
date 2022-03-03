
function addListener() {
    var btn = document.getElementById("goBtn");
    btn.addEventListener("click", function() {
        console.log("clicked!");
    });
}

window.addEventListener("load", function() {
    console.log("widget loaded!");
    addListener();
});