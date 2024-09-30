import { useState } from "react";
import styles from "./_.module.scss";
import { Switch } from "@/components/ui/switch";
const Operations = ({
  english,
  vietnamese,
  audioSrc,
  onAudioEnd,
  index,
}: any) => {
  const [showSubtitle, setShowSubtitle] = useState(true);
  const [isLoop, setIsLoop] = useState(false);

  return (
    <>
      <div className={styles.audio}>
        <div className="mb-4"> Ấn vào chi tiết đoạn hội thoại để nghe theo đoạn</div>
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
          <Switch
            className="data-[state=unchecked]:bg-gray-400 data-[state=checked]:bg-green-400"
            id="loop"
            onCheckedChange={() => setIsLoop(!isLoop)}
            checked={isLoop}
          />
          <label htmlFor="loop" >Vòng lặp</label>

        </div>
        <div className="flex mt-2 mb-2">
          <Switch
            className="data-[state=unchecked]:bg-gray-400 data-[state=checked]:bg-green-400"

            onCheckedChange={() => setShowSubtitle(!showSubtitle)}
            checked={showSubtitle}
          ></Switch>

          <span style={{ margin: "2px 0px 0px 4px" }}>Hiện subtitle</span>
        </div>

        <div style={{ paddingTop: "5px" }}>
          {showSubtitle && (
            <div>
              {english} <br />{" "}
              <div style={{ color: "#2c76c0" }}>{vietnamese}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Operations;
