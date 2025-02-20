import {googleLogin,listenUpdated} from '../utils/backgroundFunctions'

export default defineBackground(async () => {
  console.log('Hello csb !', { id: browser.runtime.id });

  chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed!");
  });

  var isContentScriptReady: boolean = true;

  // Listen to new tab updation 
  chrome.tabs.onUpdated.addListener(listenUpdated);

  // Handle tab closure
  chrome.tabs.onRemoved.addListener((tabId) => {
    console.log(`Tab ${tabId} was closed.`);
  });

  const CLIENT_ID = import.meta.env.WXT_GOOGLE_CLIENT_ID;
  const SCOPES = ['email', 'profile'];

  chrome.runtime.onMessage.addListener(googleLogin);
});

