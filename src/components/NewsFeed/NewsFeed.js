import React, { useEffect, useState } from 'react'
import './index.scss'
import '../../assets/styles/common.scss'
import AddNewsFeed from './AddNewsFeed'
import NewsFeedList from './NewsFeedList'
import { getActiveNewsFeed, addNewsFeed } from './actions'

export const COMPONENT_ID = 'news-feed'

export default () => {
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
        buttonLabel='Post'
        // styles={{
        //   mainContainer: { height: '300px' },
        //   textArea: {
        //     height: '100px'
        //   }
        // }}
        onAddNewsFeed={addNewsFeedHanlder}
      />
      <NewsFeedList onGetPosts={getNewsFeedHandler} newsFeeds={newsFeeds} />
    </div>
  )
}
