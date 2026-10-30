import { expect, test } from '@playwright/test';
import { mailpit, uniqueEmail } from './harness.js';

const PASSWORD = 'e2e-password-long-enough';

test('sign up, verify, create an organization, sign out and sign in again', async ({
  page,
  context,
}) => {
  const consoleProblems: string[] = [];
  const failedResponses: string[] = [];
  let sessionProbes = 0;
  page.on('console', (message) => {
    if (message.type() === 'error' || message.type() === 'warning') {
      consoleProblems.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on('pageerror', (error) => consoleProblems.push(`pageerror: ${error.message}`));
  page.on('response', (response) => {
    if (response.status() < 400) return;
    const { pathname } = new URL(response.url());
    // Before sign-in the app asks who is signed in and gets 401; the browser logs each of
    // those as a console error. Every other failed response is a defect.
    if (
      response.status() === 401 &&
      response.request().method() === 'GET' &&
      pathname === '/api/v1/auth/me'
    ) {
      sessionProbes += 1;
    } else {
      failedResponses.push(`${response.status()} ${response.request().method()} ${pathname}`);
    }
  });

  const email = uniqueEmail();
  const orgName = `E2E Org ${Date.now().toString(36)}`;

  await page.goto('/signup');
  await page.getByLabel(/full name/i).fill('E2E User');
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel('Password', { exact: true }).fill(PASSWORD);
  await page.getByLabel('Repeat password', { exact: true }).fill(PASSWORD);
  await page.getByRole('button', { name: /sign up/i }).click();
  await expect(page.getByText(/check your email/i)).toBeVisible();

  await page.goto(await mailpit(email));
  await expect(page).toHaveURL(/\/marketplace/);

  await page.getByRole('button', { name: 'Switch organization' }).click();
  await page.getByRole('menuitem', { name: /new organization/i }).click();
  await page.getByLabel('Name').fill(orgName);
  await page.getByRole('button', { name: /^create$/i }).click();
  await page.getByRole('button', { name: 'Switch organization' }).click();
  await page.getByRole('menuitem', { name: orgName }).click();
  await expect(page.getByRole('button', { name: 'Switch organization' })).toContainText(orgName);

  await page.getByRole('button', { name: 'Sign out' }).click();
  await expect(page).toHaveURL(/\/signin/);

  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel('Password', { exact: true }).fill(PASSWORD);
  await page.getByRole('button', { name: /^sign in$/i }).click();
  await expect(page).toHaveURL(/\/marketplace/);

  const session = (await context.cookies()).find((cookie) => cookie.name === '__Host-sid');
  expect(session).toMatchObject({ secure: true, httpOnly: true });

  const unexpectedConsole = consoleProblems.filter(
    (text) =>
      !/Failed to load resource: the server responded with a status of (401|404)/.test(text),
  );
  const probeLogs = consoleProblems.length - unexpectedConsole.length;
  expect(failedResponses).toEqual([]);
  expect(unexpectedConsole).toEqual([]);
  expect(probeLogs).toBe(sessionProbes);
});
