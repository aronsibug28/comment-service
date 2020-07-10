import React, { useState, useEffect } from 'react'
import { saveLikes } from './actions'
import { getActiveComments } from '../Comments/actions'

import Comments from '../Comments'

export const COMPONENT_ID = 'likes'

const LikesAndComments = ({
  data,
  userData,
  isReply,
  isShowTextArea,
  onClickReply,
  callback
}) => {
  const [isReplying, setIsReplying] = useState(false)
  const [totalComments, setTotalComments] = useState(0)
  const [comments, setComments] = useState([])
  const { extraProperties = '' } = data
  const parsedExtraProperties = JSON.parse(extraProperties)
  const { likes = [] } = parsedExtraProperties || {}
  const totalLikes = likes.length
  const namesToolTip = likes.map((obj) => obj.name)
  const isLiked = likes.some((obj) => obj.userId === userData.userId)

  const getCommentsHandler = async () => {
    const response = await getActiveComments(data.id)

    response.elements.sort(function (a, b) {
      return a.id - b.id
    })
    setComments(response.elements)
    setTotalComments(response.elements.length)
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
    setIsReplying(true)
    onClickReply(true)
  }

  const onCancelReply = () => {
    setIsReplying(false)
    onClickReply(false)
  }

  useEffect(() => {
    getCommentsHandler()
  }, [])

  const renderTotalLikes = () => {
    return (
      <React.Fragment>
        {totalLikes > 0 && (
          <label title={namesToolTip.join()}>
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
        {totalComments > 0 && (
          <label>
            {totalComments}&nbsp;
            {!isReply && `Comment${totalComments > 1 ? 's' : ''}`}
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
            <label className='ch-reaction-button' htmlFor={data.id}>
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
          >
            Reply
          </label>
          {isReplying && (
            <label
              className='ch-reaction-button'
              onClick={() => onCancelReply()}
            >
              Cancel
            </label>
          )}
        </div>
      )}

      <Comments
        postId={data.id}
        isMainComment={!isReply}
        userData={userData}
        isShowTextArea={isShowTextArea}
        comments={comments}
        onGetComments={getCommentsHandler}
      />
    </div>
  )
}

LikesAndComments.defaultProps = {
  isReply: false,
  onClickReply: () => {}
}

export default LikesAndComments
