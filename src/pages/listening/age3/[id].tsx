import Layout from "components/layout";
import React, { useEffect, useRef, useState } from "react";
import styles from "./_.module.scss";
import YouTube from "react-youtube";
import { useRouter } from "next/router";
import { GOOGLE_API_KEY, GOOGLE_API_PRE, COLUMNS } from "constants/googleapi";
import useSWR from "swr";

const ListeningPage = () => {
  const videoUrls = useRef([]);
  const newWords = useRef([]);
  const topics = useRef([]);
  const router = useRouter();
  const { id } = router.query;
  const idNum = id ? Number(id) : null;
  const RANGE_SHEET = "basic!B16:G25";

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
    console.log(filteredData);
    return filteredData;
  };

  const { data, error } = useSWR(
    `${GOOGLE_API_PRE}${RANGE_SHEET}${COLUMNS}${GOOGLE_API_KEY}`,
    fetcher,
    { revalidateOnMount: true }
  );

  if (data) {
    topics.current = data[0];
    newWords.current = data[1];
    videoUrls.current = data[5];
  }

  if (!id || !idNum || videoUrls.current.length == 0) {
    return (
      <div>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span>{`Lứa tuổi 3`}</span>
        </div>
      </div>

      <VideoOperation
        topics={topics.current}
        newWords={newWords.current}
        videoUrls={videoUrls.current}
        id={idNum}
      />
    </div>
  );
};

const VideoOperation = ({ topics, newWords, videoUrls, id }) => {
  const [topic, setTopic] = useState("");
  const [words, setWords] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [indexTopic, setIndexTopic] = useState(id);
  const router = useRouter();

  useEffect(() => {
    if (!indexTopic) {
      return;
    }

    const getDataViaId = async () => {
      try {
        setTopic(topics[indexTopic - 1]);
        setWords(newWords[indexTopic - 1].split(","));
        setVideoUrl(videoUrls[indexTopic - 1].substring(32));
      } catch (error) {
        console.log("error:", error);
      }
    };
    getDataViaId();
  }, [videoUrls, indexTopic]);

  if (topics.length == 0 || !newWords || !videoUrls || !id) {
    return (
      <div>
        <span>Can not read data</span>
      </div>
    );
  }

  const moveOnPage = (link: string) => {
    router.push(link);
  };

  const handleSwitchTopic = (value) => {
    if (value === indexTopic) {
      return;
    }
    setIndexTopic(value + 1);
  };

  return (
    <>
      {/* YOUTUBE VIDEO */}
      <div className={styles.videoOperation}>
        {/* NAVIGATE BUTTONS */}
        <div className={styles.navigateButtons}>
          <div
            onClick={() => {
              moveOnPage("/table-of-contents");
            }}
          >
            <span>Trở lại phần luyện nghe và ôn tập</span>
          </div>
          <div
            onClick={() => {
              moveOnPage("/practice");
            }}
          >
            <span>Ôn tập từ vựng</span>
          </div>
        </div>

        <div className={styles.video}>
          <div>
            <YouTube
              key={videoUrl}
              videoId={videoUrl}
              iframeClassName={styles.youtubeVideo}
              // loading="lazy"
            />
          </div>
          <div
            style={{ fontSize: "150%", fontWeight: "bold" }}
          >{`Topic: ${topic}`}</div>
        </div>

        {/* SIDE BAR */}
        <div className={styles.otherTopics}>
          <div style={{ borderBottom: "1px solid black" }}>
            <span>Các chủ đề trong cùng lứa tuổi</span>
          </div>
          {topics.map((topic, index) =>
            index + 1 === indexTopic ? (
              <button
                style={{ backgroundColor: "#e3eaea" }}
                className={styles.topic}
                key={topic}
                onClick={() => {
                  handleSwitchTopic(index);
                }}
              >
                <span>{topic}</span>
              </button>
            ) : (
              <button
                className={styles.topic}
                key={topic}
                onClick={() => {
                  handleSwitchTopic(index);
                }}
              >
                <span>{topic}</span>
              </button>
            )
          )}
        </div>
      </div>
      <hr />
      <h2 id={styles.titleNewWord}>New Words</h2>

      <div className={styles.newWords}>
        {words.map((word, index) => (
          <button key={word}>{word}</button>
        ))}
      </div>
    </>
  );
};

ListeningPage.getLayout = Layout;
export default ListeningPage;
