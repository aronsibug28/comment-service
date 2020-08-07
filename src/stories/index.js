import React from 'react'
import { storiesOf } from '@storybook/react'
import Markdown from 'wix-storybook-utils/Markdown'
import ReadMe from '../../README.md'

import Comment from '../components/Comment'
import NewsFeed from '../components/NewsFeed'
import NewsFeedV2 from '../components/NewsFeedV2'
import { userData, userData2, customNewsFeedStyles } from './testData'

storiesOf('Getting Started', module).add('Installation', () => (
  <Markdown source={ReadMe} />
))

storiesOf('Components', module).add('Comments', () => <Comment />)

storiesOf('Components', module).add('News Feed', () => (
  <NewsFeed userData={userData} />
))

storiesOf('Components', module).add('News Feed V2', () => (
  <NewsFeedV2
    userData={userData2}
    styles={customNewsFeedStyles}
    anchorId='284915'
  />
))
