export const HYPER_KEY = /([0-9a-f]{64})/i

let _origin = 'undefined'
let _domain

export function setOrigin (origin) {
  _origin = origin
  _domain = (new URL(origin)).hostname
}

export function getOrigin () {
  return _origin
}

export function getDomain () {
  return _domain
}

export function hyperUrlToKey (str) {
  let matches = HYPER_KEY.exec(str)
  return Buffer.from(matches[1], 'hex')
}

export function isUrl (str) {
  return /^https?:\/\//.test(str)
}

export function isHyperUrl (str) {
  return /^hyper:\/\//.test(str)
}

export function toOrigin (url) {
  const urlp = new URL(url)
  return `${urlp.protocol}//${urlp.hostname}/`
}

export function constructEntryPath (schemaId, key) {
  return '/' + joinPath(schemaId, key)
}

export function constructEntryUrl (origin, schemaId, key) {
  return joinPath(origin, constructEntryPath(schemaId, key))
}

export function parseEntryUrl (url) {
  const urlp = new URL(url)
  const pathParts = urlp.pathname.split('/')
  return {
    origin: `hyper://${urlp.hostname}/`,
    schemaId: pathParts.slice(1, 3).join('/'),
    key: pathParts[3]
  }
}

export function constructUserId (username) {
  return `${username}@${_domain}`
}

export function parseUserId (userId) {
  const parts = userId.split('@')
  return {
    username: parts[0],
    domain: parts[1]
  }
}

export function constructUserUrl (username) {
  return joinPath(_origin, username)
}

export function extractUserUrl (url) {
  let urlp = new URL(url)
  return urlp.origin + urlp.pathname.split('/').slice(0, 2).join('/')
}

export function parseUserUrl (url) {
  const urlp = new URL(url)
  return {
    username: urlp.pathname.split('/')[1]
  }
}

export function joinPath (...args) {
  var str = args[0]
  for (let v of args.slice(1)) {
    v = v && typeof v === 'string' ? v : ''
    let left = str.endsWith('/')
    let right = v.startsWith('/')
    if (left !== right) str += v
    else if (left) str += v.slice(1)
    else str += '/' + v
  }
  return str
}