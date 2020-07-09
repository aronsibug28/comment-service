import React, { crowdhound } from 'react'
import Crowdhound from '../lib/Crowdhound'
import { saveAppRootElement } from '../actions/actionCrowdhound'

const useCrowdhound = (config) => {
  const appId = config.appId
  const reactCrowdhound = new Crowdhound(config)

  if (!crowdhound) {
    Object.defineProperty(React, 'crowdhound', {
      get() {
        return reactCrowdhound
      }
    })

    Object.defineProperty(React, 'appId', {
      get() {
        return appId
      }
    })

    saveAppRootElement(appId)
  }
}

export default useCrowdhound
