import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Layout from "components/layout";
import Head from "next/head";
import styles from "./_.module.scss";
import { GOOGLE_API_KEY, GOOGLE_API_PRE, COLUMNS } from "constants/googleapi";
import useSWR from "swr";
const ranges = {
  age3: "heart!B1:E10",
  age4: "heart!B11:E20",
  age5: "heart!B21:E30",
  age6: "heart!B31:E39",
  age7: "heart!B41:E50",
  age8: "heart!B51:E60",
  age9: "heart!B61:E70",
  age10: "heart!B71:E80",
  age11: "heart!B81:E90",
  age12: "heart!B91:E101",
};

const ListeningItem = ({ id, index, exercise, content, isHearted }) => {
  const router = useRouter();
  const heartEmpty = "url('/heartempty.svg')";
  const heartFill = "url('/heartfill.svg')";
  const [heart, setHeart] = useState(isHearted == "0" ? heartEmpty : heartFill);
  const indexInSheet =
    Number(id ? id.substring(3) : 0) * 10 + (index ? index : 1);

  const handleHeart = () => {
    setHeart(heart.length === 22 ? heartFill : heartEmpty);
  };

  return (
    <div id={styles.item} className={styles.a} key={exercise}>
      <div className={styles.topic}>
        <span className={styles.topicName}>{exercise}</span>
        <span className={styles.index}>{index + 1}</span>
      </div>
      <hr />
      <div className={styles.content}>
        <p>{content}</p>
      </div>
      <div className={styles.bottombuttons}>
        <button
          onClick={() => {
            router.push(`/listening/${id}/${index + 1}`);
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

const ListeningExercise = () => {
  const ageGroup = useRef([]);
  const mnemonics = useRef([]);
  const hearts = useRef([]);
  const router = useRouter();
  const { slug } = router.query;
  const id = slug ? String(slug) : null;

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
    id ? `${GOOGLE_API_PRE}${ranges[id]}${COLUMNS}${GOOGLE_API_KEY}` : null,
    fetcher,
    { revalidateOnMount: true }
  );

  if (data) {
    ageGroup.current = data[0];
    mnemonics.current = data[2];
    hearts.current = data[3];
  }

  if (error) {
    return <div>An error occurred: {error}</div>;
  }

  return (
    <div className={styles.main}>
      <Head>
        <title>Listening</title>
      </Head>

      <header className={styles.header}>
        <div>
          <span>Lứa tuổi : </span>
          {id?.substring(3)}
        </div>
      </header>
      {ageGroup.current.map((exercise, index) => (
        <ListeningItem
          key={exercise}
          id={id}
          index={index}
          exercise={exercise}
          content={mnemonics.current ? mnemonics.current[index] : "no content"}
          isHearted={hearts.current ? hearts.current[index] : "0"}
        />
      ))}
    </div>
  );
};

ListeningExercise.getLayout = Layout;
export default ListeningExercise;
