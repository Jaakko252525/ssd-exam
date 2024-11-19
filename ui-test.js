const { Builder, By, until } = require("selenium-webdriver");

(async function example() {
  // Initialize the WebDriver
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Go to localhost:3000
    await driver.get("http://localhost:3000");

    // Optionally, wait for the body tag to confirm the page has loaded
    await driver.wait(until.elementLocated(By.tagName("body")), 10000);

    // Search for an element that contains the text "Login"
    const loginText = await driver.findElement(
      By.xpath("//*[contains(text(), 'Login')]")
    );

    // If the "Login" text is found, print a message
    if (loginText) {
      console.log("Found 'Login' on the page.");
    } else {
      console.log("'Login' text not found.");
    }
  } finally {
    // Quit the driver after the test
    await driver.quit();
  }
})();
