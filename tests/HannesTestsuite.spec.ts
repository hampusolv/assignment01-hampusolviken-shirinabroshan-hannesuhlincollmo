import { test, expect } from '@playwright/test'; 

import { LoginPage } from './pages/login-page';

import { DashboardPage } from './pages/dashboard-page'; 

import { RoomviewPage } from './pages/roomview-page';

import { RoomCreatePage } from './pages/roomcreate-page';

import { faker } from "@faker-js/faker";



test.describe('Hannestestsuite', () => {
  
  test.describe.configure({ retries: 2 });
  
  test.beforeEach(async ({ page }) => {
    console.log('Login user before each test');
    const loginpage = new LoginPage(page);
    await loginpage.goto();
    await loginpage.performLogin(`${process.env.USERNAME}`,`${process.env.PASSWORD}`);
  });

 
  test('TC2 Test that room links work', async ({ page }) => {
  
    const dashboardpage= new DashboardPage(page);

    const roompageview= new RoomviewPage(page);
  
    await expect(page.locator('#app > div > div > div:nth-child(1) > a')).toBeEnabled();
  
    await dashboardpage.clickonviewlinkforroom();

    await roompageview.clickonviewroomheadertitel();
  
    await expect(page.locator('#app > div > h2 > div')).toHaveText("Rooms")
  
    await expect(page.locator('#app > div > h2 > div')).not.toHaveText("Reservations")

    await expect(page).toHaveURL('http://localhost:3000/rooms');

    await expect(page).not.toHaveURL('http://localhost:3000/');

  });

  
  test('TC3 Create two new room and delete the first room you created', async ({ page }) => {
  
    const roompagelist= new RoomviewPage(page);
  
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

  
  test('TC10 validate get right error messages to wrong useraction', async ({ page }) => {
 
    const dashboardpage= new DashboardPage(page);
  
    const roomviewpage= new RoomviewPage(page);

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

test.describe('Testsuite2 Hannes for wrong login cant use hook and my first testsuite', () => {

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








