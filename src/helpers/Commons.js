
import get from 'lodash/get'

export const stringPattern = (str) => {
  return `{{Æ${str}Æ}}`
}

export const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase()
}

export const getFileNameWithTempBaseOnUrl = (urlAfterUpload, value, type) => {
  // get -temp-${timeframe}
  const tempVal = urlAfterUpload.match(/-temp-\d{14}/g)
  // clean up space, and add the temp flag
  return value.filename.replace(/ /g, '').replace(`.${type}`, `${get(tempVal, [0], '')}.${type}`)
}

export const checkAllowedFileType = (allowedFileTypes, type) => {
  return allowedFileTypes && allowedFileTypes.length > 0 && allowedFileTypes.includes(type.toLowerCase())
}

export const VALID_EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i

export const isEmail = value => (value && VALID_EMAIL_REGEX.test(value))

export default { stringPattern }
