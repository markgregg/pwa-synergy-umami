import { useEffect, useMemo } from 'react'

type UmamiBasePayload = {
  hostname: string
  language: string
  screen: string
  website: string
  url?: string
  referrer?: string
  title?: string
}

type UmamiParameters = {
  name?: string
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  data?: any
}

type UmamiPayload = UmamiBasePayload & UmamiParameters

interface UmamiBody {
  payload: UmamiPayload
  type: 'event'
}

let umamiUrl: string
let websiteId: string
export const registerUmami = (url: string, currentWebsiteId: string) => {
  umamiUrl =
    url.charAt(url.length - 1) === '/' ? url + 'api/send' : url + '/api/send'
  websiteId = currentWebsiteId
}

export interface UmamiOptions {
  url?: string
  title?: string
  hostname?: string
  referrer?: string
  width?: number
  height?: number
  disabledPageView?: boolean
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export type Track = (name: string, data?: any) => void

const useUmami: (options: UmamiOptions) => Track = ({
  url,
  title,
  hostname,
  referrer,
  width,
  height,
  disabledPageView,
}): Track => {
  const payload = useMemo<UmamiBasePayload>(() => {
    return {
      hostname: hostname ?? window.location.hostname,
      language: window.navigator.language,
      referrer: referrer ?? document.referrer,
      screen: `${width ?? window.innerWidth}x${height ?? window.innerHeight}`,
      title: title ?? document.title,
      url: url,
      website: websiteId,
    }
  }, [websiteId, url, title, hostname, referrer, width, height])

  useEffect(() => {
    if (umamiUrl && websiteId && !disabledPageView) {
      post({ ...payload })
    }
  }, [])

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const track = (name: string, data?: any) => {
    if (umamiUrl && websiteId) {
      post({
        ...payload,
        name,
        data,
      })
    }
  }

  return track
}

const post = (payload: UmamiPayload) => {
  const headers = {
    'Content-Type': 'application/json',
  }

  const body: UmamiBody = {
    type: 'event',
    payload,
  }

  return fetch(umamiUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  })
    .then((res) => res.text())
    .then((text) => console.log(text))
}

export default useUmami
