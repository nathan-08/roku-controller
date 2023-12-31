/// This script sets the date on the mockdata.json file
const fs = require('fs');
const dayjs = require('dayjs');

data = fs.readFileSync('../mockdata.json')
json = JSON.parse(data);

const now = dayjs();
const future = now.add(30, 'm');

json.checkin_time = future.toISOString();
fs.writeFileSync('../mockdata.json', JSON.stringify(json));

