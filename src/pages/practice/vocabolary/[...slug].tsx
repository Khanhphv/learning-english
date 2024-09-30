import { useEffect, useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import { useRouter } from "next/router";
import Layout from "components/layout";
import CarouselWords from "components/new-words/carouselWords";
import NewWordSideBar from "components/new-words/side-bar";
import styles from "./_.module.scss";
import { TopicResponse } from "@/pages/group-age/[slug]";
import { Vocabulary } from "@/pages/listening/[...index]";
import { Button } from "@/components/ui/button";
import { BookCheck } from "lucide-react";
const Vocabolary = () => {
  const router = useRouter();
  const { slug } = router.query;
  const ageId = slug ? slug[0] : "";
  const topicId = slug ? slug[1] : "";
  const [example, setExample] = useState<string | null>(null);
  const [topics, setTopics] = useState<TopicResponse[]>([]);
  const [ageGroup, setAgeGroup] = useState<any>(null);
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);

  const { data: topics_data, error: topics_error } = useSWR(
    ageId ? `/topic/${ageId}` : null,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  );

  const { data: age_group_data, error: age_group_error } = useSWR(
    ageId ? `/age-group/${ageId}` : null,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  );

  const { data: vocabularies_data, error: vocabularies_error } = useSWR(
    topicId
      ? `/vocabulary/get-by-topic/${topicId}`
      : `/vocabulary/get-by-topic/${topics[0]?.id}`,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  );

  const { data: dialogue_data, error: dialogue_error } = useSWR(
    example ? `/dialogue/find-by-english-sentence/${example}` : null,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (topics_data && topics_data.result) {
      setTopics(topics_data.result);
    }

    if (age_group_data && age_group_data.result) {
      setAgeGroup(age_group_data.result);
    }

    if (vocabularies_data && vocabularies_data.result) {
      setVocabularies(vocabularies_data.result);

      if (vocabularies_data.result.length > 0) {
        setExample(vocabularies_data.result[0].englishWord);
      }
    }

    if (topics_error) {
      toast.error(topics_error.message);
    }

    if (age_group_error) {
      toast.error(age_group_error.message);
    }

    if (vocabularies_error) {
      toast.error(vocabularies_error.message);
    }

    if (dialogue_error) {
      toast.error(dialogue_error.message);
    }
  }, [topics_data, age_group_data, vocabularies_data, dialogue_error, vocabularies_error, topics_error, age_group_error]);

  const handleClick = (topicId: string) => {
    router.push(`/practice/vocabolary/${ageId}/${topicId}`);
  };

  const findExample = (word: string) => {
    setExample(word);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>Lứa tuổi: {ageGroup?.name}</span>
      </div>
      <div className="container mx-auto px-14 flex flex-col sm:grid sm:grid-cols-3 sm:grid-rows-2 gap-20 justify-center">
        <div className="col-span-1 row-span-2">
          <NewWordSideBar
            topics={topics}
            currentTopic={topicId}
            handleClick={handleClick}
          />
        </div>
        <div className="lg:col-span-1 md:col-span-2">
          <CarouselWords
            vocabularies={vocabularies}
            findExample={findExample}
          />
        </div>
        <div className="lg:col-span-1 md:col-span-2 md:row-start-2 md:col-start-2 ms:flex-col">
          <div className="shadow-lg bg-gradient-to-tr from-amber-200 shadow-gray-200 p-10 rounded-lg">
            <div>Example(Ví dụ):</div>
            <div>{dialogue_data?.result?.englishSentence ? dialogue_data?.result?.englishSentence : example}</div>
          </div>
          <div className="text-center mt-5">
            <Button className="hover:bg-red-500 bg-red-400" variant={"outline"}> <BookCheck />Kiểm tra tại đây!</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

Vocabolary.getLayout = Layout;
export default Vocabolary;
