import { expect, type Locator, type Page } from '@playwright/test';

export class BillviewPage {
  //Attributes
  readonly page: Page;


  readonly createbillbutton: Locator;
  readonly dotbutton: Locator;
  readonly  editbutton: Locator;


  

  constructor(page: Page) {
    this.page = page;
  

    this.createbillbutton =  page.getByRole('link', { name: 'Create Bill' });
    this.dotbutton = page.getByRole('img');
    this.editbutton = page.getByText('Edit');
  }

    
    async clickoncreatBill(){
        await this.createbillbutton.click();

        
    }
    
  

    
    async dotbilledit(){
        await this.dotbutton.click();
        await this.editbutton.click();

    }

      
}
       



