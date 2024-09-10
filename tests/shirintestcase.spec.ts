import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { ClientListPage } from './pages/clientlist-page';
import { ClientCreatePage } from './pages/clientcreate-page';
import { ClientEditPage } from './pages/editclient-page';

test.describe('Shirin test suite ', () => {
  test.beforeEach(async ({ page }) => {
    const loginpage = new LoginPage(page);
    await loginpage.goto();
    await loginpage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
  });


  test('TC1 Test login and see homepage', async ({ page }) => {
    await page.getByRole('heading', { name: 'Tester Hotel Overview' }).click();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
  });


  test('TC5 Delete a client', async ({ page }) => {

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

    const clientnewedit = new ClientEditPage(page);
    await clientnewedit.newdataeditclient();
    await expect(page.getByRole('heading', { name: 'shirin (#2)' })).toBeVisible();

    // tillbacka till Mikeal
    await clientedit.editclient();
    await clientnewedit.Mikaeleditclient();
    await expect(page.getByRole('heading', { name: 'Mikael Eriksson (#2)' })).toBeVisible();

  });

});
