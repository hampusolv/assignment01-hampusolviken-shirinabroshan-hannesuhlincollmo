
//login-page.ts
import {  type Locator, type Page } from '@playwright/test';

import { faker } from "@faker-js/faker";

export class LoginPage {
  //Attributes
  readonly page: Page;
  readonly usernameTextfield: Locator;
  readonly passwordTextfield: Locator;
  readonly loginButton: Locator;

  //Const
  constructor(page: Page) {
    this.page = page;
    this.usernameTextfield = page.locator('input[type="text"]');
    this.passwordTextfield = page.locator('input[type="password"]');

    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  // Methods / functions
  
  async goto() {
    await this.page.goto(`${process.env.BASE_URL}`);
  }

  async performLogin(username: string, password: string) {
    //fill out the form - 2 textfields and click the submit button
    await this.usernameTextfield.fill(username);
    await this.passwordTextfield.fill(password);
    await this.loginButton.click();
  }
// fel inlogning
  async WrongperformLogin(badusername: string, badpassword: string) {
    //fill out the form - 2 textfields and click the submit button

    badusername=faker.lorem.word(25);

    badpassword=faker.internet.password({ length: 20 });

    await this.usernameTextfield.fill(badusername);
    await this.passwordTextfield.fill(badpassword);
    await this.loginButton.click();
  }

}










// import { expect, type Locator, type Page } from '@playwright/test';

// export class LoginPage {
//   //Attributes
//   readonly page: Page;
//   readonly usernameTextfield: Locator; 
//   readonly passwordTextfield: Locator;
//   readonly loginButton: Locator;  
  
//   // The readonly keyword means this property cannot be reassigned once it is initialized.
//   // It ensures that the page will always point to the same instance of a browser page.

//   //Constructor for page man skapar konstruktör med objekt (locators(element) på hemsidan)
//   constructor(page: Page) {
//     this.page = page;
//     this.usernameTextfield = page.locator('input[type="text"]');
//     this.passwordTextfield = page.locator('input[type="password"]');
//     this.loginButton = page.getByRole('button', { name: 'Login' });    
//   }

//   // Methods / functions ( vad man ska göra för aktioner på denna del av sidan tänk på vilka aktioner man ska göra på varje sida )
//   async goto() {
//     await this.page.goto(`${process.env.BASE_URL}`);
//   }

//   async performLogin(username: string, password:string) {
//     //fill out the form - 2 textfields and click the submit button
//     await this.usernameTextfield.fill(username);
//     await this.passwordTextfield.fill(password);
//     await this.loginButton.click();    
//   }
// 