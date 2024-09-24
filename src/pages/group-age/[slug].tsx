import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Layout from "components/layout";
import Head from "next/head";
import styles from "./_.module.scss";
import useSWR from "swr";
import { useSpring, animated, config } from "@react-spring/web";
import { toast } from "sonner";
import httpClient from "api-client/httpClient";


export type TopicResponse = {
  id: string;
  title: string;
  favourite: boolean;
};


const ListeningItem = ({ id, index, title, content, isHearted }) => {
  const router = useRouter();
  const heartEmpty = "url('/heartempty.svg')";
  const heartFill = "url('/heartfill.svg')";
  const [heart, setHeart] = useState(isHearted === true ? heartFill : heartEmpty);


  // useEffect(() => {
  //   setHeart(isHearted === "1" ? heartFill : heartEmpty);
  // }, [isHearted]);

  const updateFavourite = async (newStatus: boolean) => {
    try{
        await httpClient.put(`/topic/update-favourite/${id}`, {favourite: newStatus});
        setHeart(heart === heartEmpty ? heartFill : heartEmpty);


    }catch(erorr){
      console.log(erorr);
      toast.error("Error when updating favourite status");
    }

  }

  const handleHeart = () => {
    const newStatus = heart === heartEmpty;
    updateFavourite(newStatus);
  };

  return (
    <div id={styles.item} className={styles.a}>
      <div className={styles.topic}>
        <span className={styles.topicName}>{title}</span>
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
          }}
          className={styles.heart}
        ></button>
      </div>
    </div>
  );
};



const ListeningExercise = () => {
  const ageGroup = useRef<TopicResponse[]>([]);
  const router = useRouter();
  const { slug } = router.query;
  const ageGroupId = slug ? String(slug) : null;
  const background = useSpring({
    from: {
      background: "#ff615d",
    },
    to: [
      { background: "#bad5ea" },
      { background: "#fd8769" },
      { background: "#356d94" },
      { background: "#ffdcb3" },
    ],
    config: config.molasses,
    loop: { reverse: true },
  });

  const { data, error } = useSWR(ageGroupId ? `/topic/${ageGroupId}`: null, {
    revalidateOnMount: true,
    revalidateOnFocus: false,
  });

  if (data && data.result) {
    ageGroup.current = data.result;
    console.log(data);
  }

  if (error) {
    console.log(error);
    toast.error("Can not load data");
  }

  return (
    <div className={styles.main}>
      <Head>
        <title>Listening</title>
      </Head>

      {/* <header className={styles.header}>
        <div>
          <span>Lứa tuổi : </span>
          {id?.substring(3)}
        </div>
      </header> */}
      {ageGroup.current.map((exercise, index) => (
        <ListeningItem
          key={index}
          id={exercise.id}
          title={exercise.title}
          index={index}
          content={exercise.title ? exercise.title : "no content"}
          isHearted={exercise.favourite}
        />
      ))}

      <animated.div
        style={background}
        className={styles.background}
      ></animated.div>
    </div>
  );
};

ListeningExercise.getLayout = Layout;
export default ListeningExercise;
