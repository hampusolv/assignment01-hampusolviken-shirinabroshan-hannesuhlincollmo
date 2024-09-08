import {  type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  
  readonly page: Page;
  readonly reservationlink:Locator;
  readonly roomlink:Locator;
  readonly clientlink:Locator;
  readonly billlink:Locator;
  readonly logoutbutton:Locator;

  constructor(page: Page) {
    this.page=page;
    this.reservationlink=page.locator('div').filter({ hasText: /^ReservationsTotal: 1Current: 0View$/ }).getByRole('link');
    this.roomlink=page.locator('#app > div > div > div:nth-child(1) > a');
    this.clientlink=page.locator('div').filter({ hasText: /^ClientsNumber: 2View$/ }).getByRole('link');
    this.billlink=page.locator('div').filter({ hasText: /^BillsTotal: 1 \(4500kr\)Paid: 0 \(0kr\)View$/ }).getByRole('link');
    this.logoutbutton = page.getByRole('button', { name: 'Logout' });
  }

  async clickonviewlinkforreservation() {
    await this.reservationlink.click();
  }

  async clickonviewlinkforbill() {
    await this.billlink.click();
  }

  async clickonviewlinkforclient() {
    await this.clientlink.click();
  }

  async clickonviewlinkforroom() {
    await this.roomlink.click();
  }

  async performlogout() {

    await this.logoutbutton.click();
    
    
  }
}




