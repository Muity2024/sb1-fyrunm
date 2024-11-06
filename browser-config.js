import { Builder, Capabilities } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

export async function createBrowserSession(proxy, fingerprint) {
  const chromeCapabilities = Capabilities.chrome();
  const chromeOptions = new chrome.Options();
  
  // Configure proxy
  if (proxy) {
    chromeOptions.addArguments(`--proxy-server=${proxy}`);
  }
  
  // Configure fingerprint
  chromeOptions.addArguments(`--user-agent=${fingerprint.userAgent}`);
  chromeOptions.addArguments(`--window-size=${fingerprint.resolution.width},${fingerprint.resolution.height}`);
  
  // Additional privacy settings
  chromeOptions.addArguments('--disable-blink-features=AutomationControlled');
  chromeOptions.addArguments('--disable-web-security');
  chromeOptions.addArguments('--disable-infobars');
  chromeOptions.addArguments('--disable-notifications');
  
  // Set capabilities
  chromeCapabilities.set('chromeOptions', chromeOptions);
  
  return new Builder()
    .withCapabilities(chromeCapabilities)
    .build();
}