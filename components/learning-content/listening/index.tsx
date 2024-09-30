import Layout from "components/layout";
import { useRouter } from "next/router";
import React from "react";
import styles from "./_.module.scss";
interface ListeningComponentProps {
  topic: number;
  newWord: number;
}

function ListeningCardComponent({ topic, newWord }: ListeningComponentProps) {
  const router = useRouter();
  const age = router.query.index ? String(router.query.index) : null;

  const handleButtonStart = () => {
    router.push(`/group-age/${age}`);
  };

  return (
    <div className={styles["image-container"]}>
      <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
        <div className="col-span-1">
          <h1>Listening</h1>
          <h3>
            {topic} Topic - {newWord} New words
          </h3>
        </div>
        <div className="row-start-2 flex items-center">
          <button onClick={handleButtonStart}>Start</button>
        </div>
        <div className="relative col-span-1 row-span-2 flex justify-center items-center">
          <img
            src="/learning-content/listening-headphone.png"
            alt="HeadPhone Image"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 800 400"
          >
            <rect
              x="8%"
              y="20%"
              width="20"
              height="20"
              fill="#fefe65"
              transform="rotate(30 160 225)"
            />
            <rect
              x="65%"
              y="5%"
              width="40"
              height="40"
              fill="#fc7efc"
              transform="rotate(45 550 200)"
            />
            <rect x="90%" y="75%" width="30" height="30" fill="#ffa042" />
            <circle cx="62%" cy="88%" r="2%" fill="#fefe65" />
            <circle cx="72%" cy="8%" r="1.5%" fill="white" />
            <circle cx="52%" cy="76%" r="2%" fill="white" />
            <circle cx="38%" cy="95%" r="3%" fill="#ffa042" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ListeningCardComponent;
