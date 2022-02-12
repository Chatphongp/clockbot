const schedule = require('node-schedule');
const Puppet = require('./puppet');
const dotenv = require("dotenv");
const utils = require('./utils');
dotenv.config();

const puppet = new Puppet(process.env.EMAIL, process.env.PASSWORD);
async function run() {  
    const clockInJob = schedule.scheduleJob("53 7 * * 1-5", function () {
        puppet.clockIn();
    });

    const clockOut = schedule.scheduleJob("12 17 * * 1-5", function () {
        puppet.clockOut();
    });
}

run();