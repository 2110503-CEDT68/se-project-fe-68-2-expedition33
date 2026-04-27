import { test, expect } from '@playwright/test';

// Shared state for the serial test suite
const randomId = Math.floor(Math.random() * 10000);
const companyName = `Test Company ${randomId}`;
const managerPassword = 'password123';
const cleanName = companyName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
const managerEmail = `${cleanName}@jobfair.company`;

test.describe.configure({ mode: 'serial' });

test.describe('EPIC 1: Company Account Management', () => {

  test('US1-1: As an admin, I want to create a company account', async ({ page }) => {
    await page.goto('/api/auth/login');
    await page.fill('#email', 'narongdech@example.com');
    await page.fill('#password', '123456');
    await page.click('button:has-text("LOGIN")');
    await expect(page).toHaveURL('http://localhost:3000/', { timeout: 30000 });

    await page.goto('/api/auth/profile');
    await page.fill('input[name="name"]', companyName);
    await page.fill('input[name="description"]', 'A test company description');
    await page.fill('input[name="website"]', 'http://testcompany.com');
    await page.fill('input[name="tel"]', '021234567');
    await page.fill('input[name="address"]', '123 Test St');
    await page.fill('input[name="district"]', 'Test District');
    await page.fill('input[name="province"]', 'Test Province');
    await page.fill('input[name="postalcode"]', '12345');
    await page.fill('input[name="managerTel"]', '0812345678');
    await page.fill('input[name="password"]', managerPassword);
    await page.fill('input[name="confirmPassword"]', managerPassword);
    await page.click('button:has-text("Create Company")');

    await expect(page.locator('h2:has-text("Account Created!")')).toBeVisible({ timeout: 15000 });
    await page.click('button:has-text("Done")');

    await page.goto('/companies');
    // Using search bar to find the company
    const searchInput = page.getByPlaceholder('Search companies');
    await expect(searchInput).toBeVisible();
    await searchInput.fill(companyName);
    await expect(page.getByText(companyName).first()).toBeVisible();

    // Fixing the Sign-out button text to match the UI (Sign-out)
    await page.getByRole('button', { name: /Sign-Out/ }).filter({ visible: true }).click();
    await page.locator('button').filter({ hasText: /^Sign-out$/ }).click();
    await expect(page).toHaveURL('http://localhost:3000/');
  });

  test('US1-2: As a company manager, I want to verify my profile details', async ({ page }) => {
    await page.goto('/api/auth/login');
    await page.fill('#email', managerEmail);
    await page.fill('#password', managerPassword);
    await page.click('button:has-text("LOGIN")');
    await expect(page).toHaveURL('http://localhost:3000/', { timeout: 30000 });

    await page.goto('/companies');
    // Using search bar to find the company
    const searchInput = page.getByPlaceholder('Search companies');
    await expect(searchInput).toBeVisible();
    await searchInput.fill(companyName);
    
    await page.getByRole('link', { name: companyName }).first().click();
    await expect(page.getByRole('heading', { name: companyName })).toBeVisible();

    // Sign out to keep tests independent
    await page.getByRole('button', { name: /Sign-Out/ }).filter({ visible: true }).click();
    await page.locator('button').filter({ hasText: /^Sign-out$/ }).click();
    await expect(page).toHaveURL('http://localhost:3000/');
  });
  test('US1-3: As a company manager, I want to edit my profile', async ({ page }) => {
    await page.goto('/api/auth/login');
    await page.fill('#email', managerEmail);
    await page.fill('#password', managerPassword);
    await page.click('button:has-text("LOGIN")');
    await expect(page).toHaveURL('http://localhost:3000/', { timeout: 30000 });
    await expect(page.getByRole('button', { name: /Sign-Out/ }).filter({ visible: true })).toBeVisible();

    await page.goto('/companies');
    // Using search bar to find the company
    const searchInput = page.getByPlaceholder('Search companies');
    await expect(searchInput).toBeVisible();
    await searchInput.fill(companyName);

    await page.getByRole('link', { name: companyName }).first().click();
    await page.getByRole('button', { name: 'Update', exact: true }).click();
    await page.getByRole('textbox', { name: 'Website' }).fill('http://updated-test.com');
    await page.locator('form button:has-text("Update")').click();
    
    // Wait for reload and verification
    await expect(page.locator('text=http://updated-test.com')).toBeVisible({ timeout: 15000 });

    // Sign out
    await page.getByRole('button', { name: /Sign-Out/ }).filter({ visible: true }).click();
    await page.locator('button').filter({ hasText: /^Sign-out$/ }).click();
    await expect(page).toHaveURL('http://localhost:3000/');
  });

  test('US1-4: As a company manager, I want to delete my profile', async ({ page }) => {
    await page.goto('/api/auth/login');
    await page.fill('#email', managerEmail);
    await page.fill('#password', managerPassword);
    await page.click('button:has-text("LOGIN")');
    await expect(page).toHaveURL('http://localhost:3000/', { timeout: 30000 });

    await page.goto('/companies');
    // Using search bar to find the company
    const searchInput = page.getByPlaceholder('Search companies');
    await expect(searchInput).toBeVisible();
    await searchInput.fill(companyName);

    await page.getByRole('link', { name: companyName }).first().click();
    await page.getByRole('button', { name: 'Delete', exact: true }).click();
    await page.locator('div.fixed').getByRole('button', { name: 'Delete', exact: true }).click();
    // After self-deletion, the user is logged out and redirected (usually to home or login)
    await expect(page).toHaveURL(/http:\/\/localhost:3000\/?(api\/auth\/login)?/, { timeout: 15000 });
  });
});

