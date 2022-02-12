const holidayData = require('./holiday.json')

const utils = {
    
    sleep: (ms) => {
        console.log('test');
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
          });
    },

    randomInt: (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    isHoliday: (date) => {
        
        for(let i = 0; i < holidayData.length; i++) {
            let d = new Date(holidayData[i].date);
            console.log(d);
        }
    }
}

module.exports = utils;