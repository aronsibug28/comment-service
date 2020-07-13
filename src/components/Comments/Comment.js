import React, { useState } from 'react'
import moment from 'moment'
import anonymousAvatar from '../../assets/images/anonymous-avatar.png'
import { updateComment, deleteComment } from './actions'

import Dropdown from '../Dropdown'
import LikesAndComments from '../LikesAndComments'

const Comment = ({ comment = {}, userData, onGetComments, styles }) => {
  const {
    newsFeedCommentContainer,
    newsFeedCommentAvatar,
    newsFeedCommentUser,
    newsFeedCommentDate,
    newsFeedCommentDescription
  } = styles || {}
  const [isShowComments, setIsShowComments] = useState(false)
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
    <div
      id={`comment-${comment.id}`}
      className='ch-comment'
      key={comment.id}
      style={{ ...newsFeedCommentContainer }}
    >
      <div className=''>
        <div className='level-left'>
          <div className='level-item'>
            <img
              className='ch-comment-avatar'
              style={{ ...newsFeedCommentAvatar }}
              src={anonymousAvatar}
            />
            <div>
              <span
                className='ch-comment-userid'
                style={{ ...newsFeedCommentUser }}
              >
                {comment.userId === '0' ? 'RS Aron Sibug' : comment.userId}
              </span>
              <span
                className='ch-comment-date'
                style={{ ...newsFeedCommentDate }}
              >
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
            <div
              className='ch-comment-description'
              style={{ ...newsFeedCommentDescription }}
            >
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
            isShowComments={isShowComments}
            showComments={(isShow) => setIsShowComments(isShow)}
          />
        </div>
      </div>
    </div>
  )
}

export default Comment
