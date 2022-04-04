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
    token='eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJDUlQiLCJNQVAiLCJQVFkiLCJTR1QiLCJTVFMiLCJUVEwiXSwicm9sZXMiOltdLCJpc3MiOiJodHRwczovL2FjY2Vzcy11YXQtYXBpLmNvcmVsb2dpYy5hc2lhIiwiZW52X2FjY2Vzc19yZXN0cmljdCI6ZmFsc2UsImV4cCI6MTY0OTA4NTE2NiwiZ2VvX2NvZGVzIjpbIkFDVCAtIEZ1bGwgU3RhdGUiLCJOU1cgLSBNZXRybyIsIk5TVyAtIFJlZ2lvbmFsIiwiTlQgLSBGdWxsIFN0YXRlIiwiUUxEIC0gTWV0cm8iLCJRTEQgLSBSZWdpb25hbCIsIlNBIC0gTWV0cm8iLCJTQSAtIFJlZ2lvbmFsIiwiVEFTIC0gRnVsbCBTdGF0ZSIsIlZJQyAtIChBQSkgRnVsbCBTdGF0ZSIsIlZJQyAtIEZ1bGwgU3RhdGUiLCJWSUMgLSBNZXRybyIsIlZJQyAtIFJlZ2lvbmFsIiwiV0EgLSBNZXRybyIsIldBIC0gUmVnaW9uYWwiLCJOb3J0aCBJc2xhbmQiLCJTb3V0aCBJc2xhbmQiXSwiY2xpZW50X2lkIjoienBMeW1QeElGT1Q5ek5VU0NCZ05UN28zano5MFZxdTkiLCJzb3VyY2VfZXhjbHVzaW9uIjpbXX0.GYz2ff4r7HtXKCDx-2HNIeHQoI_OFcQJyA4kHpywelHUeW-SqaPevH7EStPMfmek_LuWOxZ192JYMFyWPiFdn1m5OPYKHYXYdGfMbGWjslAXDDeEcgOfvMpvt4W269nZNNp4-wBbztFn4Q4-FY6dVrxj7-pKkvBSwGwrTJa8gBo'
    username='rssibug'
    firstName='RS Aron'
    lastName='Sibug'
    email='rs.sibug@corelogic.com.au'
    jobId={2038966}
    maxCommentChar={10000}
    maxFilesCount={2}
    maxFileSize={3000000}
    allowedFileTypes={['pdf', 'jpeg', 'jpg']}
  />
))
