import {  type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  
  readonly page: Page;
  readonly reservationlink:Locator;
  readonly roomlink:Locator;
  readonly clientlink:Locator;
  readonly billlink:Locator;

  constructor(page: Page) {
    this.page=page;
    this.roomlink=page.locator('#app > div > div > div:nth-child(1) > a');
    this.clientlink=page.locator('#app > div > div > div:nth-child(2) > a');
    this.billlink=page.locator('#app > div > div > div:nth-child(3) > a');
    this.reservationlink=page.locator('#app > div > div > div:nth-child(4) > a');

    
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

 
}




