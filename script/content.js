// content.js triggers when the page gets loaded
console.log("Kiyo online!")

// function to read selection from content
function readSelection() {
    if (window.getSelection) {
        var textSelected = window.getSelection().toString();
        console.log(textSelected)
    }
}

// recieve message
chrome.runtime.onMessage.addListener(gotMessage)
function gotMessage(message, sender, sendResponse) {
    console.log(message, sender);

    if (message.src == "widget") {
        // grab selected text from webpage
        readSelection();
    }
}
