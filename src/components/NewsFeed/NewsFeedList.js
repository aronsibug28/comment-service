import React from 'react'
import NewsFeedSingle from './NewsFeedSingle'

const NewsFeedList = ({ newsFeeds = [], userData, onGetPosts, styles }) => {
  return (
    <div>
      {newsFeeds.map((newsFeed) => (
        <NewsFeedSingle
          newsFeed={newsFeed}
          userData={userData}
          key={newsFeed.id}
          onGetPosts={onGetPosts}
          styles={styles}
        />
      ))}
    </div>
  )
}

export default NewsFeedList
