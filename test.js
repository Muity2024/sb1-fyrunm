import { CONFIG } from './config.js';
import { createBrowserSession } from './browser-config.js';
import { 
  waitForPageLoad, 
  smoothScroll, 
  simulateMouseMovement,
  verifyPageContent,
  getRandomFingerprint,
  getRandomProxy,
  getRandomTimeout 
} from './utils.js';

async function runSinglePageTest(sessionConfig) {
  const { url, proxy, fingerprint } = sessionConfig;
  const driver = await createBrowserSession(proxy, fingerprint);
  
  console.log(`Test de navigation sur ${url} avec proxy ${proxy}`);
  
  try {
    await driver.get(url);
    await waitForPageLoad(driver, CONFIG.timeouts.pageLoad);
    
    const { title } = await verifyPageContent(driver);
    console.log(`Page chargée: ${title}`);
    
    // Simulation d'interactions naturelles
    const pageTime = getRandomTimeout(
      CONFIG.timeouts.minPageTime,
      CONFIG.timeouts.maxPageTime
    );
    
    await simulateMouseMovement(driver);
    await driver.sleep(CONFIG.timeouts.interaction);
    
    await smoothScroll(driver, 'down');
    await driver.sleep(CONFIG.timeouts.observation);
    
    await smoothScroll(driver, 'up');
    await driver.sleep(pageTime);
    
    return true;
  } catch (error) {
    console.error(`Erreur sur ${url}:`, error.message);
    return false;
  } finally {
    await driver.quit();
  }
}

async function runTestSuite() {
  const results = {
    success: 0,
    failed: 0,
    sessions: []
  };
  
  while (true) {
    const sessionConfigs = CONFIG.urls.map(url => ({
      url,
      proxy: getRandomProxy(CONFIG.proxies),
      fingerprint: getRandomFingerprint(CONFIG.fingerprints)
    }));
    
    console.log('Démarrage d\'une nouvelle série de tests...');
    
    const sessionPromises = sessionConfigs.map(config => 
      runSinglePageTest(config)
        .then(success => {
          success ? results.success++ : results.failed++;
          results.sessions.push({
            ...config,
            success,
            timestamp: new Date().toISOString()
          });
        })
    );
    
    await Promise.all(sessionPromises);
    
    console.log('Série terminée. Statistiques:');
    console.log(`Succès: ${results.success}`);
    console.log(`Échecs: ${results.failed}`);
  }
}

console.log('Démarrage du système de test...');
runTestSuite().catch((error) => {
  console.error('Erreur critique:', error);
});