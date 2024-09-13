import Layout from "components/layout";
import React from "react";
import styles from "./_.module.scss";
interface ListeningComponentProps {
  topic: number;
  newWord: number;
}

function ListeningCardComponent({ topic, newWord }: ListeningComponentProps) {
  return (
    <div className={styles.container}>
      <div className={styles["image-container"]}>
        <div className="grid grid-cols-2 grid-rows-2">
          <div className="col-span-1">
            <h1>Listening</h1>
            <h3>
              {topic} Topic - {newWord} New words
            </h3>
          </div>
          <div className="row-start-2 flex items-center">
            <button>Start</button>
          </div>
          <div className="relative col-span-1 row-span-2 flex justify-center">
            <img
              src="/learning-content/listening-headphone.png"
              alt="HeadPhone Image" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
              <rect
                x="150"
                y="200"
                width="20"
                height="20"
                fill="#fefe65"
                transform="rotate(30 160 225)" />
              <rect
                x="650"
                y="50"
                width="40"
                height="40"
                fill="#fc7efc"
                transform="rotate(45 670 70)" />
              <rect x="600" y="250" width="30" height="30" fill="#ffa042" />
              <circle cx="620" cy="180" r="5" fill="#fefe65" />
              <circle cx="720" cy="120" r="6" fill="white" />
              <circle cx="520" cy="360" r="5" fill="white" />
              <circle cx="380" cy="350" r="6" fill="#ffa042" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListeningCardComponent;
