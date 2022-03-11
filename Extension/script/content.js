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

// "GET /summary/The%20climax%20of%20this%20course%20is%20its%20final%20project.
// %20The%20final%20project%20is%20your%20opportunity%20to%20take%20your%20newfound%
// 20savvy%20with%20programming%20out%20for%20a%20spin%20and%20develop%20your%20very%20own%
// 20piece%20of%20software.%20So%20long%20as%20your%20project%20draws%20upon%20this%20course’s%
// 20lessons,%20the%20nature%20of%20your%20project%20is%20entirely%20up%20to%20you.%20You%20may%
// 20implement%20your%20project%20in%20any%20language(s). HTTP/1.1" 200 -