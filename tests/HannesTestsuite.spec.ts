import { test, expect } from '@playwright/test'; 

import { LoginPage } from './pages/login-page';

import { DashboardPage } from './pages/dashboard-page'; 

import { ReservationPage } from './pages/reservation-page';

import { BillPage } from './pages/bill-page';

import { ClientPage } from './pages/client-page';

import { RoomPage } from './pages/room-page';


test.describe('Testsuite1 Hotell APP for Nackademin school', () => {
  test.describe.configure({ timeout: 100000 });
  test.describe.configure({ retries: 2 });
  
  test.beforeEach(async ({ page }) => {
    console.log('Logging in before each test');
    const loginpage = new LoginPage(page);
    await loginpage.goto();
    await loginpage.performLogin(`${process.env.USERNAME}`,`${process.env.PASSWORD}`);
   
    
  });

 
  test('TC1 Test login function and verify to see homepage', async ({ page }) => {
  
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
  
    await expect(page.getByRole('heading', { name: 'Login' })).toBeHidden();
     
  });
  
  test('TC2 Test that room links work', async ({ page }) => {
  
    const dashboardpage= new DashboardPage(page);
  
    await expect(page.locator('#app > div > div > div:nth-child(1) > a')).toBeEnabled();
  
    await dashboardpage.clickonviewlinkforroom();
  
    await expect(page.locator('#app > div > h2 > div')).toHaveText("Rooms")
  
    await expect(page.locator('#app > div > h2 > div')).not.toHaveText("Reservations")
  
  
  });
  
  
  test('TC3 Create a room and delete the room you created', async ({ page }) => {
  
    const roompage= new RoomPage(page);
  
    const dashboardpage= new DashboardPage(page);
  
    await dashboardpage.clickonviewlinkforroom();
  
    await roompage.creaateroom();
  
    await expect(page.getByText('Features: penthouse')).toBeVisible()
  
    await expect(page.getByText('Category: twin')).not.toBeHidden();
  
    await roompage.deleteroom();
  
    await expect(page.getByText('Features: penthouse')).not.toBeVisible()
  
    await expect(page.getByText('Category: twin')).toBeHidden();
  
  
  
  });
  
  test('TC4 validate back button works from reservation page', async ({ page }) => {
  
    const dashboardpage= new DashboardPage(page);
  
    const reservationpage= new ReservationPage(page);
  
    await dashboardpage.clickonviewlinkforreservation();
  
    await expect(page.getByRole('link', { name: 'Back' })).not.toBeDisabled();
  
    await expect(page.getByRole('link', { name: 'Back' })).toHaveAccessibleName("Back");
  
    await reservationpage.clickonbackbutton();
  
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeInViewport();
  
  });
  
  test('TC5 Delete a client and then add the same client again ', async ({ page }) => {
  
    const dashboardpage= new DashboardPage(page);
  
    const clientpage= new ClientPage(page);
  
    await dashboardpage.clickonviewlinkforclient();
  
    await clientpage.deleteclient();
  
    await expect(page.locator('#app')).not.toContainText('ME Mikael Eriksson (#2)Email: mikael.eriksson@example.comTelephone: 070 000 0002');
  
    await clientpage.createclient();
  
    await expect(page.locator('#app')).toContainText('ME Mikael Eriksson (#2)Email: mikael.eriksson@example.comTelephone: 070 000 0002');
  
  });
  
  test('TC6 edit a existings clients all info and then edit all the info back,', async ({ page }) => {
  
    const dashboardpage= new DashboardPage(page);
  
    const clientpage= new ClientPage(page);
  
    await dashboardpage.clickonviewlinkforclient();
  
    await clientpage.uppdateclientsname();
   
    await expect(page.getByRole('heading', { name: 'Mikael Eriksson (#2)' })).not.toBeVisible();
  
    await expect(page.getByText('Email: mikael.eriksson@')).toBeHidden();
  
    await expect(page.getByText('Telephone: 070 000 0002')).toBeHidden();
    
    await clientpage.uppdateclientsnametooriginalname();
  
    await expect(page.locator('#app')).toContainText('ME Mikael Eriksson (#2)Email: mikael.eriksson@example.comTelephone: 070 000 0002');
  
  });
  
  test('TC7 Validate negative value error message appears when creating bill', async ({ page }) => {
  
    const dashboardpage= new DashboardPage(page);
  
    const billpage= new BillPage(page);
  
    await dashboardpage.clickonviewlinkforbill();
  
    await billpage.fillinnegativebillvalue();
  
    await expect(page.locator('#app > div > div.error')).toBeVisible();
  
  });
  
  
  test('TC8 pay a bill check that is been checked', async ({ page }) => { 
  
    const dashboardpage= new DashboardPage(page);
  
    const billpage= new BillPage(page);
  
    await dashboardpage.clickonviewlinkforbill();
  
    await billpage.checkthatbillispaid();
  
    await expect(page.getByText('✓')).not.toHaveRole("checkbox");
  
    await expect(page.locator('.checkbox')).toContainText('✓');
  
    await expect(page.locator('.checkbox')).not.toBeEmpty();
  
  
  });
  
  test('TC9 validate get right error messages to wrong useraction', async ({ page }) => {
 
    const dashboardpage= new DashboardPage(page);
  
    const roompage= new RoomPage(page);
  
    await dashboardpage.clickonviewlinkforroom();
  
    await roompage.createroomwrongway();
  
    await expect(page.getByText('Floor must be set')).toBeVisible();
  
    await expect(page.getByText('Price must be a whole number')).toBeVisible();
  
    await expect(page.getByText('Roomnumber must be set')).not.toBeVisible();
  
  
  });

});

test.describe('Testsuite2 Hotell APP for Nackademin school just for test wrong inlogg', () => {

  test('TC10 Validate error messege shows when wrong password on loginpage and ensure dont get to homepage', async ({ page }) => {
  
    const loginpage = new LoginPage(page); 
  
    const badusername = 'wrongUser'; 
    const badpassword = 'wrongPassword';
  
    await loginpage.goto();
  
    await loginpage.WrongperformLogin(badusername,badpassword);
    
    await expect(page.getByText('Bad username or password')).toBeVisible();
  
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeHidden();
  
  });
  
});








