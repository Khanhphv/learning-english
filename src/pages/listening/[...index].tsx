import React, { useEffect, useState } from 'react';
import List from './List';
import styles from "./_.module.scss";
import Image from './image';
import Operations from './AudioOperations';
import { useRouter } from 'next/router';
 
function Page() {
  const router = useRouter();
  return (
    <p className={styles.title}>
      {router.query.index ? `topic ${router.query.index[1]} - age ${router.query.index[0]}` : ''}
    </p>
  );
}

// async function logJSONData(file) {
//   const response = await fetch(file);
//   const jsonData = await response.json();
//   console.log(jsonData);
// }

// logJSONData('https://sheets.googleapis.com/v4/spreadsheets/1CatcEnNR5KpWCfPz-95YUVlE2WVDY4bYVFCNPP6Bnjo/values/basic!A29:F138?key=AIzaSyBEC-5QDF7ocl-iJpC_vyXJjKyCdlR39i0')

const listeningComponent = () => {
  const [mobile,setMobile] = useState(false)
  useEffect(() => {
    function resize() {
      const width = window.innerWidth;
      setMobile(width <= 480)
    }
    window.addEventListener("resize", resize);
    resize();
    return () => {
      window.removeEventListener("resize", resize);
    };
  })
  return (
    <div className={styles.layout}>
      <Page />
      { mobile 
        ? <Operations />
        : ''
      }
      <div className={styles.wrapper}>
        <Image />
        <List />
      </div>
      { !mobile
        ? <Operations />
        : ''
      }
    </div>
  )
}

export default listeningComponent