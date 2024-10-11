class ProductDetailPage {
    constructor(page) {
      this.page = page;
      //Locators
      this.addToCartButton = page.getByRole('button', { name: 'In den Warenkorb' });
      this.continueShoppingButton = page.locator('button[data-qa="continueShopping"]');
    }
  
    //Adding product to cart 
    async addToCart() {
      await this.addToCartButton.click();
      
    }
    //perform click for continue shopping
    async continueShopping() {
      await this.continueShoppingButton.click();
    }
  }
  module.exports = { ProductDetailPage };
  