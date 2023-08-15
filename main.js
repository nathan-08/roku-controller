const fs = require('fs');
const dayjs = require('dayjs');
const CronJob = require('cron').CronJob;
const activate_roku = require('./activate_roku');

// This process will run every 15 minutes
const every_15_min = '15 * * * *';
const every_30_sec = '30 * * * * *';
const job = new CronJob(
  every_30_sec,
  look_for_checkin,
  null,
  true,
);

function test_function () {
  console.log(dayjs());
}

function look_for_checkin () {
  const data = JSON.parse(
    fs.readFileSync('../mockdata.json'));
  const { checkin_time
         ,user_id
         ,listing: {property_id}
         ,guest } = data;

  console.log(data);
  const checkin_time_d = dayjs(checkin_time);
  const now = dayjs();

  const diff = checkin_time_d.diff(now, 'hour', true);
  if (diff < 1.0 && diff >= 0.0) {
    // checkin time is within 1 hour, 
    // read checkin_activated.json
    const history = JSON.parse(
      fs.readFileSync('history.json'));
    if (history.user_id == user_id
       && history.property_id == property_id
       && history.checkin_time == checkin_time) {
      // roku already activated
      console.log('roku already activated');
      return;
    }
    activate_roku(guest);
    write_history(user_id, property_id, checkin_time);
  }
}

function write_history(user_id, property_id, checkin_time) {
  const json = JSON.stringify({user_id, property_id, checkin_time});
  fs.writeFileSync('history.json', json);
}

