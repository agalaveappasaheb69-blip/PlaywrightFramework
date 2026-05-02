import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // १. पूर्ण टेस्टसाठी वेळ (३० सेकंद)
  timeout: 30 * 1000,

  // २. Assertions साठी वेळ (५ सेकंद)
  expect: {
    timeout: 5000,
  },

  // ३. तुझ्या टेस्ट फाईल्सचे फोल्डर
  testDir: './tests',

  // ४. टेस्ट्स एकाच वेळी चालवायच्या की एकापाठोपाठ (false म्हणजे एकापाठोपाठ)
  // एकाच फाईलमधील टेस्ट समांतर चालवण्यासाठी
  fullyParallel: true,

  // एकाच वेळी किती प्रोसेस (Workers) चालवायच्या ते ठरवण्यासाठी
  workers: 2,
  // ५. फेल झाल्यावर पुन्हा प्रयत्न करणे (CI वर २ वेळा, लोकलवर ०)
  retries: process.env.CI ? 2 : 0,

  // ६. वर्कर्स सेटिंग
  workers: process.env.CI ? 1 : undefined,

  // ७. रिपोर्टिंग (HTML आणि Allure दोन्ही मिळतील)
  reporter: [
    ['html', { outputFolder: './reports/html-report' }],
    ['allure-playwright', { outputFolder: './reports/allure-results' }]
  ],

  // ८. ग्लोबल सेटिंग्ज
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // जर OpenCart वापरत असशील तर इथे URL देऊ शकतेस
    // baseURL: 'https://opencart.com', 
  },

  // ९. फक्त @master टॅग असलेल्या टेस्ट रन करण्यासाठी
 //  grep: /@master/,

  // १०. ब्राउझर सपोर्ट
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }, */
  ],
});
