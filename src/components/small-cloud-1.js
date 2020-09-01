import React from 'react';
import { Image } from '@chakra-ui/core';
import { gsap } from 'gsap';

function SmallCloud1() {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
        const TL = gsap.timeline({repeat: -1, yoyo: true, delay: 1.3})
        TL.from('#small-cloud-1', {
          y: -500, // or use window.innerWidth || window.innerHeight. They are the viewport after all :wink:
          ease: 'back(5)'
        })
        .to('#small-cloud-1', {
          x: window.innerWidth * 0.90, // window.innerWidth * 0.95
          repeat: -1,
          yoyo: true,
          duration: gsap.utils.random(80, 95)
        })
      }
    // let tl = gsap.timeline();
    // tl.fromTo(
    //   '#small-cloud-1',
    //   { y: -500 },
    //   { y: 0, delay: 1.2, duration: 1, ease: 'back(2)' },
    // );
    // tl.to('#small-cloud-1', { x: '95%', duration: 50, repeat: -1 });
  }, []);

  return (
    <Image
      id="small-cloud-1"
      // boxSize={80}
      w={80}
      fit="cover"
      src="cloud-1-small.png"
      style={{
        position: 'absolute',
        top: '15%',
        // left: '60%',
        zIndex: 9,
      }}
      alt="A small cloud"
    />
  );
}

export default SmallCloud1;