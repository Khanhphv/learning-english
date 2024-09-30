import { useEffect, useRef, useState } from "react";
import { Vocabulary } from "./[...index]";
import styles from "./_.module.scss";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { TextToSpeechRequest, useTextToSpeech } from "api-client/textToSpeech";

const ListNewWord = ({ words }: { words: Vocabulary[] }) => {
  const [selectedWord, setSelectedWord] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Trạng thái để lưu trữ việc đã gọi API hay chưa
  const [isSpeaking, setIsSpeaking] = useState(false);

  const params: TextToSpeechRequest = {
    input: {
      text: selectedWord,
    },
    voice: {
      languageCode: "en-US",
      name: "en-US-Wavenet-D",
    },
    audioConfig: {
      audioEncoding: "MP3",
    },
  };

  const { audioContent, isLoading, error, mutate } = useTextToSpeech(
    isSpeaking ? params : null // Chỉ gọi API khi isSpeaking là true
  );

  const audioUrl = audioContent ? `data:audio/mp3;base64,${audioContent}` : "";

  const handleSelectedWord = (word: string) => {
    setSelectedWord(word);
    setIsSpeaking(true); // Đánh dấu là đang nói
  }

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      console.log("play");
      // Reset trạng thái isSpeaking sau khi phát xong
      audioRef.current.onended = () => {
        setIsSpeaking(false);
      };
    }
  }, [audioUrl]);

  return (
    <>
      <h2 id={styles.titleNewWord}>
        Nếu bạn không hiểu hãy tra từ mới phía dưới!
      </h2>

      <div className="container mx-auto px-14 py-14 flex gap-4 flex-wrap justify-center">
        <Swiper
          className="container"
          modules={[Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            320: {
              slidesPerView: 2, 
              spaceBetween: 5, 
            },
            640: {
              slidesPerView: 3, 
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4, 
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 5, 
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 6, 
              spaceBetween: 30,
            },
          }}
        >
          {words.map((word, index) => (
            <SwiperSlide key={index}>
              <div className={styles.wordContainer}>
                <div className={styles.englishWord}>{word.englishWord}</div>
                <div className={styles.vietnameseMeaning}>
                  {word.vietnameseMeaning}
                </div>
                <div>
                  <button onClick={() => handleSelectedWord(word.englishWord)}>
                    <SpeakerWaveIcon className="size-8 text-blue-400" />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <audio hidden ref={audioRef}></audio>
    </>
  );
};

export default ListNewWord;
