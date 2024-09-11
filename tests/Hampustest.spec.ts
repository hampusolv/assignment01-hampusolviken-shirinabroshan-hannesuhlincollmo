import { test, expect } from '@playwright/test';
import { faker } from "@faker-js/faker";
import { LoginPage } from './Pages/Page-login'; 
import { DashboardPage } from './Pages/dashborde-Pages';
import { BillcreatePage } from './createbillPage';
import { ReservationviewPage } from './reservationview-page';
import { BillviewPage } from './billview-page';
import { EditebillPage } from './editebillpage';



test.describe('Hampus-testsuite', () => {

  

  test.beforeEach(async({page}) => {
    console.log("login user before each test")
    const loginoage =new LoginPage (page);
    await loginoage.goto();
    await loginoage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`);



  });

  test('TC1 Test login and see homepage', async ({ page }) => {
    await page.getByRole('heading', { name: 'Tester Hotel Overview' }).click();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
  });


  test('TC4 test that back button works', async ({ page }) => {

    const dashboardpage = new DashboardPage (page);
    await dashboardpage.clickonreservationview();

    const reservationviewpage = new ReservationviewPage (page);
    await reservationviewpage.backbuttonwork();

    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
  });




  test('TC7 Validate negative value when creating bill', async ({ page }) => {


    const dashboardpage = new DashboardPage (page);
    await dashboardpage.clickonbillsview();
    const billviewpage = new BillviewPage (page);
    await billviewpage.clickoncreatBill();
    const billcreatepage = new BillcreatePage(page);
    await billcreatepage.createwronginput();
    await expect(page.getByText('Value must be greater than')).toBeVisible();
    await expect(page.getByText('Value must be smaller than')).toBeHidden();
  });


  test('TC8 pay a bill and check if it disapear', async ({ page }) => {

    const dashboardpage = new DashboardPage (page);
    await dashboardpage.clickonbillsview();
    const billviewpage = new BillviewPage (page);
    await billviewpage.dotbilledit();
    const editebillpage = new EditebillPage(page);
    await editebillpage.clickcheckbox();
    await expect(page.locator('#app')).toContainText('✓');
  });



});


