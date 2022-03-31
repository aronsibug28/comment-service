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


## 📦 Build
Run `npm run build` to compile the reusable components

Then it should create another folder called `comment-service-local` outside the project folder

## 📦 Install
To install it on different projects, just add the path of the compiled project to the package.json
```jsx
{
    "dependencies": {
        "comment-service": "file:{path}/comment-service-local"
    }
}
```

## 🔨 Local Development

To start the project, just run the following:

```jsx
  yarn install
  npm run storybook
```

then go to `http://localhost:6006/`