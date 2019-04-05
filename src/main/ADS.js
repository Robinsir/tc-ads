import { ipcMain } from 'electron'
import * as ipc from '../ipc'
import * as ads from 'node-ads'
import typeCover from './TypeCover'
import * as conf from '../Renderer/conf'
let options = {}
let client = null
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

function getRealValue () {
  ipcMain.on(ipc.GET_LISTEN_VALUE, (event, arg) => {
    const list = arg.list
    let handleList = []
    options = arg.ops

    // change data format
    for (let item = 0; item < list.length; item++) {
      let handle = {
        symname: '',
        bytelength: 0
      }
      handle.symname = list[item].name
      handle.bytelength = list[item].size || conf.TYPE_LENGTH[list[item].type]
      handleList.push(handle)
    }
    console.log('TCL: getRealValue -> handleList', handleList)
    // listen
    client.end()
    client = ads.connect(options, function () {
      // this.notify(myHandle)
      for (let item of handleList) {
        client.notify(item)
      }
    })

    client.on('notification', function (handle) {
    //  console.log('Get value', handle.symname, handle.value, handle)
      let dataType = null
      list.forEach(e => {
        if (e.name === handle.symname) {
          dataType = e.type
        }
      })
      const result = typeCover(dataType, handle.value)
      console.log('TCL: getRealValue -> typeCover(handle.symname, dataType)', result)
      event.sender.send(ipc.GET_LISTEN_VALUE,
        {
          name: handle.symname,
          value: result
        })
    })

    process.on('exit', function () {
      console.log('exit')
    })

    process.on('SIGINT', function () {
      client.end(function () {
        process.exit()
      })
    })
  })

  ipcMain.on(ipc.CLOSE_LISTEN_VALUE, (event, arg) => {
    client.end()
  })
}

function writeValue () {
  console.log('get msg...')
  ipcMain.on(ipc.WRITE_A_VALUE, (event, arg) => {
    let handle = {
      symname: '',
      bytelength: '',
      propname: 'value'
    }
    options = arg.ops
    handle.symname = arg.handle.name
    handle.bytelength = arg.handle.size || conf.TYPE_LENGTH[arg.handle.type]
    client = ads.connect(options, function () {
      this.write(handle, function (err) {
        if (err) console.log(err)
      })
    })
  })
}

// function multiWriteValue () {

// }
export default function () {
  adsTest()
  getSymbolList()
  getRealValue()
  writeValue()
}
