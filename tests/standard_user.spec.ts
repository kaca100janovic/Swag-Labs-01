import { test, expect } from '@playwright/test';
import {initializeLoginPage, login,userInformation, yourCart ,emptyFirstName, emptyLastName,emptyPostalCode, addItemsToCart, items, sortedAZ, sortedZA } from '../utils/helpers';


test('Successful login', async ({ page }) => {
  const { userName, password, signIn } = await initializeLoginPage(page);

  await userName.fill('standard_user');
  await password.fill('secret_sauce');
  await signIn.click();

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Buy one item', async({page}) =>{
  await login(page);

 const item = page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' });
  await item.click();
  const addToCartBtn = page.locator('#add-to-cart');
  await addToCartBtn.click();
const cart = page.locator('.shopping_cart_badge');
await cart.click();
const checkout = page.locator('#checkout');
await checkout.click();
await userInformation(page);
await page.locator('#continue').click();
await page.locator('#finish').click();
const thanYouMess = page.locator('.complete-header');
await expect(thanYouMess).toHaveText('Thank you for your order!');

await expect(page.locator('.app_logo')).toHaveText('Swag Labs');

});

test('Remove item from cart', async({page}) =>{
  await login(page);

const item = page.locator('#add-to-cart-sauce-labs-backpack');
await item.click();
const cartIcon = page.locator('.shopping_cart_link');
await cartIcon.click();
await page.locator('#remove-sauce-labs-backpack').click();

await expect(page.locator('.cart_item')).toHaveCount(0);
});


test('empty first name', async({page}) =>{
  await login(page);
await yourCart(page);
await emptyFirstName(page);

await page.locator('#continue').click();
await expect(page.locator('.error-message-container')).toHaveText('Error: First Name is required');
});

test('empty last name', async({page}) =>{
  await login(page);
await yourCart(page);
await emptyLastName(page);

await page.locator('#continue').click();
await expect(page.locator('.error-message-container')).toHaveText('Error: Last Name is required');
});

test('empty postal code', async({page}) =>{
  await login(page);
await yourCart(page);
await emptyPostalCode(page);

await page.locator('#continue').click();
await expect(page.locator('.error-message-container')).toHaveText('Error: Postal Code is required');
});

test('dodavanje vise itema', async({page}) =>{
  await login(page);
  const selectedItems = [items[0],items[1], items[2]];

  await addItemsToCart(page, selectedItems);

  const checkout = page.locator('#checkout');
  await checkout.click();
 
await userInformation(page);
await page.locator('#continue').click();

const totalItem = page.locator('.summary_subtotal_label');
await expect(totalItem).toHaveText('Item total: $55.97');

await page.locator('#finish').click();
const thanYouMess = page.locator('.complete-header');
await expect(thanYouMess).toHaveText('Thank you for your order!');

await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
});


test('Product sort AZ', async({page}) =>{
  await login(page);

  const productSort = page.locator('.product_sort_container');
  // await productSort.click();

  await productSort.selectOption('az');

  await expect(productSort).toHaveValue('az');

  await sortedAZ(page);

});

test('Product sort ZA', async({page}) =>{
  await login(page);

  const productSort = page.locator('.product_sort_container');

  await productSort.selectOption('za');

  await expect(productSort).toHaveValue('za');

  await sortedZA(page);

});