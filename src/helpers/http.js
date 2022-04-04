import axios from 'axios'

export const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJDUlQiLCJNQVAiLCJQVFkiLCJTR1QiLCJTVFMiLCJUVEwiXSwicm9sZXMiOltdLCJpc3MiOiJodHRwczovL2FjY2Vzcy11YXQtYXBpLmNvcmVsb2dpYy5hc2lhIiwiZW52X2FjY2Vzc19yZXN0cmljdCI6ZmFsc2UsImV4cCI6MTY0OTA4NTE2NiwiZ2VvX2NvZGVzIjpbIkFDVCAtIEZ1bGwgU3RhdGUiLCJOU1cgLSBNZXRybyIsIk5TVyAtIFJlZ2lvbmFsIiwiTlQgLSBGdWxsIFN0YXRlIiwiUUxEIC0gTWV0cm8iLCJRTEQgLSBSZWdpb25hbCIsIlNBIC0gTWV0cm8iLCJTQSAtIFJlZ2lvbmFsIiwiVEFTIC0gRnVsbCBTdGF0ZSIsIlZJQyAtIChBQSkgRnVsbCBTdGF0ZSIsIlZJQyAtIEZ1bGwgU3RhdGUiLCJWSUMgLSBNZXRybyIsIlZJQyAtIFJlZ2lvbmFsIiwiV0EgLSBNZXRybyIsIldBIC0gUmVnaW9uYWwiLCJOb3J0aCBJc2xhbmQiLCJTb3V0aCBJc2xhbmQiXSwiY2xpZW50X2lkIjoienBMeW1QeElGT1Q5ek5VU0NCZ05UN28zano5MFZxdTkiLCJzb3VyY2VfZXhjbHVzaW9uIjpbXX0.GYz2ff4r7HtXKCDx-2HNIeHQoI_OFcQJyA4kHpywelHUeW-SqaPevH7EStPMfmek_LuWOxZ192JYMFyWPiFdn1m5OPYKHYXYdGfMbGWjslAXDDeEcgOfvMpvt4W269nZNNp4-wBbztFn4Q4-FY6dVrxj7-pKkvBSwGwrTJa8gBo'
export const authToken = 'bearer ' + token

function getInstance(url, params) {
  const {
    timeout,
    accessToken
  } = params || {}

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `bearer ${token || accessToken}`
  }

  return axios.create({
    baseURL: url,
    timeout: timeout || 120000,
    headers
  })
}

// post method for rest api request, just pass the url, access token and body data
export function post(url, body, params) {
  return new Promise((resolve, reject) => {
    const axiosInstance = getInstance(url, params)
    axiosInstance({
      method: 'post',
      data: body
    }).then((response) => {
      resolve(response.data)
    }).catch((err) => {
      console.log('caught an error :', err.response)
      reject(err)
    })
  })
}

// put method for rest api request, just pass the url, access token and body data
export function put(url, body) {
  return new Promise((resolve, reject) => {
    const axiosInstance = getInstance(url)
    axiosInstance({
      method: 'put',
      data: body
    }).then((response) => {
      resolve(response.data)
    }).catch((err) => {
      console.log('caught an error :', err)
      reject(err)
    })
  })
}

// custom put
export function customPut(url, body, config) {
  return new Promise((resolve, reject) => {
    axios.put(url, body, config)
      .then((data) => {
        resolve(data)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

// custom get
export async function customGet(url, params) {
  const { timeout } = params || {}

  return axios.get(url, {
    timeout: timeout || 120000,
    headers: {
      'Content-Type': 'application/json',
      Pragma: 'no-cache'
    }
  })
}

// put method for rest api request, just pass the url, access token and body data
export function deleteMethod(url, body) {
  return new Promise((resolve, reject) => {
    const axiosInstance = getInstance(url)
    axiosInstance({
      method: 'delete',
      data: body
    }).then((response) => {
      resolve(response.data)
    }).catch((err) => {
      console.log('caught an error :', err)
      reject(err)
    })
  })
}

// get method for rest api request, just pass the url and access token
export function get(url, params) {
  const {
    timeout,
    accessToken
  } = params || {}

  return axios.get(url, {
    timeout: timeout || 120000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token || accessToken}`
    }
  })
}
