const puppeteer = require('puppeteer')

const startBrowser = async () => {
    let browser

    try {
        browser = puppeteer.launch({
            headless: true,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        })

    } catch (error) {
        console.log('error: ', error);
    }
    
    return browser
}

module.exports = startBrowser