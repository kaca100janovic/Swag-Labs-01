import { test, expect } from '@playwright/test';
import {initializeLoginPage, login,userInformation, yourCart ,emptyFirstName, emptyLastName,emptyPostalCode, addItemsToCart, items, sortedAZ, sortedZA, checkEmptyCheckoutFields} from '../utils/helpers';


test.only('dodavanje vise itema', async({page}) =>{
  await login(page);
  const selectedItems = [items[0],items[1], items[2]];

  await addItemsToCart(page, selectedItems);

  const checkout = page.locator('#checkout');
  await checkout.click();
 
await userInformation(page);



await page.locator('#continue').click();

 const emptyField = await checkEmptyCheckoutFields(page);

  if (emptyField) {
    // Na primer, ako je prazno First Name
    await expect(page.locator('.error-message-container')).toHaveText(
      emptyField === 'firstName' ? 'Error: First Name is required' :
      emptyField === 'lastName' ? 'Error: Last Name is required' :
      'Error: Postal Code is required'
    );
  } else {
    throw new Error('Sva polja su popunjena, nije očekivano');
  }
});