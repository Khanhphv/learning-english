import Layout from "components/layout";
import ListeningCardComponent from "components/listening";
import React, { useRef, Suspense } from "react";
import { RangesTopicsAndNewsWords } from "constants/ListListeningLessons";
import useSWR from "swr";
import { COLUMNS, ROWS } from "constants/googleapi";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LearnWords from "components/vocabulary";
import FavoriteCardComponent from "components/favorites";
const LearningContent = () => {
  const topic = useRef<number>(0);
  const newWords = useRef<number>(0);
  const router = useRouter();
  const { index } = router.query;
  const age = index ? String(index) : null;
  const { data, error } = useSWR(
    age && `basic!${RangesTopicsAndNewsWords[age]}${COLUMNS}`,
    { revalidateOnMount: true, revalidateOnFocus: false, suspense: true }
  );
  console.log(data);

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
    <div className="container mx-auto px-14 py-14">
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <div className="row-start-1 col-start-1 col-span-2">
          {data ? (<ListeningCardComponent
            topic={topic.current}
            newWord={newWords.current}
          />) : (<Skeleton height={305} borderRadius={30} />)}
        </div>
        <div className="row-start-2 col-start-1">
          <LearnWords />
        </div>
        <div className="row-start-2 col-start-2 ">
          <FavoriteCardComponent/>
        </div>
      </div>
    </div>
  );
};



LearningContent.getLayout = Layout;
export default LearningContent;
