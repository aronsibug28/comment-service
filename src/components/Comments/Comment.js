import React, { useState } from 'react'
import moment from 'moment'
import anonymousAvatar from '../../assets/images/anonymous-avatar.png'
import { updateComment, deleteComment } from './actions'
import Comments from './index'

import Dropdown from '../Dropdown'

const Comment = ({ comment = {}, allowNested, onGetComments }) => {
  const [userComment, setUserComment] = useState(comment.description)
  const [isEditing, setIsEditing] = useState(false)
  const [isShowTextArea, setIsShowTextArea] = useState(false)

  const dateFromNow = (date) => {
    return moment(date * 1000).fromNow()
  }

  const onDeleteComment = async () => {
    await deleteComment(comment, userComment)
    await onGetComments()
  }

  const onEditComment = () => {
    setUserComment(comment.description)
    setIsEditing(true)
  }

  const onReplyComment = () => {
    setIsShowTextArea(true)
  }

  const onSaveComment = async () => {
    setIsEditing(false)
    await updateComment(comment, userComment)
    setUserComment(userComment)
    await onGetComments()
  }

  const onCancelComment = () => {
    setIsEditing(false)
  }

  const onCancelReply = () => {
    setIsShowTextArea(false)
  }

  return (
    <div id={`comment-${comment.id}`} className='ch-comment' key={comment.id}>
      <div className=''>
        <div className='level-left'>
          <div className='level-item'>
            <img className='ch-comment-avatar' src={anonymousAvatar} />
            <div>
              <span className='ch-comment-userid'>
                {comment.userId === '0' ? 'RS Aron Sibug' : comment.userId}
              </span>
              <span className='ch-comment-date'>
                {dateFromNow(comment.created)}
              </span>
            </div>
          </div>
          <div className='ch-comment-actions'>
            {isEditing ? (
              <React.Fragment>
                <div
                  className='ch-comment-action'
                  onClick={() => onSaveComment()}
                >
                  Save
                </div>
                <div
                  className='ch-comment-action'
                  onClick={() => onCancelComment()}
                >
                  Cancel
                </div>
              </React.Fragment>
            ) : (
              <Dropdown
                icon='fa fa-caret-down'
                actions={[
                  {
                    label: !isShowTextArea ? 'Reply' : 'Cancel',
                    onClick: () =>
                      !isShowTextArea ? onReplyComment() : onCancelReply()
                  },
                  {
                    label: 'Edit',
                    onClick: () => onEditComment()
                  },
                  {
                    label: 'Delete',
                    onClick: () => onDeleteComment()
                  }
                ]}
              />
            )}
          </div>
        </div>
        <div className='level-left'>
          <div className='level-item' style={{ width: '100%' }}>
            <div className='ch-comment-description'>
              {isEditing ? (
                <textarea
                  key={comment.id}
                  className='textarea'
                  onChange={(e) => setUserComment(e.target.value)}
                  value={userComment}
                  rows='2'
                  style={{
                    fontSize: '13px'
                  }}
                />
              ) : (
                <p
                  style={{
                    fontSize: '15px'
                  }}
                >
                  {userComment}
                </p>
              )}
            </div>
          </div>
        </div>

        {allowNested && (
          <Comments
            postId={comment.id}
            isMainComment={false}
            isShowTextArea={isShowTextArea}
          />
        )}
      </div>
    </div>
  )
}

export default Comment
