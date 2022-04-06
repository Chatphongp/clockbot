const schedule = require('node-schedule');
const Puppet = require('./puppet');
const dotenv = require("dotenv");
const utils = require('./utils');
dotenv.config();

const puppet = new Puppet(process.env.EMAIL, process.env.PASSWORD);

async function run() {  

    const clockInJob = schedule.scheduleJob("37 0 * * 1-5", function () {
        puppet.clockIn(officeDate);
    });

    const clockOut = schedule.scheduleJob("30 10 * * 1-5", function () {
        puppet.clockOut();
    });
}

run();