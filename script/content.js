// content.js triggers when the page gets loaded

console.log("Kiyo online!")

chrome.runtime.onMessage.addListener(gotMessage)

function gotMessage(message, sender, sendResponse) {
    console.log(message);
}