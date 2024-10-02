import { useEffect, useRef, useState } from "react";
import { Vocabulary } from "./[...index]";
import styles from "./_.module.scss";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Pagination, Scrollbar, A11y } from "swiper/modules";
import { TextToSpeechRequest, useTextToSpeech, TextToSpeechFetcher } from "api-client/textToSpeech";

const ListNewWord = ({ words }: { words: Vocabulary[] }) => {
  const [selectedWord, setSelectedWord] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [audioUrl, setAudioUrl] = useState<string>("");
  const { isLoading, error, mutate } = useTextToSpeech(null);

  const handleSelectedWord = async (word: string) => {
    setSelectedWord(word);
  
    const params: TextToSpeechRequest = {
      input: {
        text: word,
      },
      voice: {
        languageCode: "en-US",
        name: "en-US-Wavenet-D",
      },
      audioConfig: {
        audioEncoding: "MP3",
      },
    };
  
    try {
      const data = await TextToSpeechFetcher("/text:synthesize", params);
      if (data) {
        setAudioUrl(`data:audio/mp3;base64,${data.audioContent}`);
      }
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      console.log("play");
      audioRef.current.onended = () => {
        setAudioUrl(""); 
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
