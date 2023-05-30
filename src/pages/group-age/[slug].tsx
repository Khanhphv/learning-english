import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "components/layout";
import Head from "next/head";
import styles from "./_.module.scss";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { type } from "os";

const ranges = {
  age3: "basic!B16:D25",
  age4: "basic!B30:D138",
  age5: "basic!B140:D234",
  age6: "basic!B236:D332",
  age7: "basic!B334:D440",
  age8: "basic!B442:D532",
  age9: "basic!B534:D638",
  age10: "basic!B640:D737",
  age11: "basic!B739:D835",
  age12: "basic!B837:D942",
};

const ListeningExercise = () => {
  const [ageGroup, setAgeGroup] = useState<any[]>([]);
  const [mnemonics, setMnemonics] = useState<any[]>([]);
  const router = useRouter();
  const { slug } = router.query;
  const id = slug ? String(slug) : null;

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/1CatcEnNR5KpWCfPz-95YUVlE2WVDY4bYVFCNPP6Bnjo/values/${ranges[id]}?majorDimension=COLUMNS&key=AIzaSyBEC-5QDF7ocl-iJpC_vyXJjKyCdlR39i0`
        );
        const jsonData = await response.json();
        const filteredData = jsonData.values.map((row: any) =>
          row.filter((cell: any) => cell !== "")
        );
        setAgeGroup(filteredData[0]);
        setMnemonics(filteredData[2]);
      } catch (error) {
        console.log("An error occurred:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className={styles.main}>
      <Head>
        <title>Listening</title>
      </Head>
      {/* <div>{JSON.stringify(mnemonics, null, 2)}</div> */}

      <header className={styles.header}>
        <div>
          <span>Lứa tuổi : </span>
          {id?.substring(3)}
        </div>
      </header>
      {ageGroup.map((exercise, index) => (
        <a
          id={styles.item}
          className={styles.a}
          key={exercise}
          href={`listening/${index}`}
        >
          <div className={styles.topic}>
            <span className={styles.topicName}>Topic: {exercise}</span>
            <span className={styles.index}>{index + 1}</span>
          </div>
          <hr />
          <div className={styles.content}>
            <p>{mnemonics ? mnemonics[index] : "no content"}</p>
          </div>
          <div className={styles.bottombuttons}>
            <button className={styles.play}>Let's Listen</button>
          </div>
        </a>
      ))}
    </div>
  );
};

ListeningExercise.getLayout = Layout;
export default ListeningExercise;
