import React from 'react';

// import iconRebootDialog from '../img/dialogs/reboot-w.png';
// import iconShutdownDialog from '../img/dialogs/shutdown-w.png';

// export { iconRebootDialog, iconShutdownDialog };


function isNotInlineImage(src: string) {
  return !src.startsWith("data:image");
}

const NOT_INLINED_IMAGES = [/*iconRebootDialog, iconShutdownDialog*/].filter(isNotInlineImage);


function renderImage(src: string) {
  return <img key={src} src={src} alt="" />
}

export function PreloadImages() {
  return <div className="preload-images">
    {NOT_INLINED_IMAGES.map(renderImage)}
  </div>
}
