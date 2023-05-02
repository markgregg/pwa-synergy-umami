import { useMemo } from "react";

type UmamiBasePayload = {
  hostname: string;
  language: string;
  screen: string;
  website: string;
  url?: string;  
  referrer?: string;
  title?: string;
}

type UmamiParameters = {
  name?: string;
  data?: any;
};

type UmamiPayload = UmamiBasePayload & UmamiParameters;

interface UmamiBody  {
  payload: UmamiPayload;
  type: "event";
}

let umamiUrl: string;

export const registerUmami = (url: string) => {
  umamiUrl = url.charAt(url.length-1) === '/' 
    ? url + 'api/send'
    : url + '/api/send';
}

export type Track = (name: string, data?: any) => void;

export const useUmami2 = (
  websiteId: string,
  disabledPageView?: boolean,
  disableAll?: boolean
): Track => {
  return useUmami(
    websiteId, 
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    disabledPageView,
    disableAll );
}

const useUmami = (
  websiteId: string,
  url?: string,
  title?: string,
  hostname?: string, 
  referrer?: string,
  width?: number,
  height?: number,
  disabledPageView?: boolean,
  disableAll?: boolean
): Track => {
  const payload = useMemo<UmamiBasePayload>( () => {
    return {
      hostname: hostname ?? window.location.hostname,
      language: window.navigator.language,
      referrer: referrer ?? document.referrer,
      screen: `${width ?? window.innerWidth}x${height ?? window.innerHeight}`,
      title: title ?? document.title,
      url: url,
      website: websiteId,
    }
  }, [websiteId, url, title, hostname, referrer, width, height]);

  if( !disabledPageView && !disableAll ) {
    post({...payload});
  }

  const track = (name: string, data?: any) => {
    if( !disableAll ) {
      post({
        ...payload,
        name,
        data
      });
    }
  }
  
  return track;
}

const post = (
  payload: UmamiPayload
) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const body: UmamiBody = {
    type: 'event',
    payload
  };

  return fetch(umamiUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers,
  })
    .then(res => res.text())
    .then(text => console.log(text));
}

export default useUmami;