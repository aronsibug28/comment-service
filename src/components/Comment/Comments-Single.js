import React from 'react'
import moment from 'moment'
import CommentsList from './Comments-List'
import anonymousAvatar from '../../assets/images/anonymous-avatar.png'

const CommentsSingle = ({ element = {} }) => {
  const dateFromNow = (date) => {
    return moment(date * 1000).fromNow()
  }
  return (
    <div className='ch-comment-single-comment'>
      <table className='ch-comment-maintable'>
        <tbody>
          <tr>
            <td className='ch-comment-left-cell'>
              <div className='norow' />
              <figure className='image is-128x128'>
                <img src={anonymousAvatar} />
              </figure>
              <div className='ch-comment-userid has-text-centered'>
                {element.userId}
              </div>
            </td>
            <td className='ch-comment-right-cell'>
              <div className='ch-tiny-id has-text-right'>{element.id}</div>
              <div className='ch-description'>{element.description}</div>
              <div className='has-text-right'>
                <span className='ch-date'>{dateFromNow(element.created)}</span>
                <div>
                  <div className='norow child-posts reply'>
                    <CommentsList elements={element.children} />
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CommentsSingle
