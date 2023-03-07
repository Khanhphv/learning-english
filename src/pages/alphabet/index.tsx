import styles from "./_.module.scss";
import LetterCard from "components/letter-card";
import { useState } from "react";
import { useRef } from 'react'
import Layout from "components/layout";
import Head from "next/head";

type CardData = {
  id: string;
  frontContent: string;
  backContent: React.ReactNode;
};

const cards: CardData[] = [
  { id: "a", frontContent: "apple", backContent: <h2>Aa</h2> },
  { id: "b", frontContent: "bird", backContent: <h2>Bb</h2> },
  { id: "c", frontContent: "cake", backContent: <h2>Cc</h2> },
  { id: "d", frontContent: "dog", backContent: <h2>Dd</h2> },
  { id: "e", frontContent: "egg", backContent: <h2>Ee</h2> },
  { id: "f", frontContent: "flower", backContent: <h2>Ff</h2> },
  { id: "g", frontContent: "gift", backContent: <h2>Gg</h2> },
  { id: "h", frontContent: "hat", backContent: <h2>Hh</h2> },
  { id: "i", frontContent: "iceCream", backContent: <h2>Ii</h2> },
  { id: "j", frontContent: "jam", backContent: <h2>Ji</h2> },
  { id: "k", frontContent: "key", backContent: <h2>Kk</h2> },
  { id: "l", frontContent: "lemon", backContent: <h2>Ll</h2> },
  { id: "m", frontContent: "monkey", backContent: <h2>Mm</h2> },
  { id: "n", frontContent: "nuts", backContent: <h2>Nn</h2> },
  { id: "o", frontContent: "orange", backContent: <h2>Oo</h2> },
  { id: "p", frontContent: "pen", backContent: <h2>Pp</h2> },
  { id: "q", frontContent: "question", backContent: <h2>Qq</h2> },
  { id: "r", frontContent: "rose", backContent: <h2>Rr</h2> },
  { id: "s", frontContent: "sock", backContent: <h2>Ss</h2> },
  { id: "t", frontContent: "tree", backContent: <h2>Tt</h2> },
  { id: "u", frontContent: "umbrella", backContent: <h2>Uu</h2> },
  { id: "v", frontContent: "violin", backContent: <h2>Vv</h2> },
  { id: "w", frontContent: "watermelon", backContent: <h2>Ww</h2> },
  { id: "x", frontContent: "xylophone", backContent: <h2>Xx</h2> },
  { id: "y", frontContent: "yacht", backContent: <h2>Yy</h2> },
  { id: "z", frontContent: "zeppelin", backContent: <h2>Zz</h2> },
  // Add as many cards as you need
];

const Alphabet = () => {
  const [cardStates, setCardStates] = useState({});
  const [isPlayAll, setIsPlayAll] = useState(false);
  const refs = useRef<any>([]);

  const play = (letter: string) => {
    const audio = document.getElementById(letter) as HTMLMediaElement;
    audio?.play();
  };

  const handleFlip = (id: string, isFlipped: boolean) => {
    setCardStates((prevStates) => ({ ...prevStates, [id]: isFlipped }));
  };

  const playAndFlip = (i: number) => {
    refs.current[i].cardClick();
    play(cards[i].id);
    i == cards.length - 1 ? setIsPlayAll(false) : setIsPlayAll(true);
  }

  const playAll = () => {
    setIsPlayAll(true);
    for (let i = 0; i < cards.length; i++) {
      setTimeout(function () {
        playAndFlip(i)
      }, i * 1200);
    }
  };

  return (
    <div className={styles.alphabet}>
      <Head>
        <title>Bảng chữ cái</title>
      </Head>
      <button className={styles.playAll} onClick={(e) => !isPlayAll ? playAll() : () => null}>Play All</button>
      <div className={styles.container}>
        {cards.map((card, index) => {
          return <div className={styles.letter} onClick={(e) => !isPlayAll ? play(card.id) : () => null}>
            <LetterCard
              key={card.id}
              ref={el => refs.current[index] = el}
              id={card.id}
              frontContent={card.frontContent}
              backContent={card.backContent}
              isPlayAll = {isPlayAll}
              handleFlip={handleFlip}
            />
            <audio id={card.id}>
              <source src={"/audio/" + card.id + ".mp3"} type="audio/mpeg" />
            </audio>
          </div>
        })}
      </div>
    </div>
  );
};
Alphabet.getLayout = Layout
export default Alphabet;
