import { expect, type Locator, type Page } from '@playwright/test';

export class BillcreatePage {
  
  readonly page: Page;
  readonly savebutton: Locator;
  readonly fillvaluearea: Locator;

  

  constructor(page: Page) {
    this.page = page;
  

    
    this.fillvaluearea = page.getByRole('spinbutton');
    this.savebutton = page.getByText('Save');
  }

    
    async createwronginput(){
        await this.fillvaluearea.fill("-100")
        await this.savebutton.click();

    }
       
}