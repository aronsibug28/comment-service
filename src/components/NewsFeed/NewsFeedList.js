import React from 'react'
import NewsFeedSingle from './NewsFeedSingle'

const NewsFeedList = ({ newsFeeds = [], userData, onGetPosts }) => {
  return (
    <div>
      {newsFeeds.map((newsFeed) => (
        <NewsFeedSingle
          newsFeed={newsFeed}
          userData={userData}
          key={newsFeed.id}
          onGetPosts={onGetPosts}
        />
      ))}
    </div>
  )
}

export default NewsFeedList
