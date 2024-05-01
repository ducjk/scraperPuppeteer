
const scraperTitle = async(page) => {
    try {

        let data = {
            title: '0',
            number: '0'
        }

        const dataNumber = await page.$$eval('._openNumber', elements => {
                dataNumber = elements.map(els => {
                    return {
                        title: els.querySelector('h2').innerText,
                        number: els.querySelector('.number').innerText
                    }
                })
        
                return dataNumber
            })

            data.title = dataNumber[0].title.slice(3, 15)
            data.number = dataNumber[0].number.replaceAll('\n', '')

            
        return data

    } catch (error) {
        console.log('error: ', error);
    }
}

module.exports = {scraperTitle}