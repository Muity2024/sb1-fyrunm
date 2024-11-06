export const CONFIG = {
  urls: [
    'https://www.example.com',
    'https://www.wikipedia.org',
    'https://www.mozilla.org',
    'https://www.github.com',
    'https://www.stackoverflow.com'
  ],
  proxies: [
    'http://proxy1.example.com:8080',
    'http://proxy2.example.com:8080',
    'http://proxy3.example.com:8080',
    'http://proxy4.example.com:8080',
    'http://proxy5.example.com:8080'
  ],
  timeouts: {
    pageLoad: 10000,
    observation: 60000,
    interaction: 2000,
    minPageTime: 60000,
    maxPageTime: 120000
  },
  scrollBehavior: {
    smooth: true,
    steps: 10,
    delay: 1000
  },
  fingerprints: {
    userAgents: [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)'
    ],
    screenResolutions: [
      { width: 1920, height: 1080 },
      { width: 1366, height: 768 },
      { width: 1440, height: 900 },
      { width: 1536, height: 864 },
      { width: 1280, height: 720 }
    ]
  }
};