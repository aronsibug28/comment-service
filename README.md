<p align="center">
  <h1>
    React Crowdhound
  </h1>
  <span>
    A collection of React components for Crowdhound
  </span>
</p>

<div align="center">

  ![](https://flat.badgen.net/badge/React/16.8.3/blue)
  ![](https://badgen.net/npm/v/wix-style-react/latest)
  ![Dependencies](https://img.shields.io/david/wix/wix-style-react.svg?style=flat-square)
  ![DevDependencies](https://img.shields.io/david/dev/ant-design/ant-design.svg?style=flat-square)

</div>


## 📦 Install

Add to package.json
```jsx
{
    "dependencies": {
        "react-crowdhound": "file:/Development/projects/react-crowdhound-local"
    }
}
```

## 🚀 Usage

On the App.js, import `useCrowndhound` so we can initialize Crowdhound

```jsx
  import useCrowdhound from 'react-crowdhound'
```

Then add this code inside your main function

```jsx
  useCrowdhound({
    version: '2.0',
    protocol: 'http',
    host: 'uat.crowdhound.io',
    port: 80,
    apikey: 'API11OHHOKHGFQ0OYEZZZM7I79OF7',
    debug: true
  })
```


## 🔨 Development

To start the project, just run the following:

```jsx
  yarn install
  npm run storybook
```

then go to `http://localhost:6006/`