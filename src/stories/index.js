import React from 'react'
import { storiesOf } from '@storybook/react'
import Markdown from 'wix-storybook-utils/Markdown'
import ReadMe from '../../README.md'

import Comment from '../components/Comment'
import NewsFeedComment from '../components/Comments'
import NewsFeed from '../components/NewsFeed'
import Dropdown from '../components/Dropdown'
import Counter from '../components/Counter'

storiesOf('Getting Started', module).add('Installation', () => (
  <Markdown source={ReadMe} />
))

storiesOf('Components', module).add('Comments', () => <Comment />)

storiesOf('Components', module).add('News Feed Comment', () => (
  <NewsFeedComment postId={284682} />
))
storiesOf('Components', module).add('News Feed', () => <NewsFeed />)

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

storiesOf('Components', module).add('Counter', () => (
  <Counter elementId={284683} name='Likes' type='likes' />
))
