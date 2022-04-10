
// adds click listener to buttons
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
            chrome.tabs.sendMessage(tabs[0].id, msg, function(response) {
                // check for response & display infotag
                if (response.message == "selectionError") {
                    if (response.status == 1) {
                        changeStatus("Please select < 2000 characters")
                    }
                    else if (response.status == 2) {
                        changeStatus("Please select more characters")
                    }
                }
                else if (response.message == "OK") {
                    changeStatus("loading...")
                    move();
                }
            });
        }
    });

    // add listeners to other buttons
    // github
    var gh_btn = document.getElementById("ghBtn");
    gh_btn.addEventListener("click", function() {
        // open webpage
        window.open("https://github.com/CasCodes/Kiyo", "_blank");
    });

    // youtube
    var gh_btn = document.getElementById("ytBtn");
    gh_btn.addEventListener("click", function() {
        // open webpage
        window.open("https://www.youtube.com/watch?v=P_clRwPIq-A", "_blank");
    });
    
    // coffee
    var gh_btn = document.getElementById("cfBtn");
    gh_btn.addEventListener("click", function() {
        // open webpage
        window.open("https://www.youtube.com/watch?v=a3Z7zEc7AXQ", "_blank");
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
    console.log(text)

    // display summary section in widget
    var el1 = document.querySelector('#s2');
    el1.insertAdjacentHTML('afterend', 
    `<section id="s3"><div class="content" id="summary_section"><h1>Here is your summary:</h1><p id="replacer"> ${text} </p></div></section>`
    );

    // hide other sections
    document.getElementById("s1").style.display = "none";
    document.getElementById("s2").style.display = "none"; 
    changeStatus("voila!")
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
                width+=(10/width);
                elem.style.width = width + "%";
            }
        }
    }
}

function changeStatus(status) {
    var tag = document.getElementById("infotag")
    tag.innerHTML = status;
}