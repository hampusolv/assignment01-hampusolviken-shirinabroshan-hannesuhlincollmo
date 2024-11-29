import { expect, type Locator, type Page } from '@playwright/test';

export class ClientListPage {
    //Attributes
    readonly page: Page;
    readonly dotsbutton: Locator;
    readonly deletebutton: Locator;
    readonly editbutton: Locator;

    //varibel
    constructor(page: Page) {
        this.page = page;
        this.dotsbutton = page.getByRole('img').nth(1);
        this.deletebutton = page.getByText('Delete');
        this.editbutton = page.getByText('Edit')
    }
//functions
    async deleteclient() {
        await this.dotsbutton.click();
        await this.deletebutton.click();
    }
    async editclient() {
        await this.dotsbutton.click();
        await this.editbutton.click();
    }
}