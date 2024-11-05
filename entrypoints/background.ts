
export default defineBackground(() => {
  console.log('Hello csb !', { id: browser.runtime.id });

  chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed!");
  });

  var isContentScriptReady: boolean = true;

  function listenCreated(tab: any) {

    if (isContentScriptReady) {
      if ( tab.url?.includes("wellfound.com")) {

        console.log("tab detected (onCreated):", tab.url, tab.id);

        // Send a message to the content script in the new tab
        chrome.tabs.sendMessage(tab.id!, { message: "PageUpdated" }, async (response) => {

          console.log('Message sent to content script', response);

        });
      }
    }

  }

  function listenUpdated(tabId: number, changeInfo: any, tab: any) {

    if (isContentScriptReady) {

      if (changeInfo.status === 'complete' && tab.url?.includes("wellfound.com")) {
        console.log(" tab detected(onUpdated):", tab.url,tabId);

        // Send a message to the content script in the current tab
        chrome.tabs.sendMessage(tabId, { message: "PageUpdated" }, async (response) => {

          console.log('Message sent to content script', response);

        })
      }
    }


  }



  // Listen to new tab creation 
  chrome.tabs.onCreated.addListener(listenCreated);
  // Listen to new tab updation 
  chrome.tabs.onUpdated.addListener(listenUpdated);

  // Handle tab closure
  chrome.tabs.onRemoved.addListener((tabId) => {
    
    console.log(`Tab ${tabId} was closed.`);
  });

});

