
console.log("I'm running back here!")

chrome.browserAction.onClicked.addListener(buttonClicked);
function buttonClicked(tab) {
    let msg = {
        txt: "hello"
    }
    chrome.tabs.sendMessage(tab.id, msg);
}


var btn = document.getElementById("goBtn");
if (btn){
    btn.addEventListener("click"), function() {
        console.log("clicked!");
    }
}