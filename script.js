const fs = require('fs');
const dayjs = require('dayjs');

data = fs.readFileSync('../mockdata.json');
json = JSON.parse(data);
const date = dayjs().minute(30).toISOString();
json.checkin_time = date;
fs.writeFileSync('../mockdata.json', JSON.stringify(json));
