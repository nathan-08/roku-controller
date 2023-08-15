const fs = require('fs');
const dayjs = require('dayjs');

module.exports = function({first_name, last_name}) {
  console.log('activate_roku...');
  fs.appendFile('log.txt', `Activating roku for ${first_name} ${last_name} at ${dayjs().toJSON()}\n`, (err) => {
    if (err) throw err;
  });
  // do thing...
}
