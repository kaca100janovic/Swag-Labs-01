import { test, expect } from '@playwright/test';
import {loginProblemUser ,userInformation, yourCart ,emptyFirstName, emptyLastName,emptyPostalCode, addItemsToCart, items, sortedAZ, sortedZA, checkEmptyCheckoutFields} from '../utils/helpers';




test('No error message on empty fields but show alert on continue', async ({ page }) => {
  await loginProblemUser(page);
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

test('error input', async ({ page }) => {
  await loginProblemUser(page);
 await addItemsToCart(page, [items[0]]);

  // Idi na korpu i checkout
  await page.locator('.shopping_cart_link').click();
  await page.locator('#checkout').click();

  // Ostavi prazna polja
  await page.fill('#first-name', 'Katarina');
  await page.fill('#last-name', 'Stojanovic');
  await page.fill('#postal-code', '1236');


  await page.locator('#continue').click();


  await expect(page.locator('#first-name')).toHaveText('Katarina');




});