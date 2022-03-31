import { useState, useEffect, useRef } from 'react'
import { over } from 'stompjs'
import SockJS from 'sockjs-client'
import { customPut, get, post, authToken, token, deleteMethod } from '../../helpers/http'

export const s3SignedUrlUploadHandler = async (type, value, file) => {
  const chunkName = value.filename.split('.').slice(0, -1).join('.')
  const fileContentType = file.type

  const uploadUrl = await uploadTempAttachment({
    name: chunkName,
    fileType: type,
    fileContentType
  })

  return customPut(uploadUrl, file, {
    headers: {
      'Content-Type': file.type
    }
  }).then(() => {
    return {
      uploadUrl
    }
  })
}

export const generateTemporaryAccessSignedUrl = path => new Promise((resolve, reject) => {
  const url = 'http://localhost:8086/comment-service/comment/temporary/attachment/preSignedurl'

  post(url, path)
    .then((response) => {
      resolve({
        type: 'ignore',
        payload: response
      })
    })
    .catch((e) => {
      reject(e)
    })
})

export function uploadTempAttachment(formData) {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:8086/comment-service/comment/temporary/attachment/signedurl'
    const promise = post(url, formData)
    promise.then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

export function fetchComments(jobId) {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:8086/comment-service/comments/${jobId}`
    const promise = get(url)
    promise.then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

export function saveComment(data) {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:8086/comment-service/comment'
    const promise = post(url, data)
    promise.then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

export function fetchOrderSubscribers(jobId) {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:8086/comment-service/job/${jobId}/subscribers`
    const promise = get(url)
    promise.then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

export function subscribeUser(data) {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:8086/comment-service/subscriber'
    const promise = post(url, data)
    promise.then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

export function unsubscribeUser(data) {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:8086/comment-service/subscriber'
    const promise = deleteMethod(url, data)
    promise.then((response) => {
      resolve(response)
    }).catch((error) => {
      reject(error)
    })
  })
}

export const useWebSocket = (jobId, onCommentReceived) => {
  const stompClient = useRef(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const Sock = new SockJS('http://localhost:8086/socket/comment-service/?access_token=' + token)
    stompClient.current = over(Sock)
    stompClient.current.connect({
      Authorization: authToken
    }, onConnected, onError)
  }, [])

  const onConnected = () => {
    stompClient.current.subscribe(`/socket/job/${jobId}/comment`, onCommentReceived)
    setIsConnected(true)
  }

  const onError = () => {
    setIsConnected(false)
  }

  const syncComments = () => {
    if (stompClient.current) {
      stompClient.current.send('/socket/comment', {
        Authorization: authToken
      }, JSON.stringify({
        jobId
      }))
    }
  }

  return {
    isConnected,
    syncComments
  }
}
