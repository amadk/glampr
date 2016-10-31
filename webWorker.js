const twilio = require('./twilio.js');
const _ = require('underscore');
const CronJob = require('cron').CronJob;
const twilioSMS = twilio.smsProtocol;
const Promise = require('bluebird');
var phone = require('phone');
const job = new CronJob({
  cronTime: '* * * * * *', //change this to every 6 hours
  onTick: function() {
    let d = new Date();
    // underscore compare objects return diff for each user
    // send message to user with unmet requirements
    // use moment to retrieve time untill trip
    // use phone node module to parse all incoming number to e164
    /*
     * Runs every weekday (Monday through Friday)
     * at 11:30:00 AM. It does not run on Saturday
     * or Sunday.
     */
     job.stop(); // remove this for production
  },
  onComplete: function() {

  },
  start: false,
  timeZone: 'America/Los_Angeles'
});

exports.phoneInvite = function(phoneNum = '6077650585', message = 'hello from Ben @ twilo!') {
  let e164num = phone(phoneNum, '');
  e164num = e164num[0]
  twilioSMS(e164num, message)
}
