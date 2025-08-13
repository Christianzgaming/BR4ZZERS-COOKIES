const _0x7a4f = atob('YXV0b1VwZGF0ZUNvb2tpZQ==');
const _0x5b2c = atob('c2l0ZS1tYS5icmF6emVycy5jb20=');

function showStatus(message, isSuccess = true) {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = message;
  statusDiv.className = `status ${isSuccess ? 'success' : 'error'}`;
  statusDiv.style.display = 'block';
  
  setTimeout(() => {
    statusDiv.style.display = 'none';
  }, 6000);
}


document.getElementById("addCookies").addEventListener('click', () => {
  console.log('Auto update button clicked');
  

  const mainBtn = document.getElementById("addCookies");
  const originalText = mainBtn.textContent;
  mainBtn.textContent = '🔄 Updating Cookies...';
  mainBtn.disabled = true;
  
  const timeoutId = setTimeout(() => {
    showStatus('❌ Request timeout - Please try again', false);
    mainBtn.textContent = originalText;
    mainBtn.disabled = false;
  }, 15000);
  
  chrome.runtime.sendMessage({ type: _0x7a4f }, (response) => {
    clearTimeout(timeoutId);
    mainBtn.textContent = originalText;
    mainBtn.disabled = false;
    
    console.log('Auto update response:', response);
    

    if (chrome.runtime.lastError) {
      console.error('Runtime error:', chrome.runtime.lastError.message || chrome.runtime.lastError);

      if (!chrome.runtime.lastError.message?.includes('message port closed')) {
        showStatus('❌ Extension connection error', false);
        return;
      }
    }
    

    if (response && response.success) {
      showStatus(`🚀 Success! Cleared ${response.cookiesCleared || 0} old cookies and set new access_token_ma!`);
    } else if (!chrome.runtime.lastError || chrome.runtime.lastError.message?.includes('message port closed')) {

      showStatus('🚀 Success! Cookies updated and new access_token_ma set!');
    } else {
      showStatus(`❌ ${response?.error || 'Failed to update cookies'}`, false);
      return;
    }
    

    setTimeout(() => {
      chrome.tabs.create({ url: 'https://' + _0x5b2c + '/' });
    }, 1500);
  });
});


document.addEventListener('DOMContentLoaded', () => {
  console.log('Auto Save Cookie - Brazzers v1.0 - BY ChristianG popup loaded for site-ma.brazzers.com');
  

  const mainBtn = document.getElementById("addCookies");
  mainBtn.style.opacity = '0';
  setTimeout(() => {
    mainBtn.style.transition = 'opacity 0.5s ease';
    mainBtn.style.opacity = '1';
  }, 100);
});
