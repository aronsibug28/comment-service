import React, { useEffect, useState } from 'react'
import './index.scss'
import '../../assets/styles/common.scss'
import AddNewsFeed from './AddNewsFeed'
import NewsFeedList from './NewsFeedList'
import { getActiveNewsFeed, addNewsFeed } from './actions'

export const COMPONENT_ID = 'news-feed'

export default ({ userData, styles }) => {
  const [newsFeeds, setNewsFeeds] = useState([])

  const getNewsFeedHandler = async () => {
    const response = await getActiveNewsFeed()
    setNewsFeeds(response.elements)
  }

  const addNewsFeedHanlder = async (post) => {
    await addNewsFeed(post)
    await getNewsFeedHandler()
  }

  useEffect(() => {
    getNewsFeedHandler()
  }, [])

  return (
    <div id='app-ch-newsfeed' className='container'>
      <AddNewsFeed
        userData={userData}
        buttonLabel='Post'
        onAddNewsFeed={addNewsFeedHanlder}
        styles={styles}
      />
      <NewsFeedList
        onGetPosts={getNewsFeedHandler}
        userData={userData}
        newsFeeds={newsFeeds}
        styles={styles}
      />
    </div>
  )
}
