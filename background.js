// // Add listener for web navigation
// chrome.webNavigation.onCompleted.addListener(function (details) {
//     // Check if the URL is from Amazon
//     if (details.url.includes("amazon.com")) {
//         // Send a message to content script to extract the URL
//         chrome.tabs.sendMessage(details.tabId, { action: "extractAmazonURL" });
//     }
// });

// // Add listener for messages from the background script
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     // Check if action is to extract Amazon URL
//     if (message.action === "extractAmazonURL") {
//         // Extract the current page URL
//         var amazonURL = window.location.href;

//         // Send the extracted URL back to the background script
//         chrome.runtime.sendMessage({ amazonURL: amazonURL });
//     }
// });

// chrome.tabs.onActivated.addListener((activeInfo) => {
//     chrome.tabs.get(activeInfo.tabId, function (tab) {
//         console.log(tab.url);
//     });
// });

// chrome.browserAction.onClicked.addListener(function (tab) {
//     chrome.tabs.executeScript(tab.id, { 'file': 'content.js' }, function callBackStub() { })
// });


// chrome.tabs.onActivated.addListener(getCurrentTabInfo)

// async function getCurrentTabInfo() {
//     try {
//         // the result of tabInfo is an 'Array'
//         const tabInfo = await chrome.tabs.query({ active: true, currentWindow: true })
//         // the result `tabInfo[0]` includes url, faviconUrl, etc...
//         console.log(tabInfo[0])
//     } catch (error) {
//         console.log("An error occured!")
//     }
// }