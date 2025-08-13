import { test, expect } from '@playwright/test';
import {initializeLoginPage, login,userInformation, yourCart ,emptyFirstName, emptyLastName,emptyPostalCode, addItemsToCart, items, sortedAZ, sortedZA } from '../utils/helpers';


test('should log in successfully with valid credentials', async ({ page }) => {
const { userName, password, signIn } = await initializeLoginPage(page);

await userName.fill('standard_user');
await password.fill('secret_sauce');
await signIn.click();

await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Should display error message for incorrect password', async ({ page }) => {
const { userName, password, signIn } = await initializeLoginPage(page);

await userName.fill('standard_user');
await password.fill('standard_user');
await signIn.click();

const errorMessage = page.locator('.error-message-container');
await expect(errorMessage).toBeVisible();
await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service')

});

test('Should log out successfully', async ({ page }) => {
await login(page);
await page.locator('#react-burger-menu-btn').click();
await page.locator('#logout_sidebar_link').click();

await expect(page).toHaveURL('https://www.saucedemo.com/');
});


test('Should successfully purchase a single item', async({page}) =>{
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

test('Should remove an item from the cart successfully', async({page}) =>{
await login(page);

const item = page.locator('#add-to-cart-sauce-labs-backpack');
await item.click();
const cartIcon = page.locator('.shopping_cart_link');
await cartIcon.click();
await page.locator('#remove-sauce-labs-backpack').click();

await expect(page.locator('.cart_item')).toHaveCount(0);
});


test('should display error when first name is empty', async({page}) =>{
await login(page);
await yourCart(page);
await emptyFirstName(page);

await page.locator('#continue').click();
await expect(page.locator('.error-message-container')).toHaveText('Error: First Name is required');
});

test('should display error when last name is empty', async({page}) =>{
await login(page);
await yourCart(page);
await emptyLastName(page);

await page.locator('#continue').click();
await expect(page.locator('.error-message-container')).toHaveText('Error: Last Name is required');
});

test('should display error when postal code is empty', async({page}) =>{
await login(page);
await yourCart(page);
await emptyPostalCode(page);

await page.locator('#continue').click();
await expect(page.locator('.error-message-container')).toHaveText('Error: Postal Code is required');
});

test('should add multiple items to the cart successfully', async({page}) =>{
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


test('should sort products alphabetically from A to Z', async({page}) =>{
await login(page);

const productSort = page.locator('.product_sort_container');
// await productSort.click();

await productSort.selectOption('az');

await expect(productSort).toHaveValue('az');

await sortedAZ(page);

});

test('should sort products alphabetically from Z to A', async({page}) =>{
await login(page);

const productSort = page.locator('.product_sort_container');

await productSort.selectOption('za');

await expect(productSort).toHaveValue('za');

await sortedZA(page);

});

test('should move focus to the next input when pressing Tab"', async({page}) =>{
await login(page);
await yourCart(page);
await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
await page.click('#first-name');
await page.keyboard.type('Katarina');

await page.keyboard.press('Tab');
await expect(page.locator('#last-name')).toBeFocused();

await page.keyboard.press('Tab');
await expect(page.locator('#postal-code')).toBeFocused();
});

test('should display correct number of items in the cart', async({page}) =>{
await login(page);
const selectedItems = [items[0],items[1], items[2]];

await addItemsToCart(page, selectedItems);

  await expect(page.locator('#shopping_cart_container')).toHaveText('3');

});

test('should display error messages for empty required fields', async ({ page }) => {
  await login(page);
  await addItemsToCart(page, [items[0]]);


  await page.locator('.shopping_cart_link').click();
  await page.locator('#checkout').click();


  await page.fill('#first-name', 'Katarina');
  await page.fill('#last-name', 'Stojanovic');
  await page.fill('#postal-code', '1236');


  await expect(page.locator('#first-name')).toHaveValue('Katarina');
  await expect(page.locator('#last-name')).toHaveValue('Stojanovic');
  await expect(page.locator('#postal-code')).toHaveValue('1236');
 


});

test('should show alert when continuing with empty fields', async ({ page }) => {
  await login(page);
 await addItemsToCart(page, [items[0]]);

  // Idi na korpu i checkout
  await page.locator('.shopping_cart_link').click();
  await page.locator('#checkout').click();

  // Ostavi prazna polja
  await page.fill('#first-name', '');
  await page.fill('#last-name', '');
  await page.fill('#postal-code', '');

  // Klik na Continue
  await page.locator('#continue').click();

  // Provera da je error poruka za First Name vidljiva
  await expect(page.locator('.error-message-container')).toHaveText('Error: First Name is required');
});

