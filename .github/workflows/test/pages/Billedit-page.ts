import { expect, type Locator, type Page } from '@playwright/test';

export class BilleditlPage {
  //Attributes
  readonly page: Page;


  readonly checkbox: Locator;

  constructor(page: Page) {
    this.page = page;
  


    this.checkbox = page.locator('.checkbox');
  }

    
    async clickcheckbox(){
        await this.checkbox.click();

        
    }
}