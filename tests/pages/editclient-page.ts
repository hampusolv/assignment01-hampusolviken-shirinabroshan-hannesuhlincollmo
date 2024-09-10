import { expect, type Locator, type Page } from '@playwright/test';

export class ClientEditPage {
    //Attributes
    readonly page: Page;
    readonly name: Locator;
    readonly email: Locator;
    readonly telephone: Locator;
    readonly savebutton: Locator;

    //varibel
    constructor(page: Page) {
        this.page = page;
        this.name = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox');
        this.email = page.locator('input[type="email"]');
        this.telephone = page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox');
        this.savebutton = page.getByText('Save');
    }
    //functions

    async newdataeditclient() {

        await this.name.fill("shirin");
        await this.email.fill("sh.eriksson@example.com");
        await this.telephone.fill("072222222");
        await this.savebutton.click();
    }


    async Mikaeleditclient() {

        await this.name.fill("Mikael Eriksson");
        await this.email.fill("mikael.eriksson@example.com");
        await this.telephone.fill("070 000 0002");
        await this.savebutton.click();
    }
}