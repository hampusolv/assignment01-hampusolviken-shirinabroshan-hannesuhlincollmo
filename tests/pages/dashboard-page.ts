import { expect, type Locator, type Page } from '@playwright/test';


export class DashboardPage {
  //Attributes
  readonly page: Page;
  readonly viewroomlink: Locator;
  readonly viewclientlink: Locator;
  readonly viewbilllink: Locator;
  readonly viewresevationlink: Locator;


  //varibel

  constructor(page: Page) {
    this.page = page;
    this.viewroomlink = page.locator('div').filter({ hasText: /^RoomsNumber: 2View$/ }).getByRole('link');
    this.viewclientlink = page.locator('div').filter({ hasText: /^ClientsNumber: 2View$/ }).getByRole('link');
    this.viewbilllink = page.locator('div').filter({ hasText: /^BillsTotal: 1 \(4500kr\)Paid: 0 \(0kr\)View$/ }).getByRole('link');
    this.viewresevationlink = page.locator('div').filter({ hasText: /^ReservationsTotal: 1Current: 0View$/ }).getByRole('link');
  }

  async clickonviewlinkforroom() {
    await this.viewroomlink.click();
  }

  async clickonviewlinkforclient() {
    await this.viewclientlink.click();
  }

  async clickonviewlinkforbill() {
    await this.viewbilllink.click();
  }
  async clickonviewlinkforresevation() {
    await this.viewresevationlink.click();
  }

}