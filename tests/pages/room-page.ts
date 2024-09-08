import {  type Locator, type Page } from '@playwright/test';

import { faker } from "@faker-js/faker";

export class RoomPage {
  
  readonly page: Page;
  readonly createroombutton: Locator;
  readonly fieldroomnumber: Locator;
  readonly fieldroomfloor: Locator;
  readonly fieldroomprice: Locator;
  readonly fieldroomcheckbox: Locator;
  readonly listroomfeauture: Locator;
  readonly listroomtype: Locator;
  readonly savebutton: Locator;
  readonly roomchoiceoffdelete: Locator;
  readonly deleteroombutton: Locator;

  constructor(page: Page) {
    this.page=page;
    this.fieldroomnumber=page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton');
    this.fieldroomfloor=page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton');
    this.fieldroomprice=page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton');
    this.fieldroomcheckbox=page.locator('.checkbox');
    this.listroomtype=page.getByRole('combobox');
    this.listroomfeauture=page.getByRole('listbox');
    this.savebutton=page.getByText('Save');
    this.createroombutton=page.getByRole('link', { name: 'Create Room' });
    this.roomchoiceoffdelete=page.getByRole('img').nth(2);
    this.deleteroombutton=page.getByText('Delete');
    
  }
   async creaateroom() {

   await this.createroombutton.click();

   await this.fieldroomcheckbox.click();

   await this.listroomtype.selectOption('Single');

   await this.listroomfeauture.selectOption("Balcony");

   const roomcost= faker.string.numeric({ length: { min: 1, max: 5 } })

   const roomfloor=faker.string.numeric(1);

   const roomnumber=faker.string.numeric({ length: { min: 1, max: 3 } })

   await this.fieldroomfloor.fill(roomfloor);

   await this.fieldroomnumber.fill(roomnumber);

   await this.fieldroomprice.fill(roomcost);

   await this.listroomtype.selectOption('Twin');

   await this.listroomfeauture.selectOption("Penthouse");

   await this.fieldroomfloor.fill(roomfloor);

   await this.fieldroomnumber.fill(roomnumber);

   await this.fieldroomprice.fill(roomcost);

   await this.savebutton.click();

    
  }
  

  async deleteroom() {

  await this.roomchoiceoffdelete.click();
  await this.deleteroombutton.click();

  }

  async createroomwrongway(){

   const roomnumber=faker.string.numeric({ length: { min: 1, max: 3 } })

    await this.createroombutton.click();
    await this.fieldroomfloor.fill("");
    await this.fieldroomprice.fill("")
    await this.listroomtype.selectOption('Single');
    await this.listroomfeauture.selectOption("Balcony");
    await this.fieldroomcheckbox.click();
    await this.fieldroomnumber.fill(roomnumber);
    await this.savebutton.click();

  }

}

