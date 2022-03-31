import React, { useState, useEffect } from 'react'
import SubscriberIcon from '../../assets/images/subscriber-icon.png'
import { fetchOrderSubscribers, subscribeUser, unsubscribeUser } from './actions'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'

import './Subscribe.scss'
import { isEmail } from '../../helpers/Commons'

const Subscribe = (props) => {
  const { jobId, email } = props || {}
  const [subscribers, setSubscribers] = useState([])
  const [emailError, setEmailError] = useState('')
  const [newSubscriberEmail, setNewSubscriberEmail] = useState('')
  const [isUserSubscribed, setIsUserSubscribed] = useState(false)
  const [isSubscribingOthers, setIsSubscribingOthers] = useState(false)
  const [isSubscribersModalOpen, setIsSubscribersModalOpen] = useState(false)

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 600,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  }))
  const classes = useStyles()

  useEffect(() => {
    getOrderSubscribers()
  }, [jobId, isSubscribersModalOpen])

  function getOrderSubscribers() {
    fetchOrderSubscribers(jobId).then(response => {
      setSubscribers(response.data)
      setIsUserSubscribed(!!response.data.find((sub) => sub.email === email))
    })
  }
  console.log('subscribers', subscribers)
  const onSubscribe = (email) => {
    subscribeUser({
      jobId,
      email
    }).then(() => {
      getOrderSubscribers()
    })
  }

  const onUnsubscribe = (email) => {
    unsubscribeUser({
      jobId,
      email
    }).then(() => {
      getOrderSubscribers()
    })
  }

  return (
    <span>
      <span className='subscribe-action'>
        <img src={SubscriberIcon} alt='subscribers' onClick={() => setIsSubscribersModalOpen(true)} />
      </span>
      <Modal
        open={isSubscribersModalOpen}
        onClose={() => {
          setIsSubscribersModalOpen(false)
          setIsSubscribingOthers(false)
          setNewSubscriberEmail('')
          setEmailError('')
        }}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className='subscriber-modal'
      >
        <div className={classes.paper}>
          <div className='header'>
            <span className='title'>Subscribers</span>
            <span className='subscribe-action'>
              {isUserSubscribed ? (
                <button onClick={() => onUnsubscribe(email)}>Unsubscribe Me</button>
              ) : (
                <button onClick={() => {
                  if (isEmail(email)) {
                    onSubscribe(email)
                  }
                }}
                >Subscribe Me
                </button>
              )}
              <button onClick={() => setIsSubscribingOthers(true)}>Subscribe Others</button>
            </span>
          </div>

          {isSubscribingOthers &&
            <div className='add-subscriber'>
              <input type='text' value={newSubscriberEmail} onChange={(e) => setNewSubscriberEmail(e.target.value)} />
              <button onClick={() => {
                if (isEmail(newSubscriberEmail)) {
                  onSubscribe(newSubscriberEmail)
                  setNewSubscriberEmail('')
                  setIsSubscribingOthers(false)
                  setEmailError('')
                } else {
                  setEmailError('Invalid email address')
                }
              }}
              >
                Save
              </button>
              <div className='email-error'>{emailError}</div>
            </div>}

          <div className='subscribers-list'>
            {subscribers.map((subscriber, key) => (
              <div key={key}>
                <span>{subscriber.email}</span>
                <span className='delete-subscriber' onClick={() => onUnsubscribe(subscriber.email)}>(unsubscribe)</span>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </span>
  )
}

export default Subscribe
