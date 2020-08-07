import React, { useState } from 'react'
import anonymousAvatar from '../../assets/images/anonymous-avatar.png'

export default ({ onAddNewsFeed, userData, buttonLabel, styles }) => {
  const {
    newsFeedPostContainer,
    newsFeedPostButton,
    newsFeedPostTextArea,
    newsFeedAvatar,
    newsFeedUser
  } = styles || {}
  const [post, setPost] = useState('')

  const onPost = async (post) => {
    setPost('')
    onAddNewsFeed(post)
  }

  return (
    <div className='ch-newsfeed-form-wrapper' stlye={newsFeedPostContainer}>
      <div className='ch-newsfeed-maintable columns'>
        <div className='level'>
          <div className='level-left'>
            <div className='ch-newsfeed-left-cell level-item'>
              <img
                className='ch-newsfeed-avatar'
                style={newsFeedAvatar}
                src={anonymousAvatar}
              />
            </div>
            <div
              className='ch-newsfeed-right-cell level-item'
              style={{ flexDirection: 'column' }}
            >
              <div className='ch-newsfeed-userid' style={newsFeedUser}>
                {userData.name ? userData.name : 'Unknown'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <textarea
        className='ch-newsfeed-post-textarea textArea'
        placeholder={`What's on your mind?`}
        value={post}
        style={newsFeedPostTextArea}
        onChange={(e) => {
          setPost(e.target.value)
        }}
      />
      <button
        className='button is-light is-small'
        style={newsFeedPostButton}
        onClick={() => onPost(post)}
      >
        {buttonLabel}
      </button>
    </div>
  )
}
