class SearchProduct{
    constructor(page){
        this.page = page;
        //Locators
        this.searchTxtBox = page.locator("//input[@data-testid='squirrel-searchfield']");
        this.searchBtn = page.locator("//div[@data-testid='search-field-submit']");
        this.sortPriceDropdown = page.locator('#heureka_desktopSorting--select--cloned')
        this.priceFilter = page.locator("//dt[@class='pl_accordion__header'][normalize-space()='Preis']");
        this.minPriceInput = page.locator('#heureka_slider_1__minInput');
        this.maxPriceInput = page.locator('#heureka_slider_1__maxInput');
        this.priceFilterButton = page.locator('#find_filter_preis').getByRole('button', { name: 'Auswahl ansehen' });
        this.productList = page.locator("//section[@id='reptile-tilelist']//article[1]");
        
    }
    //Search product 'Trampolin'
    async searchProduct(product){
        await this.searchTxtBox.click();
        await this.searchTxtBox.fill(product);
        await this.searchBtn.click();
    }
    //Sort by Highest Price
    async sortByHighestPrice(){
        await this.sortPriceDropdown.click();
        await this.sortPriceDropdown.selectOption('preis-absteigend')
        await this.page.waitForTimeout(5000);
    }
    //Verifying products are in descending order
    async sortByPriceDescending() {
        const isDescending = await this.page.evaluate(() => {
            //Select all available product price elements
            const priceElements = "#reptile-tilelist article.product ul li div div.find_tile__content div.find_tile__priceContainer span.find_tile__retailPrice.pl_headline50.find_tile__priceValue";

            //Check Comparison with at least two products
            if (priceElements.length < 2) {
                return false;
            }
    
            //Extraction and Convertion of price values
            const prices = [];
            for (let i = 0; i < priceElements.length && i < 5; i++) {
                let priceText = priceElements[i]?.innerText || '';
                let priceNumber = parseFloat(priceText.replace('€', '').replace(',', '.').trim());
                if (!isNaN(priceNumber)) {
                    prices.push(priceNumber);
                }
                
            }
    
            //Descending order check
            for (let i = 0; i < prices.length - 1; i++) {
                if (prices[i] < prices[i + 1]) {
                    return false;
                }
            }
    
            return true;
        });
    
        //Log the result
        console.log(isDescending ? "Prices are in descending order." : "Prices are not in descending order.");
    }
    
    //Filter through minimum and maximum price
    async filterByPrice(minp, maxp){
        await this.priceFilter.click();
        await this.minPriceInput.fill(minp);
        await this.maxPriceInput.fill(maxp);
        await this.priceFilterButton.click();
        await this.page.waitForTimeout(5000);
    }
    //Selecting product for deatils
    async clickProduct(){
        await this.productList.click();
        await this.page.waitForTimeout(6000);
    }
}
export default SearchProduct;