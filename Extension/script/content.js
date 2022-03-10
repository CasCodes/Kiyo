// content.js triggers when the page gets loaded
console.log("Kiyo online!")

//  https://kiyo-kun-api.herokuapp.com/summary/
function requestAPI(text) {
    // send the request
    fetch("http://127.0.0.1:5000/summary/" + text)
    .then(response => {
        console.log(response)
        return response.json()
    }).then(content => {
        console.log(content['message']);
    });
}

// function to read selection from content
function readSelection() {
    if (window.getSelection) {
        var textSelected = window.getSelection().toString();
        console.log(textSelected)

        // send request to api
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
