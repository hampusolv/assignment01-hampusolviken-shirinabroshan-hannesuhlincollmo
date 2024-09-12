import {  type Locator, type Page } from '@playwright/test';

import { faker } from "@faker-js/faker";

export class RoomCreatePage {
  
  readonly page: Page;
  
  readonly fieldroomnumber: Locator;
  readonly fieldroomfloor: Locator;
  readonly fieldroomprice: Locator;
  readonly fieldroomcheckbox: Locator;
  readonly listroomfeauture: Locator;
  readonly listroomtype: Locator;
  readonly savebutton: Locator;

  constructor(page: Page) {
    this.page=page;
    this.fieldroomnumber=page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton');
    this.fieldroomfloor=page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton');
    this.fieldroomprice=page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton');
    this.fieldroomcheckbox=page.locator('.checkbox');
    this.listroomtype=page.getByRole('combobox');
    this.listroomfeauture=page.getByRole('listbox');
    this.savebutton=page.getByText('Save');
  }


   async creaateroom(roomnumber:string=faker.string.numeric({ length: 3, exclude: ['0'] }),roomfloor: string=faker.string.numeric({ length: 2, exclude: ['0'] }),roomcost: string=faker.string.numeric({ length: 4, exclude: ['0'] })){

   await this.fieldroomcheckbox.click();

   await this.listroomtype.selectOption('Single');

   await this.listroomfeauture.selectOption("Balcony");

   await this.fieldroomnumber.fill(roomnumber);

   await this.fieldroomfloor.fill(roomfloor);

   await this.fieldroomprice.fill(roomcost);

   await this.listroomtype.selectOption('Twin');

   await this.listroomfeauture.selectOption("Penthouse");

   await this.savebutton.click();  
  }
  
  async createroomwrongway(){

   const roomnumber=faker.string.numeric({ length: { min: 1, max: 3 } })

   await this.fieldroomfloor.fill("");
   await this.fieldroomprice.fill("")
   await this.listroomtype.selectOption('Single');
   await this.listroomfeauture.selectOption("Balcony");
   await this.fieldroomcheckbox.click();
   await this.fieldroomnumber.fill(roomnumber);
   await this.savebutton.click();

  }

}

