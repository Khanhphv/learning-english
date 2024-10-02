import { useState } from "react";
import styles from "./_.module.scss";
import AudioOperation from "./AudioOperations";
import { TextToSpeechRequest, useTextToSpeech } from "api-client/textToSpeech";
import { GENDER_NAMES } from "constants/ListListeningLessons";
import { DialogueLine } from "./[...index]";
import { toast } from "sonner";

const Dialogue = ({ dialogueLines} : {dialogueLines: DialogueLine[] | undefined}) => {
  const [showDialogue, setShowDialogue] = useState(true);
  const [selectedText, setSelectedText] = useState<string>("");
  const [currentAudio, setCurrentAudio] = useState<number>(0);
  const [english, setEnglish] = useState<string>("");
  const [vietnamese, setVietnamese] = useState<string>("");
  const [speaker, setSpeaker] = useState<string>("");
  const getVoiceName = (speaker: string | undefined | null) => {
    if (typeof speaker !== "string") {
      return "en-US-Neural2-C";
    }

    if (GENDER_NAMES.maleNames.includes(speaker)) {
      return "en-US-Neural2-D";
    } else if (GENDER_NAMES.femaleNames.includes(speaker)) {
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
      name: getVoiceName(speaker),
    },
    audioConfig: {
      audioEncoding: "MP3",
    },
  };

  // if (!dialogueLines) {
  //   toast.error("Error when fetching data");
  // }

  const { audioContent, isLoading, error, mutate } = useTextToSpeech(
    params || {}
  );
  const audioUrl = audioContent ? `data:audio/mp3;base64,${audioContent}` : "";

  if(error){
    toast.error("Error when create audio");
  }

  const handleShowDialog = () => {
    setShowDialogue(!showDialogue);
  };

  const handleSelect = (english: string, vietnamese: string, index: number, speaker:string) => {
    setCurrentAudio(index);
    setSelectedText(english);
    setSpeaker(speaker);
    setEnglish(english);
    setVietnamese(vietnamese);
  };

  const handleAudioEnd = () => {
    const nextAudioIndex = currentAudio + 1;
    if (dialogueLines && nextAudioIndex < dialogueLines.length) {
      const nextDialogue = dialogueLines[nextAudioIndex];
      handleSelect(nextDialogue.englishSentence, nextDialogue.vietnameseSentence, nextAudioIndex, nextDialogue.speaker);
    }
    
  };

  return (
    <>
      <AudioOperation
        english={english}
        vietnamese={vietnamese}
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
            {dialogueLines && dialogueLines.map((dialogue: DialogueLine, index: number) => (
              <button
                onClick={() => handleSelect(dialogue.englishSentence, dialogue.vietnameseSentence, index, dialogue.speaker)}
                key={dialogue.id}
                className={styles.borderBottom}
              >
                <span>{dialogue.englishSentence}</span>
                <span style={{color: "#2c76c0"}}>
                  <br /> {dialogue.vietnameseSentence}
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
