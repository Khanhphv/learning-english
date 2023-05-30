import React, { useState, CSSProperties, useEffect } from "react";
import {
  useTransition,
  animated,
  AnimatedProps,
  useSpringRef,
} from "@react-spring/web";
import styles from "./_.module.scss";
import {
  Vocabulary,
  OtherWay,
  EffectiveWay,
  TalkFluently,
} from "components/how-to-learn";
import Layout from "components/layout";

const pages: ((
  props: AnimatedProps<{ style: CSSProperties }>
) => React.ReactElement)[] = [
  ({ style }) => (
    <animated.div style={{ ...style, background: "lightcoral" }}>
      <Vocabulary />
    </animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, background: "lightblue" }}>
      <TalkFluently />
    </animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, background: "lightgreen" }}>
      <EffectiveWay />
    </animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, background: "lightsalmon" }}>
      <OtherWay />
    </animated.div>
  ),
];

const HowToLearn = () => {
  const [index, set] = useState(0);
  const onClick = () => {
    set((state) => (state + 1) % 4);
  };
  const transRef = useSpringRef();
  const transitions = useTransition(index, {
    ref: transRef,
    keys: null,
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  });
  useEffect(() => {
    transRef.start();
  }, [index]);
  return (
    <div className={`flex ${styles.container}`} onClick={onClick}>
      {transitions((style, i) => {
        const Page = pages[i];
        return <Page style={style} />;
      })}
    </div>
  );
};
HowToLearn.getLayout = Layout;
export default HowToLearn;
