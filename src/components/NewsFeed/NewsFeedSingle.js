import React, { useState } from 'react'
import moment from 'moment'
import ShowMore from 'react-show-more'
import anonymousAvatar from '../../assets/images/anonymous-avatar.png'
import { updateNewsFeed, deleteNewsFeed } from './actions'

import Dropdown from '../Dropdown'
import LikesAndComments from '../LikesAndComments'

const NewsFeedSingle = ({ newsFeed = {}, userData, onGetPosts, styles }) => {
  const [isShowComments, setIsShowComments] = useState(false)
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
      className='ch-newsfeed-wrapper'
      key={newsFeed.id}
      style={{
        minWidth: '1000px'
      }}
    >
      <div className='ch-newsfeed-maintable'>
        <div className='level m-b-5'>
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

        <div className='ch-newsfeed-description'>
          {isEditing ? (
            <textarea
              key={newsFeed.id}
              className='textarea'
              onChange={(e) => setPost(e.target.value)}
              value={post}
              rows='2'
            />
          ) : (
            <ShowMore
              lines={3}
              more='See More'
              less='See Less'
              anchorClass='ch-see-more-content'
            >
              <p>{post}</p>
            </ShowMore>
          )}
        </div>

        <div>
          <LikesAndComments
            data={newsFeed}
            userData={userData}
            callback={onGetPosts}
            styles={styles}
            isShowComments={isShowComments}
            showComments={(isShow) => setIsShowComments(isShow)}
          />
        </div>
      </div>
    </div>
  )
}

export default NewsFeedSingle
