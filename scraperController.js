// const scrapers = require('./scraper')
const openPage = require('./openPage')

const scraperController = async (browserInstance) => {
    const url = 'https://ee6602.com/home/#/lottery?tabName=Lottery&id=47'
    let page
    try {
        let browser = await browserInstance

        page = await openPage(browser, url)


        // let number = scrapers.scraperTitle(page)

    } catch (error) {
        console.log('error: ', error);
    }
    return page
}

module.exports = scraperController