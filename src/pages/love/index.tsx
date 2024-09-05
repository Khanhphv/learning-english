import Layout from "components/layout";
import {
  GOOGLE_API_KEY,
  GOOGLE_API_PRE,
  COLUMNS,
  ROWS,
} from "constants/googleapi";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import useSWR from "swr";
import styles from "./_.module.scss";
import Head from "next/head";

const ListeningItem = ({ id, index, exercise, content, isHearted }) => {
  const router = useRouter();
  const heartEmpty = "url('/heartempty.svg')";
  const heartFill = "url('/heartfill.svg')";
  const [heart, setHeart] = useState(isHearted == "0" ? heartEmpty : heartFill);

  const handleHeart = () => {
    setHeart(heart.length === 22 ? heartFill : heartEmpty);
  };

  return (
    <div id={styles.item} className={styles.a} key={exercise}>
      <div className={styles.topic}>
        <span className={styles.topicName}>{`${exercise} (tuổi ${id})`}</span>
        <span className={styles.index}>{index + 1}</span>
      </div>
      <hr />
      <div className={styles.content}>
        <p>{content}</p>
      </div>
      <div className={styles.bottombuttons}>
        <button
          onClick={() => {
            router.push(`/listening/age${id}/${index + 1}`);
          }}
          className={styles.play}
        >
          Let's Listen
        </button>
        <button
          onClick={handleHeart}
          style={{
            background: `${heart}`,
            backgroundSize: "cover",
          }}
          className={styles.heart}
        ></button>
      </div>
    </div>
  );
};

const LovePage = () => {
  const ageGroup = useRef([]);
  const mnemonics = useRef([]);
  const hearts = useRef([]);
  const range = "heart!A1:E101";

  const fetcher = async (url: any) => {
    const res = await fetch(url);

    if (!res.ok) {
      const error = new Error("an error occurred while fetching the data");
      error.message = res.statusText;
      throw error;
    }

    try {
      const jsonData = await res.json();
      const filteredData = jsonData.values.filter((row: any) => row[4] == "1");
      console.log(filteredData);
      return filteredData;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error } = useSWR(
    `${GOOGLE_API_PRE}${range}${ROWS}${GOOGLE_API_KEY}`,
    fetcher,
    { revalidateOnMount: true }
  );

  if (data) {
    ageGroup.current = data[1];
    mnemonics.current = data[3];
    hearts.current = data[4];
  }

  if (error) {
    return <div>An error occurred: {error}</div>;
  }

  if (data == null || data == undefined) {
    return <div>There is no loved listening lesson</div>;
  }

  return (
    <div className={styles.main}>
      <Head>
        <title>Love</title>
      </Head>

      <header className={styles.header}>
        <div>
          <span>Các bài nghe yêu thích</span>
        </div>
      </header>
      {data.map((lesson, index) => (
        <ListeningItem
          key={lesson[1]}
          id={lesson[0]}
          index={index}
          exercise={lesson[1]}
          content={lesson[3]}
          isHearted={lesson[4] == "1" ? "1" : "0"}
        />
      ))}
    </div>
  );
};

LovePage.getLayout = Layout;
export default LovePage;
