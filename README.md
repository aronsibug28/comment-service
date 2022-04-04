<p align="center">
  <h1>
    Comment Service
  </h1>
  <span>
    A collection of React components for comment service
  </span>
</p>

<div align="center">

  ![](https://flat.badgen.net/badge/React/16.8.3/blue)
  ![](https://badgen.net/npm/v/wix-style-react/latest)
  ![Dependencies](https://img.shields.io/david/wix/wix-style-react.svg?style=flat-square)
  ![DevDependencies](https://img.shields.io/david/dev/ant-design/ant-design.svg?style=flat-square)

</div>


## 📦 Install
Run `yarn add cl-comment-service` to install

## 🔨 Sample Usage

```jsx
import Comment from 'cl-comment-service/lib/Comment';
```

```jsx
<Comment
  token='token-here'
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
```
## 🔨 Local Development

To start the project, just run the following:

```jsx
  yarn install
  npm run storybook
```

then go to `http://localhost:6006/`
