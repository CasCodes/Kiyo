// content.js triggers when the page gets loaded
console.log("Kiyo online!")

function requestAPI(text) {
    fetch("https://stormy-river-23565.herokuapp.com/summary/" + text, {mode: "no-cors"}, {method: "GET"})
    .then(function (response) {
        return JSON.stringify(response)
    }).then(function (text) {
        console.log('GET response:');
        console.log(text); 
    });
}

// function to read selection from content
function readSelection() {
    if (window.getSelection) {
        var textSelected = window.getSelection().toString();
        console.log(textSelected)

        // pass textSelected into python?
        requestAPI(textSelected);
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
