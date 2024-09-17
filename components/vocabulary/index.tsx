import { useRouter } from "next/router";
import React from "react";
import styles from "./_.module.scss";

export interface LearnWordsProps {
  newWord: number;

}

const LearnWords = ({newWord}: LearnWordsProps) => {
  const router = useRouter();
  const age = router.query.index ? String(router.query.index) : null;

  const handleButtonStart = () => {
    router.push(`/group-age/${age}`);
  };


  return (
    <div className={styles["learn-word-container"]}>
      <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
        <div className="col-span-1">
          <h1>Learn Words</h1>
          <h3>{newWord} - Words</h3>
        </div>
        <div className="row-start-2 col-span-1 flex items-center">
          <button onClick={handleButtonStart}>Start</button>
        </div>
        <div className="relative flex items-end justify-center row-span-2 col-start-2">
          <img src="/learning-content/book-vocabulary.png" alt="Book Image" />
          <svg
            className="top-1/4"
            width={50}
            height={50}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            fill="#fefe65"
          >
            <g transform="rotate(0 25 25)">
              <path d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"></path>
            </g>
          </svg>

          <svg
            className="top-1/4 right-1/4"
            width={25}
            height={25}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            fill="#fefe65"
          >
            <g transform="rotate(120 25 25)">
              <path d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"></path>
            </g>
          </svg>

          <svg
            className="top-1/4 left-1/4"
            width={25}
            height={25}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            fill="#fefe65"
          >
            <g transform="rotate(30 25 25)">
              <path d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LearnWords;
