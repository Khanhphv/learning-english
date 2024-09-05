import { useState } from "react";
import styles from "./_.module.scss";

const Operations = ({ english, audio, vietnamese, index, audioSrc }: any) => {
  const [showSubtitle, setShowSubtitle] = useState(true);
  const [isLoop, setIsLoop] = useState(false);
  const [current, setCurrent] = useState(index);
  const [prevIndex, setPrevIndex] = useState(index);

  if (!audio) {
    return (
      <div>
        <span>Page not found - 404</span>
      </div>
    );
  }

  const audioSource = audioSrc + audio[current];
  const length = english.length;

  if (prevIndex !== index) {
    setCurrent(index);
    setPrevIndex(index);
  }

  const handleSwitch = () => {
    if (current < length - 1) {
      setCurrent(current + 1);
    }
  };

  return (
    <>
      <div className={styles.audio}>
        <span> Ấn vào chi tiết đoạn hội thoại để nghe theo đoạn</span>
        <div>
          <audio
            key={audioSource}
            loop={isLoop}
            autoPlay
            controls
            onEnded={handleSwitch}
          >
            <source src={audioSource} type="audio/mp4" />
            Your browser does not support the audio element.
          </audio>
        </div>

        <div style={{ display: "flex" }}>
          <input
            className={styles.switch}
            type="checkbox"
            onChange={() => setIsLoop(!isLoop)}
          />
          <span style={{ margin: "2px 0px 0px 4px" }}>Vòng lặp</span>
        </div>
        <div style={{ display: "flex", marginTop: "10px" }}>
          <input
            className={styles.switch}
            type="checkbox"
            onChange={() => setShowSubtitle(!showSubtitle)}
            checked={showSubtitle}
          />
          <span style={{ margin: "2px 0px 0px 4px" }}>Hiện subtitle</span>
        </div>

        <div style={{ paddingTop: "5px" }}>
          {showSubtitle && (
            <span>
              {english[current]} <br />{" "}
              <span style={{ color: "#a07d7d" }}>{vietnamese[current]}</span>
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Operations;
