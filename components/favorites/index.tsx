import { useRouter } from "next/router";
import React from "react";
import styles from "./_.module.scss";

export interface FavoriteComponentProps {
  topic: number;
  newWord: number;
}

const FavoriteCardComponent = ({ topic, newWord }: FavoriteComponentProps) => {
  const router = useRouter();
  const age = router.query.index ? String(router.query.index) : null;

  const handleButtonStart = () => {
    router.push(`/group-age/${age}`);
  };

  return (
    <div className={styles["heart-container"]}>
      <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
        <div className="col-span-1">
          <h1>Favorites</h1>
          <h3>
            {topic} Topic - {newWord} Words
          </h3>
        </div>
        <div className="row-start-2 col-span-1 flex items-center">
          <button onClick={handleButtonStart}>Start</button>
        </div>
        <div className="relative flex items-end justify-center row-span-2 col-start-2">
          <img src="/learning-content/favorites.png" alt="Book Image" />
          <svg
            className="top-1/4 "
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M16.44 3.10156C14.63 3.10156 13.01 3.98156 12 5.33156C10.99 3.98156 9.37 3.10156 7.56 3.10156C4.49 3.10156 2 5.60156 2 8.69156C2 9.88156 2.19 10.9816 2.52 12.0016C4.1 17.0016 8.97 19.9916 11.38 20.8116C11.72 20.9316 12.28 20.9316 12.62 20.8116C15.03 19.9916 19.9 17.0016 21.48 12.0016C21.81 10.9816 22 9.88156 22 8.69156C22 5.60156 19.51 3.10156 16.44 3.10156Z"
                fill="#ff707e"
              ></path>{" "}
            </g>
          </svg>
          <svg
            className="top-1/4 left-1/3"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M16.44 3.10156C14.63 3.10156 13.01 3.98156 12 5.33156C10.99 3.98156 9.37 3.10156 7.56 3.10156C4.49 3.10156 2 5.60156 2 8.69156C2 9.88156 2.19 10.9816 2.52 12.0016C4.1 17.0016 8.97 19.9916 11.38 20.8116C11.72 20.9316 12.28 20.9316 12.62 20.8116C15.03 19.9916 19.9 17.0016 21.48 12.0016C21.81 10.9816 22 9.88156 22 8.69156C22 5.60156 19.51 3.10156 16.44 3.10156Z"
                fill="#ff707e"
              ></path>{" "}
            </g>
          </svg>

          <svg
            className="top-1/4 left-2/3  sm:left-1/2"
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M16.44 3.10156C14.63 3.10156 13.01 3.98156 12 5.33156C10.99 3.98156 9.37 3.10156 7.56 3.10156C4.49 3.10156 2 5.60156 2 8.69156C2 9.88156 2.19 10.9816 2.52 12.0016C4.1 17.0016 8.97 19.9916 11.38 20.8116C11.72 20.9316 12.28 20.9316 12.62 20.8116C15.03 19.9916 19.9 17.0016 21.48 12.0016C21.81 10.9816 22 9.88156 22 8.69156C22 5.60156 19.51 3.10156 16.44 3.10156Z"
                fill="#ff707e"
              ></path>{" "}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCardComponent;