test.describe('EPIC 2: Payment System for Company', () => {
  const paymentCompanyName = `Payment Co ${randomId}`;
  const paymentEmail = `paymentco${randomId}@jobfair.company`;

  test('Setup: Create company for Payment EPIC', async ({ page }) => {
    await page.goto('/api/auth/login');
    await page.fill('#email', 'narongdech@example.com');
    await page.fill('#password', '123456');
    await page.click('button:has-text("LOGIN")');
    await expect(page).toHaveURL('http://localhost:3000/', { timeout: 30000 });

    await page.goto('/api/auth/profile');
    await page.fill('input[name="name"]', paymentCompanyName);
    await page.fill('input[name="description"]', 'Payment Test Company');
    await page.fill('input[name="website"]', 'http://payment.com');
    await page.fill('input[name="tel"]', '029999999');
    await page.fill('input[name="address"]', '456 Payment St');
    await page.fill('input[name="district"]', 'Pay District');
    await page.fill('input[name="province"]', 'Pay Province');
    await page.fill('input[name="postalcode"]', '54321');
    await page.fill('input[name="managerTel"]', '0899999999');
    await page.fill('input[name="password"]', managerPassword);
    await page.fill('input[name="confirmPassword"]', managerPassword);
    await page.click('button:has-text("Create Company")');
    await expect(page.locator('h2:has-text("Account Created!")')).toBeVisible({ timeout: 15000 });
    await page.click('button:has-text("Done")');

    await page.getByRole('button', { name: /Sign-Out/ }).filter({ visible: true }).click();
    await page.locator('button').filter({ hasText: /^Sign-out$/ }).click();
  });

  test('US2-1: As a company manager, I want to add payment items', async ({ page }) => {
    await page.goto('/api/auth/login');
    await page.fill('#email', paymentEmail);
    await page.fill('#password', managerPassword);
    await page.click('button:has-text("LOGIN")');
    await expect(page).toHaveURL('http://localhost:3000/', { timeout: 30000 });

    await page.goto('/payments');
    await page.click('button:has-text("Purchase")');
    await page.getByRole('button', { name: '10' }).first().click();
    await page.locator('div.fixed').getByRole('button', { name: 'Purchase', exact: true }).click();
    await page.waitForURL(/\/payments\/.+/);
    await expect(page).toHaveURL(/\/payments\/.+/);
  });

  test('US2-2: As a company manager, I want to view my own payment items', async ({ page }) => {
    await page.goto('/api/auth/login');
    await page.fill('#email', paymentEmail);
    await page.fill('#password', managerPassword);
    await page.click('button:has-text("LOGIN")');
    await expect(page).toHaveURL('http://localhost:3000/', { timeout: 30000 });

    await page.goto('/payments');
    await expect(page.locator(`text=${paymentCompanyName}`).first()).toBeVisible();
  });

  test('US2-3: As a company manager, I want to confirm my payment', async ({ page }) => {
    await page.goto('/api/auth/login');
    await page.fill('#email', paymentEmail);
    await page.fill('#password', managerPassword);
    await page.click('button:has-text("LOGIN")');
    await expect(page).toHaveURL('http://localhost:3000/', { timeout: 30000 });

    await page.goto('/payments');
    await page.locator('a[href^="/payments/"]').first().click();
    await page.getByRole('button', { name: 'Confirm Payment', exact: true }).click();
    await page.getByRole('button', { name: 'Confirm', exact: true }).click();
    await expect(page.getByText('captured', { exact: true })).toBeVisible();
  });

  test('US2-4: As a company manager, I want to cancel my payment item', async ({ page }) => {
    await page.goto('/api/auth/login');
    await page.fill('#email', paymentEmail);
    await page.fill('#password', managerPassword);
    await page.click('button:has-text("LOGIN")');
    await expect(page).toHaveURL('http://localhost:3000/', { timeout: 30000 });

    await page.goto('/payments');
    await page.click('button:has-text("Purchase")');
    await page.getByRole('button', { name: '11' }).first().click();
    await page.locator('div.fixed').getByRole('button', { name: 'Purchase', exact: true }).click();
    await page.waitForURL(/\/payments\/.+/);

    await page.getByRole('button', { name: 'Cancel Payment', exact: true }).click();
    await page.getByRole('button', { name: 'Cancel payment', exact: true }).click();
    await expect(page.getByText('cancelled', { exact: true })).toBeVisible();
  });
});
