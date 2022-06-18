const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util');

test("should output name and age", () => {
    const text = generateText('David', 25);
    expect(text).toBe(`David (25 years old)`);
});

test('should output data-less text', () => {
    const text1 = generateText('', null);
    expect(text1).toBe(' (null years old)');
})


test('should generate a valid text output', () => {
    const text2 = checkAndGenerate('David', 25);

    expect(text2).toBe('David (25 years old)');
})


test('should generate a non-valid text output 1', () => {
    const text3 = checkAndGenerate(undefined, 25);

    expect(text3).toBeFalsy();
})

test('should generate a non-valid text output 2', () => {
    const text4 = checkAndGenerate('David', undefined);

    expect(text4).toBeFalsy();
})

test('should create an element with text and correct class', async () => {
    const browser = await puppeteer.launch({
        headless: false,
        // slowMo: 80,
        // args: ['--window-size=1920,1080']
    });

    const page = await browser.newPage();
    await page.goto('file:///C:/Users/david/Projects/Personnel%20projects/Testing/Node%20js%20project%20testing/js-testing-introduction/index.html');

    await page.click('input#name');
    await page.type('input#name', 'David');
    await page.click('input#age');
    await page.type('input#age', '25');

    await page.click('#btnAddUser');

    const finalText = await page.$eval('.user-item', el => el.textContent);

    expect(finalText).toBe('David (25 years old)');
}, 10000)
