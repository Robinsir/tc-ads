/**
// Copyright (c) 2014 Inando (edit by roccomuso and PLCHome)

// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
// ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

 */

export default function getValue (dataName, result, offset = 0, useLocalTimezone = true) {
  var value
  var timeoffset
  switch (dataName) {
    case 'BOOL':
      value = result.readUInt8(offset) !== 0
      break
    case 'BYTE':
    case 'USINT':
      value = result.readUInt8(offset)
      break
    case 'SINT':
      value = result.readInt8(offset)
      break
    case 'UINT':
    case 'WORD':
      value = result.readUInt16LE(offset)
      break
    case 'INT16':
    case 'INT':
      value = result.readInt16LE(offset)
      break
    case 'DWORD':
    case 'UDINT':
      value = result.readUInt32LE(offset)
      break
    case 'DINT':
      value = result.readInt32LE(offset)
      break
    case 'REAL':
      value = result.readFloatLE(offset)
      break
    case 'LREAL':
      value = result.readDoubleLE(offset)
      break
    case 'STRING':
      value = result.toString('binary', offset, findStringEnd(result, offset))
      break
    case 'TIME':
    case 'TIME_OF_DAY':
    case 'TOD':
      var milliseconds = result.readUInt32LE(offset)
      value = new Date(milliseconds)
      if (useLocalTimezone) {
        timeoffset = value.getTimezoneOffset()
        value = new Date(value.setMinutes(value.getMinutes() + timeoffset))
      }
      break
    case 'DATE':
    case 'DATE_AND_TIME':
    case 'DT':
      var seconds = result.readUInt32LE(offset)
      value = new Date(seconds * 1000)
      if (useLocalTimezone) {
        timeoffset = value.getTimezoneOffset()
        value = new Date(value.setMinutes(value.getMinutes() + timeoffset))
      }
      break
  }
  return value
}

var findStringEnd = function (data, offset) {
  if (!offset) { offset = 0 }
  var endpos = offset
  for (var i = offset; i < data.length; i++) {
    if (data[i] === 0x00) {
      endpos = i
      break
    }
  }
  return endpos
}
