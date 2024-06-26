const ok = require('assert').ok
const puppeteer = require('puppeteer');
var browser, page

const opts = {
  headless: false,
  slowMo: 100,
  timeout: 10000
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('blogAjax', function() {
  before (async function () {
    browser = await puppeteer.launch(opts);
    page = await browser.newPage();
  });
  after(function() {
    browser.close();
  });

  describe('puppeteer', function() {
    it('GET / should see <p>You have <strong>0</strong> posts!</p>', async function() {
      await page.goto('http://127.0.0.1:8000', {waitUntil: 'domcontentloaded'})
      let html = await page.content()
      ok(html.indexOf('<p>You have <strong>0</strong> posts!</p>') >= 0)
    })
    it('click createPost link', async function() {
      await page.click('#createPost')
      let html = await page.content()
      ok(html.indexOf('<h1>New Post</h1>') >= 0)
    })
    it('fill {title:"aaa", body:"aaa"}', async function() {
      await page.focus('#title')
      await page.keyboard.type('aaa')
      await page.focus('#body')
      await page.keyboard.type('aaa')
      await page.click('#savePost')
    })
    it('should see <p>You have <strong>1</strong> posts!</p>', async function() {
      await sleep(500)
      let html = await page.content()
      console.log('html=', html)
      ok(html.indexOf('<p>You have <strong>1</strong> posts!</p>') >= 0)
    })
  })
})
