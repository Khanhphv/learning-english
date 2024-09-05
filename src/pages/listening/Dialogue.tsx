import { useState } from "react";
import styles from "./_.module.scss";
import AudioOperation from "./AudioOperations";

const Dialogue = ({ dialogue, audioSrc }: any) => {
  const [showDialogue, setShowDialogue] = useState(true);
  const [current, setCurrent] = useState(0);

  if (!dialogue) {
    return (
      <div>
        <span>Can not get data</span>
      </div>
    );
  }

  const englishDialogue = dialogue[0];
  const allAudio = dialogue[1];
  const vietnameseDialogue = dialogue[2];

  const handleShowDialog = () => {
    setShowDialogue(!showDialogue);
  };

  return (
    <>
      <AudioOperation
        english={englishDialogue}
        audio={allAudio}
        vietnamese={vietnameseDialogue}
        index={current}
        audioSrc={audioSrc}
      ></AudioOperation>
      <div className={styles.dialogue}>
        <div className={styles.showDialog}>
          <button onClick={handleShowDialog}>Lời thoại</button>
        </div>
        {showDialogue && (
          <div className={styles.list}>
            {englishDialogue.map((eng, index) => (
              <button
                onClick={() => setCurrent(index)}
                key={eng}
                className={styles.borderBottom}
              >
                <span>{eng}</span>
                <span id={styles.vietnamse}>
                  <br /> {vietnameseDialogue[index]}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dialogue;
