import React, { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Vocabulary } from "@/pages/listening/[...index]";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./_.module.scss";

const CarouselWords = ({ vocabularies, findExample }: { vocabularies: Vocabulary[], findExample: (word: string) => void }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [flipState, setFlipState] = useState<{ [key: number]: boolean }>({});
  const selectedSnap = useRef<number>(0);


  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    const onSelect = () => {
        selectedSnap.current = api.selectedScrollSnap();

      setCurrentSlide(selectedSnap.current);
    
      setFlipState((prevState) => ({
        ...prevState,
        [selectedSnap.current]: false,
      }));


      if(vocabularies[selectedSnap.current]?.englishWord) {
        
        findExample(vocabularies[selectedSnap.current].englishWord);
      }
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, vocabularies, findExample]);

  const handleFlip = (index: number) => {
    setFlipState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className={styles.container}>
      <div className="text-center text-xl font-semibold p-5">Ấn vào thẻ để xem nghĩa Tiếng Việt</div>
      <Carousel setApi={setApi} className="w-full max-w-md mx-auto space-y-4">
        <CarouselContent>
          {vocabularies.map((vocabulary, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full aspect-square">
                <AnimatePresence initial={false} mode="wait">
                  {!flipState[index] ? (
                    <motion.div
                      key="front"
                      initial={{ rotateX: 90 }}
                      animate={{ rotateX: 0 }}
                      exit={{ rotateX: -90 }}
                      transition={{ duration: 0.1 }}
                      className="absolute w-full h-full"
                    >
                      <Card
                        className="w-full h-full  border-2 bg-gradient-to-tr from-teal-100 bg-white text-black cursor-pointer"
                        onClick={() => handleFlip(index)}
                      >
                        <CardContent className="flex items-center justify-center h-full">
                          <span className="text-3xl font-bold">
                            {vocabulary.englishWord}
                          </span>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="back"
                      initial={{ rotateX: -90 }}
                      animate={{ rotateX: 0 }}
                      exit={{ rotateX: 90 }}
                      transition={{ duration: 0.1 }}
                      className="absolute w-full h-full"
                    >
                      <Card
                        className="w-full h-full border-2 bg-gradient-to-tr from-teal-100 text-black cursor-pointer"
                        onClick={() => handleFlip(index)}
                      >
                        <CardContent className="flex  items-center justify-center h-full">
                          <p className="text-3xl font-bold">
                            {vocabulary.vietnameseMeaning}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <p className="text-center">
        {currentSlide + 1}/{count}
      </p>
    </div>
  );
};

export default CarouselWords;
