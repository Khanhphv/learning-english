import { useEffect, useState } from 'react';
import styles from "./_.module.scss";
const PracticeIcon = () => {
  const [iconSize,setIconSize] = useState('30')
  useEffect(() => {
    function resize() {
      const width = window.innerWidth;
      setIconSize(width > 768 ? '15' : (width > 480 ? '20' : '45'))
    }
    window.addEventListener("resize", resize);
    resize();
    return () => {
      window.removeEventListener("resize", resize);
    };
  })

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={iconSize} viewBox="0 -960 960 960" width={iconSize}><path d="M290-290h140v-140H290v140Zm240 0h140v-140H530v140ZM290-530h140v-140H290v140Zm240 0h140v-140H530v140ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Zm0-600v600-600Z"/></svg>
  )
}
const Practice = () => {
  const handleClick = () => {
    // do something
  }
  return (
    <button onClick={handleClick} id={styles.practice}>
      <PracticeIcon />
      Luyện Nghe
    </button>
  )
}

const RollBack = () => {
  const [time,setTime] = useState('0')
  const handleClick = () => {
    // do something
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value)
  }
  return (
    <div className={styles.operation}>
      <button onClick={handleClick} id={styles.rollBack}> Lùi lại </button>
      <input type="text" value={time} onChange={handleChange} />
      <label> giây </label>
    </div>
  )
}

const AudioSpeed = () => {
  const [multiplier,setMultiplier] = useState(1.0)
  const handleDecrease = () => {
    if(multiplier > 0.25) {
      setMultiplier(multiplier - 0.25)
    }
  }
  const handleIncrease = () => {
    if(multiplier < 2) {
      setMultiplier(multiplier + 0.25)
    }
  }
  // const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
  //   if(multiplier < 0) {
  //     setMultiplier(0.25)
  //   }
  //   else if (multiplier > 2.0) {
  //     setMultiplier(2.0)
  //   }
  //   else {
  //     setMultiplier(event.target.value)
  //   }
  // }
  return (
    <div className={styles.operation}>
      <button onClick={handleDecrease} id={styles.multiplier}> - </button>
      <input value={multiplier} readOnly disabled/>
      <button onClick={handleIncrease} id={styles.multiplier}> + </button>
    </div>
  )
}

const Operations = () => {
  return (
    <div className={styles.audioOperations}>
      <Practice />
      <div className={styles.operationsWrapper}>
        <RollBack />
        <AudioSpeed />
      </div>
    </div>
  )
}

export default Operations