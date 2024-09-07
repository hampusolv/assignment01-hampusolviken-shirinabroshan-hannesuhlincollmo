import { test, expect } from '@playwright/test'; 

import { LoginPage } from './pages/login-page';

import { DashboardPage } from './pages/dashboard-page'; 

import { ReservationPage } from './pages/reservation-page';

import { BillPage } from './pages/bill-page';

import { ClientPage } from './pages/client-page';

test('TC1 Test login function and verify to see homepage', async ({ page }) => {

  const loginpage = new LoginPage(page);

  await loginpage.goto();

  await expect(page.locator('input[type="password"]')).toBeEditable();

  await loginpage.performLogin(`${process.env.USERNAME}`,`${process.env.PASSWORD}`);

  await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Login' })).toBeHidden();
   
});

test('TC4 validate back button works from reservation page', async ({ page }) => {

  const loginpage = new LoginPage(page); 

  const dashboardpage= new DashboardPage(page);

  const reservationpage= new ReservationPage(page);

  await loginpage.goto();

  await loginpage.performLogin(`${process.env.USERNAME}`,`${process.env.PASSWORD}`);

  await dashboardpage.clickonviewlinkforreservation();

  await expect(page.locator('h2')).toContainText('Reservations');

  await reservationpage.clickonbackbutton();

  await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeInViewport();

});

test('TC5 Delete a client and then add the same client again ', async ({ page }) => {

  // why we do this beacue to get a more robust and resilient test 

  const loginpage = new LoginPage(page); 

  const dashboardpage= new DashboardPage(page);

  const clientpage= new ClientPage(page);

  await loginpage.goto();

  await loginpage.performLogin(`${process.env.USERNAME}`,`${process.env.PASSWORD}`);

  await dashboardpage.clickonviewlinkforclient();

  // check that img element works you can click on it is enabled 
 
  await expect(page.getByRole('img').nth(1)).not.toBeDisabled();

  await clientpage.deleteclient();

  await expect(page.locator('#app')).not.toContainText('ME Mikael Eriksson (#2)Email: mikael.eriksson@example.comTelephone: 070 000 0002');

  await clientpage.createclient();

  await expect(page.locator('#app')).toContainText('ME Mikael Eriksson (#2)Email: mikael.eriksson@example.comTelephone: 070 000 0002');

 

});

test('TC6 edit a existings clients all info and then edit all the info back,', async ({ page }) => {

  const loginpage = new LoginPage(page); 

  const dashboardpage= new DashboardPage(page);

  const clientpage= new ClientPage(page);

  await loginpage.goto();

  await loginpage.performLogin(`${process.env.USERNAME}`,`${process.env.PASSWORD}`);

  await dashboardpage.clickonviewlinkforclient();

  await clientpage.uppdateclientsname();

  // ensure that all users information is gone from clients list 

  await expect(page.getByRole('heading', { name: 'Mikael Eriksson (#2)' })).not.toBeVisible();

  await expect(page.getByText('Email: mikael.eriksson@')).toBeHidden();

  await expect(page.getByText('Telephone: 070 000 0002')).toBeHidden();
  
  await clientpage.uppdateclientsnametooriginalname();

  // ensure that users alla information is in the list of clients list 

  await expect(page.locator('#app')).toContainText('ME Mikael Eriksson (#2)Email: mikael.eriksson@example.comTelephone: 070 000 0002');

});

test('TC7 Validate negative value error message appears when creating bill', async ({ page }) => {

  const loginpage = new LoginPage(page); 

  const dashboardpage= new DashboardPage(page);

  const billpage= new BillPage(page);

  await loginpage.goto();

  await loginpage.performLogin(`${process.env.USERNAME}`,`${process.env.PASSWORD}`);

  await dashboardpage.clickonviewlinkforbill();

  await expect(page.getByRole('link', { name: 'Create Bill' })).toBeEnabled();

  await billpage.fillinnegativebillvalue();

  expect(page.getByRole('spinbutton')).toHaveValue('-100');

  await expect(page.getByText('Value must be greater than 0')).not.toBeHidden();

  // ensure error message dont say to user that its okay value to be negative 

  await expect(page.locator('#app > div > div.error')).not.toContainText("value must be smaller than 0")

});


test('TC8 pay a bill check that is been checked and get confirmation text that bill is paid', async ({ page }) => {

  const loginpage = new LoginPage(page); 

  const dashboardpage= new DashboardPage(page);

  const billpage= new BillPage(page);

  await loginpage.goto();

  await loginpage.performLogin(`${process.env.USERNAME}`,`${process.env.PASSWORD}`);

  await dashboardpage.clickonviewlinkforbill();

  await billpage.checkthatbillispaid();

  // ensure that bill is checked by assert that text paid is not having a roll of checkbox and that the chexbox has been checked by having ✓ symbol 

  await expect(page.getByText('✓')).not.toHaveRole("checkbox");

  await expect(page.locator('.checkbox')).toContainText('✓');


});

test('TC9 Validate error messege shows when wrong password on loginpage', async ({ page }) => {

  const loginpage = new LoginPage(page); 

  const badusername = 'wrongUser'; 
  const badpassword = 'wrongPassword';

  await loginpage.goto();

  await expect(page.locator('input[type="text"]')).toBeEditable();

  await loginpage.WrongperformLogin(badusername,badpassword);
  
  await expect(page.getByText('Bad username or password')).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeHidden();

});













