document.getElementById("theButton").addEventListener("click", frontFunction);

function frontFunction() {
  // sends msg to backend end receives response
  chrome.runtime.sendMessage(
    {
      message: "clearHistory",
    },
    (response) => {
      if (response.message === "success") {
        var txt = "NSFW deleted from recent history !<br>Now you are clean 😉";
      } else {
        var txt = "Oops! Something went wrong.";
        // send crash report using... response.error
      }
      document.getElementById("message").innerHTML = txt;
    }
  );
}
