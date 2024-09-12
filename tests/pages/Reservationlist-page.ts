import { expect, type Locator, type Page } from '@playwright/test';

export class ReservationvlistPage {
    //Attributes
    readonly page: Page;
    readonly backbutton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.backbutton = page.getByRole('link', { name: 'Back' });
    }
    async backbuttonwork() {
        await this.backbutton.click();

    }
}