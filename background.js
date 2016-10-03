chrome.contextMenus.create({
  id: "eat-page",
  title: "View"
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "eat-page") {
    chrome.tabs.executeScript({
      file: "page-eater.js"
    });
  }
});