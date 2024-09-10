import { expect, type Locator, type Page } from '@playwright/test';

export class ClientCreatePage {
    //Attributes
    readonly page: Page;
    readonly createclientbutton: Locator;
    readonly name: Locator;
    readonly email: Locator;
    readonly telephone: Locator;
    readonly savebutton: Locator;




    //varibel
    constructor(page: Page) {
        this.page = page;
        this.createclientbutton = page.getByRole('link', { name: 'Create Client' });
        this.name = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox');
        this.email = page.locator('input[type="email"]');
        this.telephone = page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox');
        this.savebutton = page.getByText('Save');

        //getByRole('heading', { name: 'Mikael Eriksson (#2)'});
    }

    async createclient() {
        await this.createclientbutton.click();
        await this.name.fill("Mikael Eriksson");
        await this.email.fill("mikael.eriksson@example.com");
        await this.telephone.fill("070 000 0002");
        await this.savebutton.click();
    }

}