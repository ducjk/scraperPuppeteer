const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const handleChangeData = require('./main')

// replace the value below with the Telegram token you receive from @BotFather
const token = '6920442250:AAFuCkgrkwjd5ONbeo4MPx6OjH4qahfe328';
const idGroup = -1002073958731

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


const startBrowser = require('./browser')
const scraperController = require('./scraperController')
const scrapers = require('./scraper')

// Khởi tạo ứng dụng Express
const app = express();
const port = 3002


// Sử dụng middleware CORS
app.use(cors());



let browser
let page
let data

    

const getData = async () => {
    try {
        if (!browser)
            browser = await startBrowser()
        if (!page)
            page = await scraperController(browser)
        data = await scrapers.scraperTitle(page)
        return data
    } catch (error) {
        console.log(error)    
    }
}

const prevData = {
    title: '0',
    number: '0'
}

let dataPresent

setInterval(async() => {
    dataPresent = await getData()
    if(dataPresent){
        if (dataPresent.title.length > 0  && dataPresent.number.length > 0){
            if (prevData.title != dataPresent.title){
                prevData.title = dataPresent.title
                prevData.number = dataPresent.number
                const data = handleChangeData(dataPresent)
                if (data.message != undefined || data.isSuccess != undefined){
                  let dataString = 'Xo so 45s \n'
                    dataString += `Ma so: ${dataPresent.title}\n`
                  
                  if (data.isSuccess == true) dataString += `Thang: ${data.totalNumberRepeat} \n`
                  else if(data.isSuccess == false) dataString += `Thua: ${data.totalNumberRepeat} \n`
                  
                  if (data.message){
                    dataString += data.message
                  }
                  
                  bot.sendMessage(idGroup, dataString);
                }

            }
        }
    }
}, 10000)



app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Khởi động máy chủ
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});