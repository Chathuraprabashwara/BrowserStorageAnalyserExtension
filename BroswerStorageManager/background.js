chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed!");
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "localStorageData") {
      console.log("Received local storage data:", message.data);
      // Perform actions with local storage data
    }
  });
  