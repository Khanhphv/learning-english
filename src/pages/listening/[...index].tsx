import React, { useRef } from "react";
import Dialogue from "./Dialogue";
import styles from "./_.module.scss";
import { useRouter } from "next/router";
import { Ranges } from "../../../constants/ListListeningLessons";
import ListNewWord from "./newWords";
import Layout from "components/layout";
import { GOOGLE_API_KEY, GOOGLE_API_PRE, COLUMNS } from "constants/googleapi";
import useSWR from "swr";
import Head from "next/head";
import { toast } from "sonner";
import { type } from "os";
import { TopicResponse } from "../group-age/[slug]";
import YouTube from "react-youtube";

type Conversation = {
  id: string,
  title: string,
  youtubeVideo: string,
}



type DialogueLine = {
  id: string,
  speaker: string,
  englishSentence: string,
  vietnameseSentence: string,
}


const ListeningComponent = () => {
  const conversations = useRef<Conversation[]>();
  const dialogueLines = useRef<DialogueLine[]>();
  const topic = useRef<TopicResponse>();
  const newWords = useRef([]);
  const newWordsVietnamese = useRef([]);
  const dialogue = useRef([[], [], []]);
  const router = useRouter();
  const { index } = router.query;
  const topicId = index ? String(index[0]) : null;


  const { data: conversation_data, error: conversation_error } = useSWR(`/conversation/${topicId}`, {
      revalidateOnMount: true,
      revalidateOnFocus: false,
  })

  const { data: topic_data, error: topic_error } = useSWR(`/topic/info/${topicId}`, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
})

  if (conversation_data && topic_data) {
    conversations.current = conversation_data.result;
    topic.current = topic_data.result;
    // newWords.current = data[2].toString().split(",");
    // dialogue.current = [data[4], data[6], data[7]];
    // newWordsVietnamese.current = data[8].toString().split(",");
    console.log(topic);
    console.log(conversations);
  }

  if (conversation_error || !topicId) {
    toast.error("Error when getting topic info");
  }

  const { data: dialogue_data, error: dialogue_error } = useSWR(`/dialogue/${conversations.current?.at(0)?.id}`, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
})
  
  if (dialogue_data) {
    dialogueLines.current = dialogue_data.result;
    console.log(dialogueLines);
  }

  if(dialogue_error) {
    toast.error("Error when getting dialogue");
  }
  const videoId = conversations.current?.at(0)?.youtubeVideo?.substring(32);

  return (
    <>
      <Head>
        <title>Listening</title>
      </Head>
      <div className={styles.layout}>
        <div className={styles.header}>
          <div className={styles.title}>
            <span>{`Topic: ${
              topic.current ? topic.current.title : "No content"
            }`}</span>
          </div>
        </div>
        <div className={styles.wrapper}>
        {videoId ? (
            <YouTube
              key={videoId}
              videoId={videoId}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: 1,
                },
              }}
            />
          ) : (
            <p>No video available</p>
          )}


          {/* <div className={styles.imageDisplay}>
            <img
              src={`/imgs/${age}/${age.substring(3)}.${id}.jpg`}
              alt="dailyroutin"
            />
          </div> */}
          {/* <Dialogue
            dialogue={dialogue.current}
            audioSrc={`/audio/${age}/${age?.substring(3)}.${id}/`}
          ></Dialogue> */}
        </div>

        <div>
          <ListNewWord
            words={newWords.current}
            vietnameseWords={newWordsVietnamese.current}
          ></ListNewWord>
        </div>
      </div>
    </>
  );
};

ListeningComponent.getLayout = Layout;
export default ListeningComponent;
