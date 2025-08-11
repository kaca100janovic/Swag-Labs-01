import { Page } from '@playwright/test';

import { expect } from '@playwright/test';


export const items = [   //n ovaj nacin mogu da exportujem dalje items(export)
  {name:'Sauce Labs Backpack', selector: '#add-to-cart-sauce-labs-backpack'},
  {name: 'Sauce Labs Bike Light', selector:'#add-to-cart-sauce-labs-bike-light'},
  {name:'Sauce Labs Bolt T-Shirt', selector: '#add-to-cart-sauce-labs-bolt-t-shirt'},
  {name: 'Sauce Labs Fleece Jacket', selector:'#add-to-cart-sauce-labs-fleece-jacket'},
  {name:'Sauce Labs Onesie', selector: '#add-to-cart-sauce-labs-onesie'}
];

export async function initializeLoginPage(page: Page) {

  page.on('request', request => console.log('Request:', request.url()));
  page.on('response', response => console.log('Response:', response.url(), response.status()));

  await page.goto("https://www.saucedemo.com/");

  const userName = page.locator('#user-name');
  const password = page.locator('#password');
  const signIn = page.locator('#login-button');

  return { userName, password, signIn };
}

export async function login(page: Page){
  
      await page.goto('https://www.saucedemo.com/');
      await page.fill('#user-name', 'standard_user');
      await page.fill('#password', 'secret_sauce');
      await page.click('#login-button');
      await page.waitForURL('https://www.saucedemo.com/inventory.html');
      
      page.on('dialog', async(dialog)=>{
      await dialog.accept()
         });
      
}

export async function addItemsToCart(page, itemsToAdd){
  for (const item of itemsToAdd){
    const itemLocator = page.locator('.inventory_item_name', {hasText: item.name});
    await itemLocator.click();

const addToCartBtn = page.locator('#add-to-cart');
    await addToCartBtn.click();
        await page.goBack();
  }
  const cart = page.locator('.shopping_cart_link');
  await cart.click();
    
}


export async function yourCart(page: Page){
const item = page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' });
await item.click();
const addToCartBtn = page.locator('#add-to-cart');
await addToCartBtn.click();
const cart = page.locator('.shopping_cart_badge');
await cart.click();
const checkout = page.locator('#checkout');
await checkout.click();
      
}

export async function userInformation(page: Page) {
  await page.fill('#first-name', 'Test1');
  await page.fill('#last-name', 'Test2');
  await page.fill('#postal-code', '12345');
   }

export async function emptyFirstName(page: Page) {
  await page.fill('#first-name', '');
  await page.fill('#last-name', 'Test2');
  await page.fill('#postal-code', '12345');
   }
export async function emptyLastName(page: Page) {
  await page.fill('#first-name', 'Test1');
  await page.fill('#last-name', '');
  await page.fill('#postal-code', '12345');
   }
export async function emptyPostalCode(page: Page) {
  await page.fill('#first-name', 'Test1');
  await page.fill('#last-name', 'Test2');
  await page.fill('#postal-code', '');
   }


 export async function sortedAZ(page) {

    const title = await page.locator('.inventory_item_name ').allTextContents();  //uzima sve naslove
    const sorted = [...title].sort((a, b) => a.localeCompare(b));

    expect(title).toEqual(sorted); //Uporedjuje dva naslova

    
  }

   export async function sortedZA(page) {

    const title = await page.locator('.inventory_item_name ').allTextContents();  //uzima sve naslove
    const sorted = [...title].sort((a, b) => b.localeCompare(a));

    expect(title).toEqual(sorted); //Uporedjuje dva naslova

    
  }


  // Problem user

  export async function loginProblemUser(page: Page){
  
      await page.goto('https://www.saucedemo.com/');
      await page.fill('#user-name', 'problem_user');
      await page.fill('#password', 'secret_sauce');
      await page.click('#login-button');
      await page.waitForURL('https://www.saucedemo.com/inventory.html');
      
      page.on('dialog', async(dialog)=>{
      await dialog.accept()
         });
      
}

type EmptyField = 'firstName' | 'lastName' | 'postalCode' | null;

export async function checkEmptyCheckoutFields(page: Page): Promise<EmptyField> {
  const firstName = await page.locator('#first-name').inputValue();
  const lastName = await page.locator('#last-name').inputValue();
  const postalCode = await page.locator('#postal-code').inputValue();

  if (!firstName.trim()) return 'firstName';
  if (!lastName.trim()) return 'lastName';
  if (!postalCode.trim()) return 'postalCode';

  return null
}