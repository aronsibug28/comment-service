import React from 'react'
import { storiesOf } from '@storybook/react'
import Markdown from 'wix-storybook-utils/Markdown'
import ReadMe from '../../README.md'

import Comment from '../components/Comment'
import LikesAndComments from '../components/LikesAndComments'
import NewsFeed from '../components/NewsFeed'
import Dropdown from '../components/Dropdown'
import { userData, newsFeed } from './testData'

storiesOf('Getting Started', module).add('Installation', () => (
  <Markdown source={ReadMe} />
))

storiesOf('Components', module).add('Comments', () => <Comment />)

storiesOf('Components', module).add('News Feed Comment', () => (
  <LikesAndComments
    data={newsFeed}
    userData={userData}
    callback={() => {}}
    styles={{
      newsFeedCommentAvatar: {
        borderRadius: '50%'
      }
    }}
  />
))

storiesOf('Components', module).add('News Feed', () => (
  <NewsFeed userData={userData} />
))

storiesOf('Components', module).add('Dropdown', () => (
  <Dropdown
    icon='fa fa-caret-down'
    actions={[
      {
        label: 'Edit',
        onClick: () => {}
      },
      {
        label: 'Delete',
        onClick: () => {}
      }
    ]}
  />
))
