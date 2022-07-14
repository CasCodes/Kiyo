// content.js triggers when the page gets loaded
console.log("Kiyo online!")


function sendMessage(message) {
    chrome.runtime.sendMessage({message: message});
}   

//  https://kiyo-kun-api.herokuapp.com/summary/ http://127.0.0.1:5000/summary/
function requestAPI(text) {
    // send the request
    var data = {"text": text}
    var url = new URL("http://127.0.0.1:5000/summary/")

    for (let k in data) {url.searchParams.append(k, data[k])}

    fetch(url, {
        method: "GET",
    })
    .catch(error => {
        console.log(error.message)
        console.log("Either the server is offline or you are using an Adblocker 🙉")
        response = {message: "API error!"};
    })
    .then(response => {
        // console.log(response)
        return response.json()
    }).then(content => {

        // send message to widget
        sendMessage(content['message'])
    })
}

// function to read selection from content
function readSelection() {
    if (window.getSelection) {
        var textSelected = window.getSelection().toString();

        // cap at max 2000 characters
        if (textSelected.length > 2000) {
            return 1;
        }

        else if (textSelected.length < 100) {
            return 2;
        }

        else {
            // send request to api
            requestAPI(textSelected);
        }
    }
}

// recieve message
chrome.runtime.onMessage.addListener(gotMessage)
function gotMessage(message, sender, sendResponse) {
    if (message.action == "go") {
        // grab selected text from webpage
        var selection = readSelection();
        if (selection == 1 || selection == 2) { // TODO: handel selections smaller than 128!!
            // send response
            sendResponse({
                message: "selectionError",
                status: selection
            })
            console.log("selection error")
        }
        else {
            sendResponse({
                message: "OK",
            })
        }
    }
}
