const { expect } = require("@playwright/test");

class CartPage {
  constructor(page) {
    this.page = page;
    //Locators
    this.cartIcon = page.locator("(//*[name()='svg'][@class='pl_icon100 or_minis__icon'])[1]");
    this.cartItemName = page.locator("//div[@class='or_basketItem__name pl_headline50']//a");


  }
  //Opening cart for checking desired product addition
  async openCart() {
    await this.cartIcon.click();
    //await this.page.waitForTimeout(3000);
  }

  //Verifiying correct product added to cart
  async verifyCartItem(productName) {
    //Storing product name for verification correct product
    const itemName = await this.cartItemName.textContent();
    console.log(itemName);

    expect(itemName).toContain(productName);
    console.log("verified- Product is correct!");
  }
}
//module.exports = { CartPage };
export default CartPage;
