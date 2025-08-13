import { test, expect } from '@playwright/test';
import {loginProblemUser ,userInformation, yourCart ,emptyFirstName, emptyLastName,emptyPostalCode, addItemsToCart, items, sortedAZ, sortedZA, checkEmptyCheckoutFields} from '../utils/helpers';

// test('error input', async ({ page }) => {
//   await loginProblemUser(page);
//   await addItemsToCart(page, [items[0]]);


//   await page.locator('.shopping_cart_link').click();
//   await page.locator('#checkout').click();


//   await page.fill('#first-name', 'Katarina');
//   await page.fill('#last-name', 'Stojanovic');
//   await page.fill('#postal-code', '1236');


//   await expect(page.locator('#first-name')).toHaveValue('Katarina');
//   await expect(page.locator('#last-name')).toHaveValue('Stojanovic');
//   await expect(page.locator('#postal-code')).toHaveValue('1236');
 


// });

