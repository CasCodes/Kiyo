// content.js triggers when the page gets loaded
console.log("Kiyo online!")

//  https://kiyo-kun-api.herokuapp.com/summary/ http://127.0.0.1:5000/summary/
function requestAPI(text) {
    // send the request
    var data = {"text": text}
    var url = new URL("http://127.0.0.1:5000/summary/")

    for (let k in data) {url.searchParams.append(k, data[k])}

    fetch(url, {
        method: "GET",
    })
    .then(response => {
        console.log(response)
        return response.json()
    }).then(content => {
        console.log(content['message']);

        // call function to display content in widget
    })
    .catch((error) => {
        console.error('Error:', error);

        // call function to display error in widget
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
