import React, { useRef, useEffect } from "react";
import Dialogue from "./Dialogue";
import styles from "./_.module.scss";
import { useRouter } from "next/router";
import ListNewWord from "./newWords";
import Layout from "components/layout";
import useSWR from "swr";
import Head from "next/head";
import { toast } from "sonner";
import { TopicResponse } from "../group-age/[slug]";
import YouTube from "react-youtube";
import { useSpring, useSpringRef, animated } from "@react-spring/web";
import MovingBackground from "components/background";
type Conversation = {
  id: string;
  title: string;
  youtubeVideo: string;
};

export type Vocabulary = {
  id: string;
  englishWord: string;
  vietnameseMeaning: string;
};

export type DialogueLine = {
  id: string;
  speaker: string;
  englishSentence: string;
  vietnameseSentence: string;
};

const ListeningComponent = () => {
  const conversations = useRef<Conversation[]>();
  const dialogueLines = useRef<DialogueLine[]>();
  const topic = useRef<TopicResponse>();
  const newWords = useRef<Vocabulary[]>([]);
  const router = useRouter();
  const { index } = router.query;
  const topicId = index ? index : null;
  const tranRef = useSpringRef();
  const style = useSpring({
    ref: tranRef,
    from: {
      opacity: 0,
      transform: "translate3d(0,100%,0)",
    },
    to: {
      opacity: 1,
      transform: "translate3d(0%,0,0)",
    },
  });

  useEffect(() => {
    tranRef.start();
  }, []);

  const { data: conversation_data, error: conversation_error } = useSWR(
    topicId ?
    `/conversation/${topicId}` : null,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  );

  const { data: topic_data, error: topic_error } = useSWR(
    topicId ?
    `/topic/info/${topicId}` : null,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  );

  if (conversation_data && topic_data) {
    conversations.current = conversation_data.result;
    topic.current = topic_data.result;

  }

  if (conversation_error) {
    toast.error("Error when getting topic info");
  }

  const { data: dialogue_data, error: dialogue_error } = useSWR(
    conversations.current?.at(0)?.id ?
    `/dialogue/${conversations.current?.at(0)?.id}` : null,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  );

  const { data: new_words_data, error: new_words_error } = useSWR(
    topicId ?
    `/vocabulary/get-by-topic/${topicId}` : null,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  );

  if (new_words_data) {
    newWords.current = new_words_data.result;
  }

  if (new_words_error) {
    toast.error("Error when getting new words");
  }

  if (dialogue_data) {
    dialogueLines.current = dialogue_data.result;
    // console.log(dialogueLines);
  }

  if (dialogue_error) {
    toast.error("Error when getting dialogue");
  }
  const videoId = conversations.current?.at(0)?.youtubeVideo?.substring(32);

  return (
    <>
      <animated.div
        style={style}
        className="relative w-auto h-auto"
      >
      <MovingBackground />
        <Head>
          <title>Listening</title>
        </Head>
        <div className={styles.layout}>
          <div className={styles.header}>
            <div className={styles.title}>
              <div>{`Topic: ${
                topic.current ? topic.current.title : "No content"
              }`}</div>
            </div>
          </div>
          <div className={styles.wrapper}>
            {videoId ? (
              <div className={styles.video}>
                <div>
                  <YouTube
                    key={videoId}
                    videoId={videoId}
                    iframeClassName={styles.iframe}
                  />
                </div>
                <div
                  style={{ fontSize: "150%", fontWeight: "bold" }}
                >{`Topic: ${topic.current?.title}`}</div>
              </div>
            ) : (
              <Dialogue dialogueLines={dialogueLines.current}></Dialogue>
            )}

            {/* <div className={styles.imageDisplay}>
            <img
            src={`/imgs/${age}/${age.substring(3)}.${id}.jpg`}
            alt="dailyroutin"
            />
            </div> */}
          </div>

          <div>
            <ListNewWord words={newWords.current}></ListNewWord>
          </div>
        </div>
      </animated.div>
    </>
  );
};

ListeningComponent.getLayout = (page: any) => <Layout>{page}</Layout>;
export default ListeningComponent;
