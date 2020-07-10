import React, { useState } from 'react'
import moment from 'moment'
import anonymousAvatar from '../../assets/images/anonymous-avatar.png'
import { updateComment, deleteComment } from './actions'
// import Comments from './index'

import Dropdown from '../Dropdown'
import LikesAndComments from '../LikesAndComments'

const Comment = ({ comment = {}, userData, onGetComments }) => {
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

  const onReplyComment = (isReplying) => {
    setIsShowTextArea(isReplying)
  }

  const onEnterComment = async (e) => {
    if (e.keyCode === 13) {
      await onSaveComment()
    }
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
                id={comment.id}
                icon='fa fa-caret-down'
                actions={[
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
                  id={comment.id}
                  key={comment.id}
                  className='textarea'
                  onChange={(e) => setUserComment(e.target.value)}
                  onKeyUp={(e) => onEnterComment(e)}
                  value={userComment}
                  rows='1'
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
        <div style={{ marginLeft: '40px' }}>
          <LikesAndComments
            isReply
            data={comment}
            userData={userData}
            isShowTextArea={isShowTextArea}
            onClickReply={onReplyComment}
            callback={onGetComments}
          />
        </div>

        {/* <Comments
          postId={comment.id}
          isMainComment={false}
          userData={userData}
          isShowTextArea={isShowTextArea}
        /> */}
      </div>
    </div>
  )
}

export default Comment
