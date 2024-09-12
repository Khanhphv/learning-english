import React, { useState } from "react";
import axios from "axios";

export default function TextToSpeech() {
  const [audioUrl, setAudioUrl] = useState<string>("");

  const handleTextToSpeech = async (text: string) => {
    const apiKey = "AIzaSyDd2UOHZM1I50a9mlGDQcMOZpmMGbc9t-E";
    const request = {
      input: { text },
      voice: {
        languageCode: "en-US",
        name: "en-US-Wavenet-C",
      },
      audioConfig: { audioEncoding: "MP3" },
    };

    const response = await axios.post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      request,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const audioBlob = response.data.audioContent;
    const audioUrl = `data:audio/mp3;base64,${audioBlob}`;
    setAudioUrl(audioUrl);
  };

  return (
    <div>
      <h1>Text-to-Speech</h1>
      <textarea onChange={(e) => handleTextToSpeech(e.target.value)} />
      {audioUrl && <audio src={audioUrl} controls />}
    </div>
  );
}
