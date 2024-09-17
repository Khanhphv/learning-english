import { useState } from "react";
import styles from "./_.module.scss";

const Operations = ({ english, audio, vietnamese, audioSrc, onAudioEnd, index }: any) => {
  const [showSubtitle, setShowSubtitle] = useState(true);
  const [isLoop, setIsLoop] = useState(false);


  if (!audio) {
    return (
      <div>
        <span>Page not found - 404</span>
      </div>
    );
  }



  

  return (
    <>
      <div className={styles.audio}>
        <span> Ấn vào chi tiết đoạn hội thoại để nghe theo đoạn</span>
        <div>
          <audio
            key={audioSrc}
            loop={isLoop}
            controls
            autoPlay
            onEnded={onAudioEnd}
          >
            <source src={audioSrc} type="audio/mp3" />
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
              {english[index]} <br />{" "}
              <span style={{ color: "#a07d7d" }}>{vietnamese[index]}</span>
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Operations;
