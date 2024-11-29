import { faker } from '@faker-js/faker';
import { expect, type Locator, type Page } from '@playwright/test';

export class FakerPage {
    //Attributes
    readonly page: Page;
    readonly createclientbutton: Locator;
    readonly fullname: Locator;
    readonly email: Locator;
    readonly nummer: Locator;
    readonly savebutton: Locator;
    readonly dotsbutton: Locator;
    readonly deletebutton: Locator;

    //varibel
    constructor(page: Page) {
        this.page = page;
        this.createclientbutton = page.getByRole('link', { name: 'Create Client' });
        this.fullname = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox');
        this.email = page.locator('input[type="email"]');
        this.nummer = page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox');
        this.savebutton = page.getByText('Save');
        
        // för att tabort sista client måste skrvia last-child(1) 
        this.dotsbutton = page.locator("#app > div > div.clients > div:nth-last-child(1) > div.action");
        this.deletebutton = page.getByText('Delete');
    }

    //functions

    async fakerdataclient() {

        const fullname = faker.person.fullName();
        const email = faker.internet.email();
        const nummer = faker.phone.number();

        await this.createclientbutton.click();
        await this.fullname.fill(fullname);
        await this.email.fill(email);
        await this.nummer.fill(nummer);
        await this.savebutton.click();
    }
    async deletefakerclient() {
        await this.dotsbutton.click();
        await this.deletebutton.click();

    }
}

