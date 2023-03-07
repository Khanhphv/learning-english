import React, { useImperativeHandle, useState } from 'react';
import styles from './_.module.scss';

type Props = {
    id: string;
    frontContent: string;
    backContent: React.ReactNode;
    isPlayAll?: boolean;
    handleFlip: (id: string, isFlipped: boolean) => void;
  };
const LetterCard = ({ id, frontContent, backContent, isPlayAll = false, handleFlip }: Props, ref) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useImperativeHandle(ref, () => {
    return {cardClick: () => handleCardClick()}
  })

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    handleFlip(id, !isFlipped);
  };

  return (
    <div className={styles.card + (isFlipped ? ' ' + styles.flipped : '')} onClick={!isPlayAll ? handleCardClick : () => null}>
      <div className={styles.cardInner}>
        <div className={`${styles.cardFront} ${styles[frontContent]} `}>
        </div>
        <div className={styles.cardBack}>
          {backContent}
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(LetterCard);
