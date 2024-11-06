import { By, until } from 'selenium-webdriver';

export async function waitForPageLoad(driver, timeout) {
  await driver.wait(until.elementLocated(By.tagName('body')), timeout);
}

export async function smoothScroll(driver, direction = 'down') {
  const script = direction === 'down' 
    ? 'return document.documentElement.scrollHeight'
    : 'return 0';
  
  const targetPosition = await driver.executeScript(script);
  
  await driver.executeScript(`
    window.scrollTo({
      top: ${targetPosition},
      behavior: 'smooth'
    });
  `);
}

export async function simulateMouseMovement(driver) {
  const elements = await driver.findElements(By.css('a, button, input, div, p'));
  const randomElements = shuffleArray(elements).slice(0, 8);
  
  for (const element of randomElements) {
    try {
      await driver.actions()
        .move({origin: element})
        .pause(getRandomTimeout(500, 2000))
        .perform();
    } catch (error) {
      console.log('Élément non accessible pour le mouvement de souris');
    }
  }
}

export async function verifyPageContent(driver) {
  const title = await driver.getTitle();
  if (!title) {
    throw new Error('Le titre de la page est vide');
  }

  const bodyText = await driver.findElement(By.tagName('body')).getText();
  if (!bodyText) {
    throw new Error('Le contenu de la page est vide');
  }

  return { title, bodyText };
}

export function getRandomFingerprint(fingerprints) {
  return {
    userAgent: getRandomArrayElement(fingerprints.userAgents),
    resolution: getRandomArrayElement(fingerprints.screenResolutions)
  };
}

export function getRandomProxy(proxies) {
  return getRandomArrayElement(proxies);
}

export function getRandomTimeout(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}