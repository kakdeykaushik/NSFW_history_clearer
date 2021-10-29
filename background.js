const FILE_NAME = "payload/names.txt";
const MAX_RESULTS = 0; // it will retrieve as much as it can

// Pulls NSFW keywords -> names
const names = $.get(FILE_NAME, {}, function (content) {
  names = content.split("\n");
  names = names.map((name) => name.toLowerCase()).slice(0, -1);
});

// Listens to frontend(script.js) and behaves accordingly
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "clearHistory") {
    try {
      chrome.history.search(
        { text: "", maxResults: MAX_RESULTS },
        function (data) {
          data.forEach(function (page) {
            // clearing history part
            for (ele of names) {
              if (
                page.url.toLowerCase().includes(ele) ||
                page.title.toLowerCase().includes(ele)
              ) {
                chrome.history.deleteUrl({ url: page.url });
                break;
              }
            }
          });
        }
      );

      sendResponse({ message: "success" });
    } catch (err) {
      sendResponse({ message: "failed", error: err });
    }
  }
  return true;
});
