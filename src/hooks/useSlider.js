import { useEffect, useRef, useState } from 'react';

export default (time, margin) => {
  const [timer, setTimer] = useState(null);
  const [hover, setHover] = useState(false);
  const ref = useRef(null);
  const fnInterval = () => {
    const { current } = ref;
    const { childNodes, offsetWidth, scrollLeft, scrollWidth } = current;
    const left = scrollLeft + childNodes[1].offsetWidth + margin;
    if (scrollWidth > Math.ceil(scrollLeft + offsetWidth)) {
      current.scroll({ left, behavior: 'smooth' });
    } else {
      clearInterval(fnInterval);
    }
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  const onMouseOver = () => {
    setHover(true);
  };

  const onScroll = () => {
    hover && clearInterval(timer);
  };

  const onTouchMove = () => {
    clearInterval(timer);
  };

  useEffect(() => {
    const interval = setInterval(fnInterval, time);
    setTimer(interval);
    return () => clearInterval(interval);
  }, []);

  return { onMouseLeave, onMouseOver, onScroll, onTouchMove, ref };
};
