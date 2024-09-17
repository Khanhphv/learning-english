import { useState } from "react";
import styles from "./_.module.scss";
import AudioOperation from "./AudioOperations";
import { TextToSpeechRequest, useTextToSpeech } from "api-client/textToSpeech";

const Dialogue = ({ dialogue, audioSrc }: any) => {
  const [showDialogue, setShowDialogue] = useState(true);
  const [current, setCurrent] = useState(0);
  const [selectedText, setSelectedText] = useState<string>("");

  const params: TextToSpeechRequest = {
    input: {
      text: selectedText, 
    },
    voice: {
      languageCode: "en-US",
      name: "en-US-Neural2-F",
      
    },
    audioConfig: {
      audioEncoding: "MP3",
    },
  };

  

  if (!dialogue) {
    return (
      <div>
        <span>Can not get data</span>
      </div>
    );
  }

  const { audioContent, isLoading, error } = useTextToSpeech(params || {});
  const audioUrl = audioContent ? `data:audio/mp3;base64,${audioContent}` : "";

  const englishDialogue = dialogue[0];
  const allAudio = dialogue[1];
  const vietnameseDialogue = dialogue[2];

  const handleShowDialog = () => {
    setShowDialogue(!showDialogue);
  };

  const handleSelect = (text: string, index: number) => {
    const colonIndex = text.indexOf(":");
    const textAudio = colonIndex !== -1 ? text.slice(colonIndex + 1) : text;
    

    setSelectedText(textAudio);
    setCurrent(index);
  };
  return (
    <>
      <AudioOperation
        english={englishDialogue}
        audio={allAudio}
        vietnamese={vietnameseDialogue}
        index={current}
        audioSrc={audioUrl}
      ></AudioOperation>
      <div className={styles.dialogue}>
        <div className={styles.showDialog}>
          <button onClick={handleShowDialog}>Lời thoại</button>
        </div>
        {showDialogue && (
          <div className={styles.list}>
            {englishDialogue.map((eng: string, index: number) => (
              <button
                onClick={() => handleSelect(eng, index)}
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
