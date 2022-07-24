// content.js triggers when the page gets loaded
console.log("Kiyo online!")


function sendMessage(message) {
    chrome.runtime.sendMessage({message: message});
}   

// http://127.0.0.1:5000/summary/
function requestAPI(text) {
    // send the request
    var data = {"text": text}
    var url = new URL("https://cn5yynjcfh.execute-api.eu-central-1.amazonaws.com/default/rest_demo")

    fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(text),
    })
    .then(response => response.json())
    .then(rb => {
        // send text to widget
        console.log(rb);
        sendMessage(rb);
    });
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
