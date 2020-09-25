import React from 'react';

import imageBackground from '../img/background.jpg';
import defaultUserIcon from '../img/user.png';
import iconReveal from '../img/reveal.png';
import iconArrowRight from '../img/arrow-right.png';
// menu icon
import iconAccessibility from '../img/menu-icons/accessibility.png';
import iconBattery from '../img/menu-icons/battery.png';
import iconInternet from '../img/menu-icons/internet.png';
import iconKeyboard from '../img/menu-icons/keyboard.png';
import iconPower from '../img/menu-icons/shutdown.png';
import iconRestart from '../img/menu-icons/restart.png';
import iconSleep from '../img/menu-icons/sleep.png';


export { imageBackground, defaultUserIcon, iconReveal, iconArrowRight };
export { iconAccessibility, iconBattery, iconInternet, iconKeyboard, iconPower, iconRestart, iconSleep };

function isNotInlineImage(src: string) {
  return !src.startsWith("data:image");
}

const NOT_INLINED_IMAGES = [
  imageBackground, defaultUserIcon, iconReveal, iconArrowRight,
  iconAccessibility, iconBattery, iconInternet, iconKeyboard, iconPower, iconRestart, iconSleep,
].filter(isNotInlineImage);


function renderImage(src: string) {
  return <img key={src} src={src} alt="" />
}

export function PreloadImages() {
  return <div className="preload-images">
    {NOT_INLINED_IMAGES.map(renderImage)}
  </div>
}
