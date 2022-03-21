
// adds click listener to button
function addListener() {
    var btn = document.getElementById("goBtn");
    btn.addEventListener("click", function() {
        // this code executes when button is pressed
        let params = {
            active: true,
            currentWindow: true
        }
        chrome.tabs.query(params, goPressed);

        // send message to content.js
        function goPressed(tabs) {
            let msg = {
                action: "go",
            }
            chrome.tabs.sendMessage(tabs[0].id, msg);
            move();
        }
    });
}

// calls functions as soon as the popup is loaded
window.addEventListener("load", function() {
    console.log("widget loaded!");
    addListener();
});

// recieve message from content
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {    
        var text = request.message
        sendResponse({message: "OK"})

        displaySummary(text)
    }
);

function displaySummary(text){
    // load summary html & change default popup to it
    // chrome.action.setPopup({popup: 'summary.html'})
    console.log(text)
    //document.getElementById("content_text").innerHTML = text
    var el1 = document.querySelector('#s2');
    el1.insertAdjacentHTML('afterend', 
    `<section id="s3"><div class="content" id="summary_section"><h1>Here is your summary:</h1><p id="replacer"> ${text} </p></div></section>`
    );

    // hide other sections
    document.getElementById("s1").style.display = "none";
    document.getElementById("s2").style.display = "none"; 
}

// animate the progress bar
var i = 0;
function move() {
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar");
        var width = 1;
        var id = setInterval(frame, 10);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i = 0;
            }
            else {
                    width+=0.3;
                    elem.style.width = width + "%";
                }
        }
    }
}