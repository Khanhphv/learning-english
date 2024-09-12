import AgeCardView from "components/age-card";
import MovingBackground from "components/background";
import Layout from "components/layout";
import React, { useEffect } from "react";
import { useSpring, animated, useSpringRef } from "@react-spring/web";
const TableAge = () => {
  const transRef = useSpringRef();
  const style = useSpring({
    ref: transRef,
    from: {opacity: 0 , transform: 'translate3d(0,100%,0)'},
    to:{opacity: 1, transform: 'translate3d(0%,0,0)'}
  })

  useEffect(() => {
    transRef.start();

  }, [])

  return (
    <animated.div style={style} className="relative w-auto h-auto overflow-hidden">
      <MovingBackground />
      <div className="absolute w-full h-full z-50 flex justify-center items-center top-0 left-0">
        <AgeCardView />
      </div>
    </animated.div>
  );
};

TableAge.getLayout = Layout;
export default TableAge;
