const fs = require('fs');
const dayjs = require('dayjs');
const Roku = require('rokujs');

/// This function should use the Roku API to turn on the TV
/// Display a welcome message with the guest's name
/// and the WiFi password.
module.exports.activate_roku = ({first_name, last_name}) => {
}


const addr1 = '192.168.1.53'
const addr2 = '192.168.1.144'
module.exports = {
  discover: () => {
    /* example response
    [ { server: 'Roku UPnP/1.0 MiniUPnPd/1.4',
      address: '192.168.2.45',
      location: 'http://192.168.2.45:8060/',
      usn: 'uuid:roku:ecp:2N005M893730' } ]
    */
    Roku.discover((devices) => {
      console.log(devices);
    });
  },
  activate_roku: ({first_name, last_name}) => {
    console.log('activate_roku...');
    fs.appendFile('log.txt', `Activating roku for ${first_name} ${last_name} at ${dayjs().toJSON()}\n`, (err) => {
      if (err) throw err;
    });
    // do thing...

  },
  test: () => {
	  const roku = new Roku(addr2);
	  console.log('device info:');
	  roku.deviceInfo( console.log );
  },
  power_on: () => {
    const roku = new Roku(addr2);
    console.log('getting device info');
    roku.deviceInfo( (info) => {
      console.log('power_on for device:');
      console.log(info);
    });
    roku.press('powerOn'); // power
  }
}
