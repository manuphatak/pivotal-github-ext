/* @flow */
import { STATUS, MESSAGE, EXTENSION_ID } from '../../shared/constants'

const { chrome } = global

const messageCreator = messageType => (payload: any): Promise<*> =>
  new Promise((resolve, reject) => {
    const message = { type: messageType, payload }
    const responseCallback = response =>
      response.status === STATUS.OK
        ? resolve(response.payload)
        : reject(response.payload)

    chrome.runtime.sendMessage(EXTENSION_ID, message, responseCallback)
  })

export const fetch = messageCreator(MESSAGE.FETCH)
export const storage = messageCreator(MESSAGE.STORAGE)
