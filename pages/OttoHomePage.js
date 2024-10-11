class OttoHomePage {
    constructor(page){
        this.page = page;
        
        //Locators
        this.acceptCookie = page.getByRole('button', { name: 'OK' });
        
    }

    //Navigating to website
    async navigatePage(){
        await this.page.goto("https://www.otto.de/");
        
    }
    //Accepting Cookie option
    async acceptCookies(){
        await this.acceptCookie.click();
    }
}
export default OttoHomePage;