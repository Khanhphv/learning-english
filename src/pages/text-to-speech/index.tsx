import React, { useState } from "react";
import { TextToSpeechRequest, useTextToSpeech } from "api-client/textToSpeech";

export default function TextToSpeech() {
  const [text, setText] = useState<string>("");

  const params: TextToSpeechRequest = {
    input: {
      text: text, 
    },
    voice: {
      languageCode: "en-US",
      name: "en-US-Neural2-F",
      
    },
    audioConfig: {
      audioEncoding: "MP3",
    },
  };

  // Gọi useTextToSpeech mỗi khi text hoặc params thay đổi
  const { audioContent, isLoading, error } = useTextToSpeech(params);

  // Tạo URL trực tiếp từ audioContent nếu có
  const audioUrl = audioContent ? `data:audio/mp3;base64,${audioContent}` : "";
 
  return (
    <div>
      <h1>Text-to-Speech</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)} // Cập nhật text từ textarea
        placeholder="Type some text here..."
      />
      <button onClick={() => setText("Hello")}>Click</button>
      {/* Hiển thị khi đang tải hoặc có lỗi */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {/* Hiển thị audio nếu đã có dữ liệu */}
      {audioUrl ? <audio src={audioUrl} controls /> : <p>No audio available</p>}
    </div>
  );
}
