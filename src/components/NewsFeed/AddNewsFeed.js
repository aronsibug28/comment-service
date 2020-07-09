import React, { useState } from 'react'

export default ({ onAddNewsFeed, buttonLabel, styles }) => {
  const { mainContainer, textArea } = styles || {}
  const [post, setPost] = useState('')

  const onPost = async (post) => {
    setPost('')
    onAddNewsFeed(post)
  }

  return (
    <div
      id='ch-add-news-feed-container'
      className='columns'
      style={{
        ...mainContainer,
        minWidth: '700px'
      }}
    >
      <div className='column is-11'>
        <textarea
          className='ch-add-news-feed-textarea textarea'
          style={textArea}
          onChange={(e) => setPost(e.target.value)}
          value={post}
          rows='3'
        />
      </div>
      <div className='column'>
        <button className='button is-light' onClick={() => onPost(post)}>
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}
