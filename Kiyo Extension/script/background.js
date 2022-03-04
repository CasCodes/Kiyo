// background.js triggers when the widget is clicked
// get's canceled by the popup

console.log("I'm running back here!")

chrome.browserAction.onClicked.addListener(buttonClicked);
function buttonClicked(tab) {
    let msg = {
        txt: "hello"
    }
    chrome.tabs.sendMessage(tab.id, msg);
}
