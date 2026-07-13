// Import Playwright Test:
// - test defines a test case.
// - expect is used to verify expected results.
const { test, expect } = require('@playwright/test');

// Define a test named "successful login".
//
// The function is async because Playwright commands return Promises,
// so we use await to wait for each operation.
//
// The page fixture represents a browser tab.
// Playwright Test automatically starts and closes the browser.
test('successful login', async ({ page }) => {

  // Open the login page.
  //
  // Replace example.com with the real URL you want to test.
  // Important: example.com does not contain these login fields,
  // so this imaginary test will fail until a real URL is provided.
  await page.goto('https://example.com');


  // Create a locator for the username field.
  //
  // #username is a CSS selector:
  // - # means "find by ID."
  // - username is the value of the ID.
  //
  // It would match:
  // <input id="username">
  //
  // Creating a locator does not immediately interact with the element.
  // It tells Playwright how to find the element when it is needed.
  const usernameInput = page.locator('#username');


  // Verify that the username field becomes visible.
  //
  // This is a web-first assertion. Playwright retries the check
  // until the field becomes visible or 6000 milliseconds pass.
  //
  // This explicit assertion is useful when visibility itself
  // is something we want to verify.
  await expect(usernameInput).toBeVisible({
    timeout: 6000
  });


  // Enter the username.
  //
  // fill() clears any existing value and then enters the new value.
  // Therefore, a separate clear() call is normally unnecessary.
  //
  // Playwright automatically waits until the element is:
  // - visible;
  // - enabled;
  // - editable.
  await usernameInput.fill('adimacic123');


  // Create a locator for the password field.
  //
  // This matches an element such as:
  // <input id="pwd-field" type="password">
  const passwordInput = page.locator('#pwd-field');


  // Verify that the password field becomes visible.
  //
  // Playwright retries this assertion for up to 7000 milliseconds.
  await expect(passwordInput).toBeVisible({
    timeout: 7000
  });


  // Enter the password.
  //
  // In a real automation project, passwords should normally come
  // from environment variables or another secure configuration,
  // rather than being written directly in the test.
  await passwordInput.fill('123was');


  // Create a locator for the login button.
  //
  // This matches an element such as:
  // <button id="login-button">Login</button>
  const loginButton = page.locator('#login-button');


  // Verify that the login button is visible.
  await expect(loginButton).toBeVisible({
    timeout: 6000
  });


  // Verify that the login button is enabled.
  //
  // A button can be visible but disabled, for example:
  // <button id="login-button" disabled>Login</button>
  //
  // In that case, the user cannot click it.
  await expect(loginButton).toBeEnabled({
    timeout: 6000
  });


  // Click the login button.
  //
  // Playwright automatically waits until the button:
  // - resolves to exactly one element;
  // - is visible;
  // - is stable and not moving;
  // - is enabled;
  // - can receive the click.
  await loginButton.click();


  // Verify that the login was successful.
  //
  // This checks whether the resulting URL contains "/dashboard".
  //
  // /\/dashboard/ is a regular expression:
  // - the outer / characters start and end the expression;
  // - \/ represents a literal slash;
  // - dashboard is the expected URL text.
  //
  // It can match:
  // https://example.com/dashboard
  // https://example.com/dashboard/profile
  //
  // Playwright retries this assertion until the URL matches
  // or 6000 milliseconds pass.
  await expect(page).toHaveURL(/\/dashboard/, {
    timeout: 6000
  });
});