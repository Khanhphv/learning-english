import Layout from "components/layout";
import ListeningCardComponent from "components/listening";
import React, { useRef, useEffect } from "react";
import {
  RangesHeart,
  RangesTopicsAndNewsWords,
} from "constants/ListListeningLessons";
import useSWR from "swr";
import { COLUMNS, ROWS } from "constants/googleapi";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LearnWords from "components/vocabulary";
import FavoriteCardComponent from "components/favorites";
import styles from "./_.module.scss";
import { useSpringRef, useSpring, animated } from "@react-spring/web";
import MovingBackground from "components/background";

const LearningContent = () => {
  const transRef = useSpringRef();
  const style = useSpring({
    ref: transRef,
    from: { opacity: 0, transform: "translate3d(0,100%,0)" },
    to: { opacity: 1, transform: "translate3d(0%,0,0)" },
  });

  useEffect(() => {
    transRef.start();
  }, []);

  const topic = useRef<number>(0);
  const newWords = useRef<number>(0);
  const router = useRouter();
  const { index } = router.query;
  const age = index ? String(index) : null;
  const totalHeartWords = useRef<number>(0);
  const totalHeartTopic = useRef<number>(0);
  const { data: data, error: error } = useSWR(
    age && `basic!${RangesTopicsAndNewsWords[age]}${COLUMNS}`,
    { revalidateOnMount: true, revalidateOnFocus: false }
  );

  const { data: data_heart, error: error_heart } = useSWR(
    age && `heart!${RangesHeart[age]}`,
    { revalidateOnMount: true, revalidateOnFocus: false }
  );
  if (data_heart) {
    const filterData = data_heart.filter((row: any) => row[3] === "1");
    totalHeartTopic.current = filterData.length;
    totalHeartWords.current = filterData.reduce((acc: number, item: any) => {
      return acc + item[1].split(",").length;
    }, 0);
    console.log(totalHeartWords.current, totalHeartTopic.current);
  }

  if (data) {
    topic.current = data[0].length;
    newWords.current = data[1].reduce((acc: number, item: any) => {
      return acc + item.split(",").length;
    }, 0);
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <animated.div
      style={style}
      className="relative w-auto h-auto overflow-hidden"
    >
      <MovingBackground />
      <div className="absolute w-full h-full z-50 flex justify-center items-center top-0 left-0">
        <div className={styles["learning-container"]}>
          <div
            className="container h-screen w-screen flex flex-col justify-center sm:overflow-hidden mx-auto 
          px-8 pt-24 pb-6
          
          sm:px-4 sm:pt-16 sm:pb-6 
          md:px-4 md:pt-16 md:pb-8 
          lg:px-12 lg:pt-16 lg:pb-10 
          xl:px-28 xl:pt-16 xl:pb-10 
          "
          >
            <div className="grid grid-rows-3 sm:grid-cols-2 sm:grid-rows-2 gap-4 h-full w-full ">
              <div className="sm:col-span-2 flex items-center justify-center">
                {data ? (
                  <ListeningCardComponent
                    topic={topic.current}
                    newWord={newWords.current}
                  />
                ) : (
                  <Skeleton height={305} borderRadius={30} />
                )}
              </div>
              <div className="sm:row-start-2 flex justify-center items-center">
                <LearnWords newWord={newWords.current} />
              </div>
              <div className="sm:row-start-2 sm:col-start-2 flex justify-center items-center">
                <FavoriteCardComponent
                  topic={totalHeartTopic.current}
                  newWord={totalHeartWords.current}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

LearningContent.getLayout = Layout;
export default LearningContent;
