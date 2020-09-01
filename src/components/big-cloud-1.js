import React from 'react';
import { Image } from '@chakra-ui/core';
import { gsap } from 'gsap';

function BigCloud1() {
  React.useEffect(() => {
      if (typeof window !== "undefined") {
        const TL = gsap.timeline({repeat: -1, yoyo: true, delay: 0.7})
        TL.from('#big-cloud-1', {
          y: -500, // or use window.innerWidth || window.innerHeight. They are the viewport after all :wink:
          ease: 'back(5)'
        })
        .to('#big-cloud-1', {
          x: window.innerWidth * 0.90, // window.innerWidth * 0.95
          repeat: -1,
          yoyo: true,
          duration: gsap.utils.random(20, 40)
        })
      }
    // let tl = gsap.timeline();
    // tl.fromTo(
    //   '#big-cloud-1',
    //   { y: -500 },
    //   { y: 0, delay: 0.8, duration: 1, ease: 'back(5)' },
    // );
    // tl.to('#big-cloud-1', { x: '95%', duration: 30, repeat: -1 });
  }, []);

  return (
    <Image
      id="big-cloud-1"
      // boxSize={80}
      w={150}
      fit="cover"
      src="cloud-1-big.png"
      style={{
        position: 'absolute',
        top: '5%',
        // left: '20%',
        zIndex: 10,
      }}
      alt="A big cloud"
    />
  );
}

export default BigCloud1;