import { Question, QuestionType } from "@/pages/exam/[index]";
import {
  TextToSpeechFetcher,
  TextToSpeechRequest,
} from "api-client/textToSpeech";
import { Mic, Volume2, Square } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  fetchSpeechToText,
  SpeechToTextRequest,
} from "api-client/speechToText";
import { set } from "react-hook-form";


interface QuestionProps {
  index: number;
  question: Question;
  numberOfQuestions: number;
  handleSelectAnswer: (questionId: string, vocabularyId: string) => void;
  submitAnswer: boolean;
}

const QuestionComponent = ({
  index,
  question,
  numberOfQuestions,
  handleSelectAnswer,
  submitAnswer,
}: QuestionProps) => {
  const params: TextToSpeechRequest = {
    input: {
      text: question.vocabulary.englishWord,
    },
    voice: {
      languageCode: "en-US",
      name: "en-US-Wavenet-D",
    },
    audioConfig: {
      audioEncoding: "MP3",
    },
  };

  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const [audioUrl, setAudioUrl] = useState<string>("");
  const [transcriptResult, setTranscriptResult] = useState<string | null>(null);

  const handleListen = async () => {
    try {
      const data = await TextToSpeechFetcher("/text:synthesize", params);
      if (data) {
        setAudioUrl(`data:audio/mp3;base64,${data.audioContent}`);
      }
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  };

  

  const startRecording = async () => {
    if (submitAnswer) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event) => {
        setAudioBlob(event.data);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      toast.error("Error accessing the microphone");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const handleSpeechToText = async () => {
    if (!audioBlob || submitAnswer) return;

    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = async () => {
      const base64data = reader.result?.toString().split(",")[1];
      const requestData: SpeechToTextRequest = {
        audio: {
          content: base64data || "",
        },
        config: {
          encoding: "WEBM_OPUS",
          languageCode: "en-US",
        },
      };
      try {
        const data = await fetchSpeechToText(requestData);
        const transcript = data?.results[0]?.alternatives[0]?.transcript;
        console.log(transcript);
        if (transcript) {
          setTranscriptResult(transcript);
          if (
            transcript.toLowerCase() ===
            question.vocabulary.englishWord.toLowerCase()
          ) {
            handleSelectAnswer(question.id, question.options[0].vocabularyId);
          } else {
            handleSelectAnswer(question.id, "Incorrect");
          }
        } else {
          toast.error("Please try again!");
        }
      } catch (error) {
        toast.error("Please try again!");
      }
    };
  };

  useEffect(() => {
    if (audioUrl) {
      const newAudio = new Audio(audioUrl);
      newAudio.play();
    }
  }, [audioUrl]);

  return (
    <div
      className="w-full p-5 max-w-3xl min-h-[30rem] md:w-[40rem] lg:w-[50rem] rounded-2xl"
      style={{ boxShadow: "0 0 10px 3px rgba(0,0,0,0.1)" }}
    >
      <div className=" flex justify-between">
        <div className="text-gray-500 text-sm font-medium">Term</div>
        <div className="text-gray-500 text-xs ">
          {index + 1} of {numberOfQuestions}
        </div>
      </div>
      <div className="mt-5">
        Choose the correct answer corresponding to each type of question
        (Listening, Reading). For pronunciation questions, click on record to do
        the test.
      </div>

      {question &&
      question.questionType === QuestionType.MULTIPLE_CHOICE_BASIC ? (
        <div className="mt-5 font-medium text-lg italic text-orange-300">
          Meaning of the word: "{question.vocabulary.englishWord}"?
        </div>
      ) : question && question.questionType === QuestionType.SPEAK ? (
        <div className="mt-5  flex flex-col justify-center items-start gap-5 w-full">
          <div className=" font-medium text-lg italic text-orange-300">
            Click on mic to speak the word: "{question.vocabulary.englishWord}"
          </div>
          <div className="flex justify-center mb-4">
            {isRecording ? (
              <Button onClick={stopRecording} variant="destructive">
                <Square className="mr-2 h-4 w-4" /> Stop Recording
              </Button>
            ) : (
              <Button onClick={startRecording}>
                <Mic className="mr-2 h-4 w-4" /> Start Recording
              </Button>
            )}
          </div>

          {audioBlob && (
            <div className="w-full flex items-center">
              <audio
                controls
                src={URL.createObjectURL(audioBlob)}
                className="w-[50%]"
              />
              <div className="ml-5">
                <Button
                  onClick={handleSpeechToText}
                  className="bg-green-200 text-black hover:bg-green-300"
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : question && question.questionType === QuestionType.LISTEN ? (
        <div className="mt-5  flex justify-start items-center w-full">
          <div className=" font-medium text-lg italic text-orange-300">
            Click on mic to listen and choose the correct answer!
          </div>
          <div className="ml-3 hover:bg-blue-100 hover:cursor-pointer transition-all duration-150 hover:text-blue-500 hover:scale-110  p-2 rounded-full">
            <Volume2 onClick={handleListen} />
          </div>
        </div>
      ) : null}

      <div className="text-gray-500 text-sm font-medium my-5">
        {question && question.questionType !== QuestionType.SPEAK
          ? "Choose matching definition"
          : "Pronunciation skills are assessed below:"}
      </div>
      {transcriptResult && (
        <div className="mt-3">
          {transcriptResult === question.vocabulary.englishWord ? (
            <div className="text-xl">
              <div className="text-green-500 font-medium">Correct!</div>
              <div className="font-medium">
                Your answer:{" "}
                <span className="text-green-500">{transcriptResult}</span>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-red-500 font-medium text-xl">
                Wrong answer:
                <span className="ml-2">
                  {Array.from(transcriptResult).map((char, index) => {
                    if (char === question.vocabulary.englishWord[index]) {
                      return (
                        <span key={index} className="text-green-500 ">
                          {question.vocabulary.englishWord[index]}
                        </span>
                      );
                    } else {
                      return (
                        <span key={index} className="text-red-500 underline">
                          {question.vocabulary.englishWord[index]}
                        </span>
                      );
                    }
                  })}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex flex-wrap gap-3 justify-center">
        {question &&
          question.questionType !== QuestionType.SPEAK &&
          question.options.map((option, index) => (
            <section
              key={index}
              className={`w-[45%] `}
              onClick={() => {
                if (!submitAnswer) {
                  handleSelectAnswer(question.id, option.vocabularyId);
                }
              }}
            >
              <div
                aria-selected={option.vocabularyId === question.userAnswerId}
                className={`w-full h-full p-10  border-2 rounded-xl flex justify-center items-center ${
                  submitAnswer
                    ? option.correct 
                      ? "cursor-default bg-green-200 border-green-500 text-black"
                      : option.vocabularyId === question.userAnswerId 
                        ? "cursor-default bg-red-200 border-red-500 text-black"
                        : "cursor-default bg-violet-50  text-black opacity-50"
                    : "hover:cursor-pointer bg-violet-50 hover:border-violet-500 aria-selected:bg-indigo-200 aria-selected:border-indigo-500"
                }`}
              >
                {option.answer}
              </div>
            </section>
          ))}
      </div>
    </div>
  );
};

export default QuestionComponent;
