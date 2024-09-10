import {  type Locator, type Page } from '@playwright/test';

export class RoomViewPage {
  
  readonly page: Page;
  readonly createroombutton: Locator;
  readonly roomtitelheader:Locator;
  readonly choiceroomdotbutton: Locator;
  readonly deleteroombutton: Locator;

  constructor(page: Page) {
    this.page=page;
    this.createroombutton=page.getByRole('link', { name: 'Create Room' });
    this.choiceroomdotbutton=page.getByRole('img').nth(2);
    this.deleteroombutton=page.getByText('Delete');
    this.roomtitelheader=page.locator('#app > div > h2 > div');
    
  }
   
  async deleteroom() {

  await this.choiceroomdotbutton.click();
  await this.deleteroombutton.click();

  }

  async clickonviewroomheadertitel() {

  await this.roomtitelheader.click();
  
  }

  async clickoncreateroombutton() {

  await this.createroombutton.click();
    
  }


}