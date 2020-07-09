import React from 'react'
import NewsFeedSingle from './NewsFeedSingle'

const NewsFeedList = ({ newsFeeds = [], onGetPosts }) => {
  return (
    <div>
      {newsFeeds.map((newsFeed) => (
        <NewsFeedSingle
          newsFeed={newsFeed}
          key={newsFeed.id}
          onGetPosts={onGetPosts}
        />
      ))}
    </div>
  )
}

export default NewsFeedList
