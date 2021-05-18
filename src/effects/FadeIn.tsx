import React from 'react';
import { useInView } from 'react-intersection-observer';

const FadeIn = ({ threshold = 0.15, triggerOnce = false, yDistance = 0, xDistance = 0, duration = 1000, ...remainingProps }) => {
  const [ref, inView] = useInView({ threshold, triggerOnce });

  return (
    <div
      style={{
        transition: `opacity ${duration}ms, transform ${duration}ms`,
        opacity: inView ? 1 : 0,
        transform: `translateY(${inView ? 0 : yDistance}px) translateX(${inView ? 0 : xDistance}px)`,
      }}
      {...remainingProps}
      ref={ref}
    />
  );
};

export default FadeIn;