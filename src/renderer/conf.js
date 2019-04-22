export const CONNECT_OPTIONS = 'CONNECT_OPTIONS'
export const DEFUALT_OPTIONS = {
  host: '801',
  amsNetIdTarget: '192.168.9.10.1.1',
  amsPortTarget: '801',
  amsNetIdSource: '',
  amsPortSource: '',
  port: '',
  timeout: '300'
}
export const TYPE_LENGTH = {
  'BOOL': 1,
  'BYTE': 1,
  'WORD': 2,
  'DWORD': 4,
  'SINT': 1,
  'USINT': 1,
  'INT': 2,
  'UINT': 2,
  'DINT': 4,
  'UDINT': 4,
  'LINT': 8,
  'ULINT': 8,
  'REAL': 4,
  'LREAL': 8,
  'TIME': 4,
  'TIME_OF_DAY': 4,
  'TOD': 4, // TIME_OF_DAY alias
  'DATE': 4,
  'DATE_AND_TIME': 4,
  'DT': 4, // DATE_AND_TIME alias
  'STRING': 81
}
