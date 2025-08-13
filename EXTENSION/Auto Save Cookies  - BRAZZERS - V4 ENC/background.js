const _0x4f2a = atob('aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0NocmlzdGlhbnpnYW1pbmcvQlI0WlpFUlMtQ09PS0lFUy9tYWluL0JyYXp6ZXJzQ29va2llcy50eHQ=');
const _0x3e1d = atob('YWNjZXNzX3Rva2VuX21h');
const _0x5b2c = atob('c2l0ZS1tYS5icmF6emVycy5jb20=');
const _0x7a4f = atob('YXV0b1VwZGF0ZUNvb2tpZQ==');
const _0x9c6e = atob('bGlzdENvb2tpZXM=');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message:', request.type);

  if (request.type === _0x7a4f) {
    console.log('Auto-updating access_token_ma for site-ma.brazzers.com');

 
    fetch(_0x4f2a)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(cookieData => {
        console.log('Fetched cookie data from GitHub:', cookieData.substring(0, 100) + '...');
        
        let newAccessToken = null;
        
        
        const accessTokenMatch = cookieData.match(new RegExp(_0x3e1d + '=([^;\\s\\n\\r]+)', 'i'));
        if (accessTokenMatch) {
          newAccessToken = accessTokenMatch[1].trim();
          console.log('Found access_token_ma in cookie format');
        } else {
         
          const cleanedData = cookieData.trim().replace(/[\r\n\s]+/g, '');
          if (cleanedData.length > 50) {
            newAccessToken = cleanedData;
            console.log('Using entire content as access token');
          }
        }
        
        if (!newAccessToken || newAccessToken.length < 50) {
          throw new Error('Could not extract valid access_token_ma from GitHub data');
        }
        
        console.log('Extracted access token:', newAccessToken.substring(0, 50) + '...');
        
        
        chrome.cookies.getAll({ url: "https://" + _0x5b2c + "/" }, (existingCookies) => {
          console.log('Found existing cookies to clear:', existingCookies.length);
          
          const clearPromises = existingCookies.map(cookie => 
            new Promise((resolve) => {
              chrome.cookies.remove({
                url: "https://" + _0x5b2c + cookie.path,
                name: cookie.name
              }, () => {
                console.log('Cleared cookie:', cookie.name);
                resolve();
              });
            })
          );

          Promise.all(clearPromises).then(() => {
            console.log('All existing cookies cleared, now setting new access_token_ma...');
            
            const cookieDetails = {
              url: "https://" + _0x5b2c + "/",
              name: _0x3e1d,
              value: newAccessToken,
              domain: _0x5b2c,
              path: "/",
              secure: false,
              httpOnly: false,
              expirationDate: Math.floor(Date.now() / 1000) + (4 * 60 * 60)
            };
            
            chrome.cookies.set(cookieDetails, (cookie) => {
              if (chrome.runtime.lastError) {
                console.error('Error setting new access_token_ma:', chrome.runtime.lastError);
                sendResponse({ success: false, error: chrome.runtime.lastError.message });
              } else {
                console.log('Successfully set new access_token_ma cookie:', cookie);
                sendResponse({ success: true, cookiesCleared: existingCookies.length, newCookieSet: true });
              }
            });
          }).catch((error) => {
            console.error('Error clearing cookies:', error);
            sendResponse({ success: false, error: 'Failed to clear existing cookies' });
          });
        });
      })
      .catch((error) => {
        console.error('Error fetching cookie from GitHub:', error);
        sendResponse({ success: false, error: `Failed to fetch cookie from GitHub: ${error.message}` });
      });

    return true;
  }

  if (request.type === _0x9c6e) {
    chrome.cookies.getAll({ url: "https://" + _0x5b2c + "/" }, (cookies) => {
      console.log('All site-ma.brazzers.com cookies:', cookies);
      sendResponse({ success: true, cookies });
    });
    return true;
  }
});

console.log('Auto Save Cookie - Brazzers background script loaded for site-ma.brazzers.com');
