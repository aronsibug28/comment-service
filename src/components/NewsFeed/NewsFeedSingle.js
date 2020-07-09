import React, { useState } from 'react'
import moment from 'moment'
import anonymousAvatar from '../../assets/images/anonymous-avatar.png'
import { updateNewsFeed, deleteNewsFeed } from './actions'

import Counter from '../Counter'
import Comments from '../Comments'
import Dropdown from '../Dropdown'

const NewsFeedSingle = ({ newsFeed = {}, onGetPosts }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [post, setPost] = useState(newsFeed.description)

  const dateFromNow = (date) => {
    return moment(date * 1000).fromNow()
  }

  const onDeletePost = async () => {
    await deleteNewsFeed(newsFeed, post)
    await onGetPosts()
  }

  const onEditPost = () => {
    setPost(newsFeed.description)
    setIsEditing(true)
  }

  const onSavePost = async () => {
    setIsEditing(false)
    await updateNewsFeed(newsFeed, post)
    setPost(post)
    onGetPosts()
  }

  const onCancelPost = async () => {
    setIsEditing(false)
  }

  return (
    <div
      id={`news-feed-${newsFeed.id}`}
      key={newsFeed.id}
      style={{
        width: '1000px'
      }}
    >
      <div
        style={{
          backgroundColor: 'rgb(251, 251, 251)',
          marginTop: '20px',
          padding: '10px'
        }}
        className='ch-newsfeed-maintable clearfix'
      >
        <div className='level'>
          <div className='level-left'>
            <div className='level-item'>
              <img className='ch-newsfeed-avatar' src={anonymousAvatar} />
            </div>

            <div className='level-item' style={{ flexDirection: 'column' }}>
              <div className='ch-newsfeed-userid'>
                {newsFeed.userId === '0' ? 'RS Aron Sibug' : newsFeed.userId}
              </div>
              <div className='ch-newsfeed-date'>
                {dateFromNow(newsFeed.created)}
              </div>
            </div>
          </div>

          <div
            className='level-right'
            style={{
              fontSize: '13px'
            }}
          >
            {isEditing ? (
              <React.Fragment>
                <div
                  className='dropdown-item cursor-pointer'
                  onClick={() => onSavePost()}
                >
                  Save
                </div>
                |
                <div
                  className='dropdown-item cursor-pointer'
                  onClick={() => onCancelPost()}
                >
                  Cancel
                </div>
              </React.Fragment>
            ) : (
              <Dropdown
                icon='fa fa-caret-down'
                actions={[
                  {
                    label: 'Edit',
                    onClick: () => onEditPost()
                  },
                  {
                    label: 'Delete',
                    onClick: () => onDeletePost()
                  }
                ]}
              />
            )}
          </div>
        </div>

        <div
          className='ch-newsfeed-description'
          style={{ borderBottom: '1px solid #dedede' }}
        >
          {isEditing ? (
            <textarea
              key={newsFeed.id}
              className='textarea'
              onChange={(e) => setPost(e.target.value)}
              value={post}
              rows='2'
            />
          ) : (
            <p
              style={{
                fontSize: '16px'
              }}
            >
              {post}
            </p>
          )}
        </div>

        <div>
          <Counter elementId={newsFeed.id} name='Likes' type='likes' />{' '}
          <Counter elementId={newsFeed.id} name='Dislikes' type='dislikes' />
        </div>

        <div>
          <Comments isComment postId={newsFeed.id} />
        </div>
      </div>
    </div>
  )
}

export default NewsFeedSingle
