const schedule = require('./schedule');
const utils = {
    
    sleep: (ms) => {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
          });
    },

    randomInt: (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getShedule: () => {
        let now = new Date();
        return schedule[now.getMonth()][now.getDate()];
    }
}

module.exports = utils;