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

const ListeningComponent = () => {
  const topic = useRef();
  const newWords = useRef([]);
  const newWordsVietnamese = useRef([]);
  const dialogue = useRef([[], [], []]);
  const router = useRouter();
  const { index } = router.query;
  const age = index ? String(index[0]) : null;
  const id = index ? Number(index[1]) : 0;

  const fetcher = async (url: any) => {
    const res = await fetch(url);

    if (!res.ok) {
      const error = new Error("an error occurred while fetching the data");
      error.message = res.statusText;
      throw error;
    }

    const jsonData = await res.json();
    const filteredData = jsonData.values.map((row: any) =>
      row.filter((cell: any) => cell !== "")
    );

    return filteredData;
  };

  const { data, error } = useSWR(
    age && id
      ? `${GOOGLE_API_PRE}basic!${Ranges[age][id]}${COLUMNS}${GOOGLE_API_KEY}`
      : null,
    fetcher,
    { revalidateOnMount: true }
  );

  if (data) {
    topic.current = data[1];
    newWords.current = data[2].toString().split(",");
    // first is english dialog, second is audio file, the last is vietnamese dialog
    dialogue.current = [data[4], data[6], data[7]];
    newWordsVietnamese.current = data[8].toString().split(",");
  }

  if (error || !age || !id) {
    return (
      <div>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Listening</title>
      </Head>
      <div className={styles.layout}>
        <div className={styles.header}>
          <div className={styles.title}>
            <span>{`Topic: ${
              topic.current ? topic.current : "No content"
            } - lứa tuổi ${age?.substring(3)}`}</span>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.imageDisplay}>
            <img
              src={`/imgs/${age}/${age.substring(3)}.${id}.jpg`}
              alt="dailyroutin"
            />
          </div>
          <Dialogue
            dialogue={dialogue.current}
            audioSrc={`/audio/${age}/${age?.substring(3)}.${id}/`}
          ></Dialogue>
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
