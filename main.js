const fs = require('fs');
const dayjs = require('dayjs');
const CronJob = require('cron').CronJob;
const activate_roku = require('./activate_roku');

const every_15_min = '*/15 * * * *';
const every_10_sec = '*/10 * * * * *';
const job = new CronJob(
  every_10_sec,
  look_for_checkin,
  null,
  true,
);

function look_for_checkin () {
  console.log('running look_for_checkin');
  const data = JSON.parse(
    fs.readFileSync('../mockdata.json'));
  const { checkin_time
         ,user_id
         ,listing: {property_id}
         ,guest } = data;

  const checkin_time_d = dayjs(checkin_time);
  const now = dayjs();

  const diff = checkin_time_d.diff(now, 'hour', true);
  console.log(`hours until checkin: ${diff}`);
  if (diff < 1.0 && diff >= 0.0) {
    // checkin time is within 1 hour, 
    // read checkin_activated.json
    if (!fs.existsSync('history.json')) {
      fs.writeFileSync('history.json', JSON.stringify({}));
    }
    const history = JSON.parse(fs.readFileSync('history.json'));
    if (history.user_id == user_id
       && history.property_id == property_id
       && history.checkin_time == checkin_time) {
      // roku already activated
      fs.appendFile('log.txt', `cron ran at ${dayjs().toJSON()}; roku already activated\n`, (err) => {
        if (err) throw err;
      });
      return;
    }
    activate_roku(guest);
    write_history(user_id, property_id, checkin_time);
  }
  else {
    console.log('outside of time window');
  }
}

function write_history(user_id, property_id, checkin_time) {
  const json = JSON.stringify({user_id, property_id, checkin_time});
  fs.writeFileSync('history.json', json);
}

