import { ipcMain } from 'electron'
import * as ipc from '../ipc'
import * as ads from 'node-ads'

let options = {
  // The IP or hostname of the target machine
  host: '192.168.9.40',
  // The NetId of the target machine
  amsNetIdTarget: '192.168.9.40.1.1',
  // The NetId of the source machine.
  // You can choose anything in the form of x.x.x.x.x.x,
  // but on the target machine this must be added as a route.
  amsNetIdSource: '192.168.9.55.1.2',

  // OPTIONAL: (These are set by default)
  // The tcp destination port
  // port: 48898
  // The ams source port
  // amsPortSource: 32905
  // The ams target port for TwinCat 2 Runtime 1
  amsPortTarget: 801,
  // The ams target port for TwinCat 3 Runtime 1
  // amsPortTarget: 851
  // The timeout for PLC requests
  timeout: 5000
}
function adsTest () {
  console.log('conneting...')
  ipcMain.on(ipc.TEST, (event, arg) => {
    let client = ads.connect(options, function () {
      this.readDeviceInfo(function (err, result) {
        if (err) console.log(err)
        console.log('success!')
        console.log(result)
        event.sender.send(ipc.TEST, result)
        client.end()
      })
    })
    client.on('error', function (error) {
      event.sender.send('ipc.TEST', error)
      console.log(error)
    })
  })
}
export default function () {
  adsTest()
}
