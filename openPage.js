

const openPage = async (browser, url) => {
    let page
    try {
        page = await browser.newPage()

        await page.setDefaultTimeout(90000);

        console.log('Dang mo trinh duyet');
        await page.goto(url)
        console.log('Dang truy cap den URL: ', url);
        await page.waitForSelector('._openNumber')

    } catch (error) {
        console.log('error: ', error);
    }
    
    return page
}

module.exports = openPage