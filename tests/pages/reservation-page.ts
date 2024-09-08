import {  type Locator, type Page } from '@playwright/test';

export class ReservationPage {
  //Attributes
  readonly page: Page;
  readonly backbutton:Locator;

  
  constructor(page: Page) {
    this.page=page;
    this.backbutton=page.getByRole('link', { name: 'Back' });
     
  }
   async clickonbackbutton() {;
    await this.backbutton.click();
  }
}


// Vilka funktioner ska vi använda här ? 

// vilka element 