document.getElementById("openChatButton").addEventListener("click", function () {
    const five9Button = document.getElementById("five9OpenChatButton");
    if (five9Button) {
        console.log("Triggering event...");
        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        five9Button.dispatchEvent(event); // Dispatch the event
    } else {
        console.error("Five9 chat button not found!");
    }
});