const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function testUI() {
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().headless()) // Runs the browser in headless mode
    .build();

  try {
    // Navigate to the home page
    await driver.get("http://localhost:3000"); // Make sure this matches the URL where your app is running

    // Wait until the password input field is loaded
    const passwordInput = await driver.wait(
      until.elementLocated(By.id("password")),
      5000 // Wait for a maximum of 5 seconds
    );

    // Wait until the login button is located (using button text instead of ID)
    const loginButton = await driver.wait(
      until.elementLocated(By.xpath("//button[text()='Login']")),
      5000
    );

    // Type a password into the input field
    await passwordInput.sendKeys("TestPassword123"); // Use any test password that meets your requirements

    // Click the login button
    await loginButton.click();

    // Wait for the welcome page or redirection after successful login
    await driver.wait(
      until.urlContains("welcome"),
      5000 // Wait for 5 seconds for redirection
    );

    console.log("Login test passed");
  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await driver.quit();
  }
}

testUI();
