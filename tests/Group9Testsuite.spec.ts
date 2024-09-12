import { test, expect } from '@playwright/test'; 

import { BilllistPage } from './pages/Billlist-page';

import { BillcreatePage } from './pages/Billcreate-page';

import { BilleditlPage } from './pages/Billedit-page';

import { ClientCreatePage } from './pages/Clientcreate-page';

import { ClientEditPage } from './pages/Clientedit-page';

import { ClientListPage } from './pages/Clientlist-Page';

import { DashboardPage } from './Dashboard-page';

import { FakerPage } from './pages/Faker-page';

import { faker } from "@faker-js/faker";

import { LoginPage } from './Login-page';

import { ReservationvlistPage } from './pages/Reservationlist-page';

import { RoomlistPage } from './pages/Roomlist-page';

import { RoomCreatePage } from './Roomcreate-page';


test.describe('Hannes Hampus and Shirin Testsuite1', () => {
  
  test.describe.configure({ retries: 2 });
  
  test.beforeEach(async ({ page }) => {
    console.log('Login user before each test');
    const loginpage = new LoginPage(page);
    await loginpage.goto();
    await loginpage.performLogin(`${process.env.USERNAME}`,`${process.env.PASSWORD}`);
  });

  test('TC1 Test login and see homepage', async ({ page }) => {
    await page.getByRole('heading', { name: 'Tester Hotel Overview' }).click();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
  });


  test('TC2 Test that room links work', async ({ page }) => {
  
    const dashboardpage= new DashboardPage(page);

    const roompageview= new RoomlistPage(page);
  
    await expect(page.locator('#app > div > div > div:nth-child(1) > a')).toBeEnabled();
  
    await dashboardpage.clickonviewlinkforroom();

    await roompageview.clickonviewroomheadertitel();
  
    await expect(page.locator('#app > div > h2 > div')).toHaveText("Rooms")
  
    await expect(page.locator('#app > div > h2 > div')).not.toHaveText("Reservations")

    await expect(page).toHaveURL('http://localhost:3000/rooms');

    await expect(page).not.toHaveURL('http://localhost:3000/');

  });

  
  test('TC3 Create new room and delete the room you created', async ({ page }) => {
  
    const roompagelist= new RoomlistPage(page);
  
    const dashboardpage= new DashboardPage(page);

    const roompagecreate= new RoomCreatePage(page);

    await dashboardpage.clickonviewlinkforroom();

    await expect(page.getByRole('link', { name: 'Create Room' })).toBeEnabled();

    await roompagelist.clickoncreateroombutton();

    await expect(page).toHaveURL('http://localhost:3000/room/new');

    const roomnumber=faker.string.numeric({ length: 3, exclude: ['0'] });

    const roomfloor=faker.string.numeric({ length: 2, exclude: ['0'] });

    const roomcost=faker.string.numeric({ length: 4, exclude: ['0'] });

    await roompagecreate.creaateroom(roomnumber,roomfloor,roomcost);

    await expect(page).toHaveURL('http://localhost:3000/rooms');

    await expect(page.locator('#app > div > div.rooms > div:nth-child(3) > div:nth-child(2) > div.category')).toHaveText('Category: twin');

    await expect(page.locator('#app > div > div.rooms > div:nth-child(3) > div:nth-child(2) > div.features')).toHaveText('Features:  penthouse');

    await expect(page.locator('#app > div > div.rooms > div:nth-child(3)')).toContainText(roomnumber);

    await expect(page.locator('#app > div > div.rooms > div:nth-child(3)')).toContainText(roomfloor);

    await expect(page.locator('#app > div > div.rooms > div:nth-child(3)')).toContainText(roomcost);

    await roompagelist.deleteroom();

    await expect(page.locator('#app > div > div.rooms > div:nth-child(3)')).toBeHidden();

  });


  test('TC4 test that back button works', async ({ page }) => {

    const dashboardpage = new DashboardPage (page);
    await dashboardpage.clickonviewlinkforreservation();

    const reservationlistpage = new ReservationvlistPage (page);
    await reservationlistpage.backbuttonwork();

    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
  });

  test('TC5 Delete a client', async ({ page }) => {
    await expect(page.locator("#app > header > div > h1 > a")).toHaveText("Tester Hotel");

    const dashboradpage = new DashboardPage(page);
    await dashboradpage.clickonviewlinkforclient();

    await expect(page.getByRole('heading', { name: 'Mikael Eriksson (#2)' })).toBeVisible();

    const clientdelete = new ClientListPage(page);
    await clientdelete.deleteclient();

    //createClinet för att tillbacka mikeal
    const createclient = new ClientCreatePage(page);
    await createclient.createclient();
  });


  test('TC6 edit a existings clients name', async ({ page }) => {

    const dashboradpage = new DashboardPage(page);
    await dashboradpage.clickonviewlinkforclient();

    await expect(page.getByRole('heading', { name: 'Mikael Eriksson (#2)' })).toBeVisible();

    const clientedit = new ClientListPage(page);
    await clientedit.editclient();
    await expect(page.locator('input[type="email"]')).not.toHaveValue('');


    const clientnewedit = new ClientEditPage(page);
    await clientnewedit.newdataeditclient();
    await expect(page.getByRole('heading', { name: 'shirin (#2)' })).toBeVisible();

    // tillbacka till Mikeal
    await clientedit.editclient();
    await clientnewedit.Mikaeleditclient();
    await expect(page.getByRole('heading', { name: 'Mikael Eriksson (#2)' })).toBeVisible();

    //feker
    const fakerdata = new FakerPage(page);
    await fakerdata.fakerdataclient();
    //delete faker
    await fakerdata.deletefakerclient();

    await expect(page.getByRole('heading', { name: 'Mikael Eriksson (#2)' })).toBeVisible();
  });


  test('TC7 Validate negative value when creating bill', async ({ page }) => {


    const dashboardpage = new DashboardPage (page);
    await dashboardpage.clickonviewlinkforbill();
    const billlistpage = new BilllistPage (page);
    await billlistpage.clickoncreatBill();
    const billcreatepage = new BillcreatePage(page);
    await billcreatepage.createwronginput();
    await expect(page.getByText('Value must be greater than')).toBeVisible();
    await expect(page.getByText('Value must be smaller than')).toBeHidden();
  });


  test('TC8 pay a bill and check if it disapear', async ({ page }) => {

    const dashboardpage = new DashboardPage (page);
    await dashboardpage.clickonviewlinkforbill();
    const billlistpage = new BilllistPage (page);
    await billlistpage.dotbilledit();
    const billeditpage = new BilleditlPage(page);
    await billeditpage.clickcheckbox();
    await expect(page.locator('#app')).toContainText('✓');
  });

  
  test('TC10 validate get right error messages to wrong useraction', async ({ page }) => {
 
    const dashboardpage= new DashboardPage(page);
  
    const roomviewpage= new RoomlistPage(page);

    const roomcreatepage= new RoomCreatePage(page);
  
    await dashboardpage.clickonviewlinkforroom();

    await roomviewpage.clickoncreateroombutton();

    await roomcreatepage.createroomwrongway();
  
    await expect(page.getByText('Floor must be set')).toBeVisible();
  
    await expect(page.getByText('Price must be a whole number')).toBeVisible();
  
    await expect(page.getByText('Roomnumber must be set')).not.toBeVisible();

    await expect(page.getByText('Roomcategory must be set')).not.toBeVisible();
  
  
  });

});


test.describe('Testsuite2 Hannes Shirin and Hampus just for wrong inlogg', () => {

    test('TC9 Validate error messege shows when wrong password on loginpage and ensure dont get to homepage', async ({ page }) => {
    
      const loginpage = new LoginPage(page); 
    
      const badusername = 'wrongUser'; 
      const badpassword = 'wrongPassword';
    
      await loginpage.goto();
    
      await loginpage.WrongperformLogin(badusername,badpassword);
      
      await expect(page.getByText('Bad username or password')).toBeVisible();
    
      await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeHidden();
    
    });
    
});


 


