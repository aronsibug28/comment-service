import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import AvatarIcon from '../../assets/images/anonymous-avatar.png'
import AttachIcon from '../../assets/images/attach-icon.png'
import { deleteComment, fetchComments, generateTemporaryAccessSignedUrl, s3SignedUrlUploadHandler, saveComment, useWebSocket } from './actions'
import { checkAllowedFileType, getFileExtension, getFileNameWithTempBaseOnUrl } from '../../helpers/Commons'

import './index.scss'
import Subscribe from './Subscribe'

const CommentService = (props) => {
  const { jobId, username, firstName, lastName, email, maxCommentChar, maxFilesCount, maxFileSize, allowedFileTypes } = props || {}
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [fileError, setFileError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [seletedCommentId, setSelectedCommentId] = useState(null)
  const fileInputRef = useRef()
  const commentTextInputRef = useRef()

  const { syncComments } = useWebSocket(jobId, getComments)

  useEffect(() => {
    getComments()
  }, [jobId])

  function getComments() {
    fetchComments(jobId).then(response => {
      setComments(response.data)
    })
  }

  const handleSubmitComment = () => {
    const data = {
      jobId: jobId,
      username: username,
      date: new Date(),
      comment: newComment,
      commentId: seletedCommentId,
      attachments: selectedFiles.map((attachment) => ({
        filename: attachment.filename,
        fileType: attachment.fileType,
        url: attachment.documentURL,
        description: attachment.description
      }))
    }

    saveComment(data, isEditing).then(response => {
      setComments([{
        jobId: jobId,
        username: username,
        date: new Date(),
        comment: newComment
      }, ...comments])
      setNewComment('')
      setSelectedFiles([])
      setFileError(null)

      syncComments()
    })
  }

  const onFileChange = async ({ target }) => {
    if (target && target.files && target.files.length > 0) {
      const file = target.files[0]
      const { name, size } = file
      const type = getFileExtension(name)

      if (selectedFiles.length === maxFilesCount) {
        setFileError(`Maxinum of ${maxFilesCount} attachments is reached.`)
        return null
      } else if (size > maxFileSize) {
        setFileError(`File size too big, must not be greater than ${maxFileSize / 1000000}mb`)
        return null
      } else if (!checkAllowedFileType(allowedFileTypes, type)) {
        setFileError(`Invalid file type, must use one of these extensions (${allowedFileTypes.join(', ')})`)
        return null
      } else {
        setFileError(null)
      }

      const value = {
        filename: name,
        fileType: 'OTHER',
        description: '',
        fileSize: size
      }

      const reader = new window.FileReader()
      reader.onload = async () => {
        try {
          await s3SignedUrlUploadHandler(type, value, file)
            .then(({ uploadUrl }) => {
              const urlAfterUpload = uploadUrl.split('?')[0]
              return generateTemporaryAccessSignedUrl(`/comments/attachments/${getFileNameWithTempBaseOnUrl(urlAfterUpload, value, type)}`)
            })
            .then(({ payload }) => {
              value.documentURL = payload
              setSelectedFiles([...selectedFiles, value])
              setFileError(null)
            })
        } catch (e) {
          // Handle error here
          console.log('Failed to upload the document')
        }
      }
      if (target) {
        reader.readAsDataURL(target.files[0])
      }
      target.value = null
    }
  }

  const removeAttachment = (index) => {
    selectedFiles.splice(index, 1)
    setSelectedFiles([...selectedFiles])
    setFileError(null)
  }

  const handleEditComment = (comment) => {
    commentTextInputRef.current.focus()
    setNewComment(comment.comment)
    setIsEditing(true)
    setSelectedCommentId(comment.commentId)
  }

  const handleDeleteComment = (comment) => {
    deleteComment(comment).then(() => {
      syncComments()
    })
  }

  return (
    <div className='comment-container'>
      <div className='comment-add-container'>
        <div className='comment-actions'>
          <span className='attach-action'>
            <label htmlFor='input-file'><img src={AttachIcon} alt='attach' onClick={onFileChange} /></label>
            <input id='input-file' type='file' ref={fileInputRef} onChange={onFileChange} />
          </span>
          <Subscribe jobId={jobId} email={email} />
        </div>
        <div className='comment-field'>
          <textarea
            ref={commentTextInputRef}
            className='comment-textarea textarea'
            placeholder='Your comment here'
            value={newComment}
            maxLength={maxCommentChar}
            onChange={(e) => {
              setNewComment(e.target.value)
            }}
          />
        </div>
        <div className='attachment-list'>
          {selectedFiles.map((attachment, key) => (
            <div key={key} className='attachment'>
              <span>{attachment.filename}</span>
              <span className='remove-attachment' onClick={() => removeAttachment(key)}>X</span>
            </div>
          ))}
        </div>
        {fileError &&
          <div className='attachment-error'>
            {fileError}
          </div>}
        <div className='comment-buttons'>
          <button className='button submit-button' onClick={() => handleSubmitComment()}>
            {isEditing ? 'Save' : 'Submit'}
          </button>
          {isEditing &&
            <button
              className='button cancel-button' onClick={() => {
                setIsEditing(false)
                setNewComment('')
                setSelectedCommentId(null)
              }}
            >
              Cancel
            </button>}
        </div>
      </div>

      <div className='comment-list'>
        {comments.map((comment, index) => {
          const { comment: commentText, username: user, date, attachments } = comment
          return (
            <div key={`comment-${index}`} className='comment-wrapper'>
              <div className='comment-header'>
                <div className='details'>
                  <img className='avatar' src={AvatarIcon} alt='' />
                  <span className='fullname'>{firstName} {lastName}</span>
                  <span className='date'>{moment(date).format('MM/DD/YYYY, HH:mm a')}</span>
                </div>
                <div className='comment-actions'>
                  {username === user && <span className='edit' onClick={() => handleEditComment(comment)}>Edit</span>}
                  {username === user && <span className='delete' onClick={() => handleDeleteComment(comment)}>Delete</span>}
                </div>
              </div>
              <div className='comment'>
                {commentText}
              </div>
              {attachments && attachments.length > 0 &&
                <div className='attachments'>
                  {attachments.map((attachment, key) => (
                    <div key={key} className='attachment'>
                      <a href={attachment.url} target='_blank' rel='noreferrer'>{attachment.filename}</a>
                    </div>
                  ))}
                </div>}
            </div>)
        }
        )}
      </div>
    </div>
  )
}

export default CommentService
