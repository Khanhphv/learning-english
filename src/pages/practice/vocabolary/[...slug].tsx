import Layout from "components/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./_.module.scss";
import { GOOGLE_API_PRE, GOOGLE_API_KEY, COLUMNS } from "constants/googleapi";
import useSWR from "swr";

const ranges2 = [
  [30, 132],
  [140, 225],
  [236, 316],
  [334, 433],
  [442, 524],
  [534, 626],
  [640, 729],
  [739, 826],
  [837, 916],
];

const Vocabolary = () => {
  const router = useRouter();
  const { slug } = router.query;
  const age = slug ? Number(slug[0]) : 0;
  const id = slug ? Number(slug[1]) : 0;

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
    age
      ? `${GOOGLE_API_PRE}vocabolary!B${ranges2[age - 4][0]}:F${
          ranges2[age - 4][1]
        }${COLUMNS}${GOOGLE_API_KEY}`
      : null,
    fetcher,
    { revalidateOnMount: true }
  );

  if (error) {
    return (
      <div>
        <span>Can not load data</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Lứa tuổi: {age}</span>
      </div>
      <div className={styles.content}>
        <FlashCard data={data} id={id} />
      </div>
    </div>
  );
};

const WordTag = ({ word, color, vietnam }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [current, setCurrent] = useState(word);
  if (current !== word) {
    setCurrent(word);
    setIsFlipped(false);
  }
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={styles.tagarea + (isFlipped ? " " + styles.flipped : "")}
      onClick={handleCardClick}
    >
      <div
        style={{
          backgroundColor: `${color}`,
        }}
        className={styles.tag}
      >
        <span>{word}</span>
      </div>
      <div
        style={{
          backgroundColor: `${color}`,
        }}
        className={styles.cardBack}
      >
        <span>{vietnam}</span>
      </div>
    </div>
  );
};

const FlashCard = ({ data, id }) => {
  const [index, setIndex] = useState(0);
  const [indexTopic, setIndexTopic] = useState(id);
  const [topics, setTopics] = useState([]);
  const [newWords, setNewWords] = useState([]);
  const [dialogues, setDialogues] = useState([]);
  const [vietnamese, setVietnamese] = useState([]);
  const router = useRouter();
  const len = newWords.length;

  useEffect(() => {
    if (!data) {
      return;
    }
    const setData = async () => {
      try {
        setTopics(data[0]);
        setNewWords(data[1][indexTopic].split(","));
        setDialogues(data[3]);
        setVietnamese(data[4][indexTopic].split(","));
      } catch (error) {
        console.log("error", error);
      }
    };
    setData();
  }, [data, indexTopic]);

  const handleSwithWord = (value) => {
    if (index >= len - 1 && value > 0) {
      setIndex(0);
    } else if (index <= 0 && value < 0) {
      setIndex(len - 1);
    } else {
      setIndex(index + value);
    }
  };

  const handleSwichTopic = (value) => {
    if (value === indexTopic) {
      return;
    }
    setIndex(0);
    setIndexTopic(value);
  };

  const moveOnPage = (link: string) => {
    router.push(link);
  };

  if (!topics) {
    return (
      <div>
        <span>Can not read data</span>
      </div>
    );
  }

  return (
    <>
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
          <span>Trở lại phần ôn tập từ vựng</span>
        </div>
      </div>
      {/* FLASH CARDS */}
      <div className={styles.flashCard}>
        <div style={{ textAlign: "center" }}>
          <h3>Ấn vào thẻ để xem nghĩa tiếng Việt</h3>
        </div>
        <WordTag
          color={index % 2 == 0 ? "#56BECB" : "#92DDEE"}
          word={newWords[index]}
          vietnam={vietnamese[index]}
        />

        <div className={styles["switch-button"]}>
          <button
            onClick={() => handleSwithWord(-1)}
            className={styles["button-up"]}
          ></button>
          <span>{`${index + 1} / ${newWords.length}`}</span>
          <button
            onClick={() => handleSwithWord(1)}
            className={styles["button-down"]}
          ></button>
        </div>

        <div className={styles.example}>
          <span>Ví dụ:</span> <br />
          {dialogues.find((dialogue: string) => {
            return (
              dialogue.includes(newWords[index] + " ") ||
              dialogue.includes(newWords[index] + "?") ||
              dialogue.includes(newWords[index] + ".") ||
              dialogue.includes(newWords[index] + "s") ||
              dialogue.includes(newWords[index] + "es") ||
              dialogue.includes(newWords[index] + ",")
            );
          })}
        </div>
      </div>

      {/* SIDE BAR */}
      <div className={styles.otherTopics}>
        <div style={{ borderBottom: "1px solid black" }}>
          <span>Các chủ đề trong cùng lứa tuổi</span>
        </div>
        {topics.map((topic, index) =>
          index === indexTopic ? (
            <button
              style={{ backgroundColor: "#e3eaea" }}
              className={styles.topic}
              key={topic}
              onClick={() => {
                handleSwichTopic(index);
              }}
            >
              <span>{topic}</span>
            </button>
          ) : (
            <button
              className={styles.topic}
              key={topic}
              onClick={() => {
                handleSwichTopic(index);
              }}
            >
              <span>{topic}</span>
            </button>
          )
        )}
      </div>
    </>
  );
};

Vocabolary.getLayout = Layout;
export default Vocabolary;
