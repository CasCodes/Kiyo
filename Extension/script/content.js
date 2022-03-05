// content.js triggers when the page gets loaded
console.log("Kiyo online!")

function requestAPI(text) {
    fetch("http://127.0.0.1:5000/summary/" + text, {mode: "no-cors"})
    .then(function (response) {
        return response.json;
    }).then(function (text) {
        console.log('GET response:');
        console.log(text); 
    });
    // .then(data => {
    //     return JSON.stringify(data);
    // })
    // .then(post => {
    //     console.log("Returned data:")
    //     console.log(post); //.summary_text
    // });
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
