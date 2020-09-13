import React from 'react';

import imageBackground from '../img/background.jpg';
import defaultUserIcon from '../img/user.png';

export {imageBackground, defaultUserIcon};

function isNotInlineImage(src: string) {
  return !src.startsWith("data:image");
}

const NOT_INLINED_IMAGES = [imageBackground, defaultUserIcon].filter(isNotInlineImage);


function renderImage(src: string) {
  return <img key={src} src={src} alt="" />
}

export function PreloadImages() {
  return <div className="preload-images">
    {NOT_INLINED_IMAGES.map(renderImage)}
  </div>
}
