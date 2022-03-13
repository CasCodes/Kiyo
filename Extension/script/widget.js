
// adds click listener to button
function addListener() {
    var btn = document.getElementById("goBtn");
    btn.addEventListener("click", function() {
        // this code executes when button is pressed
        let params = {
            active: true,
            currentWindow: true
        }
        chrome.tabs.query(params, goPressed);

        // send message to content.js
        function goPressed(tabs) {
            let msg = {
                action: "go",
            }
            chrome.tabs.sendMessage(tabs[0].id, msg);
        }
    });
}

// calls functions as soon as the popup is loaded
window.addEventListener("load", function() {
    console.log("widget loaded!");
    addListener();
});