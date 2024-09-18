import { useState } from "react";
import styles from "./_.module.scss";
import AudioOperation from "./AudioOperations";
import { TextToSpeechRequest, useTextToSpeech } from "api-client/textToSpeech";
import { GENDER_NAMES } from "constants/ListListeningLessons";

const Dialogue = ({ dialogue, audioSrc }: any) => {
  const [showDialogue, setShowDialogue] = useState(true);
  const [selectedText, setSelectedText] = useState<string>("");
  const [currentAudio, setCurrentAudio] = useState<number>(0);
  const englishDialogue = dialogue[0];
  const allAudio = dialogue[1];
  const vietnameseDialogue = dialogue[2];
  const getVoiceName = (text: string | undefined | null) => {
    if (typeof text !== "string") {
      return "en-US-Neural2-C";
    }

    const colonIndex = text.indexOf(":");
    const voiceName = colonIndex !== -1 ? text.slice(0, colonIndex) : "";

    if (GENDER_NAMES.maleNames.includes(voiceName)) {
      return "en-US-Neural2-D";
    } else if (GENDER_NAMES.femaleNames.includes(voiceName)) {
      return "en-US-Neural2-H";
    } else {
      return "en-US-Neural2-C";
    }
  };

  const params: TextToSpeechRequest = {
    input: {
      text: selectedText,
    },
    voice: {
      languageCode: "en-US",
      name: getVoiceName(englishDialogue[currentAudio]),
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

  const { audioContent, isLoading, error, mutate } = useTextToSpeech(
    params || {}
  );
  const audioUrl = audioContent ? `data:audio/mp3;base64,${audioContent}` : "";


  const handleShowDialog = () => {
    setShowDialogue(!showDialogue);
  };

  const handleSelect = (text: string, index: number) => {
    const colonIndex = text.indexOf(":");
    const textAudio = colonIndex !== -1 ? text.slice(colonIndex + 1) : text;
    setCurrentAudio(index);
    setSelectedText(textAudio);
  };

  const handleAudioEnd = () => {
    if (currentAudio < englishDialogue.length - 1) {
      const nextDialog = englishDialogue[currentAudio + 1];
      handleSelect(nextDialog, currentAudio + 1);
    }
    // else{
    //   handleSelect(englishDialogue[0], 0);
    // }
  };

  return (
    <>
      <AudioOperation
        english={englishDialogue}
        audio={allAudio}
        vietnamese={vietnameseDialogue}
        audioSrc={audioUrl}
        index={currentAudio}
        onAudioEnd={handleAudioEnd}
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
