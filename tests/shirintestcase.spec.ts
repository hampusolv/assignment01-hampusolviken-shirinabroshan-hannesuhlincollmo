import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { BillPage } from './pages/bill-page';
import { ReservationPage } from './pages/resevation';



test('TC1 Test login and see homepage', async ({ page }) => {
  const loginpage = new LoginPage(page);
  await loginpage.goto();
  await loginpage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
  await page.getByRole('heading', { name: 'Tester Hotel Overview' }).click();
  await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
});


test('TC2 Test that room links work', async ({ page }) => {
  const loginpage = new LoginPage(page);
  const dashboardpage = new DashboardPage(page);

  await loginpage.goto();
  await loginpage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);

  await dashboardpage.clickonviewlinkforroom();
  await expect(page.getByText('Rooms')).toBeVisible();
});

test('TC3 Creat a room', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('tester01');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('GteteqbQQgSr88SwNExUQv2ydb7xuf8c');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^RoomsNumber: 2View$/ }).getByRole('link').click();
  await page.getByRole('link', { name: 'Create Room' }).click();
  await page.getByRole('combobox').selectOption('single');
  await page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton').click();
  await page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton').fill('7');
  await page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton').click();
  await page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton').fill('4');
  await page.locator('.checkbox').click();
  await page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton').click();
  await page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton').fill('2000');
  await page.getByRole('listbox').selectOption('balcony');
  await page.getByText('Save').click();
  await expect(page.getByText('7 Floor 4, Room 7Category:')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Floor 4, Room' })).toBeVisible();
  await expect(page.getByText('Category: single')).toBeVisible();
  await expect(page.getByText('Available: true').nth(2)).toBeVisible();
  await expect(page.getByText('Price: 2000kr').nth(1)).toBeVisible();
  await expect(page.getByText('Features: balcony', { exact: true })).toBeVisible();
});



test('TC4 test that back button works', async ({ page }) => {
  const loginpage = new LoginPage(page);
  await loginpage.goto();
  await loginpage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);

  const dashboradpage = new DashboardPage(page);
  await dashboradpage.clickonviewlinkforresevation();
  //await page.locator('div').filter({ hasText: /^ReservationsTotal: 1Current: 0View$/ }).getByRole('link').click();
  const reservationpage =new ReservationPage (page);
  await reservationpage .backbuttonwork();


  //await page.getByRole('link', { name: 'Back' }).click();
  await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
});



test('TC5 Delete a client', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('tester01');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('GteteqbQQgSr88SwNExUQv2ydb7xuf8c');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^ClientsNumber: 2View$/ }).getByRole('link').click();
  await expect(page.getByRole('heading', { name: 'Jonas Hellman (#1)' })).toBeVisible();
  await page.getByRole('img').first().click();
  await page.getByText('Delete').click();
});



test('TC6 edit a existings clients name', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('tester01');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('GteteqbQQgSr88SwNExUQv2ydb7xuf8c');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^ClientsNumber: 2View$/ }).getByRole('link').click();
  await expect(page.getByRole('heading', { name: 'Mikael Eriksson (#2)' })).toBeVisible();
  await page.getByRole('img').nth(1).click();
  await page.getByText('Edit').click();
  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Hannes Uhlin Collmo');
  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').click();
  await page.getByText('Save').click();
  await expect(page.getByRole('heading', { name: 'Hannes Uhlin Collmo (#2)' })).toBeVisible();
});


test('TC7 Validate negative value when creating bill', async ({ page }) => {
  const loginpage = new LoginPage(page);
  await loginpage.goto();
  await loginpage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);  

  const dashboradpage = new DashboardPage(page);
  await dashboradpage.clickonviewlinkforbill();

  const billpage = new BillPage(page);
  await billpage.createwornginputbill();

  await expect(page.getByText('Value must be greater than')).toBeVisible();
});


test('TC8 pay a bill and check if it disapear', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('tester01');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('GteteqbQQgSr88SwNExUQv2ydb7xuf8c');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^BillsTotal: 1 \(4500kr\)Paid: 0 \(0kr\)View$/ }).getByRole('link').click();
  await expect(page.getByText('ID: 1Value: 4500krPaid: Yes')).toBeVisible();
  await page.locator('.action').click();
  await page.getByText('Edit').click();
  await page.locator('.checkbox').click();
  await expect(page.getByText('✓')).toBeVisible();
  await page.getByText('Save').click();
  await expect(page.getByText('ID: 1Value: 4500krPaid: Yes')).toBeHidden();
});


test('TC9 Validate error messege wrong password', async ({ page }) => {
  const loginpage = new LoginPage(page);
  await loginpage.goto();
  await loginpage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_BADPASSWORD}`);
  //await page.goto('http://localhost:3000/login');
  /*await page.goto('http://localhost:3000/login');
  /*await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('tester01');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('abcde');
  await page.getByRole('button', { name: 'Login' }).click();*/
  await expect(page.getByText('Bad username or password')).toBeVisible();
});


test('TC10 test that a field in reservation can go to edit and that the value is in the field  ', async ({ page }) => {

  await page.goto('http://localhost:3000/login');
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('tester01');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('GteteqbQQgSr88SwNExUQv2ydb7xuf8c');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('div').filter({ hasText: /^ReservationsTotal: 1Current: 0View$/ }).getByRole('link').click();
  await page.getByRole('link', { name: 'Create Reservation' }).click();
  await page.locator('div').filter({ hasText: /^Start \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD').click();
  await page.locator('div').filter({ hasText: /^Start \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD').fill('2024-10-01');
  await expect(page.locator('div').filter({ hasText: /^Start \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Start \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD')).toHaveValue('2024-10-01');
  await page.locator('div').filter({ hasText: /^End \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD').click();
  await page.locator('div').filter({ hasText: /^End \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD').fill('2024-10-03');
  await expect(page.locator('div').filter({ hasText: /^End \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^End \(Format YYYY-MM-DD\)$/ }).getByPlaceholder('YYYY-MM-DD')).toHaveValue('2024-10-03');
});




