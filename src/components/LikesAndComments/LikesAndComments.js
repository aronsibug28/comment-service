import React, { useState, useEffect } from 'react'
import { saveLikes, saveTotalComments } from './actions'
import { getActiveComments } from '../Comments/actions'

import Comments from '../Comments'

export const COMPONENT_ID = 'likes'

const LikesAndComments = ({
  data,
  userData,
  isReply,
  isShowTextArea,
  onClickReply,
  callback,
  styles,
  isShowComments,
  showComments
}) => {
  const {
    newsFeedCommentLikeLabel,
    newsFeedCommentReplyLabel,
    newsFeedCommentLikeButton,
    newsFeedCommentReplyButton,
    newsFeedCommentCancelButton
  } = styles || {}
  const { extraProperties = '' } = data
  const parsedExtraProperties = JSON.parse(extraProperties)
  const { likes = [], totalComments } = parsedExtraProperties || {}
  const totalLikes = likes.length
  const namesToolTip = likes.map((obj) => obj.name)
  const isLiked = likes.some((obj) => obj.userId === userData.userId)
  const [isReplying, setIsReplying] = useState(false)
  const [comments, setComments] = useState([])
  const [commentsTotal, setCommentsTotal] = useState(totalComments)

  const getCommentsHandler = async () => {
    const response = await getActiveComments(data.id)

    response.elements.sort(function (a, b) {
      return a.id - b.id
    })
    setComments(response.elements)
    saveTotalComments(data, response.elements.length)
    setCommentsTotal(response.elements.length)
  }

  const onClickLike = async () => {
    let filteredLikes = []
    if (isLiked) {
      filteredLikes = likes.filter((obj) => obj.userId !== userData.userId)
    } else {
      filteredLikes.push({ userId: userData.userId, name: userData.name })
    }

    await saveLikes(data, filteredLikes)
    await callback()
  }

  const onReply = () => {
    showComments(true)
    setIsReplying(true)
    onClickReply(true)
  }

  const onCancelReply = () => {
    showComments(false)
    setIsReplying(false)
    onClickReply(false)
  }

  const onBlurComment = () => {
    onClickReply(false)
  }

  useEffect(() => {
    if (isShowComments) {
      getCommentsHandler()
    }
  }, [isShowComments])

  const renderTotalLikes = () => {
    return (
      <React.Fragment>
        {totalLikes > 0 && (
          <label
            title={namesToolTip.join()}
            style={{ ...newsFeedCommentLikeLabel }}
          >
            {totalLikes}&nbsp;
            {!isReply && `Like${totalLikes > 1 ? 's' : ''}`}
          </label>
        )}
      </React.Fragment>
    )
  }

  const renderTotalComments = () => {
    return (
      <React.Fragment>
        {commentsTotal > 0 && (
          <label style={{ ...newsFeedCommentReplyLabel }}>
            {commentsTotal}&nbsp;
            {!isReply && `Comment${commentsTotal > 1 ? 's' : ''}`}
          </label>
        )}
      </React.Fragment>
    )
  }

  const renderLikeButton = () => {
    return (
      <label
        onClick={() => onClickLike()}
        className={`${isLiked ? 'liked' : ''} ch-reaction-button`}
        style={{ ...newsFeedCommentLikeButton }}
      >
        Like
      </label>
    )
  }
  return (
    <div>
      {!isReply ? (
        <React.Fragment>
          <div className='ch-notification-wrapper'>
            {renderTotalLikes()} {renderTotalComments()}
          </div>
          <div className='ch-action-wrapper'>
            {renderLikeButton()}
            <label
              className='ch-reaction-button'
              htmlFor={data.id}
              style={{ ...newsFeedCommentReplyButton }}
              onClick={() => showComments(!isShowComments)}
            >
              Comment
            </label>
          </div>
        </React.Fragment>
      ) : (
        <div className='ch-action-wrapper'>
          {renderTotalLikes()} {renderLikeButton()}
          {renderTotalComments()}{' '}
          <label
            className='ch-reaction-button'
            onClick={() => onReply()}
            htmlFor={data.id}
            style={{ ...newsFeedCommentReplyButton }}
          >
            Reply
          </label>
          {isReplying && (
            <label
              className='ch-reaction-button'
              onClick={() => onCancelReply()}
              style={{ ...newsFeedCommentCancelButton }}
            >
              Cancel
            </label>
          )}
        </div>
      )}

      {isShowComments && (
        <Comments
          postId={data.id}
          isReply={isReply}
          userData={userData}
          isShowTextArea={isShowTextArea}
          comments={comments}
          onBlurComment={onBlurComment}
          onGetComments={getCommentsHandler}
          styles={styles}
        />
      )}
    </div>
  )
}

LikesAndComments.defaultProps = {
  isReply: false,
  onClickReply: () => {},
  isShowTextArea: true
}

export default LikesAndComments
