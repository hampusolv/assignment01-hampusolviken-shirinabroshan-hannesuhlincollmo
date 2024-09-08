import {  type Locator, type Page } from '@playwright/test';

import { faker } from "@faker-js/faker";

export class ClientPage {

    readonly page: Page;
    readonly createclientbutton:Locator;
    readonly clientlink:Locator;
    readonly deleteclientbutton:Locator;
    readonly clientchoicetodelete:Locator;
    readonly savebutton:Locator;
    readonly clientname:Locator;
    readonly clientemail:Locator;
    readonly clientphone:Locator;
    readonly clientchoiceofedit:Locator;
    readonly editclientbutton:Locator;
    readonly editclientnamefield:Locator;
    readonly editclientemailfield:Locator;
    readonly editclientphonefiled:Locator;
    
    constructor(page: Page) {
        
       this.page=page;
       this.createclientbutton=page.getByRole('link', { name: 'Create Client' });
       this.savebutton=page.getByText('Save');
       this.deleteclientbutton=page.getByText('Delete');
       this.clientchoicetodelete=page.getByRole('img').nth(1);
       this.clientemail=page.locator('#app > div > div:nth-child(2) > div:nth-child(2) > input[type=email]');
       this.clientname = page.locator('#app > div > div:nth-child(2) > div:nth-child(1) > input[type=text]');
       this.clientphone= page.locator('#app > div > div:nth-child(2) > div:nth-child(3) > input[type=text]');
       this.clientchoiceofedit=page.getByRole('img').nth(1);
       this.editclientbutton=page.getByText('Edit');
       this.editclientnamefield=page.locator('#app > div > div:nth-child(2) > div:nth-child(3) > input[type=text]');
       this.editclientemailfield=page.locator('#app > div > div:nth-child(2) > div:nth-child(4) > input[type=email]');
       this.editclientphonefiled=page.locator('#app > div > div:nth-child(2) > div:nth-child(5) > input[type=text]');
       
       
    }
    
    async uppdateclientsname() {

        const fullName = faker.person.fullName(); 

        const phonenumber = faker.phone.number();

        const emailAdress= faker.internet.email();


        await this.clientchoiceofedit.click();
        await this.editclientbutton.click();
        await this.editclientnamefield.fill(fullName);
        await this.editclientphonefiled.fill(phonenumber);
        await this.editclientemailfield.fill(emailAdress);

        await this.savebutton.click();
        
    
    }
    async uppdateclientsnametooriginalname() {

        await this.clientchoiceofedit.click();
        await this.editclientbutton.click();
        await this.editclientnamefield.fill("Mikael Eriksson")
        await this.editclientphonefiled.fill("070 000 0002")
        await this.editclientemailfield.fill("mikael.eriksson@example.com")
        
        await this.savebutton.click();

    
    }


    async deleteclient() {
        await this.clientchoicetodelete.click();
        await this.deleteclientbutton.click();
        
  
  
    }

    async createclient() {


        await this.createclientbutton.click();
        await this.clientname.fill("Mikael Eriksson");
        await this.clientemail.fill(" mikael.eriksson@example.com");
        await this.clientphone.fill("070 000 0002");
        await this.savebutton.click();
    }


  }
  