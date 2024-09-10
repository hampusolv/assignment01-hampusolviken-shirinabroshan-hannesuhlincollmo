//dashboard-page.ts

import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  //Attributes
  readonly page: Page;
  readonly roomviewbutton: Locator;
  readonly billsviewlink: Locator;
  readonly clientsviewlink: Locator;
  readonly reservationviewlink: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.roomviewbutton = page.locator('div').filter({ hasText: /^RoomsNumber: 2View$/ }).getByRole('link');
    this.billsviewlink = page.locator('div').filter({ hasText: /^BillsTotal: 1 \(4500kr\)Paid: 0 \(0kr\)View$/ }).getByRole('link');
    this.clientsviewlink = page.locator('div').filter({ hasText: /^ClientsNumber: 2View$/ }).getByRole('link');
    this.reservationviewlink = page.locator('div').filter({ hasText: /^ReservationsTotal: 1Current: 0View$/ }).getByRole('link');
  }


   async clickonroomsview() {
    await this.roomviewbutton.click();
    }
    async clickonbillsview() {
      await this.billsviewlink.click();
    }
    async clickonclientview() {
        await this.clientsviewlink.click();
    }
    async clickonreservationview() {
          await this.reservationviewlink.click();
    }
}




