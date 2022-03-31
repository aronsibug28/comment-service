import React from 'react'
import { storiesOf } from '@storybook/react'
import Markdown from 'wix-storybook-utils/Markdown'
import ReadMe from '../../README.md'
import Comment from '../components/Comment'

storiesOf('Getting Started', module).add('Installation', () => (
  <Markdown source={ReadMe} />
))

storiesOf('Components', module).add('Comment', () => (
  <Comment
    username='rssibug'
    email='rs.sibug@corelogic.com.au'
    jobId={2038966}
    maxCommentChar={10000}
    maxFilesCount={2}
    maxFileSize={3000000}
    allowedFileTypes={['pdf', 'jpeg', 'jpg']}
  />
))
