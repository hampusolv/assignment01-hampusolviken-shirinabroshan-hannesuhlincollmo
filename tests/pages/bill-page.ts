import {  type Locator, type Page } from '@playwright/test';

export class BillPage {
  //Attributes
  readonly page: Page;
  readonly createbillbutton:Locator;
  readonly inputfieldbill:Locator;
  readonly savebutton:Locator;
  readonly billcheckbox:Locator
  readonly choiceofeditbill:Locator
  readonly billeditchoice:Locator

  
  constructor(page: Page) {
    this.page=page;
    this. createbillbutton=page.getByRole('link', { name: 'Create Bill' });
    this.inputfieldbill=page.getByRole('spinbutton');
    this.savebutton=page.getByText('Save');
    this.billcheckbox= page.locator('.checkbox')
    this.billeditchoice= page.getByText('Edit')
    this.choiceofeditbill=page.getByRole('img')

    
    
  }

   async fillinnegativebillvalue() {

  
    await this.createbillbutton.click();
    await this.inputfieldbill.fill('-1000');
    await this.savebutton.click();

    
  }

  async checkthatbillispaid() {
    await this.choiceofeditbill.click();
    await this.billeditchoice.click();
    await this.billcheckbox.click();
    
  }
}
