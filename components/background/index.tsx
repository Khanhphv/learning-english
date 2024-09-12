import React from "react";
import {useSpring, animated} from "@react-spring/web"; 
const url = (name: string) =>
  `https://awv3node-homepage.surge.sh/build/assets/${name}.svg`;

const MovingBackground = () => {
    const starsAnimation = useSpring({
        from:{transform: "translateY(-20%"},
        to:{transform: "translateY(100%"},
        config: {duration: 5000},
        loop: {reverse: true, reset: true}
    })

    const cloudsAnimation = useSpring({
        from: { transform: "translateX(-50%)" },
        to: { transform: "translateX(100%)" },
        config: { duration: 25000 },
        loop: true,
      });



  return (
    <div className="relative w-screen h-screen bg-gradient-to-b to-white from-indigo-200 overflow-hidden">
      <animated.div style={starsAnimation} className="absolute w-full h-full ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
          <circle cx="50" cy="50" r="2" fill="white" />
          <circle cx="100" cy="150" r="3" fill="white" />
          <circle cx="200" cy="100" r="1.5" fill="white" />
          <circle cx="300" cy="200" r="2.5" fill="white" />
          <circle cx="500" cy="300" r="2" fill="white" />
          <circle cx="600" cy="400" r="1.5" fill="white" />
          <circle cx="150" cy="200" r="2" fill="white" />
          <circle cx="250" cy="150" r="2" fill="white" />
          <circle cx="350" cy="50" r="2" fill="white" />
          <circle cx="450" cy="25" r="2" fill="white" />
          <circle cx="550" cy="100" r="2" fill="white" />
          <circle cx="650" cy="75" r="2" fill="white" />
          <circle cx="750" cy="150" r="2" fill="white" />
          <circle cx="320" cy="280" r="1.6" fill="white" />
          <circle cx="420" cy="90" r="2.4" fill="white" />
          <circle cx="520" cy="150" r="1.9" fill="white" />
          <circle cx="620" cy="580" r="2.1" fill="white" />
          <circle cx="720" cy="120" r="1.7" fill="white" />
          <circle cx="180" cy="320" r="2.3" fill="white" />
          <circle cx="280" cy="420" r="1.5" fill="white" />
          <circle cx="380" cy="520" r="2.0" fill="white" />
        </svg>
      </animated.div>

      <animated.div style={cloudsAnimation} className="absolute w-full h-full top-20 overflow-hidden">
        <img
          src={url("cloud")}
          style={{ display: "block", width: "10%", marginLeft: "60%" }}
        />
        <img
          src={url("cloud")}
          style={{ display: "block", width: "15%", marginLeft: "30%" }}
        />
        <img
          src={url("cloud")}
          style={{ display: "block", width: "7%", marginLeft: "10%" }}
        />
        <img
          src={url("cloud")}
          style={{ display: "block", width: "10%", marginLeft: "75%" }}
        />
        <img
          src={url("cloud")}
          style={{ display: "block", width: "10%", marginLeft: "70%" }}
        />
        <img
          src={url("cloud")}
          style={{ display: "block", width: "10%", marginLeft: "40%" }}
        />
        
      </animated.div>
    </div>
  );
};

export default MovingBackground;
