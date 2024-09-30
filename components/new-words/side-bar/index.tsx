import React from "react";
import styles from "./_.module.scss";
import { TopicResponse } from "@/pages/group-age/[slug]";
import { useRouter } from "next/router";

// type Props = {}




const NewWordSideBar = ({ topics, currentTopic, handleClick }: { topics: TopicResponse[], currentTopic: string, handleClick: (topicId: string) => void }) => {
  
  if(currentTopic === undefined ) {
    currentTopic = topics[0]?.id;
  } 
  
  return (
    <div className={styles["side-bar-container"]}>
      <div className="text-2xl font-semibold w-[250px] text-center p-5">
        Topics
      </div>
      <div className="flex flex-col pb-8">
        {topics.map((topic, index) => (
          <div key={index} className={`hover:bg-gray-600 px-5 ${currentTopic === topic.id ? ' border-l-8 border-sky-50 bg-gradient-to-r from-cyan-700 px-3' : ''}`}>
            <button className="text-start font-semibold py-2" key={index} onClick={() => handleClick(topic.id)}>
              {topic.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewWordSideBar;
