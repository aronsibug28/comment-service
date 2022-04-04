import axios from 'axios'

export const token = window.localStorage.getItem('comment-service-token')
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
