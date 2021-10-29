document.getElementById("theButton").addEventListener("click", frontFunction);

function frontFunction() {
  // sends msg to backend end receives response
  chrome.runtime.sendMessage(
    {
      message: "clearHistory",
    },
    (response) => {
      if (response.message === "success") {
        const txt =
          "NSFW deleted from recent history !<br>Now you are clean 😉";
        document.getElementById("message").innerHTML = txt;
      } else {
        const txt = "Oops! Something went wrong.";
        document.getElementById("message").innerHTML = txt;
        // send crash report using... response.error
      }
    }
  );
}
