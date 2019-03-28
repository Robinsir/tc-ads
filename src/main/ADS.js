import { ipcMain } from 'electron'
import * as ipc from '../ipc'
import * as ads from 'node-ads'

let options = {}
let client
function adsTest () {
  console.log('conneting...')
  ipcMain.on(ipc.TEST, (event, arg) => {
    options = arg

    client = ads.connect(options, function () {
      this.readDeviceInfo(function (err, result) {
        if (err) event.sender.send(ipc.TEST, err)
        event.sender.send(ipc.TEST, result)
        client.end()
      })
    })

    client.on('error', function (error) {
      event.sender.send(ipc.TEST,
        error)
    })
  })
}

function getSymbolList () {
  ipcMain.on(ipc.GET_SYMBOL_LIST, (event, arg) => {
    console.log(arg)
    options = arg
    if (client) {
      client.end()
    }
    client = ads.connect(options, function () {
      this.getSymbols(function (err, symbols) {
        if (err) console.log(err)
        console.log(JSON.stringify(symbols, null, 2))
        event.sender.send(ipc.GET_SYMBOL_LIST,
          symbols)
        this.end()
      })

      client.on('error', function (error) {
        event.sender.send(ipc.TEST,
          error)
      })
    })
  })
}
export default function () {
  adsTest()
  getSymbolList()
}
