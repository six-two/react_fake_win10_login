import React from 'react';
import store from './redux/store';


export default function ScreenCover(props: any) {
  let url = store.getState().const.coverUrl;
  return <div className="screen-cover">
    <iframe className="fill-screen" title="unknown" src={url} />
  </div>
}
